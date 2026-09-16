import { ArrowRight, Droplets, Gauge, MapPin, ShieldCheck, Sun, Wrench, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

const services = [
  { icon: Droplets, title: 'Pump Systems', text: 'Engineered pumping solutions for water supply, irrigation, industry and infrastructure.' },
  { icon: Wrench, title: 'Pump Repairs', text: 'Inspection, repair and maintenance support focused on restoring dependable performance.' },
  { icon: Sun, title: 'Solar Installations', text: 'Solar-powered pumping and energy systems for resilient off-grid and hybrid applications.' },
]

const products = [
  { brand: 'Wilo', title: 'Wilo Pump Systems', text: 'Our strategic product focus for modern water movement, building services and infrastructure applications.' },
  { brand: 'KSB', title: 'Etanorm', text: 'A proven end-suction pump platform and an important part of PSA’s installed pumping experience.' },
  { brand: 'PSA', title: 'Multistage Pumps', text: 'Horizontal and vertical multistage configurations for higher-pressure duties and demanding installations.' },
]

const projects = [
  { name: 'Gororo Irrigation', place: 'Zimbabwe', meta: '50 ha irrigation · 168 kWp solar', x: 46, y: 47 },
  { name: 'Africa University', place: 'Mutare', meta: 'Institutional solar installation · 25 kVA', x: 75, y: 55 },
  { name: 'Wanezi', place: 'Zimbabwe', meta: 'Irrigation · pumping · water treatment', x: 54, y: 70 },
  { name: 'Gudyanga & Maunganidze', place: 'Zimbabwe', meta: 'Solar water infrastructure', x: 70, y: 77 },
  { name: 'Kanyemba', place: 'Zimbabwe', meta: 'Water and energy infrastructure', x: 45, y: 16 },
]

export function HomePage() {
  return (
    <>
      <section className="home-hero">
        <div className="hero-orbit hero-orbit-one" />
        <div className="hero-orbit hero-orbit-two" />
        <div className="container home-hero-grid">
          <div className="home-hero-copy">
            <span className="eyebrow">Pumping · Water · Energy</span>
            <h1>Engineering the flow that <span>moves Africa.</span></h1>
            <p>Pump Systems Africa delivers engineered pumping, water infrastructure and renewable-energy solutions for demanding environments across Zimbabwe and the region.</p>
            <div className="hero-actions">
              <Link to="/products" className="button button-primary">Explore Solutions <ArrowRight size={18} /></Link>
              <Link to="/projects" className="button button-ghost">View Our Work</Link>
            </div>
            <div className="hero-proof">
              <div><strong>Water</strong><span>Pumping & treatment</span></div>
              <div><strong>Energy</strong><span>Solar & hybrid systems</span></div>
              <div><strong>Support</strong><span>Repairs & engineering</span></div>
            </div>
          </div>
          <div className="hero-engineering-card">
            <div className="engineering-rings"><Droplets size={54} /></div>
            <span className="eyebrow">PSA Engineering</span>
            <h2>Built around the duty. Not the catalogue.</h2>
            <p>We connect equipment selection, system design, installation and support into practical solutions that perform in the field.</p>
            <div className="engineering-metrics"><span><Gauge /> System selection</span><span><ShieldCheck /> Field support</span></div>
          </div>
        </div>
      </section>

      <section className="brand-rail">
        <div className="container brand-rail-inner">
          <span>Engineering with trusted manufacturers</span>
          <div className="brand-wordmarks"><strong className="brand-primary">WILO</strong><strong>KSB</strong><strong>GRUNDFOS</strong><strong>CRI</strong><strong>GORMAN-RUPP</strong><strong>XYLEM</strong></div>
        </div>
      </section>

      <section className="section home-section">
        <div className="container">
          <div className="section-heading"><div><span className="eyebrow">What we deliver</span><h2>Systems, not just equipment.</h2></div><p>PSA combines pump expertise with field engineering, water infrastructure and renewable energy capability.</p></div>
          <div className="service-grid">
            {services.map(({ icon: Icon, title, text }) => <article className="service-card" key={title}><div className="service-icon"><Icon /></div><h3>{title}</h3><p>{text}</p><Link to="/services">Discover capability <ArrowRight size={15} /></Link></article>)}
          </div>
        </div>
      </section>

      <section className="section product-showcase">
        <div className="container">
          <div className="section-heading"><div><span className="eyebrow">Featured equipment</span><h2>Pumps selected for the application.</h2></div><Link className="text-link" to="/products">View product range <ArrowRight size={16} /></Link></div>
          <div className="product-grid">
            {products.map((product, index) => <article className={`product-card product-card-${index + 1}`} key={product.title}><div className="product-visual"><div className="pump-silhouette"><span /><span /><span /></div><small>Product imagery coming from approved manufacturer assets</small></div><div className="product-copy"><span className="product-brand">{product.brand}</span><h3>{product.title}</h3><p>{product.text}</p><Link to="/products">Technical overview <ArrowRight size={15} /></Link></div></article>)}
          </div>
        </div>
      </section>

      <section className="section projects-section">
        <div className="container projects-layout">
          <div className="projects-copy"><span className="eyebrow">Field proven</span><h2>Engineering across Zimbabwe.</h2><p>From irrigation and water treatment to solar pumping and institutional energy systems, our work is grounded in real operating environments.</p><div className="project-stat-grid"><div><strong>Water</strong><span>Infrastructure</span></div><div><strong>Solar</strong><span>Energy systems</span></div><div><strong>Irrigation</strong><span>Agriculture</span></div></div><Link to="/projects" className="button button-primary">Explore Projects <ArrowRight size={17} /></Link></div>
          <div className="zimbabwe-map" aria-label="Selected Pump Systems Africa projects across Zimbabwe">
            <div className="map-grid" />
            <div className="map-outline"><span className="map-label">ZIMBABWE</span></div>
            {projects.map((project) => <button className="project-node" key={project.name} style={{ left: `${project.x}%`, top: `${project.y}%` }} aria-label={`${project.name}, ${project.place}`}><span className="node-pulse" /><span className="node-dot" /><span className="project-tooltip"><strong>{project.name}</strong><small><MapPin size={11} /> {project.place}</small><em>{project.meta}</em></span></button>)}
          </div>
        </div>
      </section>

      <section className="section energy-section">
        <div className="container energy-grid">
          <div className="energy-panel"><Sun size={42} /><span className="energy-line" /><Zap size={28} /></div>
          <div><span className="eyebrow">Integrated energy</span><h2>When pumping meets solar.</h2><p>PSA’s renewable-energy capability supports water systems where grid reliability, operating cost or remote access makes conventional power difficult.</p><div className="feature-list"><span><ShieldCheck /> Solar pumping systems</span><span><ShieldCheck /> VSD and hybrid configurations</span><span><ShieldCheck /> Institutional and agricultural installations</span></div><Link to="/services" className="text-link">Explore solar capability <ArrowRight size={16} /></Link></div>
        </div>
      </section>

      <section className="section industries-section">
        <div className="container"><span className="eyebrow">Applications</span><h2>Designed for demanding environments.</h2><div className="industry-row"><span>Agriculture & Irrigation</span><span>Water & Wastewater</span><span>Mining & Industry</span><span>Commercial & Building Services</span></div></div>
      </section>

      <section className="cta-section"><div className="container cta-inner"><div><span className="eyebrow">Start with the duty</span><h2>Have a pumping or water challenge?</h2><p>Tell our team what the system needs to achieve. We’ll help you move from requirement to engineered solution.</p></div><Link to="/contact" className="button button-light">Request a Quote <ArrowRight size={18} /></Link></div></section>
    </>
  )
}
