/**
 * Generate new background image for Slide 03.
 * Slide 3 currently has an image the user dislikes (image5 — cracked grey website + 3D glowing corridor).
 * New image: split-screen — flat boring 2D website (left) vs immersive 3D Letiverse venue tour (right).
 * Generates 4 variations using Nano Banana 2 text-to-image.
 * Saves locally to backgrounds/startframes/slide03/ for user review.
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
} from './lib/leonardo.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '../../..')
const BG_DIR = path.resolve(__dirname, '..')
const MANIFEST_PATH = path.join(BG_DIR, 'manifest.json')

async function main() {
  const apiKey = process.env.LEONARDO_API_KEY
  if (!apiKey) throw new Error('LEONARDO_API_KEY not found in environment')
  setApiKey(apiKey)

  const manifest = readManifest(MANIFEST_PATH)
  const slide = manifest.slides['03']
  const dims = slide.dimensions

  console.log('\n🎨 Generating new Slide 03 background (4 variations)…')
  console.log(`   Prompt: ${slide.prompts.new_image.slice(0, 80)}…\n`)

  const genId = await generateText2Img(slide.prompts.new_image, dims, 4)

  console.log('\n⏳ Waiting for generation to complete…')
  const images = await pollGeneration(genId, 6000, 300000)

  const outDir = path.join(BG_DIR, 'startframes', 'slide03-new')
  for (let i = 0; i < images.length; i++) {
    const ext = images[i].url.includes('.png') ? 'png' : 'jpg'
    const filePath = path.join(outDir, `v${i + 1}.${ext}`)
    await downloadToFile(images[i].url, filePath)
    slide.state.newImages.push({ generationId: genId, imageId: images[i].id, url: images[i].url, localPath: filePath })
  }

  writeManifest(MANIFEST_PATH, manifest)
  console.log(`\n✅ Done — ${images.length} Slide 03 variations saved to:\n   ${outDir}`)
}

main().catch(err => { console.error('\n❌', err.message); process.exit(1) })
