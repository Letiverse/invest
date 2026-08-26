/**
 * Video generation — 4 models per slide for comparison.
 *
 * Strategy (simple):
 *   Full-bg slides (01,02,06,07,08,11,15,16,17,18):
 *     Use approved start frame → original uploaded end frame.
 *   CSS-dark slides (04,05,09,10,12,13,14):
 *     Use stripped start frame → newImage end frame (run generate-dark-startframes.js first).
 *   Text-to-image-replace slides (03):
 *     Use generated newImage as start, no end frame (ambient motion).
 *
 * 4 video versions per slide — different models for comparison:
 *   A: Kling 3.0         — 1920×1080, 8s
 *   B: Kling O3          — 1920×1080, 6s
 *   C: Seedance 2.0      — auto-size (0×0), 8s
 *   D: Seedance 1.0 Pro  — 1248×704 (720p), 8s
 *
 * All versions: start→end (or start-only for no-end-frame slides).
 * Resumable: skips versions already in manifest.
 *
 * Usage:
 *   node scripts/generate-videos.js          — all 18 slides
 *   node scripts/generate-videos.js 01 02    — specific slides
 */
import './lib/env.js'
import path from 'path'
import { fileURLToPath } from 'url'
import {
  setApiKey,
  uploadImageFromPath,
  generateVideo,
  pollGeneration,
  downloadToFile,
  readManifest,
  writeManifest,
  sleep,
} from './lib/leonardo.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const BG_DIR = path.resolve(__dirname, '..')
const MANIFEST_PATH = path.join(BG_DIR, 'manifest.json')
const ALL_SLIDES = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18']

// Model config — each version uses a different model
// Seedance 2.0: explicit 720p (0×0 auto-size breaks when both start+end frames provided)
// Seedance 1.0 Pro: must use 720p for start/end frame support (1080p disables reference images)
const VIDEO_VERSIONS = [
  { label: 'A', model: 'kling-3.0',        duration: 8, width: 1920, height: 1080 },
  { label: 'B', model: 'kling-video-o-3',   duration: 6, width: 1920, height: 1080 },
  { label: 'C', model: 'seedance-2.0',      duration: 8, width: 1280, height: 720  },
  { label: 'D', model: 'seedance-1.0-pro',  duration: 8, width: 1248, height: 704  },
]

const VIDEO_PROMPT = `smooth cinematic atmospheric reveal, subtle motion, ambient glow, flowing light, no camera shake, seamless motion, no text`

// Kling models — need a longer cooldown between jobs to avoid rate limiting
const KLING_MODELS = new Set(['kling-3.0', 'kling-video-o-3'])

// ── Upload a frame and cache its Leonardo upload ID in the manifest ────────────
async function ensureUploaded(frame) {
  if (frame.videoUploadId) return frame.videoUploadId
  if (!frame.localPath) throw new Error(`Frame has no localPath: ${JSON.stringify(frame)}`)
  const id = await uploadImageFromPath(frame.localPath)
  frame.videoUploadId = id
  return id
}

// ── Process a single slide ─────────────────────────────────────────────────────
async function processSlide(manifest, id) {
  const slide = manifest.slides[id]
  if (!slide.state.videos) slide.state.videos = []
  const outDir = path.join(BG_DIR, 'videos', `slide${id}`)

  let startUploadId, endUploadId

  if (slide.bgType === 'full-bg' || slide.bgType === 'half-bg') {
    const startFrames = slide.state.startFrames ?? []
    const approvedIdx = slide.state.approvedStart ?? 0
    const startFrame = startFrames[approvedIdx] ?? startFrames[0]
    if (!startFrame) { console.log(`  ⚠  No start frame — run generate-keyframes.js first`); return }

    // End frame = the original background (already uploaded to Leonardo during keyframe step)
    endUploadId = slide.state.uploadedImageId
    if (!endUploadId) { console.log(`  ⚠  No uploadedImageId (end frame) for slide ${id}`); return }

    console.log(`  📤 Uploading start frame…`)
    startUploadId = await ensureUploaded(startFrame)
    writeManifest(MANIFEST_PATH, manifest)
  } else if (slide.bgType === 'css-dark-generate') {
    // css-dark slides: stripped start frame → rich newImage as end frame
    const startFrames = slide.state.startFrames ?? []
    const approvedIdx = slide.state.approvedStart ?? 0
    const startFrame = startFrames[approvedIdx] ?? startFrames[0]
    if (!startFrame) {
      console.log(`  ⚠  No start frames for css-dark slide ${id} — run generate-dark-startframes.js first`)
      return
    }
    endUploadId = slide.state.uploadedImageId
    if (!endUploadId) {
      console.log(`  ⚠  No uploadedImageId (end frame) for css-dark slide ${id} — run generate-dark-startframes.js first`)
      return
    }
    console.log(`  📤 Uploading stripped start frame…`)
    startUploadId = await ensureUploaded(startFrame)
    writeManifest(MANIFEST_PATH, manifest)
  } else {
    // text-to-image-replace (slide 03) — ambient motion, no end frame
    const newImages = slide.state.newImages ?? []
    const approvedIdx = slide.state.approvedStart ?? 0
    const img = newImages[approvedIdx] ?? newImages[0]
    if (!img) { console.log(`  ⚠  No newImages for slide ${id}`); return }

    console.log(`  📤 Uploading generated image (ambient motion)…`)
    startUploadId = await ensureUploaded(img)
    endUploadId = null
    writeManifest(MANIFEST_PATH, manifest)
  }

  // Generate one video per model version
  for (const v of VIDEO_VERSIONS) {
    const already = slide.state.videos.find(x => x.label === v.label)
    if (already?.localPath) { console.log(`  ✓ Version ${v.label} (${v.model}) already done`); continue }

    console.log(`  🎬 Version ${v.label} — ${v.model} (${v.duration}s)…`)
    let success = false
    for (let attempt = 1; attempt <= 2 && !success; attempt++) {
      if (attempt > 1) {
        console.log(`  🔄 Retry ${attempt} — waiting 60s before retry…`)
        await sleep(60000)
      }
      try {
        const genId = await generateVideo(
          v.model, startUploadId, endUploadId,
          VIDEO_PROMPT, v.duration, v.width, v.height
        )
        console.log(`  ⏳ Waiting for video (can take 5-15 min)…`)
        const results = await pollGeneration(genId, 15000, 1200000)
        const videoUrl = results[0]?.url
        if (!videoUrl) throw new Error('No video URL in response')
        const filePath = path.join(outDir, `v${v.label}-${v.model}.mp4`)
        await downloadToFile(videoUrl, filePath)
        slide.state.videos.push({
          label: v.label, model: v.model, generationId: genId,
          url: videoUrl, localPath: filePath,
        })
        writeManifest(MANIFEST_PATH, manifest)
        success = true
      } catch (err) {
        console.error(`  ❌ ${v.label} (${v.model}) attempt ${attempt}: ${err.message}`)
      }
    }
    // Longer cooldown after Kling to avoid rate limiting
    await sleep(KLING_MODELS.has(v.model) ? 20000 : 5000)
  }
}

// ── Main ───────────────────────────────────────────────────────────────────────
async function main() {
  const apiKey = process.env.LEONARDO_API_KEY
  if (!apiKey) throw new Error('LEONARDO_API_KEY not found in environment')
  setApiKey(apiKey)

  const manifest = readManifest(MANIFEST_PATH)
  const args = process.argv.slice(2)
  const slides = args.length > 0 ? args : ALL_SLIDES

  console.log(`\n🎬 Video generation — slides: ${slides.join(', ')}`)
  console.log(`   Models: Kling3.0, KlingO3, Seedance2.0, Seedance1.0Pro\n`)

  for (let i = 0; i < slides.length; i++) {
    const id = slides[i]
    const slide = manifest.slides?.[id]
    if (!slide) { console.warn(`Slide ${id} not in manifest — skipping`); continue }

    console.log(`\n━━━ Slide ${id} — ${slide.name} ${'━'.repeat(35)}`)
    try {
      await processSlide(manifest, id)
    } catch (err) {
      console.error(`❌ Slide ${id}: ${err.message}`)
      writeManifest(MANIFEST_PATH, manifest)
    }

    if (i < slides.length - 1) {
      console.log('\n⏸  15s cooldown…')
      await sleep(15000)
    }
  }

  console.log('\n\n✅ Done. Review videos in backgrounds/videos/')
}

main().catch(err => { console.error('\n❌ Fatal:', err.message); process.exit(1) })
