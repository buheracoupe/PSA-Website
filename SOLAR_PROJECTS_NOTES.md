# Solar Projects collection

Implemented at `/projects`, within the existing React/Vite site. Pumps remain the primary product focus; homepage, product pages, primary navigation and shared branding are unchanged.

## Sources

- User-supplied `C:\Users\HP\Documents\Pump_Systems_Africa_Solar_Project_Experience.pdf`, pages 3–7, provides project scope and figures.
- User-supplied `C:\Users\HP\Pictures\Solar Project` provides Gororo, Africa University, and Gudyanga/Maunganidze photography.
- Wanezi photographs were extracted from page 5 of the supplied pamphlet.
- All web images are optimized WebP copies; source photos and PDF are unchanged.
- Unnamed photos and the unverified 15kw project are not assigned to a project.
- `maunganidze (3).jpeg` resembles the Africa University inverter photograph; it is not used as Maunganidze evidence.

## Editorial choices

- 250 kWp is explicitly the combined UNOPS contract capacity, not the rating of one pictured array.
- Kanyemba is identified as a design assignment, not a completed plant.
- Wanezi dates are omitted: the pamphlet labels 2023–2024 but its photos carry later timestamps. Confirm dates before adding a completion year.
- The new enquiry link uses the pamphlet's `enquiries@pumpsystemsafrica.net`. The pre-existing site footer uses `.com`; confirm the preferred address before launch.
- Contract value and tender-specific language are omitted from public-facing copy.

## Implementation

Four project galleries with native modal dialogs, next/previous controls, arrow-key navigation, Escape-to-close, and browser focus restoration. Responsive layouts, descriptive alt text, lazy-loaded secondary images and reduced-motion support.

`src/vite-env.d.ts` adds the Vite client type reference needed for stylesheet imports with the installed TypeScript version.
