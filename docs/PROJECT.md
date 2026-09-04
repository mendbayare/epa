# EPA@Lab Website — Project Handbook

> This is the canonical cross-session project record. Read it before starting
> work and update it at the end of every working session. Record decisions,
> implementation progress, problems and fixes, verification performed,
> unresolved questions, and the clearest next action.

**Project status:** Confirmed structure; design-system consolidation in progress
**Last updated:** 2026-09-04
**Institution:** Mongolian University of Science and Technology (MUST), School
of Power and Electrical Engineering  
**Laboratory:** Electrical Power Automation Lab (EPA)

## 1. Project purpose

Build a modern public website for EPA that:

- Introduces the laboratory, its mission, research, and equipment.
- Presents members, student projects, training, and other activities.
- Publishes news, achievements, images, and downloadable reports.
- Works in Mongolian and English, with Mongolian as the default language.
- Can be maintained safely by a non-technical lab member.
- Has low or zero recurring infrastructure cost apart from the domain.
- Remains fast, secure, accessible, and easy to transfer to future members.

## 2. Confirmed decisions

| Area | Decision | Reason |
| --- | --- | --- |
| Site type | Static content website | The current scope does not require a database or application server. |
| Site generator | Hugo Extended | Strong multilingual support, fast builds, low maintenance, and native Markdown content. |
| CMS | Pages CMS | Friendly browser interface for a non-technical editor and direct GitHub-backed content management. |
| Source control | GitHub organization repository | Version history, backup, ownership continuity, and automatic deployments. |
| Hosting | Cloudflare Pages | Suitable free static hosting, custom-domain support, SSL, and deployment previews. |
| Languages | Mongolian and English | Mongolian is the default; English pages live below `/en/`. |
| Domain | `.mn` domain | To be purchased and connected near launch. |
| Visual direction | Blue and white | Aligns with the university/school identity and the initial brief. |

### Why Hugo instead of Next.js or plain React?

Next.js and React can be exported and hosted as static sites, but the planned
website is content-led rather than application-led. Hugo provides the needed
news, project, taxonomy, and multilingual features with fewer dependencies and
less long-term maintenance.

Reconsider Next.js or another application framework only if the scope later
adds features such as authentication, equipment booking, private dashboards,
live SCADA data, database-backed submissions, or complex interactive tools.

## 3. Current scope

The stakeholder-confirmed website contains seven main sections:

1. **Home** — introduction and headline statistics for publications, projects,
   and alumni, a laboratory-equipment strip, and optional partner organizations.
2. **About Us** — achievements, laboratory history, and the supervising teacher.
3. **Projects** — funded/commissioned work, with a structured detail page for
   each project.
4. **Publications** — a table-style list of published works, with optional
   descriptive text, a downloadable file, and/or a link to an external record.
5. **News** — laboratory updates, training, achievements, and activities.
6. **Members** — members separated by generation/cohort on the Members page.
7. **Contact** — location and public email address.

Standalone equipment pages and a separate Research section are not part of the
confirmed primary information architecture.

### Stakeholder-provided page direction

#### Home

- Statistics for published works, projects, and alumni.
- Compact laboratory-equipment list.
- Optional partner-organizations section.
- The existing hero, vision/mission, mentor greeting, and featured-content
  components should be reassessed against this reduced scope before they are
  retained in the final Home page.

#### About

- Laboratory achievements.
- Laboratory history.
- Supervising teacher biography only; no additional teacher or researcher directory.

#### Members

- Member/profile records grouped by generation/cohort.
- A single Members link in the primary navigation.
- Generations stack newest-first within the Members page and can grow over time.
- Member cards do not require individual detail pages.
- Leadership terms are managed separately so annual changes preserve history.

#### Projects

Each project records:

- Name
- Client/commissioning organization
- Collaborating implementers
- Duration
- Objective
- Implementation location, object, or site
- Results, including a description of completed work and optional linked
  publication records
- Image gallery

#### Publications

- Table-based list with name, year/month, and file.
- Each entry may also contain descriptive text and a link to an external address.

#### Contact

- Location
- Public email address

Possible future additions are documented separately and are not part of the
initial release unless approved.

## 4. Source material reviewed

- `info.md` — initial project scope, proposed stack, languages, branding, and pages.
- `epalab.pdf` — laboratory history, goals, research areas, equipment, training,
  contact details, leadership, and first- and second-generation members.
- `epa1.jpg`, `epa2.jpg`, `epa3.jpg` — supplied photographic assets; their
  subjects, ownership, captions, and publication permission still need confirmation.

### Facts currently extracted from the source material

- EPA@Lab was established in January 2025.
- The laboratory is led by Dr. (Ph.D.) B. Tuvshinbayar.
- The lab leader listed in the source PDF is B. Demberelzodov.
- Location: MUST School of Power and Electrical Engineering, Building VIII,
  room 601.
- The source PDF includes a personal telephone number; it must not be published.
- Work includes automation, monitoring, control, SCADA/HMI, protection relays,
  communication protocols, embedded systems, and power-quality studies.
- Equipment includes ABB and SEL relays, Megger test equipment, RTAC/RTU/PLC
  devices, Raspberry Pi, Arduino, ESP32, and LoRa hardware.

All names, titles, translations, technical terminology, and contact details must
be verified by the laboratory before publication.

## 5. Content architecture

Content should be stored as structured records rather than hard-coded into page
templates.

### News record

- Title
- Publication date
- Summary
- Body content
- Cover image
- Image gallery
- Category/tags
- Mongolian and optional English version
- Draft/published state

### Project record

- Name
- Client/commissioning organization
- Collaborating implementers
- Free-form display duration
- Objective
- Implementation location/object/site
- Results and completed-work description
- Related publication references
- Cover image and gallery
- Mongolian and optional English version
- Draft/published state

### Publication record

- Name
- Publication year and month
- Optional downloadable file
- Optional descriptive text
- Optional external URL
- Mongolian and optional English presentation
- Draft/published state

### Member record

- Full name
- Portrait
- Role
- Program and study year
- Cohort/generation
- Short biography
- Research interests
- Achievements
- Display order
- Current member/alumni state

### Equipment record

- Name and model
- Manufacturer
- Category
- Description
- Photograph
- Related projects or training
- Display order

## 6. Multilingual approach

Expected URL structure:

```text
/                 Mongolian home
/about/
/members/
/projects/
/publications/
/contact/

/en/              English home
/en/about/
/en/members/
/en/projects/
/en/publications/
/en/contact/
```

- Core institutional pages should be available in both languages at launch.
- News and projects may have optional English translations.
- The language selector should open the equivalent translation where one exists.
- The UI must handle Mongolian Cyrillic names and text correctly.
- Translations must be reviewed by a human familiar with the technical subject.

## 7. Editing and publishing workflow

The lab editor should not need to use Git or edit Markdown manually.

```text
Editor signs in to Pages CMS
        ↓
Creates or edits a structured content form
        ↓
Uploads optimized images or a PDF when needed
        ↓
Saves/publishes the entry
        ↓
Pages CMS commits the change to GitHub
        ↓
Cloudflare Pages builds Hugo and deploys the site
```

Access rules:

- Use an official lab/university GitHub organization where possible.
- Do not place the production repository under a graduating student's personal account.
- Grant the editor only the access required to manage content.
- Require two-factor authentication for maintainers.
- Keep layout, configuration, and CMS system fields out of ordinary editor forms.
- Document account ownership and recovery information outside the public repository.

## 8. Design direction

- Modern engineering-laboratory character rather than a generic blog theme.
- Blue and white base palette with a restrained technical accent color.
- Clear typography and strong Mongolian Cyrillic rendering.
- Real photographs of students, equipment, relay panels, SCADA screens, and experiments.
- Subtle grid, circuit, or signal motifs may support the visual identity.
- Responsive layouts for mobile, tablet, and desktop.
- Restrained animation that respects reduced-motion preferences.
- Accessibility and readability take priority over decorative effects.

The School of Information and Communication Technology website was named as an
initial visual influence, but EPA@Lab should have its own coherent identity.

### Color system

The palette is derived from the recurring colors observed on the stakeholder's
SICT reference site. EPA@Lab uses a smaller subset so it feels related to the
institution without duplicating the SICT identity.

| Token | Value | Intended use |
| --- | --- | --- |
| Deep navy | `#0D1538` | Footer, dark feature sections, strongest text |
| Institutional navy | `#1B2A6B` | Major headings and prominent brand surfaces |
| Royal blue | `#1B3FAA` | Primary actions, links, active navigation |
| Supporting blue | `#2241A8` | Hover states, gradients, secondary blue details |
| Signal orange | `#D4712A` | Eyebrows, metadata, small highlights, active pills |
| Dark orange | `#C0601E` | Orange hover/pressed states |
| Pale blue | `#E1E7F8` | Borders and selected pale-blue elements |
| Cool surface | `#F5F7FC` | Alternating section backgrounds |
| Slate text | `#475569` | Paragraphs and secondary information |
| Cool border | `#DDE3EE` | Dividers, card borders, form boundaries |
| White | `#FFFFFF` | Main page and card surfaces |

Usage rules:

- Navy and white carry most of the interface.
- Royal blue identifies interactive elements and key brand moments.
- Orange is limited to small emphasis and must not dominate large surfaces.
- Yellow `#FDCA2E` and red `#EC363B` belong to the official MUST logo treatment;
  they are not general EPA interface colors.
- Text/background combinations must meet WCAG AA contrast requirements.
- The current square `E` mark is a placeholder until approved logo assets and
  usage rules are supplied.
- The primary interface family is a self-hosted Noto Sans variable font. It was
  chosen for dependable Mongolian Cyrillic coverage and clean academic tone.
  Technical labels use the system monospace stack as a restrained engineering
  accent. The SIL Open Font License is stored in `docs/licenses/`.

Dark-theme mapping:

| Role | Value | Use |
| --- | --- | --- |
| Page background | `#0D1538` | Main dark canvas |
| Raised surface | `#111D4A` | Cards and elevated sections |
| Deep alternate surface | `#0A0F2E` | Alternating bands and deep panels |
| Primary text | `#F8FAFC` | Headings and high-emphasis content |
| Secondary text | `#CBD5E1` | Paragraphs and metadata |
| Border | `rgba(255,255,255,0.10)` | Quiet separation on dark surfaces |
| Accent | `#D4712A` | Same restrained signal orange as light mode |

The default follows the visitor's operating-system preference. A header control
switches explicitly between light and dark, and the choice is stored locally in
the browser. The early theme script prevents a light flash during dark-mode load.

## 9. Technical requirements

- Hugo Extended with its version pinned in deployment configuration.
- Semantic HTML and keyboard-accessible navigation.
- Responsive image generation and lazy loading below the fold.
- WebP and/or AVIF derivatives while preserving suitable originals.
- Sitemap, robots metadata, canonical URLs, and social-sharing metadata.
- RSS feeds for news where appropriate.
- Correct language metadata and alternate-language links.
- Human-readable URLs and a useful 404 page.
- No secrets committed to the repository.
- No public CMS registration.
- PDF reports should supplement searchable HTML project summaries.
- Avoid unnecessary client-side JavaScript and third-party trackers.
- Add privacy-respecting analytics only if the lab requests it.

## 10. Work completed

- Reviewed the initial project brief in `info.md`.
- Extracted and reviewed the text and metadata from `epalab.pdf`.
- Identified the initial page and content structure.
- Evaluated Hugo, Next.js, and React for this use case.
- Evaluated Decap CMS and alternative editor experiences.
- Selected Hugo, Pages CMS, GitHub, and Cloudflare Pages as the working stack.
- Identified initial content-quality, translation, media, and ownership questions.
- Scaffolded the custom Hugo site with Mongolian and English configuration.
- Added shared layouts, responsive navigation, foundational styles, content
  archetypes, and provisional core-page content.
- Verified a successful production build with Hugo Extended 0.165.0.
- Built the first complete responsive Home page in Mongolian and English with
  light/dark theme support, responsive images, representative projects, and
  representative laboratory activities.
- Replaced Home research-card photographs with category-specific technical SVG
  motifs and added the equipment strip and accessible hero scroll cue.
- Built draft Projects index and detail layouts around commissioned-work fields,
  with responsive images, project facts, outcomes, related publications, and gallery.
- Built the bilingual structured About page with history milestones,
  achievements, and repeatable teacher biographies.
- Restructured Home around the confirmed site architecture: statistics,
  projects, News, mentor/About, newest member generation, Home-only partners,
  and contact.
- Made Members generations, annual leadership terms, and yearbook quotes
  data-driven without adding member detail pages.
- Confirmed the bilingual header and footer navigation and removed the Members
  generation dropdown.
- Built the Publications and Contact pages, including the stakeholder-supplied
  Google Maps embed and email-only public contact model.

The public information architecture and content models are confirmed. The
remaining implementation work is design refinement, CMS configuration, approved
content entry, launch QA, deployment, and handover.

## 11. Planned work

### Phase 1 — Confirm content and ownership

- [ ] Confirm final project owner and GitHub organization.
- [ ] Confirm the primary content editor and backup editor.
- [ ] Verify all names, roles, study years, and contact details.
- [ ] Confirm permission to publish supplied member photographs and reports.
- [ ] Obtain official MUST/EHIS brand assets and usage rules.
- [ ] Decide whether EPA@Lab needs a new logo.
- [ ] Collect the official public email, social links, project reports, and captions.
- [ ] Prepare and approve English translations for core pages.
- [x] Confirm generation/cohort behavior and newest-first ordering on Members.
- [x] Confirm that partner organizations appear on Home only.
- [ ] Collect project clients, collaborators, durations, implementation sites,
  results, galleries, and related publication references.
- [ ] Collect the publication table data and confirm which files may be public.

### Phase 2 — Information architecture and design

- [x] Finalize the seven-section navigation and footer structure.
- [x] Produce page layouts and an initial visual direction.
- [x] Establish colors, typography, components, and image treatment.
- [x] Define the final content schemas for Pages CMS.
- [ ] Review the proposed experience with the non-technical editor.

### Phase 3 — Hugo implementation

- [x] Initialize and configure the Hugo project.
- [x] Configure Mongolian and English languages.
- [x] Build base layouts, navigation, footer, and shared components.
- [x] Build Home, About, Members, Projects, Publications, News, and Contact pages.
- [x] Build the first complete Home-page visual prototype.
- [x] Add dynamic generation sections to the Members page.
- [x] Add project/publication relationships, metadata, sitemap, and 404 support.
- [x] Configure responsive image processing and publication file handling.
- [x] Add Pages CMS configuration and safe editor forms.

### Phase 4 — Content migration

- [ ] Convert approved PDF content into structured web content.
- [ ] Add and verify member profiles.
- [ ] Add initial projects and reports.
- [ ] Add the publication table entries and approved files/external links.
- [ ] Add About history, achievements, and teacher biographies.
- [ ] Optimize, caption, and add approved images.
- [ ] Add approved English translations.

### Phase 5 — Quality assurance

- [ ] Test current mobile and desktop browsers.
- [ ] Test every editor workflow with the actual lab manager.
- [ ] Test language switching and missing translations.
- [ ] Check accessibility, performance, metadata, and broken links.
- [ ] Confirm image consent, document privacy, and contact information.
- [ ] Run a production build with warnings treated seriously.

### Phase 6 — Deployment and handover

- [ ] Create/connect the GitHub organization repository.
- [ ] Configure Cloudflare Pages and preview deployments.
- [ ] Purchase and connect the `.mn` domain.
- [ ] Verify DNS, HTTPS, canonical URLs, and redirects.
- [ ] Configure CMS access and two-factor authentication.
- [ ] Train the primary and backup editors.
- [ ] Provide publishing, rollback, and account-recovery instructions.
- [ ] Establish a content review and annual ownership check.

## 12. Open questions

These questions must be resolved before launch:

1. What exact Mongolian and English names should be used for the university,
   school, department, laboratory, roles, and academic programs?
2. Who legally/administratively owns the GitHub organization, Cloudflare
   account, domain, and recovery email?
3. Who is the primary editor, and who takes over when that person graduates?
4. Does the lab have an official email address and social-media accounts?
5. Is the stakeholder-supplied Google Maps point the final approved public location?
6. Is there an official EPA@Lab logo, or should one be designed?
7. May every supplied name, portrait, activity image, and PDF be published?
8. Which projects and publications should be included at launch?
9. Must every item be bilingual, or only the permanent institutional pages?
10. Should visitors be able to download full reports, or only public versions?
11. Is a contact form needed, or are location/email links sufficient?
12. Is analytics required, and what privacy requirements apply?
13. What is the official public email address?

## 13. Out of scope for the initial release

Unless separately approved, the first release does not include:

- Member accounts or a private portal
- Equipment reservations
- Online course management
- Project submission/review workflows
- A database or custom backend
- Live SCADA/device telemetry
- Public comments
- E-commerce or payments
- Automatic machine translation

These features can be evaluated later without replacing the public Hugo site;
a separate application can be added when a real need is established.

## 14. Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| A student owns critical accounts and later leaves | Use institutional ownership, multiple maintainers, and documented recovery. |
| Incorrect names or technical translations are published | Require lab approval and human translation review. |
| Original photos consume bandwidth and load slowly | Generate responsive compressed formats and define upload guidance. |
| Private information appears in reports or photos | Review every asset and obtain permission before publication. |
| A non-technical editor damages layout/configuration | Expose structured CMS fields only; protect system files and use Git history. |
| English content becomes stale | Assign translation responsibility and show translations only when maintained. |
| A free service changes its limits | Keep content and code portable in GitHub; the static site can move hosts. |
| Ownership becomes unclear after student turnover | Perform an annual access and ownership review. |

## 15. Definition of initial release

Version 1 is complete when:

- All seven stakeholder-confirmed sections are implemented and responsive.
- Core pages are available in approved Mongolian and English.
- Approved members, projects, publications, achievements, history, teacher bios,
  Home partners, and contact information are present.
- The designated editor can independently create, edit, publish, and correct content.
- The site meets agreed accessibility and performance standards.
- The `.mn` domain uses HTTPS and resolves to the production deployment.
- Account ownership, recovery, publishing, and rollback procedures are handed over.
- The laboratory has reviewed and approved the public content.

## 16. Decision and change log

Record meaningful changes here; do not use this section for every code commit.

| Date | Change | Reason |
| --- | --- | --- |
| 2026-08-25 | Selected a static architecture. | The current public website requires content publishing, not a backend application. |
| 2026-08-25 | Selected Hugo Extended. | Best fit for multilingual, content-led publishing with low maintenance. |
| 2026-08-25 | Preferred Pages CMS over Decap CMS. | Cleaner editing workflow for the non-technical lab manager. |
| 2026-08-25 | Selected Cloudflare Pages as the planned host. | Strong free static hosting and no dependency on Netlify authentication. |
| 2026-08-25 | Kept Next.js/React out of the initial architecture. | They are viable but add little value for the confirmed scope. |
| 2026-08-26 | Started a custom Hugo implementation without a third-party theme or CSS framework. | A small purpose-built design system keeps the site distinctive, fast, and maintainable. |
| 2026-08-26 | Identified Publications as a likely dedicated section, pending scope confirmation. | The stakeholder requested a Published list, but implementation is deferred until its contents are defined. |
| 2026-08-26 | Adopted the SICT site as visual inspiration, not a template to copy. | EPA@Lab should share its blue institutional tone and polished academic feel while retaining its own identity and accessible implementation. |
| 2026-08-26 | Defined the EPA interface palette from the SICT reference site's recurring colors. | Navy, royal blue, orange, white, and cool slate establish institutional continuity while keeping the EPA identity restrained and distinct. |
| 2026-08-26 | Kept the EPA@Lab logo independent from the institution-name lockup. | University and school affiliation will be flexible supporting text so the header can adapt cleanly across desktop, mobile, favicon, and social contexts. |
| 2026-08-26 | Chose manually maintained Home statistics for the baseline. | Values are stakeholder-provided indicators and may not map reliably to published site records; automatic calculation can be reconsidered later. |
| 2026-08-26 | Excluded email addresses from public member records. | Student/member privacy and a simpler profile model outweigh the need for direct personal contact details. |
| 2026-08-26 | Added light and dark color modes, defaulting to the visitor's system preference. | The SICT reference provides a coherent dark palette, and adding the infrastructure before component development avoids a later retrofit. |
| 2026-08-26 | Changed Home to a full-screen, image-led hero with a lightweight animated power-network overlay. | The first split hero caused awkward Mongolian wrapping and made Vision/Mission too quiet; the revised composition gives the stakeholder-requested content a stronger hierarchy. |
| 2026-08-26 | Selected self-hosted Noto Sans with a monospace metadata accent. | Noto Sans provides dependable Mongolian Cyrillic rendering and an institutional tone; technical character comes from hierarchy and labels rather than a novelty display font. |
| 2026-09-02 | Replaced the earlier seven-section draft with the stakeholder's six-section information architecture. | The stakeholder explicitly defined Home, Projects, Publications, About, Contact, and generation-grouped Members as the required structure. |
| 2026-09-02 | Confirmed a compact table-oriented publication model. | The requested publication fields are name, year/month, file, descriptive text, and external link. |
| 2026-09-02 | Reframed Projects as commissioned/funded work. | The stakeholder requires client, collaborators, duration, objective, implementation site, results, related publications, and a gallery. |
| 2026-09-02 | Selected free-form project duration and Home-only partners. | Source project dates may vary in precision, and the stakeholder placed partners only on Home. |
| 2026-09-02 | Confirmed first and second generation member groups. | `epalab.pdf` explicitly labels `I үеийн гишүүд` and `II үеийн гишүүд`. |
| 2026-09-02 | Display member generations newest-first. | New generations stack at the top while the first generation remains at the bottom. |
| 2026-09-02 | Removed project categories and category filtering from the confirmed model. | The stakeholder clarified that projects are not classified as automation, relay protection, SCADA/HMI, or similar research categories. |
| 2026-09-02 | Confirmed seven primary sections and the final header/footer order. | News remains a primary section; Members is a single navigation link, with generations grouped inside its page. |
| 2026-09-02 | Removed the supervising teacher's telephone number from public content. | The laboratory will expose only its official public email as a direct contact method. |
| 2026-09-04 | Adopted a hybrid visual direction: SICT's institutional shell with EPA@Lab's own signature Home hero. | The reference site's consistency is worth borrowing, but EPA@Lab must read as its own laboratory rather than a school sub-site. |
| 2026-09-04 | Split `main.css` into ordered parts and extended tokens beyond color. | Styling had been written page by page with no shared layer, producing nine hero variants, ten card variants, and five section-heading patterns. |
| 2026-09-04 | Created `docs/DESIGN_SYSTEM.md` as the canonical design reference. | `docs/PROJECT.md` records decisions; implementation rules needed their own home. |
| 2026-09-04 | Removed the full-viewport rule from the Mentor and Projects sections. | Pinning them to `100svh` left a large empty band whenever their content did not fill a screen; the normal section rhythm reads better. |
| 2026-09-04 | Reversed the earlier decision to justify the mentor greeting. | Justification opened wide rivers of white space: Mongolian words are long and do not hyphenate, so each line offered too few break opportunities at that measure. |
| 2026-09-04 | Added an institutional utility strip, hidden on Home. | It carries the laboratory location on inner pages and is ready for the pending email and social accounts, while leaving the Home hero uninterrupted. |
| 2026-09-04 | Removed the utility strip again at the stakeholder's direction. | With no confirmed email or social accounts it carried only the address, which the footer and the Contact page already provide; the header is simpler without it. |
| 2026-09-04 | Rounded every card surface, departing from the reference. | The stakeholder asked for roundness. SICT keeps its cards square, so this is a deliberate divergence rather than an oversight, applied through one `--radius-card` token. |

## 17. How to maintain this document

At the end of every working session:

1. Update **Project status** and **Last updated** at the top.
2. Move finished checklist items to **Work completed** or mark them complete.
3. Record architectural or scope decisions in the decision log.
4. Add a concise entry to the session log describing work, fixes, verification,
   unresolved items, and the next recommended action.
5. Add newly discovered blockers to **Open questions** or **Risks**.
6. Update the definition of release only when the stakeholders agree.
7. Keep low-level code details in source comments or dedicated technical docs;
   this handbook should preserve context needed to resume the project, not
   duplicate every changed line.

## 18. Session log

### 2026-08-26 — Initial Hugo scaffold

**Decisions**

- Build a custom Hugo site without a third-party theme.
- Use modern plain CSS rather than Tailwind to avoid an unnecessary Node-based
  toolchain and keep the site small and maintainable.
- Keep translated content beside its counterpart with `.mn.md` and `.en.md`
  filename suffixes.
- Treat this file, `docs/PROJECT.md`, as the canonical cross-session record and
  update it after every working session.

**Implemented**

- Added the Hugo configuration with Mongolian as the default language and
  English under `/en/`.
- Added bilingual placeholders for Home, About, Members, Projects, News, and
  Contact.
- Added shared templates for metadata, navigation, language switching, footer,
  list pages, detail pages, and the 404 page.
- Added content archetypes for news, projects, members, and equipment.
- Defined the reviewable baseline content model and aligned the Hugo archetypes
  for members, projects, publications, news, and equipment.
- Added a responsive CSS design foundation and minimal JavaScript for mobile
  navigation.
- Added local development and production-build instructions.

**Problems and fixes**

- The first build rejected the multilingual menu structure. Menus were moved
  under their respective language configuration blocks, as required by the
  installed Hugo version.
- Hugo 0.165 reported deprecated `languageCode` and `languageName` fields. They
  were replaced with `locale` and `label`.
- The initial Home template used an unsupported `@index` expression. It was
  replaced with an explicitly captured range index.
- A Google Fonts import was removed to avoid a third-party request and preserve
  the privacy-friendly foundation.

**Verification**

- `hugo --minify` succeeds with Hugo Extended 0.165.0.
- The build produces Mongolian root routes, English `/en/` routes, language
  alternate metadata, RSS, sitemaps, robots metadata, fingerprinted CSS, and
  fingerprinted JavaScript.

**Still unresolved**

- The production `baseURL` is a placeholder until the `.mn` domain is chosen.
- Public names, translations, photographs, contact data, and other supplied
  content still require laboratory approval.
- Detailed content templates and Pages CMS configuration have not been built.

**Next recommended action**

- Review and refine the Home page visual direction, then establish final shared
  components before implementing detailed Members, Projects, and News views.

### 2026-08-26 — Stakeholder prototype incorporated

**Decisions**

- Use the current SICT website as a reference for institutional color and feel,
  while creating an original EPA@Lab composition and component system.
- Add Publications as a first-class content type and primary navigation item;
  keep News as a separate Home-page and archive feature.
- Design research browsing around category pills and image-led project cards.
- Design member browsing around cohort/year filters, profile cards, and personal
  achievements.

**Requirements captured**

- Home: image-led vision/mission hero, statistics, mentor greeting, news, and
  categorized featured research.
- About: introduction, Dr. B. Tuvshinbayar feature, goals, and achievements.
- Members: year-based browsing, photographs, details, and personal achievements.

**Still unresolved**

- Exact approved wording for vision, mission, goals, mentor greeting, and stats.
- Whether the supplied photographs include an approved portrait of Dr. B.
  Tuvshinbayar and which images belong to each section.
- Whether research category filtering must work without JavaScript or may use a
  small progressive-enhancement script.

**Next recommended action**

- Extend the Hugo content model and navigation for Publications, Home-page
  feature data, research categories, and member cohorts; then implement the
  complete responsive Home page using provisional content and supplied imagery.

### 2026-08-26 — SICT color reference verified

**Reference findings**

- The live `/mn` page uses deep navy (`#0D1538`, with nearby dark variants),
  institutional navy (`#1B2A6B`), royal blue (`#1B3FAA`/`#2241A8`), and signal
  orange (`#D4712A`) repeatedly.
- White and cool slate neutrals provide the primary content surfaces.
- Yellow (`#FDCA2E`) and red (`#EC363B`) appear in the MUST logo stripe and are
  not treated as dominant page colors.

**Decision**

- Base EPA's interface tokens on the verified navy/blue/orange relationship,
  with orange used sparingly and the current `E` symbol retained as a temporary
  logo.

**Next recommended action**

- Apply this approved palette while building the stakeholder-defined Home page
  structure and responsive components.

### 2026-08-26 — Baseline content models drafted

**Decision**

- Define only fields that affect the planned layouts and publishing workflow;
  defer speculative fields until representative content exposes a real need.
- Use page bundles for entry-owned images and stable controlled keys for filters,
  with translated display labels handled separately.

**Implemented**

- Added `docs/CONTENT_MODEL.md` covering site settings, Home, Members, Projects,
  Publications, News, Equipment, About, and Contact.
- Documented field types, required/optional status, storage conventions,
  controlled category keys, privacy considerations, and decisions still needed.
- Updated Hugo archetypes to match the proposed collection schemas.

**Verification**

- The schema remains content-only and does not change existing routes or rendered
  pages; the Hugo build will be rerun after this documentation/schema update.

**Next recommended action**

- Review the baseline model, resolve or adjust its explicit decision points, and
  then create representative page-bundle content for visual development.

### 2026-08-26 — Baseline scope simplified

**Decisions**

- Defer Publications until the stakeholder defines whether it includes papers,
  theses, internal reports, or another set of outputs.
- Store the member grouping field as `joined_year`, meaning the year that person
  joined EPA@Lab; use it for the cohort/generation interface.
- Keep equipment as a small ordered list on About rather than a standalone
  content collection or set of detail pages.

**Changes**

- Revised `docs/CONTENT_MODEL.md` and the member archetype.
- Removed premature Publications and Equipment archetypes.

**Next recommended action**

- Confirm the remaining Home, Member, Project, and News fields, then add a small
  representative content set and begin the complete Home-page implementation.

### 2026-08-26 — Logo relationship confirmed

**Decision**

- Use an independent EPA@Lab logo. Display the MUST and school affiliation as
  supporting interface text rather than embedding it permanently in the logo.
- The supporting text may be shortened or hidden at smaller breakpoints while
  the logo remains intact.

**Next recommended action**

- Continue reviewing the remaining baseline-model decisions before preparing
  representative content and implementing the Home page.

### 2026-08-26 — Statistics and member privacy confirmed

**Decisions**

- Maintain Home-page statistics manually in the Home content record. Values and
  final labels remain provisional pending stakeholder confirmation.
- Do not include email addresses in public member profiles. Approved professional
  or research links remain optional.

**Next recommended action**

- Confirm project categories, publication scope later, News categories, and the
  remaining Home wording before creating representative content.

### 2026-08-26 — Dark theme foundation added

**Reference findings**

- The live SICT `/mn` implementation uses `#0D1538` and nearby deep-navy values
  for its dark foundation, `#111D4A` for repeated card surfaces, white/slate text,
  low-opacity white borders, and the same `#D4712A` orange accent.

**Implemented**

- Added semantic light/dark surface, text, border, header, and hero tokens.
- Added an early system-preference initializer to prevent theme flashing.
- Added a compact header toggle and browser-local preference persistence.
- Updated existing scaffold components to consume semantic theme tokens.

**Next recommended action**

- Validate both themes visually while implementing the complete Home page; each
  subsequent component must be designed and tested in light and dark modes.

### 2026-08-26 — Complete Home-page prototype built

**Implemented**

- Replaced the initial scaffold Home with the stakeholder-defined page flow:
  image-led introduction, Vision, Mission, manual statistics, mentor greeting,
  categorized Research/Projects, News/Activities, and a closing contact prompt.
- Added bilingual provisional Home copy and manual statistic placeholders.
- Added three provisional research-direction records and three provisional
  laboratory-activity records in both languages.
- Added progressive-enhancement category pills for featured research; all cards
  remain visible and usable when JavaScript is unavailable.
- Added reusable responsive-image rendering through Hugo, generating WebP source
  sets at build time.
- Added flexible MUST/EHIS supporting text beneath the independent placeholder
  EPA@Lab logo on desktop; the supporting text hides on small screens.

**Assets**

- Confirmed that `epa1.jpg`, `epa2.jpg`, and `epa3.jpg` are stakeholder-drawn
  wireframes rather than public website photography.
- Extracted selected laboratory and mentor images embedded in `epalab.pdf` for
  provisional design use. Their captions, ownership, and publication consent
  remain subject to stakeholder confirmation.

**Problems and fixes**

- Initial visual rendering showed the long Mongolian hero title crossing its
  grid boundary and overflowing on mobile. Added safe anywhere wrapping and a
  smaller narrow-screen type scale.
- Kept unapproved statistic values as visible em dashes instead of inventing
  numbers that could be mistaken for verified facts.
- Marked every representative project and activity record as provisional in its
  metadata and visible cards.

**Verification**

- `hugo --minify --printPathWarnings` succeeds with 22 Mongolian pages, 20
  English pages, and 24 processed image derivatives reported in the build.
- Rendered and visually inspected the complete Home page at 1440 px desktop and
  390 px mobile widths in dark mode.
- Confirmed responsive layout flow, header collapse, image cropping, content
  hierarchy, project cards, activity cards, CTA, and footer behavior.

**Still unresolved**

- Final Vision, Mission, mentor greeting, statistics, project titles/details,
  news dates, captions, and photo permissions require stakeholder approval.
- The extracted mentor image is low resolution and should be replaced with an
  approved original portrait when available.
- A focused light-theme visual QA pass should accompany stakeholder review.

**Next recommended action**

- Review the Home-page prototype with the stakeholder, collect corrections and
  approved content/assets, then refine Home before using its components to build
  Research/Projects and Members pages.

### 2026-08-26 — Home hero and typography refined

**Feedback incorporated**

- The stakeholder reference favors a full-screen, immersive hero.
- The initial lab-name wrapping was awkward and Vision/Mission lacked emphasis.
- The site needed a deliberate Cyrillic-capable type choice and restrained
  technical motion.

**Implemented**

- Converted the Home hero to a viewport-height, full-bleed photographic layout
  with a strong navy readability gradient.
- Promoted Vision and Mission into two prominent translucent panels anchored at
  the base of the hero.
- Added an original animated SVG power-network overlay with moving signal paths
  and pulsing nodes, inspired by the motion language of the SICT reference but
  specific to EPA@Lab.
- Disabled network animation under `prefers-reduced-motion`.
- Tuned desktop and mobile Mongolian headline sizing and wrapping separately.
- Self-hosted the Noto Sans variable webfont and recorded its SIL Open Font
  License. Added a system monospace stack for technical labels and metadata.

**Verification**

- Rendered and inspected the revised hero at 1440 px and 390 px widths.
- Confirmed that the full-bleed image, overlay network, calls to action, and
  Vision/Mission panels remain legible and ordered correctly on mobile.
- `hugo --minify --printPathWarnings` remains the required final build check.

**Next recommended action**

- Review the revised Home hero and overall Home section density, then make one
  focused polish pass before beginning the Members page.

### 2026-08-26 — Hero viewport behavior corrected

**Problem**

- The hero stage used viewport-relative minimum height while Vision/Mission were
  added below it. On short laptop displays the combined content exceeded the
  first viewport, making the bottom panels look clipped or partially hidden.

**Fix**

- Changed the desktop hero to a column flex layout whose introduction consumes
  the remaining space and whose Vision/Mission row participates in the same
  viewport-height calculation.
- Added height-aware typography and spacing for desktop displays at 850 px tall
  or shorter.
- Removed forced viewport sizing on mobile. Phone layouts use natural document
  height so content remains readable and scrolls normally instead of being
  compressed into one screen.

**Verification**

- Inspected 1440×800 desktop and 390×844 mobile renders.
- Confirmed the complete desktop hero, including both Vision/Mission panels, fits
  within the first viewport at the tested short-laptop size.
- Confirmed mobile presents the introduction first and continues into the
  content panels through ordinary vertical scrolling.

**Next recommended action**

- Review the corrected scrolling behavior in the user's browser, then continue
  with the next page once Home is approved.

### 2026-08-26 — Opening experience split into two screens

**Decision**

- Use two distinct opening chapters instead of combining all introductory
  content in one viewport.
- Screen one contains the lab name, introduction, Explore/About actions,
  photograph, animated network, and Power Automation label.
- Screen two contains Vision, Mission, and the three manually maintained
  statistics.
- Do not use mandatory CSS scroll snapping. Natural scrolling is more accessible
  and avoids trapping trackpad, keyboard, or touch users between sections.

**Implemented**

- Removed Vision/Mission from the photographic hero and restored the hero as a
  focused full-screen brand introduction.
- Added a separate full-viewport Overview section with a technical grid motif,
  stronger section heading, Vision/Mission panels, and integrated statistics.
- Preserved natural-height behavior when mobile content needs more than one
  physical screen.

**Verification**

- Confirmed the first 1440×800 viewport contains the complete hero composition.
- Confirmed the Overview section has an independent `100svh` layout and the
  production Hugo build succeeds.

**Next recommended action**

- Review the two-screen transition in the normal browser preview, then finalize
  Home or begin the Members page.

### 2026-08-26 — Technical identity pass: motifs, equipment, scroll cue

**Implemented**

- Added a reusable inline SVG research-motif partial with three category-specific
  diagrams: protection-relay one-line system, SCADA/HMI topology, and closed-loop
  automation control.
- Replaced the repeated crowd photographs on Home research cards with those
  diagrams, using category-tinted navy surfaces, shared `#6D91FF` line work, and
  orange signal nodes.
- Added a static equipment strip to the second opening screen using real hardware
  families from the supplied project material: ABB, SEL, Megger, RTAC, RTU, PLC,
  Raspberry Pi, Arduino, ESP32, and LoRa.
- Added a keyboard-reachable Hero scroll cue linking to `#direction`, with a
  travelling orange dot and a reduced-motion fallback.

**Decisions**

- Keep the equipment presentation static and scannable instead of using an
  automatically moving marquee.
- Use technical diagrams rather than weak or repetitive photography where the
  category itself is the important visual information.
- Treat the scroll cue as functional navigation, not merely decoration.

**Verification**

- `hugo --minify --printPathWarnings` succeeds with the new inline SVG partial,
  bilingual equipment data, and scroll-cue markup.
- The Home build now processes 15 image derivatives because research-card photos
  are no longer required on Home.

**Next recommended action**

- Review these three additions in the browser, make any final Home polish changes,
  and then begin the Members page.

### 2026-08-26 — Hero treatment, overlay header, and interaction polish

**Implemented**

- Applied a deliberate hero-image treatment combining reduced saturation,
  stronger contrast, navy/orange duotone layering, and a fine dot field so the
  low-resolution source reads as an intentional technical texture.
- Changed the Home header to a fixed transparent overlay over the hero, reclaiming
  the full first viewport. An `IntersectionObserver` applies the solid navy glass
  background, border, blur, and shadow after the hero leaves view.
- Kept inner-page headers unchanged and ensured the mobile Home menu opens on an
  opaque navy surface.
- Extended section numbering into a real sequence: Hero `01`, Direction `02`,
  Mentor `03`, Research `04`, News `05`, and Contact CTA `06`.
- Added orange text selection and refined project/news card hover states with an
  accent border, two-pixel lift, shadow, and project-arrow movement.

**Decisions**

- Treat the provisional hero image as atmospheric visual texture instead of
  attempting to simulate sharpness it does not contain.
- Use `IntersectionObserver` for header state rather than continuous scroll-event
  calculations.
- Keep interaction motion restrained and preserve keyboard focus behavior.

**Verification**

- Rendered and inspected the updated Home hero at 1440×800 and 390×844.
- Confirmed header contrast, mobile navigation control visibility, image/text
  balance, scroll-cue separation, and Power Automation tag placement.
- `hugo --minify --printPathWarnings` succeeds with 22 Mongolian pages, 20
  English pages, and 15 processed image derivatives.

**Next recommended action**

- Treat the Home page as the visual baseline and begin implementing the Members
  page with joined-year grouping, profiles, and achievements.

### 2026-08-26 — Footer redesigned

**Implemented**

- Rebuilt the footer as a responsive three-column layout: EPA@Lab identity and
  social controls, primary navigation mirroring the header, and localized contact
  information.
- Added Instagram and Facebook icon controls backed by `instagramURL` and
  `facebookURL` site parameters.
- Added localized institution/address text, a Contact-page direction link, and a
  bottom row containing copyright, affiliation, and Back-to-top navigation.
- Added a subtle engineering-circle background motif, improved vertical rhythm,
  clearer type hierarchy, and responsive tablet/mobile stacking.

**Decision**

- Do not link to generic social-media homepages or invent EPA@Lab account URLs.
  Instagram and Facebook appear as visibly disabled placeholders until the
  stakeholder provides approved account links; setting the two configuration
  values automatically renders functional external links.

**Verification**

- Confirmed six localized primary-navigation links render in the Mongolian footer.
- Confirmed both social placeholders render in Mongolian and English builds.
- `hugo --minify --printPathWarnings` succeeds with the new footer.

**Still unresolved**

- Approved EPA@Lab Instagram and Facebook URLs are required to activate the
  social links.

**Next recommended action**

- Add the approved social URLs when available, then begin the Members page.

### 2026-08-26 — Direction screen simplified

**Problem**

- The second opening screen contained too many competing boxed systems: a
  heading, two glass cards, a four-column statistics block, and a bordered
  equipment strip. Similar visual weight across all elements obscured the
  intended reading order.

**Fix**

- Removed the Vision/Mission card backgrounds and replaced them with one calm
  editorial row separated by a single vertical rule.
- Increased Vision/Mission text prominence while reducing surrounding decoration.
- Removed the redundant “EPA in numbers” explanatory column and retained only
  three equal statistics.
- Simplified the equipment area into a quiet unboxed rail with lighter dividers.
- Established the hierarchy as section heading, Vision/Mission, statistics, then
  equipment.
- Corrected tablet and mobile grid/divider rules left over from the former
  four-column layout.

**Verification**

- `hugo --minify --printPathWarnings` succeeds for both languages.

### 2026-09-02 — Projects index and detail draft

**Decisions**

- Projects have no research-category field or category filter.
- Treat the current SICT site as institutional visual context: strong blue
  surfaces, clear hierarchy, compact metadata, and image-led sections, without
  copying its layout.

**Implemented**

- Added a bilingual Projects index with an editorial hero and alternating
  image/text project records.
- Added bilingual project detail presentation for client, collaborators,
  free-form duration, implementation site, objective, completed work, related
  publications, and image gallery.
- Updated all three provisional project records to the confirmed schema.
- Removed category-dependent project markup and filtering from Home and deleted
  the now-unused filtering JavaScript.

**Verification**

- Reviewed index and detail renders at 1440, 820, and 390 px.
- Confirmed responsive title wrapping, single-column mobile metadata, image
  scaling, and visible provisional-content labels.
- `hugo --minify --printPathWarnings` and `git diff --check` succeed.

**Next recommended action**

- Review the visual draft, then replace provisional project copy and imagery
  when stakeholder records become available.

### 2026-09-02 — Structured About page draft

**Implemented**

- Rebuilt About as a bilingual data-driven page with an image-led introduction,
  founding date, chronological history, achievement cards, and repeatable
  teacher biographies.
- Added representative records for every content shape, with visible labels on
  all invented or unverified information.
- Kept the PDF-supported January 2025 establishment milestone separate from
  provisional milestones and biographies.
- Documented the final About front-matter schema so real records can replace
  samples without modifying the template.

**Verification**

- Reviewed the complete Mongolian page at 1440, 820, and 390 px, including
  history, achievements, teacher biographies, editor note, and footer.
- Confirmed the English structure builds and resolves responsive images.
- `hugo --minify --printPathWarnings` and `git diff --check` succeed.

**Next recommended action**

- Build the final Members presentation using the confirmed first- and
  second-generation grouping, then refine Publications.

### 2026-08-26 — Hero technical badge removed and marker relocated

- Removed the Power Automation badge from the hero completely.
- Moved section marker `01` to the lower-right vertical navigation cue, directly
  above `Доош / Scroll`, leaving the affiliation eyebrow and headline uncluttered.
- Applied the same cue hierarchy across desktop and mobile.
- `hugo --minify --printPathWarnings` succeeds for both languages.

### 2026-08-26 — Home hero accepted as a workable baseline

**Current status**

- The revised responsive Home hero is accepted as a decent baseline for this
  stage. Further polish can wait until the remaining Home sections and real
  stakeholder assets are reviewed together.
- The next area requiring improvement is the Direction screen, especially the
  Vision and Mission content, hierarchy, spacing, and responsive presentation.
  Its current implementation is functional but not yet considered approved.

**Next recommended action**

- Refine Vision and Mission before moving into the Members page implementation.

### 2026-08-26 — Desktop hero copy raised slightly

- Raised the lower-left desktop copy block by a small responsive offset so it
  remains below center without feeling pinned to the bottom edge.
- Short desktop viewports use a smaller offset. Mobile, the image, technical
  badge, and scroll cue remain unchanged.
- `hugo --minify --printPathWarnings` succeeds for both languages.

### 2026-08-26 — Hero marker hierarchy and utility collision corrected

**Fixes**

- Moved Hero marker `01` into the small affiliation/eyebrow row so it no longer
  floats awkwardly beside or beneath the headline.
- Defined intentional three-line headings in both languages: `Electrical Power /`
  `Automation / Laboratory` and `Цахилгаан эрчим хүчний / автоматжуулалтын /`
  `лаборатори`.
- Standardized desktop rhythm to 16 px after the eyebrow, 24 px before the
  subtext, and 32 px before the action row.
- Separated the lower-right utilities: Power Automation is now horizontal and
  inset from the edge, while the vertical Scroll cue occupies the far-right rail.
- On mobile, the affiliation remains hidden and `01` stays as the compact title
  introduction.

**Verification**

- `hugo --minify --printPathWarnings` succeeds for both languages.

### 2026-08-26 — Mobile hero animation replaced with a power pulse

**Decision and implementation**

- The desktop network SVG has a deliberately right-weighted drawing and could
  not look optically centered on narrow screens through positioning alone.
- Mobile now uses a dedicated, symmetric power-pulse SVG: concentric engineering
  rings, circuit spokes, terminal points, a slowly rotating dashed ring, and one
  restrained orange pulse at its center.
- The original flowing network remains unchanged on tablet and desktop. The new
  animation is decorative, ignored by assistive technology, and fully static
  when reduced motion is requested.

**Verification**

- `hugo --minify --printPathWarnings` succeeds for both languages.

### 2026-08-26 — Mobile power-pulse experiment reverted

**Decision**

- The symmetric power-pulse animation did not suit the hero in review, so it was
  removed completely.
- Restored the earlier flowing power-network graphic and its mobile placement.
  All other approved mobile hero hierarchy, title, action, and scroll-cue changes
  remain in place.

**Verification**

- Confirmed no power-pulse markup or animation styles remain in the rendered
  implementation.
- `hugo --minify --printPathWarnings` succeeds for both languages.

### 2026-08-26 — Mobile hero changed to a minimal photographic composition

**Reference direction and implementation**

- Adopted the hierarchy of the stakeholder-provided mobile reference without
  copying its branding: full-height photograph, quiet transparent header,
  lower-third editorial copy, compact pill action, and an edge-aligned vertical
  scroll cue.
- Increased photograph presence and replaced the heavy full-screen navy wash
  with a focused bottom gradient that protects text contrast.
- Moved the entire hero message into one cohesive lower block. The `01` marker
  now introduces the title, followed by the description and both actions.
- Removed the power-network and technical badge from mobile because they competed
  with the minimal photographic direction. Both remain available on desktop.
- Added a height-aware compact variant for shorter phones.

**Verification**

- Confirmed the changes are scoped to the mobile breakpoint and preserve the
  approved desktop composition.
- `hugo --minify --printPathWarnings` succeeds for both languages.

### 2026-08-26 — Mentor quote justified

- Justified the mentor greeting using inter-word spacing while preserving its
  editorial measure, typography, and orange rule.
- `hugo --minify --printPathWarnings` succeeds for both languages.

### 2026-08-26 — English school abbreviation corrected

- Corrected the English school abbreviation from `SPEE` to `PES` in the header,
  Home hero affiliation, and footer lockup.
- Retained the existing full English school name where an unabbreviated address
  or affiliation is appropriate.
- `hugo --minify --printPathWarnings` succeeds for both languages.

### 2026-08-26 — Desktop hero aligned to the photographic reference

**Placement changes**

- Moved the desktop hero title, description, and actions from vertical center to
  a cohesive lower-left composition, matching the approved mobile direction and
  the supplied photographic reference.
- Reduced the desktop title measure slightly so the image retains open space and
  the copy reads as one deliberate block.
- Moved the Scroll cue to the lower-right edge in a vertical orientation and
  placed the Power Automation badge above it to avoid overlap.
- Added a compact lower-third variant for short desktop displays while preserving
  the full-height hero.

**Verification**

- `hugo --minify --printPathWarnings` succeeds for both languages.

### 2026-08-26 — Mobile hero title made language-aware

**Problem and decision**

- A universal no-wrap rule kept the English title tidy but caused the much
  longer Mongolian title phrases to overflow the viewport.
- Adopted a language-aware editorial title pattern instead of adding decorative
  mobile-only graphics: English retains its two intentional lines, while
  Mongolian uses balanced natural wrapping, a slightly smaller responsive scale,
  and a readable `15ch` measure.
- On extremely narrow screens below 350 px, English may also wrap safely rather
  than clip.

**Verification**

- Confirmed selectors use the existing document `lang` attribute and therefore
  work for both localized builds without duplicate templates.
- `hugo --minify --printPathWarnings` succeeds for both languages.

### 2026-08-26 — Mobile power animation centered

**Change**

- Repositioned and widened the animated power-network graphic so its visible
  paths and nodes occupy the open middle of the mobile hero rather than hugging
  the right edge.
- Added a shorter-height adjustment that keeps the animation between the title
  and lower action panel without competing with either.
- Desktop animation placement remains unchanged.

**Verification**

- `hugo --minify --printPathWarnings` succeeds for both languages.

### 2026-08-26 — Mobile hero hierarchy cleaned up

**Problem and fix**

- Removed the restrictive `11ch` mobile title width that made the intended
  two-line English title break into four awkward lines. Localized title phrases
  now remain intact, with responsive type sized for narrow phones.
- Consolidated the lower calls to action into one full-width group with a subtle
  divider, full-width primary button, and quieter secondary link.
- Hid the redundant Power Automation badge on mobile and converted the remaining
  Scroll cue into a compact horizontal marker at the lower-right edge.
- Retained the richer desktop hero without modification.

**Verification**

- `hugo --minify --printPathWarnings` succeeds for both languages.
- Confirmed the statistics render as three columns on tablet and one column on
  mobile, without an empty legacy column.

**Next recommended action**

- Review the calmer Direction screen, then move to Members once Home is approved.

### 2026-08-26 — Introductory markers and statistic preview refined

**Changes**

- Replaced the large orange `01 / POWER AUTOMATION` block with a quieter
  translucent technical label and orange signal dot.
- Removed `01` and `02` from the individual Vision and Mission statements.
- Briefly tested `01`, `02`, and `03` as statistic indices, then removed them after
  clarifying that the request was for representative statistic values.
- Added provisional display values `12+`, `6+`, and `14+` so the stakeholder can
  evaluate the scale, spacing, and typography of real-looking metrics. These are
  design placeholders, not verified laboratory facts.

**Verification**

- Confirmed all three provisional statistic values render in the generated Home
  page without index labels.
- `hugo --minify --printPathWarnings` succeeds for both languages.

**Next recommended action**

- Review the revised markers and continue to Members when Home is approved.

### 2026-08-26 — Hero title wrapping and section-number order corrected

**Problem**

- Automatic wrapping made the long Mongolian laboratory name break at awkward
  points. Section numbers also preceded titles, competing with the content before
  visitors knew what each section was about.

**Fix**

- Added localized `hero_title_lines` to give Mongolian and English intentional
  phrase grouping while preserving the full semantic page title in metadata.
- Restored Hero section number `01` beside the title rather than inside the Power
  Automation label.
- Reordered the visual hierarchy throughout Home to show each section title first
  and its `0x` marker second.
- On mobile, the Hero number moves beneath the title so it cannot reduce available
  line width.

**Verification**

- Rendered and inspected the revised title at 1440×800 and 390×844.
- Confirmed the number follows the title in DOM and visual order and the bilingual
  production build succeeds.

**Next recommended action**

- Approve Home and begin the Members page, or provide any final Home corrections.

### 2026-08-26 — Mentor and Research viewport fit refined

**Problem**

- The Mentor quote used billboard-scale typography and the portrait consumed too
  much vertical space.
- Research combined generous section padding, 4:3 diagrams, long card bodies,
  filters, and headings, pushing the section beyond common laptop viewports.

**Fix**

- Restyled the Mentor message as a smaller editorial pull quote with an orange
  rule, wider readable measure, and more restrained weight.
- Constrained and recropped the mentor portrait while preserving the two-column
  composition.
- Made Mentor and Research centered `100svh` chapters on desktop, with a compact
  height-aware variant for displays 850 px tall or shorter.
- Changed research diagrams to wide formats, shortened card-body minimum height,
  clamped summaries to three lines, and tightened short-screen headings, filters,
  padding, and controls.
- Kept tablet and mobile sections at natural content height.

**Verification**

- Confirmed the new Mentor and Research anchors and wide SVG view boxes render in
  generated HTML.
- `hugo --minify --printPathWarnings` succeeds for both languages.

**Next recommended action**

- Review Mentor and Research at the user's actual viewport, then proceed to
  Members when Home is approved.

### 2026-08-26 — Mobile hero viewport composition corrected

**Problem**

- The mobile hero stage had a fixed `38rem` height inside a `100svh` hero. On
  taller phones, the Scroll and Power Automation markers therefore appeared in
  the middle of the screen with a large accidental empty area below them.
- The mobile image treatment was so dark that the photograph did not contribute
  enough depth to balance the text-heavy upper half.

**Fix**

- Made the internal mobile stage fill the viewport and anchored both utility
  markers to a consistent bottom rail.
- Tightened the title, lead, and action rhythm while retaining comfortable touch
  targets and the deliberate three-line English title.
- Improved the portrait crop and contrast, strengthened the lower gradient for
  legibility, and repositioned the animated network behind the content.
- Added a compact height-aware layout for phones in landscape or under 700 px
  tall, without changing the approved desktop hero.

**Verification**

- Confirmed the mobile-only rules do not affect breakpoints above 600 px.
- `hugo --minify --printPathWarnings` succeeds for both languages.

**Next recommended action**

- Review the revised hero on the target phone width, then begin the Members page
  if Home is approved.

### 2026-09-02 — Stakeholder structure incorporated into the plan

**Decisions**

- Adopt six primary sections: Home, Projects, Publications, About Us, Contact,
  and Members.
- Use publication/project/alumni counts on Home; partner organizations are optional.
- Group Members by generation/cohort and expose those groups through a submenu.
- Present Publications as a table with name, year/month, file, optional text,
  and optional external link.
- Model Projects around commissioned work: client, collaborators, duration,
  objective, implementation site, results/related publications, and gallery.

**Planning updates**

- Revised the scope, URLs, content architecture, implementation phases, open
  questions, launch definition, and baseline content model.
- Kept News as a supporting Home section outside the confirmed primary
  navigation; marked Equipment as legacy prototype material.

**Implemented**

- Replaced the bilingual primary navigation with the six confirmed sections.
- Added first- and second-generation Members submenu links and in-page groups.
- Added the Publications collection and responsive table layout.
- Updated the project archetype and added a structured project detail layout.
- Updated Home statistics to publications, projects, and alumni, and replaced
  the equipment strip with an optional Home-only partner strip.
- Added explicitly marked provisional records for layout testing only.

**Verification**

- `hugo --minify --printPathWarnings` succeeds for both languages.
- Visually checked Home, Members, Publications, and the project detail structure
  at 1440 px, 820 px, and 390 px; headings and long sample text wrap without
  horizontal overflow.

**Next recommended action**

- Refine the Projects listing to match the new commissioned-work model, then
  build the About history/achievements/teacher-bio structure.

### 2026-08-26 — Mobile hero actions moved to the lower composition

**Decision and fix**

- On mobile only, moved the Explore Research button and About Laboratory link
  from directly beneath the introduction to the bottom of the hero.
- The actions now form a distinct lower call-to-action group above the Scroll and
  Power Automation utility rail. Short phones use a tighter bottom offset and
  spacing to prevent overlap.
- Desktop and tablet compositions remain unchanged.

**Verification**

- `hugo --minify --printPathWarnings` succeeds for both languages.

### 2026-09-02 — Publications refinement and Contact draft

**Implemented**

- Refined the bilingual Publications index while retaining its table-oriented
  direction, added newest-first sorting, independent file/external-link actions,
  and a clear pending state.
- Built a bilingual Contact page using the PDF-sourced location and supervising
  lecturer.
- Initially added a visual Google Maps link; this was subsequently replaced by
  the stakeholder-supplied interactive Google Maps embed.
- Kept the missing official email visible as awaiting confirmation rather than
  inventing an address.
- Did not duplicate the annually changing lab leader on Contact; leadership
  remains managed through its separate term records.

**Verification**

- Reviewed Publications and Contact at 1440, 820, and 390 px.
- Confirmed long-title wrapping, newest-first dates, missing-link and missing-email
  states, responsive contact facts, and the map-card layout.
- `hugo --minify --printPathWarnings` and `git diff --check` succeed.

**Next recommended action**

- Restructure Home around the approved statistics and optional Home-only partner
  section while retaining the existing featured News block.

### 2026-09-02 — Stakeholder map embed applied

- Replaced the illustrative map preview with the exact Google Maps iframe
  supplied by the stakeholder.
- Preserved lazy loading, fullscreen support, strict referrer policy, responsive
  sizing, an accessible title, and a coordinate-based external Maps link.
- The Contact page now makes a third-party Google request when the embedded map
  approaches the viewport; this is an accepted consequence of the requested embed.

### 2026-09-02 — Home aligned to final information architecture

**Implemented**

- Removed the legacy equipment/partner strip from Home.
- Retained the hero, vision/mission, mentor introduction, and confirmed
  publication/project/alumni statistics.
- Reworded project calls to action and headings around commissioned project work,
  with no research categories or filters.
- Added a newest-generation section driven by the descending generation data;
  future generations will automatically replace the current featured group.
- Added a dedicated Home-only partner section with repeatable structured records.
- Marked all unconfirmed statistics, members, projects, and partners visibly as drafts.

**Verification**

- Confirmed bilingual generation, project, and partner output in generated HTML.
- Reviewed the Home hero at 1440, 820, and 390 px and retained the established
  responsive behavior for section grids at those breakpoints.
- `hugo --minify --printPathWarnings` and `git diff --check` succeed.

**Next recommended action**

- Add Pages CMS schemas for the completed content models.

### 2026-09-02 — Featured News retained on Home and navigation

- Restored the existing bilingual featured News block after Projects at the
  stakeholder's request; its content and card presentation remain unchanged.
- Restored News to the bilingual primary navigation, linking to its existing
  listing and detail routes.
- Renumbered the following Home sections to preserve a continuous sequence.

### 2026-09-02 — Members header link simplified

- Removed generation links from the Members header dropdown and retained a
  single direct Members link. Generation navigation remains within the Members
  page, where future cohorts can continue to stack dynamically.

### 2026-09-02 — Primary navigation reordered

- Reordered the bilingual header and footer navigation as Home, About,
  Projects, Publications, News, Members, and Contact. This moves institutional
  context forward, keeps the laboratory's work together, and leaves Contact as
  the final action-oriented destination.

### 2026-09-02 — Public telephone removed

- Removed the supervising teacher's telephone number from site configuration,
  Contact content, the Contact layout, and the footer. Email is now the only
  direct-contact field; its public address remains pending stakeholder input.

### 2026-09-02 — Home equipment restored and About people scope reduced

- Restored the compact laboratory-equipment strip on Home using a structured
  bilingual-page field that can be replaced with approved values later.
- Replaced About's repeatable teacher list with one supervising-teacher object
  and removed the provisional additional lecturer/researcher.

### 2026-09-04 — Design system Phase A: tokens and stylesheet structure

**Decisions**

- Adopted a hybrid visual direction. The SICT reference supplies the
  institutional shell — one section-heading pattern, flat cards in even grids,
  disciplined color, predictable rhythm. EPA@Lab keeps its own signature: the
  full-screen photographic Home hero with the animated power network, the
  technical SVG motifs, and monospace technical labels.
- Retired the `01`–`08` section numbering on inner pages; it remains on Home
  only, where the sequence is a genuine navigational aid.
- Established `docs/DESIGN_SYSTEM.md` as the canonical design reference. The
  handbook keeps decisions; the design document keeps implementation rules.

**Problem**

- Styling had been written page by page with no shared layer. One 63 KB
  `main.css` held nine hero variants, ten card variants, and five
  section-heading patterns doing the same job, with breakpoints at 350, 600,
  601, 900, and 901 px plus three height-based queries. Tokens covered color
  only, so every component restated its own `clamp()` values.

**Implemented**

- Split `assets/css/main.css` into twelve ordered parts under
  `assets/css/parts/`, concatenated by `head.html` into the same single
  fingerprinted stylesheet. The numeric prefixes define the cascade: tokens,
  base, header, components, page files, home, footer, responsive.
- Extended the token set beyond color to typography, space, shape, elevation,
  and motion, and added an `--on-dark-*` group to replace the roughly 48 inline
  `rgb(255 255 255 / x%)` literals as components are migrated.
- Removed dead rules: the unused legacy `hero` block, `signal`, `intro-copy`,
  `card__index`, the research `filter-pill` controls left over from the removed
  category filter, and the decorative fake-map elements superseded by the
  Google Maps embed.

**Problems and fixes**

- `var(--muted)` was used three times but never defined, so the declaration was
  invalid and dropped. Publication-table headings, publication summaries, and
  project-fact labels were inheriting their parent color instead of the muted
  slate. Corrected to `var(--text-muted)`.

**Verification**

- Diffed every declaration in the original stylesheet against the concatenated
  parts. The only differences are the intended deletions and the one rewrite of
  a rule that referenced the unused `.stats__intro` selector.
- Confirmed the built stylesheet's byte offsets follow the intended cascade
  order, and that all brace counts balance per part.
- `hugo --minify --printPathWarnings` succeeds: 28 Mongolian pages, 26 English
  pages, 24 processed images.
- Rendered Home and Publications at 1440 px and confirmed no visual regression
  from the restructure.

**Next recommended action**

- Phase B: reduce nine heroes to two, ten cards to three, and five
  section-heading patterns to one; migrate the on-dark literals to tokens and
  standardise the breakpoints.

### 2026-09-04 — Design system Phase B: one section-heading pattern

**Implemented**

- Added `layouts/partials/section-head.html`, a single heading component
  replacing `section-heading`, `about-section-heading`,
  `members-section-heading`, `home-overview__heading`, and
  `generation-heading`. It takes a required title plus optional eyebrow,
  supporting paragraph, Home sequence index, short technical meta note,
  "view all" link, and an on-dark flag.
- Adopted the reference site's short orange rule beneath the section title. The
  eyebrow is muted inside a section head so the rule is the only accent there;
  `.eyebrow` remains orange in every other context.
- Applied the component to all five Home section heads, all three About heads,
  and both the Members leadership head and the repeating generation heads.
- Made the section head own the space beneath itself and removed the now
  duplicated `margin-top` from the grids and lists that follow one.

**Verification**

- Confirmed the rendered page counts: five heads on Home in both languages,
  three on About, three on Members.
- Reviewed Home, About, and Members at 1440 px in both the light and the
  navy-surface contexts; corrected the sequence index and "view all" link to
  share one baseline-aligned row after the first render stacked them awkwardly.
- Confirmed the breakpoint rules land in the correct media blocks in the built
  stylesheet: split heads stack at tablet, all heads stack and left-align at
  mobile.
- `hugo --minify --printPathWarnings` succeeds and no layout or stylesheet still
  references the five removed heading classes.

**Not verified**

- Visual checks at mobile and tablet widths could not be performed in this
  session. The window manager on this machine tiles browser windows and ignores
  programmatic resize requests, so every screenshot returned at desktop width.
  The mobile rules were verified in the built CSS rather than on screen and
  should be confirmed in a browser before this step is considered closed.

**Known issue, deferred**

- On desktop the Mentor and Projects sections are forced to `min-height:
  100svh`, leaving a large empty band beneath their content when it does not
  fill a viewport. This predates the section-head work and belongs to Phase C.

**Next recommended action**

- Continue Phase B with the card consolidation: ten card variants down to
  `media-card`, `list-row`, and `person-card`.

### 2026-09-04 — Design system Phase B: three card components

**Implemented**

- Replaced eight near-duplicate card variants with three components, each
  driven by its own partial. `media-card` covers Home project cards, Home news
  cards, and — through a feature modifier — the About achievement cards.
  `person-card` covers the Members grid and the Home newest-generation strip.
  `list-row` covers the Projects index rows, the About supervising-lecturer
  entry, and the Members leadership cards.
- Added shared `card-grid--3` and `card-grid--2` helpers, replacing five
  near-identical grid declarations, and made `provisional-badge` the single
  overlay label for draft content on any card media.
- Kept `partner-card` separate because it is a text row with no media, and kept
  the generic `card` used by the default list template.
- Made the card arrow decorative markup rather than a second link. The card
  title already links to the same destination, so the previous arrow duplicated
  it for keyboard and screen-reader users.
- Removed the dead `project-card__media--*` category gradients, left over from
  the removed research-category cards, and the provisional-badge override whose
  selector was no longer reachable.

**Problems and fixes**

- The first version of the supervising-lecturer row inherited the full-width
  project-row proportions, so the portrait filled more than half the row and
  pushed the biography out of view. Added a portrait variant that restores the
  narrow image column and its own spacing.
- `teacher-list` and the new row component both drew a top border, producing a
  doubled rule. The container's border was removed; the row now owns it.

**Verification**

- Component counts in the built pages match the content: six media cards and
  one person card on Home in both languages, two achievements and one lecturer
  row on About, two person cards and one leadership row on Members, three rows
  on Projects.
- Reviewed Home, About, Members, and Projects at desktop width in both
  languages, confirming alternating project rows, the achievement year stamp,
  the leadership term range, portrait proportions, badge placement, and card
  hover behaviour.
- Confirmed the shared badge rule now precedes its overrides in the built
  stylesheet and that all stylesheet parts remain brace-balanced.
- `hugo --minify --printPathWarnings` succeeds and no layout or stylesheet
  references any of the eight removed card classes.

**Not verified**

- As in the previous step, mobile and tablet widths could not be checked
  visually because the window manager on this machine ignores programmatic
  browser resizing. The breakpoint rules were updated and read back from the
  built stylesheet, but they need confirmation in a real browser.

**Noted**

- `layouts/partials/research-motif.html` and its stylesheet rules are not called
  by any layout. They are the technical SVG diagrams named in the design
  direction, so they were left in place rather than deleted; they should be
  either reinstated somewhere or removed deliberately.

**Next recommended action**

- Finish Phase B by consolidating the seven remaining hero variants into
  `home-hero` and a single `page-hero`.

### 2026-09-04 — Design system Phase B complete: one page hero

**Implemented**

- Replaced seven hero variants with a single `page-hero` partial and component.
  Home keeps its own signature hero unchanged. Supplying an image selects the
  split navy/photograph shape used by About and the project detail pages;
  otherwise the component renders the navy band with the title left and
  supporting text plus an optional count right.
- Replaced page-specific hero decorations with generic slots: a labelled stamp
  for the About founding date, a vertical media label for project detail pages,
  and a back link.
- Extended the band hero to the News list, the generic single-page template,
  and the 404 page, which previously used a lighter separate header. Those
  three pages now match the rest of the site.
- Deleted the unused research-motif partial and its stylesheet rules at the
  stakeholder's direction.

**Verification**

- Every page renders exactly one hero, and the split variant appears only on
  About and the three project detail pages.
- Reviewed About, a project detail page, Publications, News, Contact in English,
  and the 404 page at desktop width; confirmed the founding stamp, back link,
  count figure, decorative circle, and draft label all render in the unified
  component.
- Audited every class selector in the stylesheet against the built HTML. No
  orphaned rules remain; the eight unmatched selectors are conditional-render
  states their templates still emit, such as the missing-portrait placeholder
  and the empty-section message. Removed one genuinely dead selector found this
  way.
- `hugo --minify --printPathWarnings` succeeds and all stylesheet parts remain
  brace-balanced.

**Result of Phases A and B**

- One 63 KB stylesheet became twelve ordered parts totalling 48 KB minified.
- Nine hero variants became two, ten card variants became three, and five
  section-heading patterns became one, each with a documented partial.

**Not verified**

- Mobile and tablet widths still have not been checked visually; the window
  manager on this machine ignores programmatic browser resizing. Every
  breakpoint rule was updated and read back from the built stylesheet, but the
  responsive behaviour of the new section-head, card, and hero components needs
  confirmation in a real browser before Phase D.

**Next recommended action**

- Phase C: apply the remaining institutional details from the reference — the
  header utility strip, the navy news-card variant, and the statistics
  treatment — and fix the desktop full-viewport rule that leaves a large empty
  band beneath the Mentor and Projects sections.

### 2026-09-04 — Design system Phase C: institutional language

**Implemented**

- Added a utility strip above the primary navigation, carrying the laboratory's
  location and, once their site parameters are set, its email address and
  social accounts. It is hidden on Home so the full-bleed hero still opens the
  page uninterrupted. The theme toggle and language switcher deliberately
  remain in the main navigation row, so no function depends on the strip.
- Added the solid navy News card treatment, including the reference site's
  orange signal dot before the first metadata item. Projects keep the light
  card, so the two Home sections now read as distinct kinds of content.
- Migrated 24 on-dark opacity literals to the `--on-dark-*` and
  `--line-on-dark` tokens. Only values within three percentage points of a
  token were converted, so no visible change results; genuinely distinct
  values were left as literals rather than flattened into the wrong bucket.

**Problems and fixes**

- The Mentor and Projects sections were pinned to `100svh` on desktop, leaving
  a large empty band beneath their content. Removed that rule together with the
  shrink-to-fit compensations that existed only to squeeze content into a
  viewport. Both sections now use the normal section rhythm, and height-based
  media queries are confined to the Home hero and overview.
- With that empty band gone, the mentor greeting's justified setting became
  clearly visible and clearly wrong: it opened wide rivers of white space
  because Mongolian words are long and do not hyphenate, leaving too few break
  opportunities per line. This reverses the earlier decision to justify that
  quote; it is now ragged-right with balanced wrapping.

**Deliberately not changed**

- The Home statistics. The reference draws its figures as circular progress
  rings, but EPA's large numerals with vertical rules already read well and are
  more honest about values that remain provisional. Copying the rings would
  have been mimicry without benefit.

**Verification**

- Reviewed Home, About, and Members at desktop width in both the dark and light
  themes. Confirmed the utility strip renders the correct localized address in
  each language, is absent on Home, and stacks correctly with the navy hero
  beneath the white navigation row.
- Confirmed the Mentor to Projects transition now flows with normal spacing and
  that the mentor greeting sets cleanly without justification rivers.
- Re-ran the selector audit: no new orphaned rules: the same seven
  conditional-render selectors remain, all still emitted by their templates.
- `hugo --minify --printPathWarnings` succeeds and all parts remain
  brace-balanced.

**Not verified**

- Mobile and tablet widths, for the third time. The window manager on this
  machine ignores programmatic browser resizing, so all verification has been
  at desktop width. This is now the single largest gap in the design work and
  is the first task of Phase D.

**Next recommended action**

- Phase D quality assurance, starting with a real-browser pass at 360, 768, and
  1440 px in both languages and both themes, then contrast, reduced motion, and
  keyboard navigation.

### 2026-09-04 — Grid and hero scales, then the News section

**Two global fixes, applied before page work so it would not be redone**

- Split the card grid by what the card carries. Media cards still drop to one
  column on phones, because their metadata, title and three-line summary become
  unreadable in a 150 px column. Person cards now hold two columns down to
  340 px, with reduced padding and type, which halves the scroll on a long
  members page. The one-column threshold is deliberately 340 px rather than
  380 px, because 360, 375 and 390 are the most common phone widths.
- Rebalanced the page hero into three scales. The split photograph hero on
  About and project detail is unchanged. The band hero used by the section
  indexes lost half its padding and had its title capped at 4rem: at 1440x900 a
  two-line title previously consumed about 69% of the first screen. News
  articles get a distinct light article header instead.

**News section built**

- News previously had no templates of its own and fell back to the generic
  ones, so its index rendered articles as plain bordered boxes with no image
  while Home showed the same three articles as rich navy cards, and the article
  page was a hero plus prose. Added `news/list.html` and `news/single.html`.
- The index now uses the same inverted navy media cards as Home, showing
  category and date. The article page has a back link, category, title,
  summary, date, cover photograph, body, optional tags and optional gallery.
- Added `data/news_categories.toml` with the five baseline keys from the content
  model and their localized labels, following the generations pattern, plus a
  `news-category.html` partial that resolves a key and falls back to showing the
  raw key so an unexpected value is visible rather than blank.
- The content model marks `date` required, but all three sample records omit it
  and say in their body text that the date awaits laboratory review. Rather than
  invent dates, the templates render a visible pending state and sort by
  editorial weight until real dates arrive, at which point they switch to
  newest-first automatically.

**Verification**

- Verified at real mobile and tablet widths for the first time, by rendering
  pages inside sized iframes: media queries respond to iframe width, which works
  around this machine's window manager refusing programmatic browser resizing.
- Confirmed by computed style that the people grid resolves to two columns at
  360 px and one at 320 px, and inspected the rendered cards at both.
- Reviewed the News index and article at 360 px and 768 px and the article at
  desktop width, in both languages. Category labels and the pending-date state
  resolve correctly in Mongolian and English.
- `hugo --minify --printPathWarnings` succeeds; all parts remain
  brace-balanced. The selector audit reports eleven unmatched selectors, all
  conditional-render states, four of them the new gallery and tag rules that
  appear once a record carries those fields.

**Problems and fixes**

- The first people-grid threshold of 380 px meant almost every real phone fell
  back to one column, defeating the change. Lowered to 340 px after measuring
  the rendered column width.
- The new article rules were first appended as a second `max-width: 600px`
  block at the end of the responsive file, breaking the one-block-per-breakpoint
  rule this project documents. Folded into the existing block.

**Next recommended action**

- Continue the page-by-page pass with Publications, then Contact, Members,
  Projects, About and Home, checking each at 360, 768 and 1440 px as it is done.

### 2026-09-04 — News and index header scale reduced

**Problem**

- Both the News index and the News article rendered their title at 64 px, and
  the article's lead, cover height and internal spacing were scaled to match a
  title that large. A one-word index title such as "Мэдээ" read as a billboard.

**Fixes**

- Reduced the band-hero title to a 2.9 rem maximum and its lead to 1.12 rem. An
  index title is a label rather than a statement. This applies to every index
  page, not just News, because they share the one hero component.
- Reduced the article title to a 3.2 rem maximum, one step above an index label
  because there the title is the content, and brought the lead, header padding,
  back-link spacing, meta spacing and cover height down with it. The cover
  maximum fell from 34 rem to 26 rem.
- Added a reduced top padding for the block that follows any page header. The
  standard section rhythm is tuned for the gap between sections; stacked on the
  header's own bottom padding it produced 208 px of dead space before the first
  content on every index page. Measured on News, the gap is now 56 px. Split
  heroes keep more breathing room, since About and project detail are editorial
  compositions.

**Verification**

- Measured the gap in the browser before and after rather than estimating, and
  confirmed the new rule resolves to the correct next sibling on all seven pages
  that use a hero.
- Reviewed the News index, News article and Publications at desktop width, and
  at 360 px and 768 px through sized iframes.
- `hugo --minify --printPathWarnings` succeeds.

**Next recommended action**

- Continue the page-by-page pass with Publications, then Contact, Members,
  Projects, About and Home.

### 2026-09-04 — News article restructured to the stakeholder's reference

**Reference**

- `dev.zuttomongolia.com/en/news/nomadic-culture`, supplied by the stakeholder
  as the structure to follow for News. Measured rather than eyeballed: at a
  1680 px viewport its container is 1312 px, the title and cover span it fully,
  and the body is a 768 px column centred beneath them.

**Implemented**

- Replaced the article header with that structure: a breadcrumb, then the title
  and cover photograph at full container width, then a byline row with category,
  date and reading time on the left and share controls on the right. The body is
  a 48 rem column centred under them. EPA's container is 1216 px, so the body
  measure matches the reference's 768 px exactly.
- Dropped the summary paragraph from the article page. `summary` is defined in
  the content model as a card and metadata field, and the reference shows no
  such lead; repeating it under the title duplicated the card the reader just
  clicked.
- Added reading time from Hugo's built-in count, localized in both languages.
- Added two share controls: a copy-link button and a Facebook share link. No
  third-party script is loaded; the Facebook control is a plain outbound URL and
  the copy button uses the clipboard API with a silent fallback, which keeps the
  no-tracker requirement intact.
- The article gallery moved to three columns to sit under the wider layout.

**Problems and fixes**

- The cover ignored its CSS `aspect-ratio` and rendered at a fixed 562 px at
  every width. The responsive-image partial emits `width` and `height`
  attributes, and the height attribute wins unless the rule also sets
  `height: auto`. Fixed on both the cover and the gallery images, which were the
  only two rules setting a ratio directly on an `img`; the card components set
  theirs on a wrapper and were unaffected. Recorded in the design document so the
  trap is not repeated.
- The breadcrumb wrapped to two lines on a phone. It is now a single
  non-wrapping row whose current-page label truncates with an ellipsis.
- The byline separators stranded a middot at the start of the second line when
  the facts wrapped on a phone. The separators are now suppressed at that width
  and spacing carries the rhythm instead.
- An intermediate edit left two `flex-wrap` declarations in the breadcrumb rule,
  so the intended `nowrap` was overridden by the later `wrap`. Corrected.

**Verification**

- Confirmed by measurement that the title, cover and byline span the 1216 px
  container while the body is 768 px and centred, matching the reference's
  proportions.
- Confirmed the cover now resolves to 2.2:1 on desktop and 3:2 on a phone.
- Reviewed the article at 360 px, 768 px and desktop width, and confirmed the
  localized category, reading time and pending-date strings in both languages.
- `hugo --minify --printPathWarnings` succeeds; all stylesheet parts remain
  brace-balanced.

**Open question for the stakeholder**

- The reference shows an author byline. EPA articles are laboratory-authored and
  the content model has no author field, so the byline carries category, date and
  reading time instead. Add an author field only if the laboratory wants
  individual attribution.

**Next recommended action**

- Confirm this article structure, then continue the page-by-page pass with
  Publications, Contact, Members, Projects, About and Home.

### 2026-09-04 — News category removed and sample set expanded

**Decisions**

- News records carry no category. The stakeholder asked for date and reading
  time only, so the field, the `data/news_categories.toml` label file and the
  `news-category.html` partial added earlier the same day were all removed
  rather than left as unused machinery, and the content model was updated.
- Sample News records now carry invented publication dates. Every record is
  still marked `provisional = true` and renders a visible draft badge, and this
  matches how the Projects and Publications samples already work: those carry
  invented clients, durations and years. Without dates the newest-first ordering
  and the date display could not be evaluated at all.

**Implemented**

- Removed the category from the article byline and from the index card
  metadata. Cards now show date on the left and reading time on the right; the
  article byline shows date, reading time and the draft badge.
- Expanded the sample set from three records to seven bilingual records, each
  with a date, a cover drawn from the existing approved image set, and three
  paragraphs of body text so that reading time and the centred body column are
  exercised. Three are flagged `featured` for the Home strip.
- Replaced the former body text of the three original records, which said the
  publication date was pending, since those records now carry dates.

**Verification**

- Confirmed the index lists seven records newest-first in both languages, that
  Home shows exactly the three featured records, and that no category string
  remains anywhere in the layouts, data, archetypes, content or stylesheets.
- Reviewed the index and an article at 360 px, 768 px and desktop width.
- `hugo --minify --printPathWarnings` succeeds. The selector audit reports
  twelve unmatched selectors, all conditional-render states; the pending-date
  style is now among them precisely because every sample record has a date.

**Still to confirm with the laboratory**

- All seven records are invented for layout evaluation. Titles, summaries, body
  text, dates and the pairing of photographs to stories must all be replaced or
  approved before launch, and the Mongolian copy should be read by a native
  speaker familiar with the subject.
- Reading time renders as one minute for every sample because the bodies are
  short and similar in length; real articles will vary.

**Next recommended action**

- Continue the page-by-page pass with Publications, then Contact, Members,
  Projects, About and Home.

### 2026-09-04 — Index page header reworked

**Assessment**

- Reviewed the band hero against the reference's own inner pages. SICT's News
  index uses a band roughly 180 px tall carrying a title and one line of
  description and no count; its About page adds a photograph behind the band, a
  breadcrumb, and the orange rule beneath the title.

**Problems identified**

- The count was actively counterproductive. It rendered "3 draft projects",
  "2 draft records" and "2 draft profiles" in large orange numerals, advertising
  how little approved content exists. Counts suit the reference's home page,
  where the figures are large; the reference uses none on inner pages.
- At 317 px the band was taller than the reference's while saying less.
- The eyebrow, "EPA@Lab / Мэдээ", repeated the highlighted navigation item and
  the title directly beneath it.
- Section headings carried the reference's orange rule but page heroes did not,
  so the same role had two treatments within EPA's own system.

**Implemented**

- Removed the count from the component and every call site.
- Replaced the eyebrow with a breadcrumb, extracted into a shared
  `breadcrumb.html` partial now used by both the page hero and the news article
  header, and moved its styles into the shared components file.
- Added the orange rule beneath the hero title, matching `section-head`.
- Reduced the band to roughly 250 px and made it a single column, with the
  supporting line beneath the title rather than in a right-hand column.
- Replaced the project detail back link with a three-level breadcrumb, which
  gives the same escape route and more context.

**Verification**

- Confirmed the breadcrumb renders the correct trail on all seven pages that use
  a hero, including the three-level project detail trail, and that no count
  markup remains anywhere in the built output.
- Measured the News hero at 250 px, down from 317 px.
- Reviewed the index, split hero and 404 at desktop, and the index, project
  detail and Publications at 360 px and 768 px. Breadcrumbs hold a single line at
  every width. Confirmed the orange rule by computed style after it proved too
  small to read in a compressed screenshot.
- `hugo --minify --printPathWarnings` succeeds; parts remain brace-balanced.

**Deferred**

- The reference places a photograph behind the band on its About page. EPA could
  do the same on Projects and Members, but it would start competing with the
  split hero those pages' siblings already use, so it is left as a separate
  decision.

**Next recommended action**

- Continue the page-by-page pass with Publications, then Contact, Members,
  Projects, About and Home.

### 2026-09-04 — Utility strip removed

- Removed the thin address strip above the navigation, added earlier the same
  day, at the stakeholder's direction. Its markup, styles and breakpoint rules
  are all gone, and the design document no longer lists it among the borrowed
  reference patterns.
- Nothing is lost by it. With no confirmed public email or social accounts the
  strip carried only the laboratory address, which the footer shows on every
  page and the Contact page shows in full. The header is now a single
  navigation row.
- The theme toggle and language switcher were deliberately kept in the
  navigation row when the strip was built, so no function depended on it.
- `hugo --minify --printPathWarnings` succeeds; the stylesheet is 51.7 KB.

### 2026-09-04 — Cards rounded

**Implemented**

- Added a `--radius-card` token, set to 12 px, and applied it to every card
  surface: media cards, person cards, the leadership panel, the generic list
  card, the empty state and the publications table wrapper. Each already clipped
  its children, or was given `overflow: hidden`, so photographs follow the
  corner rather than poking through it.
- Removed the rule that had squared off the publications table, so it now
  matches the cards elsewhere.
- Left full-width `list-row` records square. They are separated by rules running
  the width of the container rather than being panels, so a corner radius would
  have nothing to sit on. Page heroes and the news cover stay square for the
  same reason.

**Note on direction**

- This departs from the reference, which keeps its cards square, and from the
  design document's previous wording. The document now records the divergence as
  deliberate. Changing the single token adjusts every card at once.

**Verification**

- Confirmed by computed style that the person card and leadership panel resolve
  to a 12 px radius with clipping active, that the portrait is clipped by its
  card, and that the page hero remains square.
- Confirmed by fetching each page that the token reaches every card surface in
  use across Home, News, About, Publications and Members, and that the Projects
  index correctly has none.
- `hugo --minify --printPathWarnings` succeeds; parts remain brace-balanced.

**Not verified**

- No screenshot. The browser extension's screenshot capture began timing out
  partway through this change and did not recover across a fresh tab, so the
  rounding has been confirmed only through computed styles and the built markup,
  not seen. It should be eyeballed before the next change.

### 2026-09-04 — Pages CMS configuration

**Implemented**

- Added `.pages.yml`, covering every content type the site has: Home, About and
  Contact as single files; News, Projects, Publications and Members as
  collections; the two reference-data files; and the section heading files.
  Twenty-four entries in nine labelled groups. Layout, configuration and
  template files are deliberately not exposed to the editor.
- Every content type appears twice, once per language. Content is stored as
  bilingual page bundles, and a Pages CMS collection filters files with
  `exclude`, which matches bare filenames across all subfolders. Because every
  bundle uses the same two filenames, the Mongolian collection excludes
  `index.en.md` and the English one excludes `index.mn.md`. Field definitions
  are shared between the two through YAML anchors, so a change is made once.
- Configured two media stores: images under `assets/images`, written into
  content as `images/...` to match how the responsive-image partial resolves
  them; and documents under `static/files`, written as `/files/...` because the
  publications template renders that value through `relURL`. Added
  `static/files` with a `.gitkeep`.
- Field labels are Mongolian first, matching the editor's working language.

**How this was verified**

- The configuration schema was read from the Pages CMS source
  (`lib/config-schema.ts`, `types/field.ts`, and the collection API route)
  rather than written from memory, because the published documentation's
  subpages returned 404.
- Two findings shaped the file. First, the content entry schema is `.strict()`,
  so any invented key rejects the whole configuration. Second, `extension` is
  **not** a valid key even though the collection route reads `schema.extension`;
  that read therefore always yields an empty string and performs no filtering,
  which is why language separation uses `exclude` instead.
- Wrote a checker that walks the parsed YAML and validates every entry, view,
  media and field key, plus every field type, against the key sets taken from
  the Zod schema. It reports no invalid keys or types.
- Wrote a second checker that parses each content type's TOML front matter and
  compares it against the configured field shape, including nested objects and
  object lists. Every existing key in all seven content types is editable.

**Validating the configuration**

The configuration can be checked without connecting Pages CMS, by running the
project's own Zod schema against it. Do this in a scratch directory, never in
this repository, which is deliberately free of Node dependencies:

1. Download `lib/config-schema.ts` from `pages-cms/pages-cms`.
2. Replace its `@/fields/registry` import with a stub exporting
   `fieldTypes` as a Set of the field type names.
3. `npm install zod@3 tsx yaml`. Zod 4 overflows the stack on the schema's
   recursive definitions, so version 3 is required.
4. Parse `.pages.yml` with `yaml` and run `ConfigSchema.safeParse` on it,
   printing `error.issues` and recursing into `unionErrors`, which is where
   the useful messages live.

This caught a real defect that a key-by-key check had missed: in the object
form of `list`, `collapsible` is not optional in the schema even though the
error message mentions only `min` and `max`. `list: { min: 0, max: 3 }` was
rejected until `collapsible: false` was added.

**Still to do before the editor can use it**

- Pages CMS must be connected to the repository, which requires the GitHub
  organisation and owner to be settled first.
- Review the forms with the actual editor. Labels, field order and which fields
  are required should be adjusted to how that person actually works; this is the
  Phase 2 item "Review the proposed experience with the non-technical editor".
- `gallery` and `tags` on News, and `gallery` on Projects, are offered by the
  form but absent from every current record. They come from the content model
  and will populate when real content arrives.
- The configuration has not been exercised against a live Pages CMS instance.
  It is validated structurally, not end to end.

**Next recommended action**

- Settle the GitHub organisation so Pages CMS can be connected, then walk the
  editor through the forms.
