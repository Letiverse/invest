/**
 * Keyframe strip-back pipeline for slides that have existing background images.
 * Slides: 01, 02, 06, 07, 08, 11, 15, 16, 17, 18 (full-bg / half-bg).
 * Also handles Slide 03 once its new image has been approved (approvedNewImage set in manifest).
 *
 * Strategy (using Nano Banana 2 img2img, image_reference strength):
 *   strength LOW  → output departs from reference → STRIPPED start frame
 *   strength MID  → moderate adherence           → KF1 (~30% of detail)
 *   strength HIGH → output stays close to input  → KF2 (~65% of detail)
 *   original blob                                → END frame (no generation needed)
 *
 * Saves locally:
 *   backgrounds/originals/slide{NN}.{ext}
 *   backgrounds/startframes/slide{NN}/v{1-4}.{ext}
 *   backgrounds/keyframes/slide{NN}/kf1/v{1-4}.{ext}
 *   backgrounds/keyframes/slide{NN}/kf2/v{1-4}.{ext}
 *
 * Updates manifest.json after every step so progress is never lost on interruption.
 */
import './lib/env.js'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import {
  setApiKey,
  uploadImageFromUrl,
  generateImg2Img,
  pollGeneration,
  downloadToFile,
  readManifest,
  writeManifest,
  sleep,
} from './lib/leonardo.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const BG_DIR = path.resolve(__dirname, '..')
const MANIFEST_PATH = path.join(BG_DIR, 'manifest.json')

// Slides to process in this script (have existing original images)
const IMAGE_SLIDES = ['01', '02', '06', '07', '08', '11', '15', '16', '17', '18']

async function processSlide(manifest, id) {
  const slide = manifest.slides[id]
  const outOriginal = path.join(BG_DIR, 'originals', `slide${id}${extFromUrl(slide.originalBlobUrl)}`)

  // ── Step 1: Upload original to Leonardo (once) ────────────────────────────
  if (!slide.state.uploadedImageId) {
    console.log(`\n  📤 Uploading original for Slide ${id}…`)
    const imageId = await uploadImageFromUrl(slide.originalBlobUrl)
    slide.state.uploadedImageId = imageId
    writeManifest(MANIFEST_PATH, manifest)
    await sleep(2000)
  } else {
    console.log(`\n  ✓ Original already uploaded: ${slide.state.uploadedImageId}`)
  }

  const uploadedId = slide.state.uploadedImageId
  const dims = slide.dimensions
  const NO_TEXT = 'text, words, letters, numbers, labels, captions, titles, headings, watermarks, typography, writing, annotations, logos, charts with text, axis labels, table headers, signage'

  // ── Step 2: Start frame (stripped, strength=LOW) ──────────────────────────
  if (slide.state.startFrames.length === 0) {
    console.log(`  🎨 Generating start frames (stripped)…`)
    const genId = await generateImg2Img(uploadedId, slide.prompts.strip, 'LOW', dims, 4, NO_TEXT)
    console.log('  ⏳ Waiting for start frames…')
    const images = await pollGeneration(genId, 6000, 300000)
    const outDir = path.join(BG_DIR, 'startframes', `slide${id}`)
    for (let i = 0; i < images.length; i++) {
      const ext = guessExt(images[i].url)
      const filePath = path.join(outDir, `v${i + 1}.${ext}`)
      await downloadToFile(images[i].url, filePath)
      slide.state.startFrames.push({ generationId: genId, imageId: images[i].id, url: images[i].url, localPath: filePath })
    }
    writeManifest(MANIFEST_PATH, manifest)
    await sleep(3000)
  } else {
    console.log(`  ✓ Start frames already done (${slide.state.startFrames.length})`)
  }

  // ── Step 3: KF1 (~30% built, strength=MID) ───────────────────────────────
  if (slide.state.kf1Frames.length === 0) {
    console.log(`  🎨 Generating KF1 (~30% detail)…`)
    const genId = await generateImg2Img(uploadedId, slide.prompts.kf1, 'MID', dims, 4, NO_TEXT)
    console.log('  ⏳ Waiting for KF1…')
    const images = await pollGeneration(genId, 6000, 300000)
    const outDir = path.join(BG_DIR, 'keyframes', `slide${id}`, 'kf1')
    for (let i = 0; i < images.length; i++) {
      const ext = guessExt(images[i].url)
      const filePath = path.join(outDir, `v${i + 1}.${ext}`)
      await downloadToFile(images[i].url, filePath)
      slide.state.kf1Frames.push({ generationId: genId, imageId: images[i].id, url: images[i].url, localPath: filePath })
    }
    writeManifest(MANIFEST_PATH, manifest)
    await sleep(3000)
  } else {
    console.log(`  ✓ KF1 frames already done (${slide.state.kf1Frames.length})`)
  }

  // ── Step 4: KF2 (~65% built, strength=HIGH) ──────────────────────────────
  if (slide.state.kf2Frames.length === 0) {
    console.log(`  🎨 Generating KF2 (~65% detail)…`)
    const genId = await generateImg2Img(uploadedId, slide.prompts.kf2, 'HIGH', dims, 4, NO_TEXT)
    console.log('  ⏳ Waiting for KF2…')
    const images = await pollGeneration(genId, 6000, 300000)
    const outDir = path.join(BG_DIR, 'keyframes', `slide${id}`, 'kf2')
    for (let i = 0; i < images.length; i++) {
      const ext = guessExt(images[i].url)
      const filePath = path.join(outDir, `v${i + 1}.${ext}`)
      await downloadToFile(images[i].url, filePath)
      slide.state.kf2Frames.push({ generationId: genId, imageId: images[i].id, url: images[i].url, localPath: filePath })
    }
    writeManifest(MANIFEST_PATH, manifest)
    await sleep(3000)
  } else {
    console.log(`  ✓ KF2 frames already done (${slide.state.kf2Frames.length})`)
  }

  console.log(`  ✅ Slide ${id} keyframes complete`)
}

async function main() {
  const apiKey = process.env.LEONARDO_API_KEY
  if (!apiKey) throw new Error('LEONARDO_API_KEY not found in environment')
  setApiKey(apiKey)

  const manifest = readManifest(MANIFEST_PATH)
  const args = process.argv.slice(2)
  const slides = args.length > 0 ? args : IMAGE_SLIDES

  console.log(`\n🚀 Keyframe pipeline — processing slides: ${slides.join(', ')}\n`)

  for (const id of slides) {
    const slide = manifest.slides[id]
    if (!slide) { console.warn(`Slide ${id} not found, skipping`); continue }
    if (!slide.originalBlobUrl) {
      console.log(`⏭  Slide ${id} has no originalBlobUrl — run generate-textbg.js first, then approve a newImage`)
      continue
    }
    console.log(`\n━━━ Slide ${id} — ${slide.name} ${'━'.repeat(30)}`)
    try {
      await processSlide(manifest, id)
    } catch (err) {
      console.error(`❌ Slide ${id} failed: ${err.message}`)
      writeManifest(MANIFEST_PATH, manifest)
    }
    // Pause between slides
    if (slides.indexOf(id) < slides.length - 1) {
      console.log('\n⏸  5s cooldown before next slide…')
      await sleep(5000)
    }
  }

  console.log('\n\n✅ Keyframe generation complete. Review images then run generate-videos.js')
}

function extFromUrl(url) {
  if (!url) return '.jpg'
  const base = url.split('?')[0]
  const ext = base.split('.').pop().toLowerCase()
  return '.' + (ext === 'jpeg' ? 'jpg' : ext)
}

function guessExt(url) {
  const base = (url || '').split('?')[0].toLowerCase()
  if (base.endsWith('.png')) return 'png'
  if (base.endsWith('.webp')) return 'webp'
  return 'jpg'
}

main().catch(err => { console.error('\n❌ Fatal:', err.message); process.exit(1) })
