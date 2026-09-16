import { useEffect } from 'react'
import { ArrowRight, Droplets, Wrench, Activity, Waves, Drill, Sun } from 'lucide-react'
import { Link } from 'react-router-dom'
import '../styles/company.css'

const assets = '/projects/company/'
const services = [
  { id: 'pumping', icon: Droplets, title: 'Pumping systems', text: 'Equipment and engineering built around the water duty. From pump selection to mechanical and electrical installation, we bring the complete system together.', items: ['Pump supply, installation and commissioning', 'Bulk water pumping stations', 'Irrigation infrastructure and fluid control'] },
  { id: 'workshop', icon: Wrench, title: 'Workshop & refurbishment', text: 'Practical support for the equipment already working in the field. Our Harare workshop supports pump servicing, reconditioning and refurbishment.', items: ['Pump refurbishment and reconditioning', 'Mechanical and electrical maintenance contracts', 'Water and sewage plant refurbishment'] },
  { id: 'monitoring', icon: Activity, title: 'Condition monitoring', text: 'Understand how your pumping equipment is performing with measurements that support maintenance and fault investigation.', items: ['Vibration analysis', 'Pressure and flow recording', 'Bearing-temperature monitoring'] },
  { id: 'treatment', icon: Waves, title: 'Water & wastewater treatment', text: 'Design, installation and commissioning of treatment infrastructure, from packaged equipment to conventional plants.', items: ['Packaged water-treatment and softening plants', 'Containerised and skid-mounted systems', 'Wastewater-treatment equipment and rehabilitation'] },
  { id: 'drilling', icon: Drill, title: 'Borehole drilling & equipping', text: 'Connect groundwater development with the pumping system it needs, from initial siting through drilling and installation.', items: ['Borehole siting and geophysical surveys', 'Drilling, equipping and pump installation', 'Borehole flushing'] },
  { id: 'energy', icon: Sun, title: 'Solar & backup power', text: 'Energy systems that complement pumping and water infrastructure, with additional experience in institutional and backup power.', items: ['Solar-system design and installation', 'Electrical backup-power systems', 'Remote monitoring installations'] },
]

function PageTitle({ title }: { title: string }) {
  useEffect(() => { const old = document.title; document.title = `${title} | Pump Systems Africa`; return () => { document.title = old } }, [title])
  return null
}
function ContactBand() {
  return <section className="company-contact"><div className="container"><div><span className="company-eyebrow">Talk to the engineering team</span><h2>Start with what your<br />system needs to do.</h2></div><a className="button button-light" href="https://wa.me/263773557800" target="_blank" rel="noopener noreferrer">Discuss your requirements <ArrowRight size={17} /></a></div></section>
}
function Breadcrumb({ name }: { name: string }) {
  return <nav className="company-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span aria-current="page">{name}</span></nav>
}

export function AboutPage() {
  return <div className="company-page"><PageTitle title="About" />
    <header className="container company-intro"><Breadcrumb name="About" /><div className="company-split"><div><span className="company-eyebrow">Pump Systems Africa · Since 2007</span><h1>Pumping expertise.<br /><span>Built around you.</span></h1></div><p className="company-lead">Established in January 2007, Pump Systems Africa brings together pumping equipment, engineering and field support for water systems in Zimbabwe and the region.</p></div></header>
    <section className="company-story container" aria-labelledby="company-story-title"><div className="company-story-image"><img src={assets + 'workshop.webp'} alt="A PSA workshop technician working on mechanical equipment" width="795" height="777" /><span>Engineering & workshop support</span></div><div className="company-story-copy"><span className="company-eyebrow">More than equipment supply</span><h2 id="company-story-title">The pump is part<br />of a bigger system.</h2><p>Our work connects pump supply with design, installation, commissioning and ongoing support. We bring mechanical and electrical capability together with water infrastructure to meet the demands of each application.</p><p>That experience extends from irrigation and bulk water pumping to water and wastewater treatment, borehole equipping and renewable-energy integration.</p><Link to="/services" className="company-text-link">Explore our services <ArrowRight size={17} /></Link><div className="company-facts"><div><strong>2007</strong><span>Established in Zimbabwe</span></div><div><strong>Harare</strong><span>Office & workshop base</span></div></div></div></section>
    <section className="company-purpose"><div className="container company-split"><div><span className="company-eyebrow">Our purpose</span><h2>Better water systems.<br />Stronger communities.</h2></div><div><p className="company-lead">To improve livelihoods through sustainable solutions in the water sector.</p><p>We focus on integrated water-supply systems, supported by practical engineering, reliable equipment and a clear understanding of our customers’ needs.</p></div></div></section>
    <section className="container company-section"><div className="company-section-head"><div><span className="company-eyebrow">How we work</span><h2>Care in every part<br />of the job.</h2></div></div><div className="company-values"><article><span>01</span><h3>Commitment to the customer</h3><p>Listen to the requirement, solve the problem and support the system through its working life.</p></article><article><span>02</span><h3>Safety & responsibility</h3><p>Work with care for people, the environment and the communities around each project.</p></article><article><span>03</span><h3>Practical innovation</h3><p>Bring creativity, technical knowledge and integrity to demanding water challenges.</p></article></div></section>
    <section className="container company-sectors"><span className="company-eyebrow">Applications</span><h2>Where water and industry meet.</h2><div>{['Agriculture & irrigation', 'Mining & processing', 'Water & wastewater', 'Food & beverage', 'Chemical & pharmaceutical', 'Construction', 'Petrochemical', 'Pulp & paper'].map(name => <span key={name}>{name}</span>)}</div></section>
    <ContactBand />
  </div>
}

export function ServicesPage() {
  return <div className="company-page"><PageTitle title="Services" />
    <header className="container company-intro"><Breadcrumb name="Services" /><div className="company-split"><div><span className="company-eyebrow">Design · Install · Support</span><h1>Equipment expertise.<br /><span>System-wide support.</span></h1></div><p className="company-lead">Pumping, treatment and field engineering brought together around one requirement: a water system that does its job.</p></div></header>
    <nav className="container company-service-nav" aria-label="Service areas">{services.map(service => <a href={`#${service.id}`} key={service.id}>{service.title}</a>)}</nav>
    <section className="company-service-section"><div className="container company-services">{services.map(({ id, icon: Icon, title, text, items }) => <article id={id} key={id}><Icon size={27} strokeWidth={1.6} /><h2>{title}</h2><p>{text}</p><ul>{items.map(item => <li key={item}>{item}</li>)}</ul></article>)}</div></section>
    <section className="container company-story company-service-story"><div className="company-story-copy"><span className="company-eyebrow">Support close to the application</span><h2>From the workshop<br />to the field.</h2><p>Our Harare workshop is backed by installation and commissioning experience across pump stations, treatment plants and irrigation infrastructure.</p><p>Whether the requirement is to refurbish a pump or bring a water system into service, PSA connects equipment knowledge with hands-on delivery.</p><Link to="/projects#water-projects" className="company-text-link">See our work in the field <ArrowRight size={17} /></Link></div><div className="company-story-image"><img src={assets + 'workshop-wide.webp'} alt="Mechanical workshop work on pumping equipment" width="1460" height="701" loading="lazy" /></div></section>
    <section className="company-delivery"><div className="container"><span className="company-eyebrow">Connected delivery</span><h2>One system. Every stage considered.</h2><ol>{[['Design', 'Understand the duty and define the system.'], ['Supply', 'Bring together the equipment and controls.'], ['Install', 'Connect the mechanical and electrical works.'], ['Commission', 'Test the installation and bring it into service.'], ['Support', 'Maintain, monitor and refurbish.']].map(([title, text]) => <li key={title}><strong>{title}</strong><span>{text}</span></li>)}</ol></div></section>
    <ContactBand />
  </div>
}
