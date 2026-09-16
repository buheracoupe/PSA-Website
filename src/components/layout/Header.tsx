import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { navigation } from '../../data/navigation'

export function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand brand-lockup" aria-label="Pump Systems Africa home">
          <img className="brand-official-logo" src="/brand/psa-logo.png" alt="Pump Systems Africa" />
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => <NavLink key={item.href} to={item.href} className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>{item.label}</NavLink>)}
        </nav>
        <div className="header-actions">
          <Link className="button button-primary desktop-quote" to="/contact">Get a Quote</Link>
          <button className="menu-button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(value => !value)}>{open ? <X size={24}/> : <Menu size={24}/>}</button>
        </div>
      </div>
      {open && <nav className="mobile-nav" aria-label="Mobile navigation"><div className="container mobile-nav-inner">{navigation.map(item => <NavLink key={item.href} to={item.href} onClick={() => setOpen(false)}>{item.label}</NavLink>)}<Link className="button button-primary" to="/contact" onClick={() => setOpen(false)}>Get a Quote</Link></div></nav>}
    </header>
  )
}
