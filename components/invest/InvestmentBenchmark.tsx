import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Award,
  Building2,
  CalendarDays,
  Eye,
  Handshake,
  Megaphone,
  Network,
  Repeat2,
  Share2,
  ShoppingBag,
  Users,
} from 'lucide-react'
import {
  benchmarkAssets,
  benchmarkHosts,
  benchmarkMetrics,
} from '@/lib/investmentBenchmark'
import styles from './InvestmentBenchmark.module.css'

const networkNodes = [
  { label: 'HOSTS', icon: Building2, className: styles.nodeVenue },
  { label: 'AUDIENCE', icon: Users, className: styles.nodeAudience },
  { label: 'SPONSORS', icon: Megaphone, className: styles.nodeSponsors },
  { label: 'TRANSACTIONS', icon: ShoppingBag, className: styles.nodeTransactions },
]

const letiverseCommitments = [
  { title: 'Build the Tour', copy: 'Create the interactive venue experience', icon: Network },
  { title: 'Host and operate it', copy: 'Run the platform and visitor experience', icon: Building2 },
  { title: 'Maintain and commercialise', copy: 'Improve the Tour and develop revenue routes', icon: ShoppingBag },
]

const hostCommitments = [
  { title: 'Official social post', copy: 'Share the Tour through the Host’s own channels', icon: Share2 },
  { title: 'Every week', copy: 'Contracted recurring distribution—not a launch campaign', icon: Repeat2 },
  { title: 'For the full term', copy: 'A multi-year partnership with compounding reach', icon: CalendarDays },
]

const networkEffect = [
  { value: '18', label: 'contracted Hosts' },
  { value: 'Weekly', label: 'official distribution' },
  { value: 'Recurring', label: 'audience reach' },
  { value: 'Growing', label: 'commercial inventory' },
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
          <a href="#model">Partnership</a>
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
            Letiverse turns venues into interactive digital experiences. Every Host signs a
            multi-year weekly distribution partnership—creating one growing network of Tours,
            audiences and commercial opportunities.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href="#model">
              See the Host partnership <ArrowDown aria-hidden="true" size={18} />
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

        <div className={styles.networkVisual} role="img" aria-label="Letiverse connects contracted Hosts, audiences, sponsors and transactions">
          <div className={styles.networkLines} aria-hidden="true">
            <svg viewBox="0 0 680 620" preserveAspectRatio="none">
              <path data-motion="signal-path" className={styles.signalPath} d="M95 125 C230 150 260 230 340 310" />
              <path className={styles.signalPath} d="M585 112 C460 150 420 220 340 310" />
              <path className={styles.signalPath} d="M86 510 C220 475 265 400 340 310" />
              <path className={styles.signalPath} d="M600 500 C470 470 420 390 340 310" />
              <circle data-motion="signal-dot" className={styles.signalDot} r="4"><animateMotion dur="4.8s" begin="-0.6s" repeatCount="indefinite" path="M95 125 C230 150 260 230 340 310" /></circle>
              <circle data-motion="signal-dot" className={styles.signalDot} r="4"><animateMotion dur="5.3s" begin="-2.1s" repeatCount="indefinite" path="M585 112 C460 150 420 220 340 310" /></circle>
              <circle data-motion="signal-dot" className={styles.signalDot} r="4"><animateMotion dur="5.1s" begin="-3.2s" repeatCount="indefinite" path="M86 510 C220 475 265 400 340 310" /></circle>
              <circle data-motion="signal-dot" className={styles.signalDot} r="4"><animateMotion dur="4.6s" begin="-1.4s" repeatCount="indefinite" path="M600 500 C470 470 420 390 340 310" /></circle>
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
              <span>LETIVERSE TOUR</span>
              <strong>THE PRODUCT INSIDE THE NETWORK</strong>
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
          <p className={styles.eyebrow}>THE HOST PARTNERSHIP</p>
          <h2>One contract. <span>Weekly distribution.</span></h2>
          <p>
            The Tour is what visitors see. The agreement behind it is what turns individual
            venues into one network.
          </p>
        </div>

        <div className={styles.partnershipDiagram} aria-label="The Letiverse and Host partnership">
          <article className={styles.commitmentPanel}>
            <span className={styles.cardLabel}>LETIVERSE COMMITS</span>
            {letiverseCommitments.map(({ title, copy, icon: Icon }) => (
              <div className={styles.commitmentItem} key={title}>
                <Icon aria-hidden="true" size={20} />
                <div><strong>{title}</strong><span>{copy}</span></div>
              </div>
            ))}
          </article>

          <div className={styles.contractHub}>
            <div data-motion="contract-pulse" className={styles.contractPulse} aria-hidden="true" />
            <Handshake aria-hidden="true" size={30} />
            <span>MULTI-YEAR AGREEMENT</span>
            <strong>One official social post</strong>
            <b>every week</b>
            <small>for the full contract term</small>
          </div>

          <article className={`${styles.commitmentPanel} ${styles.hostCommitmentPanel}`}>
            <span className={styles.cardLabel}>THE HOST COMMITS</span>
            {hostCommitments.map(({ title, copy, icon: Icon }) => (
              <div className={styles.commitmentItem} key={title}>
                <Icon aria-hidden="true" size={20} />
                <div><strong>{title}</strong><span>{copy}</span></div>
              </div>
            ))}
          </article>
        </div>

        <div className={styles.networkDefinition}>
          <div className={styles.definitionLead}>
            <Network aria-hidden="true" size={24} />
            <div><span>WHY IT IS A NETWORK</span><strong>Every contract adds recurring distribution to the same platform.</strong></div>
          </div>
          <div className={styles.networkEffect}>
            {networkEffect.map((item, index) => (
              <div className={styles.effectStep} key={item.label}>
                <div><strong>{item.value}</strong><span>{item.label}</span></div>
                {index < networkEffect.length - 1 && <ArrowRight aria-hidden="true" size={20} />}
              </div>
            ))}
          </div>
        </div>

        <aside className={styles.emvNote}>
          <div>
            <span>MODELLED DISTRIBUTION VALUE</span>
            <strong>18-Host recalculation in progress</strong>
          </div>
          <p>Earned Media Value estimates the contracted social distribution—not cash revenue or contract income.</p>
        </aside>
      </section>

      <section id="proof" className={`${styles.section} ${styles.proofSection}`}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>PROOF TODAY</p>
          <h2>The network already has <span>momentum.</span></h2>
          <p>Independent product recognition, 18 contracted Hosts and engagement that holds attention.</p>
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
            <article className={styles.engagementMetric}>
              <div><Users aria-hidden="true" size={22} /><span>AVERAGE USER TIME</span></div>
              <strong>5+ <small>minutes</small></strong>
              <p>Current reported Tour averages range from 5:00 to 5:35.</p>
            </article>
            <article className={`${styles.engagementMetric} ${styles.viewsMetric}`}>
              <div><Eye aria-hidden="true" size={22} /><span>TOUR VIEWS</span></div>
              <strong>36,423</strong>
              <p>January–August 2026</p>
            </article>
          </div>
        </div>

        <div className={styles.hostHeader}>
          <div>
            <span className={styles.cardLabel}>THE DISTRIBUTION NETWORK</span>
            <h3>18 contracted Hosts. One growing asset.</h3>
          </div>
          <p>Each partnership adds an official audience channel</p>
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
              <small><Share2 aria-hidden="true" size={11} /> Contracted Host</small>
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
