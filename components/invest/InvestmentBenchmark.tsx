import {
  ArrowDown,
  ArrowUpRight,
  Award,
  Building2,
  CircleDot,
  Clock3,
  Eye,
  Handshake,
  Megaphone,
  Network,
  Share2,
  ShoppingBag,
  Users,
} from 'lucide-react'
import {
  benchmarkAssets,
  benchmarkHosts,
  benchmarkMetrics,
  engagementMetrics,
} from '@/lib/investmentBenchmark'
import styles from './InvestmentBenchmark.module.css'

const networkNodes = [
  { label: 'VENUES', icon: Building2, className: styles.nodeVenue },
  { label: 'AUDIENCE', icon: Users, className: styles.nodeAudience },
  { label: 'SPONSORS', icon: Megaphone, className: styles.nodeSponsors },
  { label: 'TRANSACTIONS', icon: ShoppingBag, className: styles.nodeTransactions },
]

const modelSteps = [
  { number: '01', title: 'Letiverse', copy: 'Builds and operates the Tour', icon: Network },
  { number: '02', title: 'Host', copy: 'Signs a long-term agreement', icon: Handshake },
  { number: '03', title: 'Distribution', copy: 'Shares through official channels', icon: Share2 },
  { number: '04', title: 'Audience', copy: 'Enters and explores', icon: Users },
  { number: '05', title: 'Network value', copy: 'Sponsors and transactions', icon: CircleDot },
]

function BrandMark() {
  return (
    <a className={styles.brand} href="#top" aria-label="Letiverse investment home">
      <img src={benchmarkAssets.letiverseLogo} alt="" width={38} height={38} />
      <span>LETIVERSE</span>
    </a>
  )
}

export function InvestmentBenchmark() {
  return (
    <main id="deck-main" className={styles.page}>
      <header className={styles.header}>
        <BrandMark />
        <nav className={styles.nav} aria-label="Investment story">
          <a href="#network">Network</a>
          <a href="#model">Model</a>
          <a href="#proof">Proof</a>
        </nav>
        <a className={styles.headerAction} href="#next">
          Full case <ArrowDown aria-hidden="true" size={15} />
        </a>
      </header>

      <section id="network" className={`${styles.section} ${styles.heroSection}`}>
        <div className={styles.gridTexture} aria-hidden="true" />
        <div className={styles.heroGlow} aria-hidden="true" />

        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>LETIVERSE · INVESTMENT OPPORTUNITY</p>
          <h1>
            The digital network for<br />
            <span>real-world venues.</span>
          </h1>
          <p className={styles.heroLead}>
            We build and operate award-winning interactive Tours. Every Host adds a venue,
            an audience and new ways to earn.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href="#model">
              See how the network works <ArrowDown aria-hidden="true" size={18} />
            </a>
            <a
              className={styles.secondaryButton}
              href={benchmarkAssets.tourPreviewUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Enter the winning Tour <ArrowUpRight aria-hidden="true" size={18} />
            </a>
          </div>
        </div>

        <div className={styles.networkVisual} role="img" aria-label="Letiverse connects venues, audiences, sponsors and transactions">
          <div className={styles.networkLines} aria-hidden="true">
            <svg viewBox="0 0 680 620" preserveAspectRatio="none">
              <path d="M95 125 C230 150 260 230 340 310" />
              <path d="M585 112 C460 150 420 220 340 310" />
              <path d="M86 510 C220 475 265 400 340 310" />
              <path d="M600 500 C470 470 420 390 340 310" />
            </svg>
          </div>

          <div className={styles.tourFrame}>
            <img
              src={benchmarkAssets.shipInnTour}
              alt="The Ship Inn Letiverse Tour preview"
              width={920}
              height={600}
              fetchPriority="high"
            />
            <div className={styles.tourOverlay}>
              <span>THE SHIP INN</span>
              <strong>AWARD-WINNING FIRST TOUR</strong>
            </div>
          </div>

          <img
            className={styles.awardBadge}
            src={benchmarkAssets.awardWinner}
            alt="Digital Twin Awards winner 2026"
            width={230}
            height={120}
          />

          {networkNodes.map(({ label, icon: Icon, className }) => (
            <div key={label} className={`${styles.networkNode} ${className}`}>
              <Icon aria-hidden="true" size={18} />
              <span>{label}</span>
            </div>
          ))}
        </div>

        <div className={styles.metricRail} aria-label="Current Letiverse proof points">
          {benchmarkMetrics.map((metric) => (
            <div className={styles.heroMetric} key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
              <small>{metric.detail}</small>
            </div>
          ))}
        </div>
      </section>

      <section id="model" className={`${styles.section} ${styles.modelSection}`}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>THE MODEL</p>
          <h2>We build it. <span>Hosts grow it.</span></h2>
          <p>
            Letiverse removes the cost, time and technical burden. Hosts commit long term
            and repeatedly bring their audiences.
          </p>
        </div>

        <ol className={styles.modelFlow} aria-label="How the Letiverse network works">
          {modelSteps.map(({ number, title, copy, icon: Icon }, index) => (
            <li key={title} className={styles.modelStep}>
              <div className={styles.stepTopline}>
                <span>{number}</span>
                <Icon aria-hidden="true" size={20} />
              </div>
              <strong>{title}</strong>
              <p>{copy}</p>
              {index < modelSteps.length - 1 && <ArrowUpRight className={styles.stepArrow} aria-hidden="true" size={20} />}
            </li>
          ))}
        </ol>

        <div className={styles.exchangeGrid}>
          <article className={styles.exchangeCard}>
            <span className={styles.cardLabel}>HOSTS RECEIVE</span>
            <div className={styles.exchangeItem}><strong>£0</strong><span>build cost</span></div>
            <div className={styles.exchangeItem}><strong>100%</strong><span>managed delivery</span></div>
            <div className={styles.exchangeItem}><strong>Shared</strong><span>commercial value</span></div>
          </article>

          <div className={styles.exchangeCore} aria-hidden="true">
            <span>VALUE</span>
            <Share2 size={24} />
            <span>EXCHANGE</span>
          </div>

          <article className={styles.exchangeCard}>
            <span className={styles.cardLabel}>LETIVERSE RECEIVES</span>
            <div className={styles.exchangeItem}><strong>Long-term</strong><span>network supply</span></div>
            <div className={styles.exchangeItem}><strong>Recurring</strong><span>Host distribution</span></div>
            <div className={styles.exchangeItem}><strong>Growing</strong><span>commercial inventory</span></div>
          </article>
        </div>

        <aside className={styles.emvNote}>
          <div>
            <span>MODELLED DISTRIBUTION VALUE</span>
            <strong>18-Host recalculation in progress</strong>
          </div>
          <p>Earned Media Value is an estimate of contracted social distribution—not cash revenue or contract income.</p>
        </aside>
      </section>

      <section id="proof" className={`${styles.section} ${styles.proofSection}`}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>PROOF TODAY</p>
          <h2>The network already has <span>momentum.</span></h2>
          <p>Award-winning product quality, 18 Hosts and audiences spending around five minutes inside live Tours.</p>
        </div>

        <div className={styles.proofFeatureGrid}>
          <article className={styles.productProof}>
            <img
              src={benchmarkAssets.shipInnFeature}
              alt="The Ship Inn Letiverse Tour"
              width={1100}
              height={720}
            />
            <div className={styles.productProofShade} />
            <div className={styles.productProofCopy}>
              <span className={styles.cardLabel}>INDEPENDENT PRODUCT PROOF</span>
              <div className={styles.awardTitle}>
                <Award aria-hidden="true" size={30} />
                <div>
                  <strong>Best Digital Twin 2026</strong>
                  <span>The Ship Inn · Letiverse&apos;s first live Tour</span>
                </div>
              </div>
              <a href={benchmarkAssets.tourPreviewUrl} target="_blank" rel="noopener noreferrer">
                Enter the winning Tour <ArrowUpRight aria-hidden="true" size={18} />
              </a>
            </div>
          </article>

          <div className={styles.engagementPanel}>
            <div className={styles.engagementHeadline}>
              <div><Eye aria-hidden="true" size={22} /><span>TOUR ENGAGEMENT</span></div>
              <strong>36,423</strong>
              <p>views · January–August 2026</p>
            </div>
            <div className={styles.engagementList}>
              {engagementMetrics.map((metric) => (
                <article key={metric.name}>
                  <Clock3 aria-hidden="true" size={18} />
                  <div><span>{metric.name}</span><small>{metric.note}</small></div>
                  <strong>{metric.value}</strong>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.hostHeader}>
          <div>
            <span className={styles.cardLabel}>THE NETWORK</span>
            <h3>18 Hosts. One growing asset.</h3>
          </div>
          <p>Sport · charities · venues · creators</p>
        </div>

        <div className={styles.hostGrid} aria-label="Letiverse Hosts">
          {benchmarkHosts.map((host) => (
            <article className={styles.hostCard} key={host.entity}>
              <div className={styles.hostLogo}>
                {host.logo ? (
                  <img src={host.logo} alt="" width={130} height={70} loading="lazy" />
                ) : (
                  <span>CA</span>
                )}
              </div>
              <div className={styles.hostIdentity}>
                <strong>{host.name}</strong>
                <span>{host.category}</span>
              </div>
              <small data-status={host.status}>{host.status}</small>
            </article>
          ))}
        </div>
      </section>

      <section id="next" className={styles.nextSection}>
        <div>
          <p className={styles.eyebrow}>THE FULL INVESTMENT CASE</p>
          <h2>Next: scale, monetisation and <span>why invest now.</span></h2>
        </div>
        <div className={styles.nextCards}>
          <article><span>04</span><strong>18 → 50 → 500</strong><small>Host growth</small></article>
          <article><span>05</span><strong>Sponsor → Shop → Ticket</strong><small>Network revenue</small></article>
          <article><span>06</span><strong>Revenue + use of funds</strong><small>Figures pending</small></article>
        </div>
        <p className={styles.previewNote}>Visual benchmark · Sections 1–3 only · Revenue and use-of-funds data intentionally held pending</p>
      </section>

      <footer className={styles.footer}>
        <BrandMark />
        <p>Investment visual benchmark · Data supplied by Letiverse · 31 August 2026</p>
      </footer>
    </main>
  )
}
