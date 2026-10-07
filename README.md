# Pump Systems Africa Website

Stage 1 establishes the production foundation for the new Pump Systems Africa website.

## Stack

- React + TypeScript
- Vite
- React Router
- Lucide React icons
- Motion (animation library, installed for later stages)
- Plain CSS design-token system for precise brand control

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite (normally `http://localhost:5173`).

## Checks

```bash
npm run lint
npm run build
```

## Stage 1 scope

- Real PSA logo asset wired into header/footer
- Responsive desktop/mobile navigation
- Route structure for core website sections
- Shared site layout
- Design tokens and base visual system
- Reusable button/card patterns
- Footer and social placeholders
- Responsive breakpoints
- Placeholder routes for future build stages

The homepage content currently acts as a design-system/foundation preview. Stage 2 replaces it with the full PSA homepage.

## Tender dashboard

This repository also contains the internal tender application in `tender-dashboard/`.
The corporate React/Vite website remains at the repository root. The dashboard has
its own Node backend, PostgreSQL schema, frontend, worker, tests and dependencies,
so each application can be deployed independently. The planned dashboard address
is `tenders.pumpsystemsafrica.com`.

See [the dashboard setup guide](tender-dashboard/README.md). For local development:

```bash
cd tender-dashboard
npm ci
npm start
```

The local dashboard uses durable PGlite storage and demo accounts. Production uses
PostgreSQL, company sign-in and a separate background worker. Live PRAZ collection,
other web collectors and an AI provider still need to be connected. Credentials,
local databases, uploads and dependencies are excluded from Git.

The [idea brief](docs/tender-dashboard/Pump-Systems-Tender-Workspace-Idea.pdf) and
[earlier concept website](docs/tender-dashboard/Pump-Systems-Tender-Demo.html) are
kept in `docs/tender-dashboard/` for reference; the working application is the
`tender-dashboard/` directory.
