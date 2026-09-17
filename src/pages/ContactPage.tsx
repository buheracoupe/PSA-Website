import { useEffect, useState } from 'react'
import { ArrowUpRight, Check, Copy, Mail, MapPin, Navigation, Phone } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import '../styles/contact.css'

const address = '22 Neil Avenue, Msasa, Harare, Zimbabwe'
const destination = encodeURIComponent('Pump Systems Africa, ' + address)
const directions = `https://www.google.com/maps/dir/?api=1&destination=${destination}`
const map = `https://www.google.com/maps/embed?origin=mfe&pb=!1m2!2m1!1s${destination}`

export function ContactPage() {
  const [copied, setCopied] = useState(false)
  const [copyFailed, setCopyFailed] = useState(false)
  useEffect(() => {
    const old = document.title
    document.title = 'Contact & Directions | Pump Systems Africa'
    return () => { document.title = old }
  }, [])
  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 3000)
    return () => window.clearTimeout(timer)
  }, [copied])
  async function copyAddress() {
    try { await navigator.clipboard.writeText(address); setCopied(true); setCopyFailed(false) }
    catch { setCopyFailed(true) }
  }
  return <div className="contact-page">
    <header className="container contact-intro"><nav aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span aria-current="page">Contact</span></nav><span className="contact-kicker">People behind the pumps</span><h1>Let’s get your<br /><span>system moving.</span></h1><p>From selecting a pump to solving a water-system challenge, start a conversation with the PSA team.</p></header>

    <section className="container contact-connect" aria-labelledby="contact-connect-title"><div className="contact-team-photo"><img src="/contact/psa-worker.webp" alt="A PSA workshop team member beside a blue pump" width="1200" height="1800" fetchPriority="high" /><div><span>Hands-on experience.</span><strong>People you can talk to.</strong></div></div><div className="contact-channels"><span className="contact-kicker">Talk to our team</span><h2 id="contact-connect-title">What can we<br />help you with?</h2><p>Equipment enquiries, pump servicing, project requirements or a visit to our Harare workshop.</p>
      <a className="contact-channel contact-whatsapp" href="https://wa.me/263773557800" target="_blank" rel="noopener noreferrer"><FaWhatsapp /><span><small>WhatsApp · Dedicated line</small><strong>+263 773 557 800</strong><em>Start a conversation</em></span><ArrowUpRight /></a>
      <a className="contact-channel" href="mailto:enquiries@pumpsystemsafrica.com"><Mail /><span><small>Email enquiries</small><strong>enquiries@pumpsystemsafrica.com</strong><em>Send your requirements or specifications</em></span><ArrowUpRight /></a>
      <a className="contact-channel" href="tel:+263772218694"><Phone /><span><small>Call the team</small><strong>+263 772 218 694</strong><em>Speak with Pump Systems Africa</em></span><ArrowUpRight /></a>
    </div></section>

    <section className="contact-visit" id="visit" aria-labelledby="contact-visit-title"><div className="container"><div className="contact-visit-heading"><div><span className="contact-kicker">Find us in Msasa</span><h2 id="contact-visit-title">Come and see us.</h2></div><p>Visit our Harare office and workshop.<br />Contact the team to arrange your visit.</p></div><div className="contact-location"><div className="contact-location-details"><MapPin size={27} strokeWidth={1.6} /><h3>Pump Systems Africa</h3><address>22 Neil Avenue<br />Msasa, Harare<br />Zimbabwe</address><a className="button button-primary" href={directions} target="_blank" rel="noopener noreferrer"><Navigation size={17} /> Get directions</a><button type="button" className="contact-copy" onClick={copyAddress}>{copied ? <Check size={16} /> : <Copy size={16} />} {copied ? 'Address copied' : 'Copy address'}</button><span className="contact-copy-status" role="status">{copyFailed ? 'Please select and copy the address above.' : copied ? 'Address copied to your clipboard.' : ''}</span><div className="contact-postal"><small>Postal address</small><p>P.O. Box 9, Harare, Zimbabwe</p></div></div><div className="contact-map"><iframe title="Google Maps: Pump Systems Africa, 22 Neil Avenue, Msasa, Harare" src={map} referrerPolicy="no-referrer-when-downgrade" allowFullScreen /><a href={`https://www.google.com/maps/search/?api=1&query=${destination}`} target="_blank" rel="noopener noreferrer">Open in Google Maps <ArrowUpRight size={15} /></a></div></div></div></section>

    <section className="container contact-preparation"><div><span className="contact-kicker">A useful starting point</span><h2>A little detail helps us<br />get straight to work.</h2><p>When you get in touch, share what you know about the application. A photo of the equipment or nameplate can be a helpful start.</p><ul><li>The application and site location</li><li>Flow rate, pressure or head, if known</li><li>Existing pump details and power supply</li><li>The problem or result you need to achieve</li></ul><a href="https://wa.me/263773557800" target="_blank" rel="noopener noreferrer">Share your requirements on WhatsApp <ArrowUpRight size={16} /></a></div><img src="/contact/psa-workshop.webp" alt="PSA workshop team member working on a pump" width="1600" height="1067" loading="lazy" /></section>
  </div>
}
