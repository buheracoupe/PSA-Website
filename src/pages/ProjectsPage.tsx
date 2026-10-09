import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowLeft, ArrowRight, Images, Sun, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import '../styles/projects.css'
import { WaterProjects } from '../components/WaterProjects'

type Photo = { file: string; caption: string }
type Project = { id: string; name: string; client: string; category: string; description: string; stats: [string, string][]; photos: Photo[] }
const root = '/projects/solar/'
const projects: Project[] = [
  {
    id: 'gororo', name: 'Gororo Hybrid Solar Irrigation', client: 'UNDP · 2023–2024', category: 'Solar pumping & irrigation',
    description: 'A hybrid solar plant built around the demands of a 50-hectare irrigation scheme. PSA supplied, installed, tested and commissioned the PV generation, pumping infrastructure, pipework and dedicated electrical controls.',
    stats: [['168 kWp', 'Solar PV'], ['50 ha', 'Irrigation area'], ['2 × 110 kW', 'VSD system']],
    photos: [
      { file: 'gororo-aerial.webp', caption: 'Gororo — the solar array alongside the water infrastructure.' },
      { file: 'gororo-array.webp', caption: 'Ground-mounted solar generation at Gororo.' },
      { file: 'gororo-pumps.webp', caption: 'Gororo pump and pipework installation.' },
      { file: 'gororo-controls.webp', caption: 'Electrical controls integrated with the pumping system.' },
    ],
  },
  {
    id: 'africa-university', name: 'Africa University', client: 'Africa University · Mutare · 2020–2021', category: 'Institutional hybrid power',
    description: 'Solar generation and lithium-ion storage for the university’s halls of residence. An integrated installation bringing together inverters, battery storage, electrical distribution and protection.',
    stats: [['25 kVA', 'System rating'], ['15.36 kWp', 'PV array'], ['150 kWh', 'Battery storage']],
    photos: [
      { file: 'africa-university-inverters.webp', caption: 'Africa University — inverter, distribution and protection installation.' },
      { file: 'africa-university-batteries.webp', caption: 'Lithium-ion battery bank at Africa University.' },
    ],
  },
  {
    id: 'wanezi', name: 'Wanezi Integrated Solar Agriculture', client: 'UNDP', category: 'Irrigation & water treatment',
    description: 'Solar power, pressurised irrigation and containerised water treatment brought together in one agricultural water system, supporting centre-pivot and drip irrigation.',
    stats: [['30 ha', 'Centre pivot'], ['7 ha', 'Drip irrigation'], ['120 kL/day', 'Water treatment']],
    photos: [
      { file: 'wanezi-treatment.webp', caption: 'Wanezi — containerised water-treatment equipment and controls.' },
      { file: 'wanezi-container.webp', caption: 'Inside the Wanezi water-treatment installation.' },
      { file: 'wanezi-visit.webp', caption: 'A site visit at Wanezi, pictured in PSA’s project portfolio.' },
    ],
  },
  {
    id: 'gudyanga-maunganidze', name: 'Gudyanga & Maunganidze', client: 'UNOPS · 2021–2022', category: 'Multi-site solar water systems',
    description: 'Design, supply, installation, testing and commissioning of solar water infrastructure across two sites. The contract combined solar generation with large-diameter borehole drilling and equipping, electrical controls and site fencing.',
    stats: [['250 kWp', 'Combined contract'], ['32.76 kWp', 'Maunganidze BH13'], ['84 × 390 W', 'BH13 solar panels']],
    photos: [
      { file: 'gudyanga-maunganidze-array.webp', caption: 'Solar water infrastructure from the Gudyanga and Maunganidze project portfolio.' },
      { file: 'maunganidze-sign.webp', caption: 'Maunganidze BH13 — solar field identification and array specification.' },
      { file: 'gudyanga-combiner.webp', caption: 'PV combiner and electrical connections at Gudyanga.' },
    ],
  },
]

function Stats({ project }: { project: Project }) {
  return <dl className="solar-stats">{project.stats.map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
}

function Gallery({ project, onClose }: { project: Project; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [index, setIndex] = useState(0)
  const move = (step: number) => setIndex(current => (current + step + project.photos.length) % project.photos.length)
  useEffect(() => {
    const element = dialog.current
    const previousOverflow = document.body.style.overflow
    element?.showModal()
    document.body.style.overflow = 'hidden'
    return () => { element?.close(); document.body.style.overflow = previousOverflow }
  }, [])
  return <dialog ref={dialog} className="solar-dialog" aria-labelledby="solar-gallery-title" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose() }} onKeyDown={event => {
    if (event.key === 'ArrowRight') { event.preventDefault(); move(1) }
    if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1) }
  }}>
    <div className="solar-dialog-head"><div><span>Project gallery</span><h2 id="solar-gallery-title">{project.name}</h2></div><button type="button" onClick={onClose} aria-label="Close gallery" autoFocus><X /></button></div>
    <figure><img src={root + project.photos[index].file} alt={project.photos[index].caption} /><figcaption aria-live="polite">{project.photos[index].caption}</figcaption></figure>
    <div className="solar-gallery-controls"><button type="button" onClick={() => move(-1)} aria-label="Previous photo"><ArrowLeft /></button><span aria-live="polite">{index + 1} / {project.photos.length}</span><button type="button" onClick={() => move(1)} aria-label="Next photo"><ArrowRight /></button></div>
  </dialog>
}

export function ProjectsPage() {
  const [gallery, setGallery] = useState<Project | null>(null)
  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Projects | Pump Systems Africa'
    return () => { document.title = previousTitle }
  }, [])
  const featured = projects[0]
  const openGallery = (project: Project) => <button type="button" className="solar-gallery-button" onClick={() => setGallery(project)} aria-label={`View ${project.name} gallery`}><Images size={17} /> View gallery <span>{project.photos.length} photos</span></button>
  return <div className="solar-page">
    <header className="solar-intro container">
      <nav className="solar-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span aria-current="page">Projects</span></nav>
      <div className="solar-intro-grid"><div><span className="solar-kicker">Our work in the field</span><h1>Engineering.<br />Put to work.</h1></div><div className="solar-intro-copy"><p>Pumping expertise. Water infrastructure. Energy that supports both.</p><p>Explore pumping, water-treatment and solar installations across Zimbabwe and the region.</p><div className="project-collection-links"><a href="#water-projects">Pumping & water <ArrowDown size={17} /></a><a href="#solar-projects">Solar projects <ArrowDown size={17} /></a></div></div></div>
    </header>

    <WaterProjects />

    <section id="solar-projects" className="solar-collection" aria-labelledby="solar-collection-title">
      <div className="container">
        <div className="solar-collection-heading"><div><span className="solar-category"><Sun size={17} /> Project collection</span><h2 id="solar-collection-title">Solar projects</h2></div><span className="solar-collection-note">Solar generation. Connected to real demand.</span></div>
        <nav className="solar-project-nav" aria-label="Solar projects">{projects.map(project => <a key={project.id} href={`#${project.id}`}>{project.id === 'gororo' ? 'Gororo' : project.id === 'wanezi' ? 'Wanezi' : project.name}<ArrowDown size={13} /></a>)}</nav>

        <article className="solar-feature" id="gororo" aria-labelledby="gororo-title">
          <div className="solar-feature-photo"><img src={root + featured.photos[0].file} alt={featured.photos[0].caption} fetchPriority="high" width="1600" height="900" /><div className="solar-image-label"><span>01 / Featured project</span><span>Zimbabwe</span></div></div>
          <div className="solar-feature-content"><div><span className="solar-kicker">{featured.client}</span><h3 id="gororo-title">Solar power.<br />Water for 50 hectares.</h3><p className="solar-project-name">{featured.name}</p></div><div><p className="solar-description">{featured.description}</p>{openGallery(featured)}</div></div>
          <Stats project={featured} />
        </article>

        <div className="solar-cases">{projects.slice(1).map((project, index) => <article className={`solar-case ${index === 2 ? 'solar-case-wide' : ''}`} key={project.id} id={project.id} aria-labelledby={`${project.id}-title`}>
          <div className="solar-case-photo"><img src={root + project.photos[0].file} alt={project.photos[0].caption} loading="lazy" width="1200" height="800" /><span className="solar-photo-number">0{index + 2}</span><span className="solar-photo-tag">{project.category}</span></div>
          <div className="solar-case-body"><span className="solar-client">{project.client}</span><h3 id={`${project.id}-title`}>{project.name}</h3><p className="solar-description">{project.description}</p><Stats project={project} />{openGallery(project)}</div>
        </article>)}</div>
      </div>
    </section>

    <section className="solar-additional container" aria-labelledby="solar-additional-title"><div className="solar-additional-intro"><span className="solar-kicker">Further experience</span><h2 id="solar-additional-title">Across more<br />operating environments.</h2><p>Selected assignments in municipal water, humanitarian programmes and energy-system design.</p></div><div className="solar-assignment-list">
      <article><span className="solar-assignment-number">05</span><div><span className="solar-client">UNICEF · 2020</span><h3>Chipinge municipal water</h3><p>Five solar-powered borehole systems for Chipinge Town Council, with hybrid AC/DC variable-speed drives, commissioning and flow-rate measurement.</p></div><strong>68 kWp<span>Solar capacity</span></strong></article>
      <article><span className="solar-assignment-number">06</span><div><span className="solar-client">Welthungerhilfe · Various contracts</span><h3>Solar water schemes</h3><p>Supply, installation and commissioning of solar-powered water schemes at multiple locations across Zimbabwe.</p></div><strong>Multi-site<span>Water supply</span></strong></article>
      <article><span className="solar-assignment-number">07</span><div><span className="solar-client">Government of Zimbabwe · 2020</span><h3>Kanyemba hybrid mini-grid</h3><p>Design of a hybrid solar power plant and local solar-grid architecture.</p></div><strong>1 MVA<span>Design scope</span></strong></article>
    </div></section>

    <section className="solar-contact"><div className="container"><div><span className="solar-kicker">Start with the system</span><h2>Let’s put the right<br />solution to work.</h2><p>Talk to PSA about pumping, water infrastructure and the energy to support it.</p></div><a className="button button-light" href="mailto:enquiries@pumpsystemsafrica.com">Discuss your project <ArrowRight size={18} /></a></div></section>
    {gallery && <Gallery project={gallery} onClose={() => setGallery(null)} />}
  </div>
}
