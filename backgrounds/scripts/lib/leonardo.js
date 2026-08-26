/**
 * Leonardo AI API client
 * Handles image upload, img2img / text-to-image generation, polling and download.
 * All functions are async and throw on non-2xx responses.
 */
import fs from 'fs'
import path from 'path'
import https from 'https'

const BASE = 'https://cloud.leonardo.ai'

let _apiKey = null
export function setApiKey(key) { _apiKey = key }
function getKey() {
  if (!_apiKey) throw new Error('LEONARDO_API_KEY not set — call setApiKey(key) first')
  return _apiKey
}

// ─── Low-level fetch helpers ──────────────────────────────────────────────────

async function apiFetch(endpoint, options = {}) {
  const url = endpoint.startsWith('http') ? endpoint : `${BASE}${endpoint}`
  const res = await fetch(url, {
    ...options,
    headers: {
      'Authorization': `Bearer ${getKey()}`,
      'Accept': 'application/json',
      ...options.headers,
    },
  })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`Leonardo API ${res.status} at ${endpoint}: ${body}`)
  }
  return res.json()
}

// ─── Image upload ─────────────────────────────────────────────────────────────

/**
 * Initiate an upload slot with Leonardo.
 * @param {'jpg'|'png'|'webp'} extension
 * @returns {{ id: string, url: string, fields: Record<string,string> }}
 */
async function initUpload(extension = 'jpg') {
  const data = await apiFetch('/api/rest/v1/init-image', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ extension }),
  })
  return data.uploadInitImage
}

/**
 * Upload a Buffer to the GCS presigned URL returned by initUpload.
 */
async function uploadToGCS(uploadInfo, buffer, mimeType) {
  // Leonardo returns `fields` either as an object or a JSON string — handle both
  const fields = typeof uploadInfo.fields === 'string'
    ? JSON.parse(uploadInfo.fields)
    : uploadInfo.fields

  const form = new FormData()
  // GCS presigned POST requires all fields before the file
  for (const [key, val] of Object.entries(fields)) {
    form.append(key, String(val))
  }
  form.append('file', new Blob([buffer], { type: mimeType }))

  const res = await fetch(uploadInfo.url, { method: 'POST', body: form })
  if (!res.ok && res.status !== 204) {
    const body = await res.text().catch(() => '')
    throw new Error(`GCS upload failed: ${res.status} — ${body.slice(0, 300)}`)
  }
}

/**
 * Download a remote URL into a Buffer.
 */
export async function fetchBuffer(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`)
  const ab = await res.arrayBuffer()
  return Buffer.from(ab)
}

/**
 * Upload an image from a URL (e.g. blob storage) to Leonardo.
 * @returns {string} Leonardo imageId
 */
export async function uploadImageFromUrl(imageUrl) {
  const ext = imageUrl.split('?')[0].split('.').pop().toLowerCase()
  const mimeMap = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp' }
  const mimeType = mimeMap[ext] || 'image/jpeg'
  const safeExt = ext === 'jpeg' ? 'jpg' : (mimeMap[ext] ? ext : 'jpg')

  console.log(`  ↓ Downloading ${imageUrl.split('/').pop()}`)
  const buffer = await fetchBuffer(imageUrl)

  console.log(`  ↑ Initiating Leonardo upload (${safeExt})`)
  const uploadInfo = await initUpload(safeExt)

  console.log(`  ↑ Uploading to GCS…`)
  await uploadToGCS(uploadInfo, buffer, mimeType)

  console.log(`  ✓ Uploaded — imageId: ${uploadInfo.id}`)
  return uploadInfo.id
}

/**
 * Upload an image from a local file path to Leonardo.
 * @returns {string} Leonardo imageId
 */
export async function uploadImageFromPath(filePath) {
  const ext = path.extname(filePath).slice(1).toLowerCase()
  const mimeMap = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp' }
  const mimeType = mimeMap[ext] || 'image/jpeg'
  const safeExt = ext === 'jpeg' ? 'jpg' : (mimeMap[ext] ? ext : 'jpg')

  console.log(`  ↑ Uploading ${path.basename(filePath)} to Leonardo…`)
  const buffer = fs.readFileSync(filePath)
  const uploadInfo = await initUpload(safeExt)
  await uploadToGCS(uploadInfo, buffer, mimeType)
  console.log(`  ✓ Uploaded — imageId: ${uploadInfo.id}`)
  return uploadInfo.id
}

// ─── Image generation ─────────────────────────────────────────────────────────

/**
 * Generate images using Nano Banana 2 img2img (strip-back pipeline).
 * @param {string} uploadedImageId  Leonardo image ID to use as reference
 * @param {string} prompt
 * @param {'LOW'|'MID'|'HIGH'} strength  LOW = stripped / HIGH = close to original
 * @param {{ w: number, h: number }} dims  width × height
 * @param {number} quantity  1-4
 * @returns {string} generationId
 */
export async function generateImg2Img(uploadedImageId, prompt, strength, dims, quantity = 4, negativePrompt = '') {
  const params = {
    width: dims.w,
    height: dims.h,
    prompt,
    quantity,
    prompt_enhance: 'OFF',
    guidances: {
      image_reference: [{
        image: { id: uploadedImageId, type: 'UPLOADED' },
        strength,
      }],
    },
  }
  if (negativePrompt) params.negative_prompt = negativePrompt

  const data = await apiFetch('/api/rest/v2/generations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'nano-banana-2', public: false, parameters: params }),
  })
  const genId = data?.generate?.generationId ?? data?.generation?.id ?? data?.generationId ?? data?.id
  if (!genId) throw new Error(`No generationId in response: ${JSON.stringify(data)}`)
  console.log(`  ⚙  Generation started: ${genId} (strength=${strength})`)
  return genId
}

/**
 * Generate images from text prompt only (no reference image).
 * @param {string} prompt
 * @param {{ w: number, h: number }} dims
 * @param {number} quantity  1-4
 * @param {string} model  default: 'nano-banana-2'
 * @returns {string} generationId
 */
export async function generateText2Img(prompt, dims, quantity = 4, model = 'nano-banana-2') {
  const data = await apiFetch('/api/rest/v2/generations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      public: false,
      parameters: {
        width: dims.w,
        height: dims.h,
        prompt,
        quantity,
        prompt_enhance: 'ON',
      },
    }),
  })
  const genId = data?.generate?.generationId ?? data?.generation?.id ?? data?.generationId ?? data?.id
  if (!genId) throw new Error(`No generationId in response: ${JSON.stringify(data)}`)
  console.log(`  ⚙  Generation started: ${genId} (text-to-image, model=${model})`)
  return genId
}

/**
 * Generate a video from start (and optional end) frames.
 * Supports Kling 3.0, Kling O3, Seedance 2.0, Seedance 1.0 Pro.
 *
 * @param {string} model          e.g. 'kling-3.0', 'kling-video-o-3', 'seedance-2.0', 'seedance-1.0-pro'
 * @param {string} startImageId   Leonardo image ID (UPLOADED type)
 * @param {string|null} endImageId  Optional end frame image ID (UPLOADED type)
 * @param {string} prompt
 * @param {number} duration       seconds
 * @param {number} width          output width (0 = auto for Seedance)
 * @param {number} height         output height (0 = auto for Seedance)
 * @returns {string} generationId
 */
export async function generateVideo(model, startImageId, endImageId, prompt, duration = 8, width = 1920, height = 1080) {
  const guidances = {
    start_frame: [{ image: { id: startImageId, type: 'UPLOADED' } }],
  }
  if (endImageId) {
    guidances.end_frame = [{ image: { id: endImageId, type: 'UPLOADED' } }]
  }

  const isSeedance = model.startsWith('seedance')
  const params = {
    prompt,
    duration,
    width,
    height,
    guidances,
    motion_has_audio: false,
    ...(isSeedance ? { prompt_enhance: 'OFF' } : { mode: width >= 1920 ? 'RESOLUTION_1080' : 'RESOLUTION_720' }),
  }

  const data = await apiFetch('/api/rest/v2/generations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model, public: false, parameters: params }),
  })
  const genId = data?.generate?.generationId ?? data?.generation?.id ?? data?.generationId ?? data?.id
  if (!genId) throw new Error(`No generationId in response: ${JSON.stringify(data)}`)
  console.log(`  🎬 ${model} generation started: ${genId}`)
  return genId
}

// ─── Polling ──────────────────────────────────────────────────────────────────

/**
 * Poll a generation until COMPLETE or FAILED.
 * Returns array of { id, url } objects (images) or { url } for video.
 * @param {string} generationId
 * @param {number} intervalMs  polling interval
 * @param {number} timeoutMs   give up after this long
 */
export async function pollGeneration(generationId, intervalMs = 5000, timeoutMs = 600000) {
  const deadline = Date.now() + timeoutMs
  while (Date.now() < deadline) {
    await sleep(intervalMs)
    let data
    try {
      data = await apiFetch(`/api/rest/v1/generations/${generationId}`)
    } catch (e) {
      // Try v2 endpoint as fallback
      data = await apiFetch(`/api/rest/v2/generations/${generationId}`)
    }

    // Unwrap response — handle v1 and v2 shapes
    const gen = data.generations_by_pk ?? data.generation ?? data?.data?.object ?? data
    const status = gen?.status
    if (!status) {
      console.log(`    … waiting (no status yet)`)
      continue
    }
    if (status === 'FAILED' || status === 'ERROR') {
      throw new Error(`Generation ${generationId} failed with status ${status}`)
    }
    if (status === 'COMPLETE') {
      // Images: { generated_images: [{ id, url }] } or { images: [{ id, url }] }
      const images = gen.generated_images ?? gen.images ?? []
      if (images.length > 0) {
        console.log(`  ✓ Complete — ${images.length} result(s)`)
        return images.map(img => ({ id: img.id, url: img.motionMP4URL ?? img.url }))
      }
      // Video might be in a different field
      if (gen.motionMP4URL) return [{ id: gen.id, url: gen.motionMP4URL }]
    }
    process.stdout.write(`    … ${status} `)
  }
  throw new Error(`Generation ${generationId} timed out after ${timeoutMs / 1000}s`)
}

// ─── File download ────────────────────────────────────────────────────────────

/**
 * Download a URL to a local file path.
 */
export async function downloadToFile(url, filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  const buffer = await fetchBuffer(url)
  fs.writeFileSync(filePath, buffer)
  console.log(`  💾 Saved → ${filePath}`)
}

// ─── Utilities ────────────────────────────────────────────────────────────────

export function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

/**
 * Read and parse the manifest.json, returning the slides object.
 */
export function readManifest(manifestPath) {
  return JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
}

/**
 * Write updated manifest back to disk.
 */
export function writeManifest(manifestPath, manifest) {
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n')
}
