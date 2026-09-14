import { ArrowLeft } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export function PlaceholderPage() {
  const location = useLocation()
  const name = location.pathname.slice(1) || 'page'
  const title = name.charAt(0).toUpperCase() + name.slice(1)

  return (
    <section className="placeholder-page">
      <div className="container placeholder-inner">
        <span className="eyebrow">Stage 1 placeholder</span>
        <h1>{title}</h1>
        <p>This route is wired and ready for its dedicated build stage.</p>
        <Link className="button button-secondary" to="/"><ArrowLeft size={17} /> Back home</Link>
      </div>
    </section>
  )
}
