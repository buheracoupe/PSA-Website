import { useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowUpRight } from 'lucide-react'

const recipient = 'enquiries@pumpsystemsafrica.com'
export function EnquiryForm() {
  const [draft, setDraft] = useState('')
  const [mailLink, setMailLink] = useState('')
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const body = Array.from(data.entries()).filter(([, value]) => String(value).trim()).map(([name, value]) => name + ': ' + String(value).trim()).join('\n\n')
    setDraft(body)
    setMailLink('mailto:' + recipient + '?subject=' + encodeURIComponent('PSA enquiry / RFQ — ' + data.get('Company / organisation')) + '&body=' + encodeURIComponent(body))
    setCopied(false)
    setCopyError(false)
  }
  async function copy() {
    try { await navigator.clipboard.writeText(draft); setCopied(true); setCopyError(false) }
    catch { setCopyError(true) }
  }
  return <section className="container enquiry-section" id="enquiry" aria-labelledby="enquiry-title">
    <div className="enquiry-heading"><span className="contact-kicker">Talk to an Engineer</span><h2 id="enquiry-title">Start with your requirements.</h2><p>Request a quotation, discuss an application or ask for technical support. Share what you know; you can leave unknown system details blank.</p><p className="enquiry-note">Complete the form to prepare an email to {recipient}. You’ll review and send it from your email app.</p></div>
    <form className="enquiry-form" onSubmit={prepare} onChange={() => { setDraft(''); setMailLink(''); setCopied(false); setCopyError(false) }}>
      <div className="enquiry-fields">
        <label>Full name <span>(required)</span><input name="Name" autoComplete="name" required maxLength={120} /></label>
        <label>Company / organisation <span>(required)</span><input name="Company / organisation" autoComplete="organization" required maxLength={160} /></label>
        <label>Email <span>(required)</span><input name="Email" type="email" autoComplete="email" required maxLength={254} /></label>
        <label>Phone / WhatsApp<input name="Phone / WhatsApp" type="tel" autoComplete="tel" maxLength={50} /></label>
        <label>Enquiry / application type <span>(required)</span><select name="Enquiry / application" required defaultValue=""><option value="" disabled>Select an enquiry type</option>{['Equipment enquiry / RFQ', 'Water supply / pressure boosting', 'Irrigation / agricultural pumping', 'Water / wastewater infrastructure', 'Mining / industrial application', 'Pump repair / servicing', 'Solar pumping / energy', 'Other / need advice'].map(value => <option key={value}>{value}</option>)}</select></label>
        <label>Project / site location <span>(required)</span><input name="Project / site location" required maxLength={200} placeholder="Town, region and country" /></label>
      </div>
      <label>Message / requirements <span>(required)</span><textarea name="Requirements" required rows={5} maxLength={5000} placeholder="What do you need to achieve? Include quantities or a tender reference where relevant." /></label>
      <details className="enquiry-system"><summary>Optional system details — if known</summary><div className="enquiry-fields">
        <label>Flow rate<input name="Flow rate" maxLength={100} placeholder="Include units, e.g. m³/h or L/s" /></label>
        <label>Head / pressure<input name="Head / pressure" maxLength={100} placeholder="Include units, e.g. metres or bar" /></label>
        <label>Liquid / temperature<input name="Liquid / temperature" maxLength={150} placeholder="Water, wastewater or other liquid" /></label>
        <label>Power supply<input name="Power supply" maxLength={150} placeholder="Voltage, phase, solar or generator" /></label>
        <label>Existing pump / model<input name="Existing pump / model" maxLength={150} /></label>
        <label>Timing / required date<input name="Timing / required date" maxLength={150} /></label>
      </div></details>
      <p className="enquiry-note">Your details are used to prepare your enquiry. Nothing is sent by this form. Attach specifications or photos when sending your email.</p>
      <button className="button button-primary" type="submit">Prepare enquiry email <ArrowUpRight size={17} /></button>
      {draft && <div className="enquiry-draft"><p role="status">Your draft is ready. It has not been sent.</p><a className="button button-primary" href={mailLink}>Open draft in email app <ArrowUpRight size={17} /></a><button className="enquiry-copy" type="button" onClick={copy}>Copy enquiry</button><p role="status">{copied ? 'Enquiry copied. Paste it into an email to ' + recipient + '.' : copyError ? 'Select and copy the draft below, then paste it into your email.' : 'No email app? Copy the draft below and email it to ' + recipient + '.'}</p><label>Enquiry draft<textarea readOnly value={draft} rows={8} /></label></div>}
    </form>
  </section>
}
