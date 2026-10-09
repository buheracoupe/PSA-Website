import { useEffect } from 'react'
import { ArrowRight, ArrowUpRight, Gauge, Layers3, Wrench } from 'lucide-react'
import { Link } from 'react-router-dom'
import '../styles/brands.css'

const manufacturers = [
  { name: 'Wilo', logo: '/brand/Wilo png.png', url: 'https://wilo.com/', focus: 'Buildings · Water · Industry', text: 'Pumps and system solutions for buildings, water management and industrial applications.' },
  { name: 'KSB', logo: '/brand/ksb-logo-data (1).svg', url: 'https://www.ksb.com/en-global', focus: 'Pumps · Valves', text: 'Pump and valve technology for water, infrastructure and industrial processes.' },
  { name: 'Grundfos', logo: '/brand/grundfos logo.png', url: 'https://www.grundfos.com/', focus: 'Pumping · Water solutions', text: 'Pumping and water solutions for buildings, utilities and industry.' },
  { name: 'CRI', logo: '/brand/CRI logo.png', url: 'https://www.crigroups.com/', focus: 'Water · Agriculture · Industry', text: 'Pumping solutions spanning agricultural, residential, commercial and industrial applications.' },
  { name: 'Gorman-Rupp', logo: 'https://www.gormanrupp.com/hs-fs/hubfs/GR-Company_-1.png?height=160&name=GR-Company_-1.png&width=200', url: 'https://www.grpumps.com/', focus: 'Water · Wastewater · Industry', text: 'Pumps and pumping systems for municipal, industrial and demanding liquid-handling duties.' },
  { name: 'Tesk', logo: 'https://www.teskpump.co.za/img/t/svg/tesk-water-technologies-south-africa.svg', url: 'https://www.teskpump.co.za/', focus: 'Pumps · Water technologies', text: 'Water pumping equipment and accessories for a range of system requirements.' },
  { name: 'Turbofluid', logo: '/brand/turbofluid logo.png', url: 'https://turbofluid.co.za/', focus: 'Pumps · Pump sets', text: 'Pumps and pump sets with engineering services across Southern Africa.' },
  { name: 'Corro Pump', logo: '/brand/corro pump manufacturing.png', url: 'https://corropump.co.za/', focus: 'Corrosion-resistant pumping', text: 'Corrosion-resistant pumps for applications where material selection matters.' },
  { name: 'Xylem', logo: '/brand/xylem logo.png', url: 'https://www.xylem.com/', focus: 'Water · Wastewater technology', text: 'Water technology addressing the movement, treatment and management of water.' },
]
const steps = [
  { icon: Gauge, title: 'Define the duty', text: 'Start with flow, head, the liquid being pumped and the conditions at your site.' },
  { icon: Layers3, title: 'Match the system', text: 'Consider the pump alongside pipework, controls, power supply and installation requirements.' },
  { icon: Wrench, title: 'Plan the support', text: 'Discuss commissioning, maintenance and service needs before equipment selection is finalised.' },
]
export function BrandsPage() {
  useEffect(() => {
    const previous = document.title
    document.title = 'Brands & Manufacturers | Pump Systems Africa'
    return () => { document.title = previous }
  }, [])
  return <div className="brands-page">
    <header className="container brands-intro">
      <nav aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span aria-current="page">Brands</span></nav>
      <span className="brands-kicker">Our manufacturers</span>
      <h1>Global pump technology.<br /><span>Local engineering expertise.</span></h1>
      <div className="brands-intro-bottom"><p>Pump Systems Africa works with established pump and water-technology manufacturers to match equipment to the application, operating conditions and wider system requirements.</p><a href="#manufacturers">Meet the manufacturers <ArrowRight size={18} /></a></div>
    </header>
    <section className="container brands-directory" id="manufacturers" aria-labelledby="manufacturers-title">
      <div className="brands-directory-heading"><h2 id="manufacturers-title">Different expertise. One engineering approach.</h2><p>Explore each manufacturer’s official website. Bring your requirements back to PSA to discuss selection and sourcing.</p></div>
      <div className="brands-grid">{manufacturers.map((brand, index) => <article className="brands-card" key={brand.name}>
        <div className="brands-logo"><img src={brand.logo} alt={brand.name + ' official logo'} loading="lazy" /><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span></div>
        <div className="brands-card-copy"><span className="brands-focus">{brand.focus}</span><h3>{brand.name}</h3><p>{brand.text}</p><a href={brand.url} target="_blank" rel="noopener noreferrer" aria-label={'Explore ' + brand.name + ' official website (opens in a new tab)'}>Explore {brand.name} <ArrowUpRight size={18} /><small>Official website · new tab</small></a></div>
      </article>)}</div>
      <p className="brands-range-note">Manufacturer capabilities are a starting point. Contact PSA to confirm the equipment range, suitability and availability for your project.</p>
    </section>
    <section className="brands-engineering" aria-labelledby="engineering-title"><div className="container">
      <div className="brands-engineering-heading"><div><span className="brands-kicker">The PSA connection</span><h2 id="engineering-title">More than a name<br />on the pump.</h2></div><p>The right manufacturer is part of the answer. The duty, installation and ongoing support complete the picture.</p></div>
      <div className="brands-steps">{steps.map(({ icon: Icon, title, text }, index) => <article key={title}><div><span>0{index + 1}</span><Icon size={28} strokeWidth={1.4} /></div><h3>{title}</h3><p>{text}</p></article>)}</div>
      <div className="brands-duty"><span>YOUR APPLICATION</span><ArrowRight /><span>EQUIPMENT SELECTION</span><ArrowRight /><span>THE COMPLETE SYSTEM</span></div>
    </div></section>
    <section className="container brands-cta"><span className="brands-kicker">Start a conversation</span><h2>Not sure which manufacturer you need?<br /><span>Start with the duty.</span></h2><p>Tell us what needs to move, where it needs to go and the conditions it will work in. We’ll help you work through the next step.</p><Link className="button button-primary" to="/contact#enquiry">Talk to an Engineer <ArrowRight size={18} /></Link></section>
  </div>
}
