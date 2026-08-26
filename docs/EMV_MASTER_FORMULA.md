# EMV Master Formula (Locked — 2026-08-26)

This is the **single source of truth** for how Earned Media Value (EMV) is calculated
for every Host on the investor deck (`components/slides/Slide14_EMV.tsx`). Do not
recalculate EMV any other way — use this formula, or the code in `lib/emv.ts` /
`lib/emvRateCard.ts` that implements it.

## The formula

For each platform a host is on, for each year `t` of their contract (t = 1, 2, 3, ...):

```
Year t value =  (Followers today × (1 + 0.10)^t) ÷ 1,000
                × (Platform Rate × (1 + 0.07)^t)
                × 52 weeks
```

Add every platform together to get that year's total, then add every year of the
contract together:

```
Total EMV = Year 1 + Year 2 + ... + Year N   (N = contract length in years)
```

`Per-Post EMV` (shown on the slide) = **Year 1 total ÷ 52** (the value of one week's
worth of cross-platform posting, in year 1 of the contract).

## Inputs

- **Followers today** — latest follower count per platform, from
  `E000-DOC-INT-CSV-RD-master-letiverse-tables.csv`.
- **Follower growth: 10%/year** — UK sports/community social page benchmark.
- **Platform rate inflation: 7%/year** — UK paid-social/sponsored-post cost inflation
  benchmark (sourced from a named 2026 UK industry report, Media Performance UK).
- **Platform Rate** — £ per 1,000 followers, per post, based on real-world
  sponsored-post/shoutout market rates (not ad-CPM theory):

| Platform | £ per 1,000 followers |
|---|---:|
| Facebook | £10 |
| Instagram | £12 |
| TikTok | £15 |
| LinkedIn | £15 |
| X/Twitter | £6 |
| YouTube | £8 |

## Why this formula (not discounting / reach % / CPM ad-buying model)

- Earlier drafts of this methodology used an ad-buying "CPM × reach %" model with
  time-value discounting. That was rejected: EMV values a **real sponsorship-style
  post**, not a paid ad impression, so the right yardstick is what companies actually
  pay for sponsored posts/shoutouts at a given follower count — not ad-impression cost.
- The Facebook rate (£10/1,000) was checked against Bradford Bulls' actual live
  per-post figure (£1,508 for 150,855 followers) and matches almost exactly
  (150,855 ÷ 1,000 × £10 = £1,508.55) — confirming this is consistent with the
  existing, already-approved live numbers, just extended with sourced rates for all
  platforms plus year-on-year growth/inflation.
- Discounting (time-value-of-money) was explicitly dropped from the final formula:
  Host contracts include a penalty clause (deferred cost + 30% margin charged if a
  host stops posting), which removes the compliance risk that discounting would
  otherwise be compensating for. Decision confirmed by Liam, 2026-08-26.

## Old numbers (preserved for reference)

The pre-2026-08-26 hardcoded EMV figures (frozen, no formula, no reach adjustment) are
preserved in `components/slides/Slide14_EMV.ORIGINAL_BACKUP.tsx` — do not delete this
file. It is the last known-good version of the slide before the data-driven refactor,
kept for audit/rollback purposes only (not imported or rendered anywhere).
