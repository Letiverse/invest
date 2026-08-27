# Letiverse AI — Investment Deck

Interactive investor pitch deck for Letiverse AI. Built with **Next.js 16 App Router**, **React 19**, and **TypeScript**, deployed on Vercel at **[invest.letiverse.co.uk](https://invest.letiverse.co.uk)**.

This repository powers the investor-facing deck for the Letiverse AI raise: product story, market thesis, traction, financial overview, investment calculator, risk/moat narrative, and CTA flow across desktop and mobile.

> **Investor-data note:** figures below come from the repository source of truth in `lib/dealTerms.ts` (live round) and the cap table (company-wide holdings). Reconcile against the company register, signed subscriptions, and legal cap table before external circulation.

---

## Current raise snapshot

The figures the live deck shows for the **open round only** (£995,000 / 19,900 shares). This is separate from the full company cap table below.

| Term | Current value |
|---|---:|
| Total raise | **£995,000** |
| Share price | **£50** |
| Minimum investment | **£1,000** |
| Total round shares | **19,900** |
| Shares remaining | **7,039** |
| Shares sold this round | **12,861** |
| Raised so far | **£643,050** |
| Amount remaining | **£351,950** |
| Round progress | **64.63%** |
| Figures dated | **27 August 2026** |
| Round close | **18 October 2026, 23:59 UTC** |

Source: `lib/dealTerms.ts`.

## Cap table — current

Full company cap table including all founders and FR1 + FR2 investors. **Total issued shares: 32,961.** This is the whole company, not just the open round above.

| shareholder            | allocated-shares | equity-pct |
| ---------------------- | ---------------- | ---------- |
| Bakerwood Holdings Ltd | 20600            | 62.50%     |
| Lee Xiouris            | 3600             | 10.92%     |
| Liam Wood              | 1616             | 4.90%      |
| Samuel Wood            | 1500             | 4.55%      |
| Daniel Wood            | 1200             | 3.64%      |
| Michael Baker          | 1000             | 3.03%      |
| Ella Atkinson          | 1000             | 3.03%      |
| Kane Jones             | 500              | 1.52%      |
| Daniel Zhelyazkov      | 220              | 0.67%      |
| Marie Carter           | 220              | 0.67%      |
| Spencer Atkinson       | 200              | 0.61%      |
| Oliver Jarvis          | 170              | 0.52%      |
| Paul Rooke Junior      | 150              | 0.46%      |
| Lino Machado           | 110              | 0.33%      |
| Nathaniel Reagon-Welch | 105              | 0.32%      |
| Sam Elliott            | 100              | 0.30%      |
| Gregory Hart           | 100              | 0.30%      |
| Mohammed Hamed         | 100              | 0.30%      |
| Joseph Bosomworth      | 100              | 0.30%      |
| Ross Harrison          | 60               | 0.18%      |
| Vivian Bowhill         | 60               | 0.18%      |
| Ian Bowhill            | 40               | 0.12%      |
| Jack Cummings          | 40               | 0.12%      |
| Nicholas Kent          | 30               | 0.09%      |
| Yiannis Philippou      | 20               | 0.06%      |
| Jake Bowhill           | 20               | 0.06%      |
| Margarita Galvin       | 20               | 0.06%      |
| Christina Tidy         | 20               | 0.06%      |
| Zak Finn               | 20               | 0.06%      |
| Charles Goodsell       | 20               | 0.06%      |
| Sophie Phillippou      | 20               | 0.06%      |
| Total                  | 32961            | 100.00%    |

> Reconcile against Companies House / the internal register before treating as the formal legal cap table.

---

## Product and deck narrative

Letiverse AI is positioned around the move from the flat web to the **spatial web**: immersive, AI-enhanced digital experiences that can host commerce, sponsorship, venue discovery, and live brand engagement.

The deck narrative is organised around:

1. **Vision** — AI and spatial experiences change how users discover and interact online.
2. **Product proof** — award-winning and partner-backed virtual experiences.
3. **Business model** — sponsorship, Holo Connects / holographic technology, and ecommerce-led transactions.
4. **Traction** — confirmed hosts, partner validation, and earned media value.
5. **Financial plan** — 18-month runway, revenue projections, and a route to Series A.
6. **Risk and moat** — exclusive hardware rights, proprietary AI, network effects, first-mover advantage, and venue retention dynamics.

---

## Deck structure

The application currently has **22 slides**. `lib/slides.ts` is the source of truth.

| # | Slug | Title | Theme |
|---:|---|---|---|
| 1 | `hero` | Letiverse AI | Investment opportunity and headline terms |
| 2 | `ai-shift` | AI is here to stay | Market context |
| 3 | `spatial-web` | The web is flat. The world isn't. | Spatial web vision |
| 4 | `best-twin` | Best Digital Twin in the World 2026 | Product proof / award |
| 5 | `charity-tour` | My Shining Star — Charity AI Tour | Product proof / charity use case |
| 6 | `chapter-market` | THE MARKET. | Opportunity chapter |
| 7 | `market-size` | We are at the start of the Growth Era | Market sizing |
| 8 | `backwards-model` | The Backwards Business Model | Strategy / moat |
| 9 | `why-not-charge` | Why Not Charge? | Business model rationale |
| 10 | `chapter-money` | THE MONEY. | Revenue chapter |
| 11 | `revenue-1` | Revenue Model 1 — 50/50 Sponsorship Split | Sponsorship model |
| 12 | `holoconnects` | Revenue Model 2 — UK Exclusive Holo Connects Technology | Hardware / holographic model |
| 13 | `phases` | Phase 1 → Phase 2 | Roadmap |
| 14 | `ecommerce` | The Ecommerce Phase | Transactions |
| 15 | `chapter-proof` | THE PROOF. | Evidence chapter |
| 16 | `hosts` | 14 Confirmed Hosts | Traction / partnerships |
| 17 | `emv` | Earned Media Value | £1,262,141 portfolio EMV |
| 18 | `projections` | 3-Year Revenue Projections | Financial projections |
| 19 | `financials` | Financial Overview | Raise and runway |
| 20 | `calculator` | Investment Calculator | Illustrative return scenarios |
| 21 | `risk-moats` | Risk Mitigation & Defensive Moats | Risk management |
| 22 | `cta` | Join the Letiverse | Investment close |

---

## Dev

```bash
npm run dev          # http://localhost:3000
npm run build        # production build
npm run lint         # ESLint
npm run storybook    # Storybook → http://localhost:6006
npm run test:e2e     # Playwright E2E (requires build or dev server)
```

---

## Structure

```text
app/                  Next.js App Router
  page.tsx            Desktop deck entry
  mobile/             Mobile per-page deck
    layout.tsx        Shared mobile layout (start overlay, narration)
    [slide]/page.tsx  Per-slide server page (22 static routes)
components/
  deck/               Deck engine components (transitions, nav, player)
  slides/             Individual slide components (Slide01_Hero … Slide22)
  three/              R3F 3D background (ParticleField, FloatingOrbs, PostFX)
  ui/                 Shared UI / Magic UI components
hooks/                Custom React hooks
lib/
  slides.ts           SLIDES[] — single source of truth for all 22 slides
  slideComponents.ts  Dynamic imports map for slides 1–22
  registry.ts         Component catalogue (search by tag/slide)
  dealTerms.ts        Fundraising terms and round progress
store/
  deckStore.ts        Zustand store — currentSlide, direction, deckReady, narrationEnabled
e2e/                  Playwright E2E test suites (01–08)
scripts/
  generate-narration.py  Regenerate per-slide MP3s via edge-tts
backgrounds/          Background video generation tooling (separate package)
```

---

## Architecture

### Deck engine

Deck state lives in `store/deckStore.ts` (Zustand). Consume via `hooks/useDeck.ts`:

- `useDeck()` — full state + actions
- `useCurrentSlide()` — cheap slide number subscription
- `useSlideDirection()` — transition axis metadata

`lib/slides.ts` exports `SLIDES: SlideConfig[]` — edit this first when adding or changing slides.

### Mobile

Phones are routed to `/mobile` via `next.config.ts` rewrites (UA detection). Each slide is a static pre-rendered page at `/mobile/[slide]` (1–22). Mobile deck state syncs to the same Zustand store via wrapper components.

In Next.js 16, App Router `params` are promises, so route files must `await params`.

### 3D background

A fixed React Three Fiber `<Canvas>` renders the atmospheric background layer, including `ParticleField`, `FloatingOrbs`, and post-processing effects. Per-slide camera positions come from `lib/slides.ts`.

### Slide transitions

`lib/transitions.ts` maps transition axes to Framer Motion / Motion variants. `SlideTransition` wraps slides with `AnimatePresence mode="wait"`.

---

## Updating fundraising terms

Update `lib/dealTerms.ts` first:

```ts
export const DEAL = {
  sharePrice: 50,
  minInvestment: 1_000,
  totalRaise: 995_000,
  totalShares: 19_900,
  sharesRemaining: 7_039,
  sharesRemainingAsOf: '27 August 2026',
  closeDate: new Date('2026-10-18T23:59:00Z'),
} as const
```

Then verify:

- Hero slide headline terms
- CTA / progress component
- Investment calculator
- Narration text if figures changed
- README cap-table section

---

## Updating slides

1. Update `lib/slides.ts`.
2. Add or edit the matching component in `components/slides/`.
3. Update `lib/slideComponents.ts`.
4. Add assets under `public/slides/slide-NN/` or Vercel Blob mapping.
5. Add or update Storybook coverage where relevant.
6. Run lint, build, and E2E tests.

---

## CI

Every PR runs lint, type-check + build, E2E (desktop + mobile), UX review, Visual QA, and an AI code review. Merge to `main` triggers a Vercel production deploy.

---

## Force a fresh client release

Deploy a new commit — the deck polls `/api/release` and reloads open tabs automatically. To force without a code change: set `NEXT_PUBLIC_RELEASE_VERSION` in Vercel and redeploy.

---

## Risks, compliance, and investor-facing caveats

- The investment calculator is illustrative only.
- Return scenarios depend on dilution, future rounds, liquidation preferences, execution, timing, and fees.
- Cap-table figures in this README are operational and should not replace legal registers or investor subscription records.
- Update this README after any material change to share availability, raise size, close date, or investor allocation.

---

## Maintainer checklist

- [ ] Reconcile latest cap table against legal register
- [ ] Update `lib/dealTerms.ts` with latest shares remaining
- [ ] Update narration if fundraising figures changed
- [ ] Re-run `npm run build`
- [ ] Re-run `npm run test:e2e`
- [ ] Confirm live deck reflects the updated figures
- [ ] Update this README with the new as-of date
