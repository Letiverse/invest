/**
 * Validate generated videos — checks file existence, size, and MP4 header.
 * Run after generate-videos.js completes.
 */
import './lib/env.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { readManifest } from './lib/leonardo.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const BG_DIR = path.resolve(__dirname, '..')
const MANIFEST_PATH = path.join(BG_DIR, 'manifest.json')

const ALL_SLIDES = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18']
const EXPECTED_LABELS = ['A', 'B', 'C', 'D']
const MIN_SIZE_BYTES = 100 * 1024  // 100 KB minimum for a valid MP4

// Check MP4 header — valid MP4s start with ftyp box or have moov atom
function isValidMp4(filePath) {
  try {
    const buf = Buffer.alloc(12)
    const fd = fs.openSync(filePath, 'r')
    fs.readSync(fd, buf, 0, 12, 0)
    fs.closeSync(fd)
    // MP4 ftyp box: bytes 4-7 are 'ftyp', or 'free', 'mdat', 'moov', 'wide'
    const boxType = buf.slice(4, 8).toString('ascii')
    return ['ftyp', 'free', 'mdat', 'moov', 'wide', 'skip'].includes(boxType)
  } catch { return false }
}

function main() {
  const manifest = readManifest(MANIFEST_PATH)

  let totalExpected = 0
  let totalFound = 0
  let totalValid = 0
  const missing = []
  const invalid = []
  const found = []

  console.log('\n🔍 Video validation report\n')
  console.log('Slide  │ A                    │ B                    │ C                    │ D')
  console.log('───────┼──────────────────────┼──────────────────────┼──────────────────────┼──────────────────────')

  for (const id of ALL_SLIDES) {
    const slide = manifest.slides?.[id]
    if (!slide) { console.log(`  ${id}   │ (not in manifest)`); continue }

    const videos = slide.state?.videos ?? []
    const row = [`  ${id}  `]

    for (const label of EXPECTED_LABELS) {
      totalExpected++
      const entry = videos.find(v => v.label === label)
      if (!entry?.localPath) {
        row.push('  ❌ missing           ')
        missing.push(`slide${id}/${label}`)
      } else if (!fs.existsSync(entry.localPath)) {
        row.push('  ❌ file not found    ')
        missing.push(`slide${id}/${label} (path missing)`)
      } else {
        const stat = fs.statSync(entry.localPath)
        const sizeKb = Math.round(stat.size / 1024)
        const valid = stat.size >= MIN_SIZE_BYTES && isValidMp4(entry.localPath)
        totalFound++
        if (valid) {
          totalValid++
          row.push(`  ✅ ${sizeKb}KB (${entry.model.slice(0,10)})`.padEnd(22))
          found.push({ slide: id, label, model: entry.model, sizeKb })
        } else {
          row.push(`  ⚠  ${sizeKb}KB INVALID      `)
          invalid.push(`slide${id}/${label}: ${sizeKb}KB`)
        }
      }
    }

    console.log(row.join(' │ '))
  }

  console.log('\n' + '─'.repeat(100))
  console.log(`\n📊 Summary:`)
  console.log(`   Expected : ${totalExpected} videos (${ALL_SLIDES.length} slides × 4 versions)`)
  console.log(`   Found    : ${totalFound}`)
  console.log(`   Valid    : ${totalValid} ✅`)
  console.log(`   Missing  : ${missing.length}`)
  console.log(`   Invalid  : ${invalid.length}`)

  if (missing.length > 0) {
    console.log(`\n⚠  Missing videos:`)
    missing.forEach(m => console.log(`   - ${m}`))
  }
  if (invalid.length > 0) {
    console.log(`\n⚠  Invalid videos:`)
    invalid.forEach(m => console.log(`   - ${m}`))
  }
  if (missing.length === 0 && invalid.length === 0) {
    console.log('\n🎉 All videos present and valid!')
  }

  // Per-model success rate
  const modelStats = {}
  for (const v of found) {
    if (!modelStats[v.model]) modelStats[v.model] = { ok: 0 }
    modelStats[v.model].ok++
  }
  console.log('\n📈 Per-model success:')
  for (const [model, stats] of Object.entries(modelStats)) {
    console.log(`   ${model}: ${stats.ok}/${ALL_SLIDES.length} slides`)
  }
}

main()
