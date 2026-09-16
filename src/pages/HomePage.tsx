import { ArrowRight, Building2, Droplets, Gauge, MapPin, Pickaxe, ShieldCheck, Sprout, Sun, Waves, Wrench, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

const services = [
  { icon: Droplets, title: 'Pump Systems', text: 'Engineered pumping solutions for water supply, irrigation, industry and infrastructure.' },
  { icon: Wrench, title: 'Pump Repairs', text: 'Inspection, repair and maintenance support focused on restoring dependable performance.' },
  { icon: Sun, title: 'Solar Installations', text: 'Solar-powered pumping and energy systems for resilient off-grid and hybrid applications.' },
]
const products = [
  { brand: 'Wilo', title: 'Wilo Pump Systems', text: 'Our strategic product focus for modern water movement, building services and infrastructure applications.' },
  { brand: 'KSB', title: 'Etanorm', text: 'A proven end-suction pump platform and an important part of Pump Systems Africa’s installed pumping experience.' },
  { brand: 'Pump Systems Africa', title: 'Multistage Pumps', text: 'Horizontal and vertical multistage configurations for higher-pressure duties and demanding installations.' },
]

const manufacturers = [
  { name: 'Wilo', cssLogo: true },
  { name: 'KSB', logo: '/brand/ksb-logo-data (1).svg' },
  { name: 'Grundfos', logo: '/brand/grundfos logo.png' },
  { name: 'CRI Pumps', logo: '/brand/standardized/cri.svg' },
  { name: 'Gorman-Rupp', logo: 'https://www.gormanrupp.com/hs-fs/hubfs/GR-Company_-1.png?height=160&name=GR-Company_-1.png&width=200' },
  { name: 'Tesk', logo: 'https://www.teskpump.co.za/img/t/svg/tesk-water-technologies-south-africa.svg' },
  { name: 'Turbofluid', logo: 'https://turbofluid.co.za/wp-content/uploads/2020/07/Turbofluid-Logo.png' },
  { name: 'Corro Pump', logo: '/brand/standardized/corro.svg' },
  { name: 'Xylem', logo: '/brand/xylem logo.png' },
]

const projects = [
  { name: 'Kanyemba', place: 'Mashonaland Central', meta: 'Water and energy infrastructure · northern Zambezi border', x: 53, y: 15 },
  { name: 'Gororo Irrigation', place: 'Chivi District, Masvingo', meta: '50 ha irrigation · 168 kWp solar', x: 43, y: 65 },
  { name: 'Wanezi', place: 'Insiza District, Matabeleland South', meta: 'Irrigation · pumping · water treatment', x: 37, y: 73 },
  { name: 'Africa University', place: 'Mutare, Manicaland', meta: 'Institutional solar installation · 25 kVA', x: 76, y: 52 },
  { name: 'Gudyanga & Maunganidze', place: 'Manicaland', meta: 'Irrigation · solar pumping infrastructure', x: 73, y: 69 },
]

const applications = [
  { icon: Sprout, title: 'Agriculture & Irrigation', text: 'Irrigation schemes, abstraction and agricultural water systems.' },
  { icon: Waves, title: 'Water & Wastewater', text: 'Transfer, treatment, drainage and municipal water infrastructure.' },
  { icon: Pickaxe, title: 'Mining & Industry', text: 'Robust pumping for process, dewatering and industrial duties.' },
  { icon: Building2, title: 'Commercial & Building Services', text: 'Pressure boosting, circulation and building water services.' },
]

export function HomePage() {
  return <>
    <section className="home-hero"><div className="hero-orbit hero-orbit-one"/><div className="hero-orbit hero-orbit-two"/><div className="container home-hero-grid">
      <div className="home-hero-copy"><span className="eyebrow">Pumping · Water · Energy</span><h1>Engineering the flow that <span>moves Africa.</span></h1><p>Pump Systems Africa delivers engineered pumping, water infrastructure and renewable-energy solutions for demanding environments across Zimbabwe and the region.</p><div className="hero-actions"><Link to="/products" className="button button-primary">Explore Solutions <ArrowRight size={18}/></Link><Link to="/projects" className="button button-ghost">View Our Work</Link></div><div className="hero-proof"><div><strong>Water</strong><span>Pumping & treatment</span></div><div><strong>Energy</strong><span>Solar & hybrid systems</span></div><div><strong>Support</strong><span>Repairs & engineering</span></div></div></div>
      <div className="hero-engineering-card"><div className="engineering-rings"><Droplets size={54}/></div><span className="eyebrow">Pump Systems Africa Engineering</span><h2>Built around the duty. Not the catalogue.</h2><p>We connect equipment selection, system design, installation and support into practical solutions that perform in the field.</p><div className="engineering-metrics"><span><Gauge/> System selection</span><span><ShieldCheck/> Field support</span></div></div>
    </div></section>

    <section className="brand-rail"><div className="container brand-rail-heading"><span>Engineering with trusted manufacturers</span><small>Wilo is our primary strategic product focus</small></div><div className="brand-marquee" aria-label="Pump Systems Africa manufacturers"><div className="brand-marquee-track">{[...manufacturers,...manufacturers].map((brand,index)=><div className={brand.name==='Wilo'?'manufacturer-logo manufacturer-primary':'manufacturer-logo'} key={`${brand.name}-${index}`}>{brand.cssLogo ? <div className="wilo-css-logo" aria-label="Wilo"><span className="wilo-wordmark">wilo</span></div> : <img src={brand.logo} alt={`${brand.name} logo`} loading="lazy"/>}<span className="manufacturer-name">{brand.name}</span></div>)}</div></div></section>

    <section className="section home-section"><div className="container"><div className="section-heading"><div><span className="eyebrow">What we deliver</span><h2>Systems, not just equipment.</h2></div><p>Pump Systems Africa combines pump expertise with field engineering, water infrastructure and renewable energy capability.</p></div><div className="service-grid">{services.map(({icon:Icon,title,text})=><article className="service-card" key={title}><div className="service-icon"><Icon/></div><h3>{title}</h3><p>{text}</p><Link to="/services">Discover capability <ArrowRight size={15}/></Link></article>)}</div></div></section>

    <section className="section product-showcase"><div className="container"><div className="section-heading"><div><span className="eyebrow">Featured equipment</span><h2>Pumps selected for the application.</h2></div><Link className="text-link animated-link" to="/products">View product range <ArrowRight size={16}/></Link></div><div className="product-grid">{products.map((product,index)=><article className={`product-card product-card-${index+1}`} key={product.title}><div className="product-visual"><div className="pump-silhouette"><span/><span/><span/></div><small>Approved manufacturer product imagery will replace this technical placeholder</small></div><div className="product-copy"><span className="product-brand">{product.brand}</span><h3>{product.title}</h3><p>{product.text}</p><Link to="/products">Technical overview <ArrowRight size={15}/></Link></div></article>)}</div></div></section>

    <section className="section projects-section"><div className="container projects-layout"><div className="projects-copy"><span className="eyebrow">Field proven</span><h2>Engineering across Zimbabwe.</h2><p>From irrigation and water treatment to solar pumping and institutional energy systems, our work is grounded in real operating environments.</p><div className="project-stat-grid"><div><strong>Water</strong><span>Infrastructure</span></div><div><strong>Solar</strong><span>Energy systems</span></div><div><strong>Irrigation</strong><span>Agriculture</span></div></div><Link to="/projects" className="button button-primary">Explore Projects <ArrowRight size={17}/></Link></div><div className="zimbabwe-map" aria-label="Selected Pump Systems Africa projects across Zimbabwe"><div className="map-grid"/><img className="zimbabwe-map-shape" src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Zimbabwe%20blank.svg" alt="Outline map of Zimbabwe"/>{projects.map(project=><button className="project-node" key={project.name} style={{left:`${project.x}%`,top:`${project.y}%`}} aria-label={`${project.name}, ${project.place}`}><span className="node-pulse"/><span className="node-dot"/><span className="project-tooltip"><strong>{project.name}</strong><small><MapPin size={11}/> {project.place}</small><em>{project.meta}</em></span></button>)}</div></div></section>

    <section className="section energy-section"><div className="container energy-grid"><div className="energy-panel"><Sun size={42}/><span className="energy-line"/><Zap size={28}/></div><div><span className="eyebrow">Integrated energy</span><h2>When pumping meets solar.</h2><p>Pump Systems Africa’s renewable-energy capability supports water systems where grid reliability, operating cost or remote access makes conventional power difficult.</p><div className="feature-list"><span><ShieldCheck/> Solar pumping systems</span><span><ShieldCheck/> VSD and hybrid configurations</span><span><ShieldCheck/> Institutional and agricultural installations</span></div><Link to="/services" className="text-link animated-link">Explore solar capability <ArrowRight size={16}/></Link></div></div></section>

    <section className="section industries-section"><div className="container"><span className="eyebrow">Applications</span><h2>Designed for demanding environments.</h2><div className="industry-row">{applications.map(({icon:Icon,title,text})=><article className="industry-card" key={title}><Icon/><div><strong>{title}</strong><p>{text}</p></div></article>)}</div></div></section>
    <section className="cta-section"><div className="container cta-inner"><div><span className="eyebrow">Start with the duty</span><h2>Have a pumping or water challenge?</h2><p>Tell our team what the system needs to achieve. We’ll help you move from requirement to engineered solution.</p></div><Link to="/contact" className="button button-light">Request a Quote <ArrowRight size={18}/></Link></div></section>
  </>
}
