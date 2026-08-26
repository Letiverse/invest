/**
 * Generate stripped start frames for css-dark-generate slides.
 *
 * These slides have `newImages[]` = the rich atmospheric end backgrounds.
 * We run Nano Banana 2 img2img (LOW strength) on the approved newImage to
 * produce a stripped / plain version — this becomes the START frame for video.
 *
 * After this script completes, generate-videos.js can correctly animate:
 *   stripped start frame  →  rich newImage end frame
 *
 * Slides handled: 04, 05, 09, 10, 12, 13, 14
 * (Slide 03 is text-to-image-replace — ambient motion only, no end frame needed)
 *
 * Usage:
 *   node scripts/generate-dark-startframes.js          — all css-dark slides
 *   node scripts/generate-dark-startframes.js 04 05    — specific slides
 */
import './lib/env.js'
import path from 'path'
import { fileURLToPath } from 'url'
import {
  setApiKey,
  uploadImageFromPath,
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

// css-dark slides that need stripped start frames (slide 03 excluded — ambient-only)
const DARK_SLIDES = ['04', '05', '09', '10', '12', '13', '14']

const NO_TEXT = 'text, words, letters, numbers, labels, captions, titles, headings, watermarks, typography, writing, annotations, logos, charts with text, axis labels, table headers, signage'

async function processSlide(manifest, id) {
  const slide = manifest.slides[id]
  if (slide.bgType !== 'css-dark-generate') {
    console.log(`  ⏭  Slide ${id} is not css-dark-generate (${slide.bgType}) — skipping`)
    return
  }

  const newImages = slide.state?.newImages ?? []
  const approvedIdx = slide.state?.approvedStart ?? 0
  const endImage = newImages[approvedIdx] ?? newImages[0]
  if (!endImage?.localPath) {
    console.log(`  ⚠  No approved newImage for slide ${id} — run generate-textbg.js first`)
    return
  }

  const dims = slide.dimensions

  // ── Step 1: Upload the approved newImage as the Leonardo reference (end frame) ──
  if (!slide.state.uploadedImageId) {
    console.log(`  📤 Uploading approved newImage (end frame) for Slide ${id}…`)
    const imageId = await uploadImageFromPath(endImage.localPath)
    slide.state.uploadedImageId = imageId
    writeManifest(MANIFEST_PATH, manifest)
    await sleep(2000)
  } else {
    console.log(`  ✓ End frame already uploaded: ${slide.state.uploadedImageId}`)
  }

  const uploadedId = slide.state.uploadedImageId

  // ── Step 2: Generate stripped start frames (Nano Banana 2, LOW strength) ──────
  if ((slide.state.startFrames ?? []).length === 0) {
    if (!slide.state.startFrames) slide.state.startFrames = []
    console.log(`  🎨 Generating stripped start frames (Nano Banana 2, LOW)…`)
    const genId = await generateImg2Img(uploadedId, slide.prompts.strip, 'LOW', dims, 4, NO_TEXT)
    console.log('  ⏳ Waiting for start frames…')
    const images = await pollGeneration(genId, 6000, 300000)

    const outDir = path.join(BG_DIR, 'startframes', `slide${id}`, 'stripped')
    for (let i = 0; i < images.length; i++) {
      const filePath = path.join(outDir, `v${i + 1}.jpg`)
      await downloadToFile(images[i].url, filePath)
      slide.state.startFrames.push({
        generationId: genId,
        imageId: images[i].id,
        url: images[i].url,
        localPath: filePath,
      })
    }
    writeManifest(MANIFEST_PATH, manifest)
    console.log(`  ✅ ${images.length} stripped start frames saved`)
  } else {
    console.log(`  ✓ Start frames already done (${slide.state.startFrames.length})`)
  }
}

async function main() {
  const apiKey = process.env.LEONARDO_API_KEY
  if (!apiKey) throw new Error('LEONARDO_API_KEY not found in environment')
  setApiKey(apiKey)

  const manifest = readManifest(MANIFEST_PATH)
  const args = process.argv.slice(2)
  const slides = args.length > 0 ? args : DARK_SLIDES

  console.log(`\n🎨 Dark start-frame pipeline — slides: ${slides.join(', ')}\n`)

  for (let i = 0; i < slides.length; i++) {
    const id = slides[i]
    const slide = manifest.slides?.[id]
    if (!slide) { console.warn(`Slide ${id} not in manifest — skipping`); continue }

    console.log(`\n━━━ Slide ${id} — ${slide.name} ${'━'.repeat(35)}`)
    try {
      await processSlide(manifest, id)
    } catch (err) {
      console.error(`❌ Slide ${id} failed: ${err.message}`)
      writeManifest(MANIFEST_PATH, manifest)
    }

    if (i < slides.length - 1) {
      console.log('\n⏸  5s cooldown…')
      await sleep(5000)
    }
  }

  console.log('\n\n✅ All start frames generated. Now run generate-videos.js for css-dark slides.')
}

main().catch(err => { console.error('\n❌ Fatal:', err.message); process.exit(1) })
