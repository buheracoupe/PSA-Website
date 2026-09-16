import { FaFacebookF, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link to="/" className="footer-brand" aria-label="Pump Systems Africa home">
            <img className="footer-logo" src="/brand/psa-logo.png" alt="Pump Systems Africa" />
          </Link>
          <p className="footer-copy">Reliable pumping, water and renewable-energy solutions for demanding environments.</p>
        </div>
        <div>
          <h3>Explore</h3>
          <div className="footer-links"><Link to="/products">Products</Link><Link to="/services">Services</Link><Link to="/projects">Projects</Link><Link to="/brands">Brands</Link></div>
        </div>
        <div>
          <h3>Contact</h3>
          <div className="footer-contact"><p>22 Neil Avenue, Msasa, Harare</p><a href="https://wa.me/263773557800" target="_blank" rel="noopener noreferrer">WhatsApp: +263 773 557 800</a><a href="mailto:enquiries@pumpsystemsafrica.com">enquiries@pumpsystemsafrica.com</a></div>
        </div>
        <div>
          <h3>Follow</h3>
          <div className="social-row" aria-label="Social media links">
            <a href="https://wa.me/263773557800" target="_blank" rel="noopener noreferrer" aria-label="Chat with Pump Systems Africa on WhatsApp" title="WhatsApp: +263 773 557 800"><FaWhatsapp /></a>
            <a href="#" aria-label="Facebook" title="Facebook"><FaFacebookF /></a>
            <a href="#" aria-label="LinkedIn" title="LinkedIn"><FaLinkedinIn /></a>
          </div>

        </div>
      </div>
      <div className="container footer-bottom"><span>© 2026 Pump Systems Africa</span><span>Built for a stronger water future.</span></div>
    </footer>
  )
}
