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
public/admin/                  Site editor (Sveltia CMS) served at /admin
src/pages/                     Routes (each file = a URL)
src/layouts/                   Page shells (<head>, global styles)
src/content/pages/             Editable page content (home.md = homepage text)
src/content/blog/              Markdown/MDX blog posts (Phase 4)
src/content.config.ts          Content collection schemas
src/data/site.json             Name, handle, role, contact email, default description
astro.config.mjs               Astro config (site URL, integrations)
```

## Editing the site

Go to **https://affanali.dev/admin/**. Every save is a commit to `main`, and the deploy
workflow republishes the site in about a minute.

**Sign In with GitHub** goes through a Cloudflare Worker running
[sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth) at
`https://sveltia-cms-auth.muslimfrompk.workers.dev` (`ALLOWED_DOMAINS=affanali.dev`), backed by a
GitHub App that needs **Contents: Read and write** and is installed on this repo only.

Alternatively, use **Sign In Using Access Token** with a GitHub → Settings → Developer settings → **Fine-grained token**:
- Repository access: **Only select repositories** → `MuslimFromPK/affanali.dev`
- Permissions: **Contents: Read and write** (Metadata: read is added automatically)
- Pick an expiry; generate a new token when it runs out.

The token is stored in your browser's local storage, so only sign in on your own devices,
and sign out from the CMS menu when you're done on a shared machine.

To make a new page editable, add its content file to `src/content/` and a matching entry in
`public/admin/config.yml`.

## Roadmap

- [x] **Phase 1: Project + hosting.** Astro scaffold, dark placeholder homepage, Pages deploy workflow, custom domain.
- [x] **Phase 2: Homepage.** Short intro, what I do (AI red teaming, web/API pentesting, bug bounty), and the line
      "Affan Ali, known online as muslimfrompk".
- [ ] **Phase 3: Research page.** List CVEs exactly as below, each linked to its official advisory. No inflated severity or reach.
  - CVE-2025-39404: Open Redirect in Sassy Social Share WordPress plugin (<= 3.3.73), CVSS 4.7, 100,000+ active installs, credited via Patchstack.
    https://patchstack.com/database/Wordpress/Plugin/sassy-social-share/vulnerability/wordpress-sassy-social-share-plugin-3-3-73-open-redirection-vulnerability
  - CVE-2025-32248: CSRF in SwiftXR (3D/AR/VR) Viewer WordPress plugin (<= 1.0.7), CVSS 5.4, credited via Patchstack.
    https://patchstack.com/database/Wordpress/Plugin/swiftxr-3darvr-viewer/vulnerability/wordpress-swiftxr-3d-ar-vr-viewer-plugin-1-0-7-cross-site-request-forgery-csrf-vulnerability
- [~] **Phase 4: Blog.** _Done: posts, tags, reading time, Shiki highlighting, CMS editing. To do: RSS._ Content collection for Markdown/MDX write-ups with tags, RSS feed (`@astrojs/rss`), reading time,
      syntax highlighting (Shiki, built in).
- [ ] **Phase 5: Links/contact.** LinkedIn (linkedin.com/in/affanalicyber), GitHub (github.com/MuslimFromPK),
      HackerOne (hackerone.com/muslimfrompk), Medium (muslimfrompk.medium.com),
      Patchstack profile (TODO: URL), contact email (affanalimuslim@gmail.com).
- [ ] **SEO.** Meta tags, Open Graph image, sitemap (`@astrojs/sitemap`), and JSON-LD `Person` schema
      (`name: "Affan Ali"`, `alternateName: "muslimfrompk"`, `sameAs`: all profiles above).

## Rules for content

- Location stays at "Pakistan". No address, phone number, or schedule.
- Claims must be factual. Anything unknown is left as a marked TODO.
