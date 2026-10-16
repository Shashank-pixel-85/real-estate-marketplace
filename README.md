# Estateora — Real Estate Marketplace

A responsive real estate marketplace portfolio project built with React, Vite, Tailwind CSS, React Router, Framer Motion and Lucide icons.

## Features
- Responsive landing page with hero search, featured homes, categories and brand story
- Property listings with keyword search, buy/rent filter, budget filter, bedroom filter, price range, sorting and pagination
- Property details with photo gallery, amenities, price, location link and agent contact actions
- Wishlist and up-to-three-property comparison saved in localStorage
- Agent directory and contact links
- Login/signup UI with a local demo session (not production authentication)
- Property submission form with validation and local browser storage (does not publish a listing)
- Framer Motion entrance animations, responsive navigation, loading-friendly image markup
- Vercel SPA rewrite configuration

## Requirements
Node.js 18+ and npm.

## Run locally
```bash
npm install
npm run dev
```
Open the local URL printed by Vite, usually `http://localhost:5173`.

## Production build
```bash
npm run build
npm run preview
```

## Deploy to Vercel
1. Create a GitHub repository and push this folder.
2. Import the repository at https://vercel.com/new.
3. Framework preset: Vite. Build command: `npm run build`. Output directory: `dist`.
4. Deploy. `vercel.json` is included to support direct navigation to detail routes.

## Screenshot checklist
Capture real screenshots from the running/deployed app:
- Desktop: 1440 × 900 — homepage and property listing
- Tablet: 768 × 1024 — homepage and listing filters
- Mobile: 390 × 844 — homepage, listing, detail page and mobile navigation

Save screenshots under `screenshots/` before final submission.

## Project structure
```text
src/
  components/   Reusable navbar, footer, property card and search bar
  context/      Shared wishlist, comparison and local demo session state
  data/         Sample property and agent data
  pages/        Home, listings, property details, wishlist, compare, agents,
                authentication, submission form and not-found page
  App.jsx       Routes and shared page shell
  main.jsx      Application entry point
  styles.css    Design system, page styles and responsive breakpoints
```

## Notes and limitations
- Listing data and prices are fictional demo data.
- Authentication is UI-only and uses localStorage. Do not use for real accounts or passwords.
- Property submissions are stored only in the current browser. There is no API, database, real image upload or admin review flow.
- Map links open Google Maps search; no embedded map API is configured.
- Property images load from Unsplash and require an internet connection.
