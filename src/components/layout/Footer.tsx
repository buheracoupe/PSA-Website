
import { MessageCircle } from 'lucide-react'
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <img
            className="footer-logo"
            src="/brand/psa-logo.png"
            alt="Pump Systems Africa"
          />

          <p className="footer-copy">
            Reliable pumping, water and renewable-energy solutions for
            demanding environments.
          </p>
        </div>

        <div>
          <h3>Explore</h3>

          <div className="footer-links">
            <Link to="/products">Products</Link>
            <Link to="/services">Services</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/brands">Brands</Link>
          </div>
        </div>

        <div>
          <h3>Contact</h3>

          <p>22 Neil Avenue, Msasa, Harare</p>
          <p>+263 773 557 800</p>
          <p>enquiries@pumpsystemsafrica.com</p>
        </div>

        <div>
          <h3>Follow</h3>

          <div className="social-row" aria-label="Social media links">
            <a
              href="#"
              aria-label="WhatsApp"
              title="WhatsApp"
            >
              <MessageCircle />
            </a>

            <a
              href="#"
              aria-label="Facebook"
              title="Facebook"
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
          </div>

          <p className="footer-muted">
            Social links will be connected before launch.
          </p>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© 2026 Pump Systems Africa</span>
        <span>Built for a stronger water future.</span>
      </div>
    </footer>
  )
}

