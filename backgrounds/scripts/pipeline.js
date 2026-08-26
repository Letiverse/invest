/**
 * Full pipeline orchestrator — runs all stages in sequence.
 * Steps:
 *   1. generate-slide03.js  — new Slide 3 image (4 variations)
 *   2. generate-textbg.js   — CSS-dark slide backgrounds (04,05,09,10,12,13,14)
 *   3. generate-keyframes.js — strip-back pipeline for image slides (01,02,06-08,11,15-18)
 *
 * Video generation (generate-videos.js) is run separately AFTER the user
 * has reviewed and approved keyframes by setting approved* indices in manifest.json.
 *
 * Usage:
 *   node scripts/pipeline.js          # all stages
 *   node scripts/pipeline.js slide03  # only Slide 3 new image
 *   node scripts/pipeline.js textbg   # only CSS-dark backgrounds
 *   node scripts/pipeline.js frames   # only keyframe strip-back
 *   node scripts/pipeline.js videos   # only videos (after approval)
 */
import { spawnSync } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function run(script, label) {
  console.log(`\n${'═'.repeat(60)}`)
  console.log(`▶  ${label}`)
  console.log('═'.repeat(60))
  const result = spawnSync('node', [path.join(__dirname, script)], {
    stdio: 'inherit',
    env: { ...process.env },
    cwd: path.resolve(__dirname, '../../..'), // repo root (so dotenv finds .env.local)
  })
  if (result.status !== 0) {
    console.error(`\n❌ Stage "${label}" exited with code ${result.status}`)
    process.exit(result.status ?? 1)
  }
}

const stage = process.argv[2]

if (!stage || stage === 'slide03') run('scripts/generate-slide03.js', 'Slide 03 — new image (4 variations)')
if (!stage || stage === 'textbg')  run('scripts/generate-textbg.js',  'CSS-dark slides (04,05,09,10,12,13,14)')
if (!stage || stage === 'frames')  run('scripts/generate-keyframes.js','Keyframe strip-back (01,02,06-08,11,15-18)')
if (stage === 'videos')            run('scripts/generate-videos.js',   'Video generation (Kling 3.0)')

console.log('\n\n🏁 Pipeline complete.')
