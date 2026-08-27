/**
 * Single source of truth for all fundraising deal terms.
 * Update SHARES_REMAINING as shares are sold during the round.
 */
export const DEAL = {
  sharePrice: 50,           // £ per share
  minInvestment: 1_000,     // £ minimum investment
  totalRaise: 995_000,      // £ total round size (this raise)
  totalShares: 19_900,      // this raise: totalRaise / sharePrice
  sharesRemaining: 7_039,   // ← update this as the round fills
  sharesRemainingAsOf: '27 August 2026',
  closeDate: new Date('2026-10-18T23:59:00Z'),
} as const

export const raisedSoFar = (DEAL.totalShares - DEAL.sharesRemaining) * DEAL.sharePrice
export const amountRemaining = DEAL.sharesRemaining * DEAL.sharePrice
export const progressPct = ((DEAL.totalShares - DEAL.sharesRemaining) / DEAL.totalShares) * 100

/**
 * Illustrative per-share exit prices for the investment calculator.
 * These are hypothetical scenarios only — actual returns depend on
 * dilution, future rounds, liquidation preferences, fees, and timing.
 */
export const EXIT_SCENARIOS = {
  bear: {
    label: 'BEAR CASE',
    exitPerShare: 75,          // 1.5× — conservative, partial exit
    exitValuation: '~£5M',
    description: 'Conservative outlook',
    color: '#EF4444',
    icon: '↓',
  },
  base: {
    label: 'BASE CASE',
    exitPerShare: 250,         // 5× — base revenue projections achieved
    exitValuation: '~£15M',
    description: 'Base projections met',
    color: '#F59E0B',
    icon: '→',
  },
  bull: {
    label: 'BULL CASE',
    exitPerShare: 1_000,       // 20× — £62.25M bull exit from Slide 16
    exitValuation: '£62.25M',
    description: 'Category leader scenario',
    color: '#34E9E2',
    icon: '↑',
  },
} as const
