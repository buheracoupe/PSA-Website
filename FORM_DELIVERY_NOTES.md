# Enquiry form delivery handoff

The Contact page now includes a validated RFQ/enquiry form. No form service, server API or email-delivery integration existed in this repository.

## Current behaviour
- Required: name, company/organisation, email, enquiry/application type, project/site location and requirements.
- Optional: phone/WhatsApp, flow, head/pressure, liquid/temperature, power supply, existing pump/model and timing.
- Prepare enquiry email generates a draft; Open draft in email app opens a mailto addressed to enquiries@pumpsystemsafrica.com.
- Nothing is submitted or sent by the website. The draft can also be copied, including when a mail application is unavailable or a long mailto cannot be handled.
- Form data remains in browser memory and is not persisted by this component.

## Minimal step to enable direct submission
Connect a hosted form-delivery service or deploy one server-side POST endpoint on the chosen hosting platform. Configure its fixed recipient as enquiries@pumpsystemsafrica.com and use the validated visitor email as Reply-To. Keep email credentials server-side. Validate field types/lengths server-side, add abuse protection/rate limiting, and return explicit success/error responses.

Then replace the draft preparation flow in src/components/EnquiryForm.tsx with the submission call, pending/error states, and a success message only after confirmed acceptance. Retain entered values on failure. Verify a real enquiry reaches the recipient before marking delivery complete. Add the applicable privacy notice before launch.

## Brands and navigation
- /brands uses all nine approved suppliers with equal card and logo treatment.
- Explore links point to official supplier websites, open a new tab, and are labelled accordingly. Manufacturer positioning is broad; no new product families or PSA stock claims were added.
- Gorman-Rupp and Tesk logos retain existing official supplier-hosted URLs; all other logos use unchanged local originals.
- Industries remains absent from navigation. /industries retains its legacy redirect to /about#applications.
- Existing uncommitted neutral-manufacturer edits to HomePage.tsx and PROJECT_STATUS.md were preserved.
