/**
 * Generate new backgrounds for CSS-dark slides (04, 05, 09, 10, 12, 13, 14).
 * These slides have no existing background image — we generate entirely from text.
 * Produces 4 variations per slide using Nano Banana 2 text-to-image.
 * Saves locally to backgrounds/startframes/slide{NN}/ for user review.
 * Updates manifest.json with generation results.
 */
import './lib/env.js'
import path from 'path'
import { fileURLToPath } from 'url'
import {
  setApiKey,
  generateText2Img,
  pollGeneration,
  downloadToFile,
  readManifest,
  writeManifest,
  sleep,
} from './lib/leonardo.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const BG_DIR = path.resolve(__dirname, '..')
const MANIFEST_PATH = path.join(BG_DIR, 'manifest.json')

const CSS_DARK_SLIDES = ['04', '05', '09', '10', '12', '13', '14']

async function main() {
  const apiKey = process.env.LEONARDO_API_KEY
  if (!apiKey) throw new Error('LEONARDO_API_KEY not found in environment')
  setApiKey(apiKey)

  const manifest = readManifest(MANIFEST_PATH)

  for (const id of CSS_DARK_SLIDES) {
    const slide = manifest.slides[id]
    if (!slide) { console.warn(`Slide ${id} not in manifest, skipping`); continue }
    if (slide.state.newImages?.length > 0) {
      console.log(`\n⏭  Slide ${id} (${slide.name}) — already generated, skipping`)
      continue
    }

    console.log(`\n🎨 Slide ${id} — ${slide.name}`)
    console.log(`   Prompt: ${slide.prompts.new_image.slice(0, 80)}…`)

    const genId = await generateText2Img(slide.prompts.new_image, slide.dimensions, 4)

    console.log('\n⏳ Waiting…')
    const images = await pollGeneration(genId, 6000, 300000)

    const outDir = path.join(BG_DIR, 'startframes', `slide${id}`)
    for (let i = 0; i < images.length; i++) {
      const ext = images[i].url.includes('.png') ? 'png' : 'jpg'
      const filePath = path.join(outDir, `v${i + 1}.${ext}`)
      await downloadToFile(images[i].url, filePath)
      if (!slide.state.newImages) slide.state.newImages = []
      slide.state.newImages.push({ generationId: genId, imageId: images[i].id, url: images[i].url, localPath: filePath })
    }

    writeManifest(MANIFEST_PATH, manifest)
    console.log(`  ✓ ${images.length} images saved`)

    // Brief pause between slides to be polite to the API
    if (CSS_DARK_SLIDES.indexOf(id) < CSS_DARK_SLIDES.length - 1) {
      console.log('  ⏸  Pausing 3s before next slide…')
      await sleep(3000)
    }
  }

  console.log('\n✅ All CSS-dark slide backgrounds generated.')
}

main().catch(err => { console.error('\n❌', err.message); process.exit(1) })
