# affanali.dev

Personal portfolio and security blog of **Affan Ali**, known online as **muslimfrompk**.
Built with [Astro](https://astro.build) and deployed to GitHub Pages via GitHub Actions.

## Development

```sh
npm install
npm run dev       # local dev server at http://localhost:4321
npm run build     # production build to ./dist
npm run preview   # serve the production build locally
```

## Structure

```
.github/workflows/deploy.yml   Build + deploy to GitHub Pages on push to main
public/                        Static files copied as-is (CNAME, favicons)
src/pages/                     Routes (each file = a URL)
src/layouts/                   Page shells (<head>, global styles)
src/components/                Reusable UI pieces
src/content/blog/              Markdown/MDX blog posts (Phase 4)
astro.config.mjs               Astro config (site URL, integrations)
```

## Roadmap

- [x] **Phase 1: Project + hosting.** Astro scaffold, dark placeholder homepage, Pages deploy workflow, custom domain.
- [ ] **Phase 2: Homepage.** Short intro, what I do (AI red teaming, web/API pentesting, bug bounty), and the line
      "Affan Ali, known online as muslimfrompk".
- [ ] **Phase 3: Research page.** List CVEs exactly as below, each linked to its official advisory. No inflated severity or reach.
  - CVE-2025-39404: Open Redirect in Sassy Social Share WordPress plugin (<= 3.3.73), CVSS 4.7, 100,000+ active installs, credited via Patchstack. TODO: advisory URL
  - CVE-2025-32248: CSRF in SwiftXR (3D/AR/VR) Viewer WordPress plugin (<= 1.0.7), CVSS 5.4, credited via Patchstack. TODO: advisory URL
- [ ] **Phase 4: Blog.** Content collection for Markdown/MDX write-ups with tags, RSS feed (`@astrojs/rss`), reading time,
      syntax highlighting (Shiki, built in).
- [ ] **Phase 5: Links/contact.** LinkedIn (linkedin.com/in/affanalicyber), GitHub (github.com/MuslimFromPK),
      HackerOne (hackerone.com/muslimfrompk), Medium (muslimfrompk.medium.com),
      Patchstack profile (TODO: URL), contact email (TODO: address).
- [ ] **SEO.** Meta tags, Open Graph image, sitemap (`@astrojs/sitemap`), and JSON-LD `Person` schema
      (`name: "Affan Ali"`, `alternateName: "muslimfrompk"`, `sameAs`: all profiles above).

## Rules for content

- Location stays at "Pakistan". No address, phone number, or schedule.
- Claims must be factual. Anything unknown is left as a marked TODO.
