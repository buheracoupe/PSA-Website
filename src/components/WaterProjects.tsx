import { Droplets } from 'lucide-react'
import '../styles/company.css'

const work = [
  { title: 'Vale Mine', place: 'Mozambique', type: 'Floating pontoon pump station', image: 'vale-pontoon.webp', alt: 'Floating pontoon pump station at Vale Mine, Mozambique', text: 'A floating pump-station installation, with pumping equipment housed on a pontoon platform.' },
  { title: 'Redcliff', place: 'Zimbabwe', type: 'Wastewater treatment', image: 'redcliff-aerator.webp', alt: 'Aerator installation at the Redcliff BNR sewage-treatment plant', text: 'Supply and commissioning of an aerator for the Redcliff BNR sewage-treatment plant.' },
  { title: 'Borrowdale Brooke', place: 'Zimbabwe', type: 'Packaged sewage treatment', image: 'borrowdale-treatment.webp', alt: 'Packaged bioreactor sewage-treatment plant at Borrowdale Brooke', text: 'A packaged bioreactor sewage-treatment plant, bringing treatment equipment together in a dedicated installation.' },
]

export function WaterProjects() {
  return <section id="water-projects" className="water-projects" aria-labelledby="water-projects-title"><div className="container"><div className="company-section-head"><div><span className="company-eyebrow"><Droplets size={16} /> Pumping & water infrastructure</span><h2 id="water-projects-title">Water systems.<br />Working in the field.</h2></div><p>Selected pumping and treatment installations from our project experience in Zimbabwe and Mozambique.</p></div><div className="water-project-grid">{work.map(project => <article key={project.title}><img src={'/projects/company/' + project.image} alt={project.alt} width="750" height="420" loading="lazy" /><div><span className="company-eyebrow">{project.place} · {project.type}</span><h3>{project.title}</h3><p>{project.text}</p></div></article>)}</div></div></section>
}
