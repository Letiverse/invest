'use client'
import { motion } from 'motion/react'
import { NumberTicker } from '@/components/ui/number-ticker'
import { SlideFrame } from '@/components/deck/SlideFrame'

export function Slide14_EMV() {
  return (
    <SlideFrame>
      {/* Background */}
      <div style={{ position: "absolute", left: -0.0, top: -8.3, width: 1928.3, height: 1088.3, backgroundColor: "#0A0A1A" }} />
      {/* AccentBar */}
      <motion.div initial={{ height:0 }} animate={{ height:1080 }} transition={{ delay:0.1, duration:0.8, ease:[0.25, 0.46, 0.45, 0.94] }} style={{ position: "absolute", left: 0.0, top: 0.0, width: 30.0, backgroundColor: "#34E9E2" }} />
      {/* MainTitle */}
      <div style={{ position: "absolute", left: 48.0, top: 28.0, width: 1048.0, height: 68.0 }}>
        <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "normal" }}><span style={{ fontSize: "52.0px", fontWeight: 700, color: "#34E9E2" }}>What are the social posts worth?</span></p>
      </div>
      {/* ExplainerBanner */}
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.4 }} style={{ position: "absolute", left: 48.0, top: 100.0, width: 1184.3, height: 128.8, backgroundColor: "rgba(26,26,58,0.250)", border: "2px solid #34E9E2" }}>
        <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "normal" }}><span style={{ fontSize: "24.0px", color: "#FFFFFF" }}>If you hired an agency to get these businesses to post about you on social media — this is what you'd pay. Letiverse receives these shares for free, in exchange for their Letiverse Tour for Free</span></p>
      </motion.div>
      {/* TotalEMVBadge */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, boxShadow: ['0 0 6px rgba(52,233,226,0.3)', '0 0 20px rgba(52,233,226,0.8)', '0 0 6px rgba(52,233,226,0.3)'] }} transition={{ opacity: { delay: 0.5 }, boxShadow: { duration: 2.5, repeat: Infinity, delay: 1 } }} style={{ position: "absolute", left: 1554.4, top: 28.0, width: 308.0, height: 172.0, backgroundColor: "#0D2D2D", border: "2px solid #34E9E2" }}>
        <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", fontWeight: 700, color: "#34E9E2" }}>Total Portfolio EMV</span></p>
        <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "32.0px", fontWeight: 700, color: "#FFFFFF" }}>£<NumberTicker value={1262141} delay={0.6} /></span></p>
      </motion.div>
      {/* Table 8 */}
      <table style={{ position: "absolute", left: 48.0, top: 266.9, width: 1824.0, height: 746.2, borderCollapse: "collapse", tableLayout: "fixed", transform: "scaleX(0.962)", transformOrigin: "left top" }}>
        <tbody>
          <tr style={{ height: 56.0 }}>
            <td style={{ verticalAlign: "middle", width: 672.8, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#0D3333" }}>
              <p style={{ textAlign: "center", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", fontWeight: 700, color: "#34E9E2" }}>Host Name</span></p>
            </td>
            <td style={{ verticalAlign: "middle", width: 367.0, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#0D3333" }}>
              <p style={{ textAlign: "center", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", fontWeight: 700, color: "#34E9E2" }}>Contract Term</span></p>
            </td>
            <td style={{ verticalAlign: "middle", width: 428.1, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#0D3333" }}>
              <p style={{ textAlign: "center", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", fontWeight: 700, color: "#34E9E2" }}>Blended EMV Per Post</span></p>
            </td>
            <td style={{ verticalAlign: "middle", width: 428.1, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#0D3333" }}>
              <p style={{ textAlign: "center", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", fontWeight: 700, color: "#34E9E2" }}>Full Term EMV</span></p>
            </td>
          </tr>
          <motion.tr initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay: 0.6 }} style={{ height: 54.1 }}>
            <td style={{ verticalAlign: "middle", width: 672.8, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#0A0A1A" }}>
              <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", color: "#FFFFFF" }}>Bradford Bulls Rugby</span></p>
            </td>
            {/* TODO: term corrected 10→4 years per updated host list (2026-08-26). EMV/£ figures
                below still reflect the old 10-year term — recalculate once confirmed. */}
            <td style={{ verticalAlign: "middle", width: 367.0, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#0A0A1A" }}>
              <p style={{ textAlign: "center", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", color: "#FFFFFF" }}>4 years</span></p>
            </td>
            <td style={{ verticalAlign: "middle", width: 428.1, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#0A0A1A" }}>
              <p style={{ textAlign: "center", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", color: "#FFFFFF" }}>£1508</span></p>
            </td>
            <td style={{ verticalAlign: "middle", width: 428.1, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#0A0A1A" }}>
              <p style={{ textAlign: "center", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", fontWeight: 700, color: "#34E9E2" }}>£784,461</span></p>
            </td>
          </motion.tr>
          <motion.tr initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay: 0.66 }} style={{ height: 52.5 }}>
            <td style={{ verticalAlign: "middle", width: 672.8, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#111127" }}>
              <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", color: "#FFFFFF" }}>The Ship Inn Gillingham</span></p>
            </td>
            <td style={{ verticalAlign: "middle", width: 367.0, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#111127" }}>
              <p style={{ textAlign: "center", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", color: "#FFFFFF" }}>10 years</span></p>
            </td>
            <td style={{ verticalAlign: "middle", width: 428.1, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#111127" }}>
              <p style={{ textAlign: "center", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", color: "#FFFFFF" }}>£92</span></p>
            </td>
            <td style={{ verticalAlign: "middle", width: 428.1, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#111127" }}>
              <p style={{ textAlign: "center", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", fontWeight: 700, color: "#34E9E2" }}>£47,845</span></p>
            </td>
          </motion.tr>
          <motion.tr initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay: 0.72 }} style={{ height: 48.5 }}>
            <td style={{ verticalAlign: "middle", width: 672.8, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#0A0A1A" }}>
              <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", color: "#FFFFFF" }}>Sittingbourne FC</span></p>
            </td>
            <td style={{ verticalAlign: "middle", width: 367.0, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#0A0A1A" }}>
              <p style={{ textAlign: "center", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", color: "#FFFFFF" }}>10 years</span></p>
            </td>
            <td style={{ verticalAlign: "middle", width: 428.1, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#0A0A1A" }}>
              <p style={{ textAlign: "center", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", color: "#FFFFFF" }}>£104</span></p>
            </td>
            <td style={{ verticalAlign: "middle", width: 428.1, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#0A0A1A" }}>
              <p style={{ textAlign: "center", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", fontWeight: 700, color: "#34E9E2" }}>£54,054</span></p>
            </td>
          </motion.tr>
          <motion.tr initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay: 0.78 }} style={{ height: 50.5 }}>
            <td style={{ verticalAlign: "middle", width: 672.8, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#111127" }}>
              <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", color: "#FFFFFF" }}>Rochester City FC</span></p>
            </td>
            <td style={{ verticalAlign: "middle", width: 367.0, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#111127" }}>
              <p style={{ textAlign: "center", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", color: "#FFFFFF" }}>10 years</span></p>
            </td>
            <td style={{ verticalAlign: "middle", width: 428.1, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#111127" }}>
              <p style={{ textAlign: "center", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", color: "#FFFFFF" }}>£67</span></p>
            </td>
            <td style={{ verticalAlign: "middle", width: 428.1, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#111127" }}>
              <p style={{ textAlign: "center", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", fontWeight: 700, color: "#34E9E2" }}>£34,783</span></p>
            </td>
          </motion.tr>
          <motion.tr initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay: 0.84 }} style={{ height: 48.8 }}>
            <td style={{ verticalAlign: "middle", width: 672.8, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#0A0A1A" }}>
              <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", color: "#FFFFFF" }}>Keenwood Ltd</span></p>
            </td>
            <td style={{ verticalAlign: "middle", width: 367.0, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#0A0A1A" }}>
              <p style={{ textAlign: "center", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", color: "#FFFFFF" }}>10 years</span></p>
            </td>
            <td style={{ verticalAlign: "middle", width: 428.1, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#0A0A1A" }}>
              <p style={{ textAlign: "center", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", color: "#FFFFFF" }}>£5</span></p>
            </td>
            <td style={{ verticalAlign: "middle", width: 428.1, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#0A0A1A" }}>
              <p style={{ textAlign: "center", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", fontWeight: 700, color: "#34E9E2" }}>£2,522</span></p>
            </td>
          </motion.tr>
          <motion.tr initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay: 0.9 }} style={{ height: 49.6 }}>
            <td style={{ verticalAlign: "middle", width: 672.8, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#111127" }}>
              <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", color: "#FFFFFF" }}>Funding Unlocked Ltd</span></p>
            </td>
            <td style={{ verticalAlign: "middle", width: 367.0, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#111127" }}>
              <p style={{ textAlign: "center", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", color: "#FFFFFF" }}>10 years</span></p>
            </td>
            <td style={{ verticalAlign: "middle", width: 428.1, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#111127" }}>
              <p style={{ textAlign: "center", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", color: "#FFFFFF" }}>£26</span></p>
            </td>
            <td style={{ verticalAlign: "middle", width: 428.1, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#111127" }}>
              <p style={{ textAlign: "center", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", fontWeight: 700, color: "#34E9E2" }}>£13,499</span></p>
            </td>
          </motion.tr>
          <motion.tr initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay: 0.96 }} style={{ height: 50.4 }}>
            <td style={{ verticalAlign: "middle", width: 672.8, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#0A0A1A" }}>
              <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", color: "#FFFFFF" }}>My Shining Star Charity</span></p>
            </td>
            <td style={{ verticalAlign: "middle", width: 367.0, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#0A0A1A" }}>
              <p style={{ textAlign: "center", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", color: "#FFFFFF" }}>10 years</span></p>
            </td>
            <td style={{ verticalAlign: "middle", width: 428.1, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#0A0A1A" }}>
              <p style={{ textAlign: "center", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", color: "#FFFFFF" }}>£247</span></p>
            </td>
            <td style={{ verticalAlign: "middle", width: 428.1, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#0A0A1A" }}>
              <p style={{ textAlign: "center", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", fontWeight: 700, color: "#34E9E2" }}>£128,695</span></p>
            </td>
          </motion.tr>
          <motion.tr initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay: 1.02 }} style={{ height: 51.2 }}>
            <td style={{ verticalAlign: "middle", width: 672.8, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#111127" }}>
              <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", color: "#FFFFFF" }}>West Kent Shooting School</span></p>
            </td>
            <td style={{ verticalAlign: "middle", width: 367.0, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#111127" }}>
              <p style={{ textAlign: "center", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", color: "#FFFFFF" }}>6 years</span></p>
            </td>
            <td style={{ verticalAlign: "middle", width: 428.1, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#111127" }}>
              <p style={{ textAlign: "center", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", color: "#FFFFFF" }}>£61</span></p>
            </td>
            <td style={{ verticalAlign: "middle", width: 428.1, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#111127" }}>
              <p style={{ textAlign: "center", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", fontWeight: 700, color: "#34E9E2" }}>£19,163</span></p>
            </td>
          </motion.tr>
          <motion.tr initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay: 1.08 }} style={{ height: 47.2 }}>
            <td style={{ verticalAlign: "middle", width: 672.8, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#0A0A1A" }}>
              <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", color: "#FFFFFF" }}>The Ridge Golf Club</span></p>
            </td>
            <td style={{ verticalAlign: "middle", width: 367.0, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#0A0A1A" }}>
              <p style={{ textAlign: "center", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", color: "#FFFFFF" }}>5 years</span></p>
            </td>
            <td style={{ verticalAlign: "middle", width: 428.1, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#0A0A1A" }}>
              <p style={{ textAlign: "center", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", color: "#FFFFFF" }}>£75</span></p>
            </td>
            <td style={{ verticalAlign: "middle", width: 428.1, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#0A0A1A" }}>
              <p style={{ textAlign: "center", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", fontWeight: 700, color: "#34E9E2" }}>£19,443</span></p>
            </td>
          </motion.tr>
          <motion.tr initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay: 1.14 }} style={{ height: 45.6 }}>
            <td style={{ verticalAlign: "middle", width: 672.8, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#111127" }}>
              <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", color: "#FFFFFF" }}>Safe Haven Animal Rescue</span></p>
            </td>
            <td style={{ verticalAlign: "middle", width: 367.0, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#111127" }}>
              <p style={{ textAlign: "center", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", color: "#FFFFFF" }}>5 years</span></p>
            </td>
            <td style={{ verticalAlign: "middle", width: 428.1, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#111127" }}>
              <p style={{ textAlign: "center", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", color: "#FFFFFF" }}>£182</span></p>
            </td>
            <td style={{ verticalAlign: "middle", width: 428.1, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#111127" }}>
              <p style={{ textAlign: "center", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", fontWeight: 700, color: "#34E9E2" }}>£47,294</span></p>
            </td>
          </motion.tr>
          <motion.tr initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay: 1.2 }} style={{ height: 46.4 }}>
            <td style={{ verticalAlign: "middle", width: 672.8, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#0A0A1A" }}>
              <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", color: "#FFFFFF" }}>Calypso Cricket (Batzone)</span></p>
            </td>
            <td style={{ verticalAlign: "middle", width: 367.0, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#0A0A1A" }}>
              <p style={{ textAlign: "center", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", color: "#FFFFFF" }}>4 years</span></p>
            </td>
            <td style={{ verticalAlign: "middle", width: 428.1, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#0A0A1A" }}>
              <p style={{ textAlign: "center", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", color: "#FFFFFF" }}>£316</span></p>
            </td>
            <td style={{ verticalAlign: "middle", width: 428.1, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#0A0A1A" }}>
              <p style={{ textAlign: "center", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", fontWeight: 700, color: "#34E9E2" }}>£65,684</span></p>
            </td>
          </motion.tr>
          <motion.tr initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay: 1.26 }} style={{ height: 49.6 }}>
            <td style={{ verticalAlign: "middle", width: 672.8, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#111127" }}>
              <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", color: "#FFFFFF" }}>Hawkinge Cricket &amp; Social Club</span></p>
            </td>
            <td style={{ verticalAlign: "middle", width: 367.0, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#111127" }}>
              <p style={{ textAlign: "center", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", color: "#FFFFFF" }}>4 years</span></p>
            </td>
            <td style={{ verticalAlign: "middle", width: 428.1, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#111127" }}>
              <p style={{ textAlign: "center", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", color: "#FFFFFF" }}>£95</span></p>
            </td>
            <td style={{ verticalAlign: "middle", width: 428.1, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#111127" }}>
              <p style={{ textAlign: "center", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", fontWeight: 700, color: "#34E9E2" }}>£19,862</span></p>
            </td>
          </motion.tr>
          <motion.tr initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay: 1.32 }} style={{ height: 50.8 }}>
            <td style={{ verticalAlign: "middle", width: 672.8, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#0A0A1A" }}>
              <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", color: "#FFFFFF" }}>Tonbridge Golf Centre</span></p>
            </td>
            <td style={{ verticalAlign: "middle", width: 367.0, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#0A0A1A" }}>
              <p style={{ textAlign: "center", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", color: "#FFFFFF" }}>4 years</span></p>
            </td>
            <td style={{ verticalAlign: "middle", width: 428.1, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#0A0A1A" }}>
              <p style={{ textAlign: "center", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", color: "#FFFFFF" }}>£30</span></p>
            </td>
            <td style={{ verticalAlign: "middle", width: 428.1, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#0A0A1A" }}>
              <p style={{ textAlign: "center", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", fontWeight: 700, color: "#34E9E2" }}>£6,324</span></p>
            </td>
          </motion.tr>
          <motion.tr initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay: 1.38 }} style={{ height: 45.1 }}>
            <td style={{ verticalAlign: "middle", width: 672.8, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#0A0A1A" }}>
              <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", color: "#FFFFFF" }}>Soar Trampoline Park</span></p>
            </td>
            <td style={{ verticalAlign: "middle", width: 367.0, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#0A0A1A" }}>
              <p style={{ textAlign: "center", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", color: "#FFFFFF" }}>4 years</span></p>
            </td>
            <td style={{ verticalAlign: "middle", width: 428.1, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#0A0A1A" }}>
              <p style={{ textAlign: "center", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", color: "#FFFFFF" }}>£89</span></p>
            </td>
            <td style={{ verticalAlign: "middle", width: 428.1, padding: "2px 8px", overflow: "hidden", border: "none", backgroundColor: "#0A0A1A" }}>
              <p style={{ textAlign: "center", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "20.0px", fontWeight: 700, color: "#34E9E2" }}>£18,512</span></p>
            </td>
          </motion.tr>
        </tbody>
      </table>

    </SlideFrame>
  )
}
