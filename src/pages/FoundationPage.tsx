import { ArrowRight, Droplets, Gauge, ShieldCheck, Wrench } from 'lucide-react'
import { Link } from 'react-router-dom'

const swatches = [
  ['PSA Navy', '#062F57'],
  ['Deep Navy', '#031B33'],
  ['Flow Blue', '#087CCB'],
  ['Aqua', '#1CC8E8'],
  ['Mist', '#EFF7FB'],
  ['Slate', '#526779'],
]

export function FoundationPage() {
  return (
    <>
      <section className="foundation-hero">
        <div className="container foundation-grid">
          <div>
            <span className="eyebrow">Stage 1 · Design foundation</span>
            <h1>Engineering confidence.<br /><span>Modern by design.</span></h1>
            <p>
              The PSA website foundation is now structured around a reusable design system,
              responsive navigation, consistent components and production-ready React architecture.
            </p>
            <div className="hero-actions">
              <Link to="/products" className="button button-primary">Explore Products <ArrowRight size={18} /></Link>
              <Link to="/projects" className="button button-secondary">View Projects</Link>
            </div>
          </div>
          <div className="foundation-panel glass-panel">
            <div className="foundation-mark"><Droplets size={34} /></div>
            <p className="eyebrow">Design principle</p>
            <h2>Industrial strength without looking industrial-age.</h2>
            <p>Clean surfaces, deliberate motion, confident typography and authentic engineering imagery.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div><span className="eyebrow">Design system</span><h2>Core visual tokens</h2></div>
            <p>These tokens will drive every page, component and responsive state.</p>
          </div>
          <div className="swatch-grid">
            {swatches.map(([name, value]) => (
              <div className="swatch-card" key={name}>
                <div className="swatch" style={{ background: value }} />
                <strong>{name}</strong>
                <code>{value}</code>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container">
          <span className="eyebrow">Reusable UI</span>
          <h2>Component language</h2>
          <div className="component-grid">
            <article className="ui-card"><Gauge /><h3>Performance</h3><p>Technical information remains easy to scan at every screen size.</p><a href="#">Learn more <ArrowRight size={15} /></a></article>
            <article className="ui-card"><Wrench /><h3>Serviceability</h3><p>Components are built to be reused across services, products and project pages.</p><a href="#">Learn more <ArrowRight size={15} /></a></article>
            <article className="ui-card"><ShieldCheck /><h3>Consistency</h3><p>Shared tokens prevent each new page from becoming a separate design project.</p><a href="#">Learn more <ArrowRight size={15} /></a></article>
          </div>
        </div>
      </section>
    </>
  )
}
