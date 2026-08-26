// Master EMV rate card — see docs/EMV_MASTER_FORMULA.md for full methodology & sourcing.
// DO NOT edit these numbers without updating docs/EMV_MASTER_FORMULA.md to match.

export const EMV_PLATFORM_RATES = {
  facebook: 10,
  instagram: 12,
  tiktok: 15,
  linkedin: 15,
  x: 6,
  youtube: 8,
} as const

export type EmvPlatform = keyof typeof EMV_PLATFORM_RATES

export const EMV_FOLLOWER_GROWTH_RATE = 0.10 // 10%/year
export const EMV_RATE_INFLATION = 0.07 // 7%/year
