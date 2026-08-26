# Backgrounds — Letiverse Investment Deck

Animated background pipeline. Generates per-slide video backgrounds (looping MP4s) to replace the static images currently used in slide components.

## Workflow

```
Original image (end frame)
       │
       ▼ Nano Banana 2 img2img (strength LOW)   ← low reference weight = prompt dominates = stripped
  Start frame (plain/stripped)
       │
       ▼ Nano Banana 2 img2img (strength MID)   ← moderate adherence to original
  Keyframe 1 (~30% built)
       │
       ▼ Nano Banana 2 img2img (strength HIGH)  ← high adherence = stays close to original
  Keyframe 2 (~65% built)
       │
       ▼ Kling 3.0 (start_frame → end_frame)
  8-second animated video (plain → full)
```

**Strength semantics:** `strength` in `image_reference` controls how closely the output adheres to the reference.
- `LOW` = reference image has minimal influence → prompt drives the output → stripped/plain result
- `HIGH` = reference image has strong influence → output stays close to original

## Folder Structure

```
backgrounds/
├── originals/     # Downloaded blob images (git-ignored)
├── startframes/   # Nano Banana 2 outputs — start frames (git-ignored)
├── keyframes/     # Nano Banana 2 outputs — kf1 / kf2 per slide (git-ignored)
├── videos/        # Kling 2.1 MP4 outputs (git-ignored)
├── scripts/       # Generation scripts (committed)
├── prompts/       # Per-slide prompt config (committed)
└── manifest.json  # State tracking (committed, updated by scripts)
```

## Setup

```bash
# Install dependencies
cd backgrounds && npm install

# Add your key to .env.local in repo root
# LEONARDO_API_KEY=la-...

# Run full pipeline
node scripts/pipeline.js
```

## Models

| Purpose | Model | Notes |
|---|---|---|
| Strip-back img2img | `nano-banana-2` | Gemini 3.1 Flash Image; strength LOW/MID/HIGH |
| Frame interpolation | Kling 2.1 via WF55 | 3× Frameflow clips → concat |
| Quick animate (fallback) | Kling 2.1 via WF41 | Single image → auto-motion |

## Slides

| Slide | Type | Original image | Strategy |
|---|---|---|---|
| 01 Hero | full-bg | image2 | strip-back atmospheric |
| 02 AI Shift | full-bg | image4 | strip-back landscape |
| 03 Spatial Web | full-bg | image5 (NEW) | strip-back split-screen |
| 04 Best Twin | css-dark | — | generate dark tech bg |
| 05 Charity | css-dark | — | generate community bg |
| 06 Market Size | full-bg | image9 | strip-back chart reveal |
| 07 Backwards Model | full-bg | image10 | strip-back chart reveal |
| 08 Benefits | half-bg | image11 | animate right-panel |
| 09 Revenue 1 | css-dark | — | generate sponsor grid bg |
| 10 Holoconnects | css-dark | — | generate tech mesh bg |
| 11 Phases | full-bg | image21 | strip-back stadium |
| 12 Ecommerce | css-dark | — | generate shop bg |
| 13 Hosts | css-dark | — | generate host grid bg |
| 14 EMV | css-dark | — | generate data viz bg |
| 15 Projections | full-bg | image43 | strip-back chart reveal |
| 16 Financials | full-bg | image44 | strip-back chart reveal |
| 17 Risk | full-bg | image45 | strip-back map/data |
| 18 CTA | full-bg | image46 | strip-back hero reveal |
