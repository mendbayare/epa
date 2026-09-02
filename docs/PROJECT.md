# EPA@Lab Website — Project Handbook

> This is the canonical cross-session project record. Read it before starting
> work and update it at the end of every working session. Record decisions,
> implementation progress, problems and fixes, verification performed,
> unresolved questions, and the clearest next action.

**Project status:** Confirmed structure; design QA and CMS configuration next
**Last updated:** 2026-09-02
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
- [ ] Define the final content schemas for Pages CMS.
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
- [ ] Add Pages CMS configuration and safe editor forms.

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
