// Master EMV calculation — see docs/EMV_MASTER_FORMULA.md for full methodology & sourcing.

import { EMV_PLATFORM_RATES, EMV_FOLLOWER_GROWTH_RATE, EMV_RATE_INFLATION, type EmvPlatform } from './emvRateCard'

export type FollowersByPlatform = Partial<Record<EmvPlatform, number>>

export interface EmvResult {
  /** Total EMV over the full contract term (sum of every year, growth + inflation applied). */
  totalEmv: number
  /** EMV for each individual year of the contract (index 0 = year 1). */
  perYear: number[]
  /** Year-1 total ÷ 52 — the "Blended EMV Per Post" figure shown on the slide. */
  perPostEmv: number
}

/**
 * Calculates Earned Media Value for a host over their contract term.
 *
 * Formula (see docs/EMV_MASTER_FORMULA.md):
 *   Year t value = Σ_platform [ (Followers × (1+growth)^t) / 1000 × (Rate × (1+inflation)^t) × 52 ]
 *   Total EMV    = Σ_t Year t value,  for t = 1..years
 */
export function calculateEmv(followers: FollowersByPlatform, years: number): EmvResult {
  const perYear: number[] = []
  let totalEmv = 0

  for (let t = 1; t <= years; t++) {
    let yearTotal = 0
    for (const [platform, followerCount] of Object.entries(followers) as [EmvPlatform, number][]) {
      const grownFollowers = followerCount * Math.pow(1 + EMV_FOLLOWER_GROWTH_RATE, t)
      const inflatedRate = EMV_PLATFORM_RATES[platform] * Math.pow(1 + EMV_RATE_INFLATION, t)
      const weeklyValue = (grownFollowers / 1000) * inflatedRate
      yearTotal += weeklyValue * 52
    }
    perYear.push(yearTotal)
    totalEmv += yearTotal
  }

  const perPostEmv = perYear.length > 0 ? perYear[0] / 52 : 0

  return { totalEmv, perYear, perPostEmv }
}
