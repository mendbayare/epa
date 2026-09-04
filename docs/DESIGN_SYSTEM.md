# EPA@Lab design system

**Status:** Phases A–C complete; page-by-page pass under way (News done)
**Last updated:** 2026-09-04
**Reference site:** <https://www.sict.edu.mn/mn> (institutional influence, not a template)

This document is the canonical reference for how the EPA@Lab site looks and how
its styles are organised. `docs/PROJECT.md` records *what* was decided and why;
this document records *how* to build against those decisions. Read it before
adding a component or a stylesheet part.

## 1. Direction

EPA@Lab uses a **hybrid** of the SICT institutional language and its own
editorial character.

Borrowed from the reference, because consistency is what makes that site work:

- A single section-heading pattern used on every section.
- Solid navy cards, with an orange signal dot on their metadata, for News.
- Cards in even grids, image on top. The reference keeps its cards square;
  EPA rounds them at the stakeholder's direction, using `--radius-card`.
- Navy for emphasis surfaces, `--surface-soft` for alternating bands, orange
  confined to eyebrows, rules, metadata, and calls to action.
- One container width and a predictable vertical rhythm.

Kept as EPA@Lab's own, because the laboratory is not the school:

- The full-screen photographic home hero with the animated power-network
  overlay, which is the site's single signature moment.
- Monospace technical labels for metadata and eyebrows.

Deliberately dropped in the hybrid direction:

- The `01`–`08` section numbering on inner pages. It reads as a design-studio
  device and competes with the content. It stays on Home only, where the
  sequence is a real navigational aid.
- Per-page hero inventions. Inner pages share one hero component.

## 2. Stylesheet structure

Styles live in `assets/css/parts/` and are concatenated in filename order by
`layouts/partials/head.html` into a single fingerprinted `main.css`. The numeric
prefix *is* the cascade — a rule's file determines what it can override.

| File | Contains |
| --- | --- |
| `00-tokens.css` | `:root` and dark-theme custom properties. No selectors. |
| `10-base.css` | Reset, element defaults, `.container`, `.section`, `.eyebrow`, keyframes, focus ring, reduced motion. |
| `20-header.css` | Site header, primary navigation, theme toggle, language switcher. |
| `30-components.css` | Anything used by more than one page: buttons, links, cards, tables, badges, prose. |
| `40-projects.css` … `45-news.css` | One file per page section. |
| `50-home.css` | Home page sections. |
| `60-footer.css` | Site footer. |
| `90-responsive.css` | Every breakpoint override, in cascade order. |

Rules:

- A selector used on two or more pages belongs in `30-components.css`, not
  duplicated into page files.
- Never add a media query to a page file. All breakpoint overrides go in
  `90-responsive.css` so the responsive behaviour of the whole site can be read
  in one place.
- Adding a new part file means choosing its prefix deliberately; do not renumber
  existing files without re-verifying the cascade.

## 3. Tokens

All values live in `00-tokens.css`. Components consume tokens; they do not
restate raw values.

**Color.** The brand palette and its intended use are specified in
`docs/PROJECT.md` §8 and are not repeated here. Two additions matter for
implementation:

- `--signal-500` (`#6d91ff`) is the technical line-work color used by the
  power-network overlay and the research motifs.
- The `--on-dark-*` group replaces inline `rgb(255 255 255 / x%)` literals.
  Navy sections exist in both light and dark themes, so these values do not
  flip with the theme. There were roughly 48 such literals before Phase B; they
  should be migrated as each component is touched.

**Type.** A nine-step scale from `--text-2xs` to `--text-4xl`, most steps using
`clamp()` so they are responsive without a breakpoint. Headings also have
`--leading-*` and `--tracking-*` tokens. Mongolian Cyrillic sets wider than
Latin at the same size, so any new heading must be checked in both languages
before its step is considered final.

**Space.** `--space-1` to `--space-8` for component-internal spacing;
`--section-space` for vertical section rhythm; `--block-space` for padding
inside large panels; `--grid-gap` for card grids; `--page-space` for the
container gutter.

**Shape, elevation, motion.** `--radius-*`, `--shadow-*`, and `--ease` /
`--dur-*`. `--radius` and `--shadow` remain as legacy aliases so existing rules
keep working; new code should use the scaled names.

**Breakpoints.** CSS cannot use custom properties in media queries, so these are
fixed by convention and must not be invented per component:

| Name | Query |
| --- | --- |
| mobile | `max-width: 600px` |
| tablet | `max-width: 900px` |
| desktop | `min-width: 901px` |

Height-based queries are permitted only for the full-viewport Home hero and
overview sections, where the composition genuinely depends on available height.
No other section may be pinned to the viewport: doing so previously left a
large empty band under the Mentor and Projects sections whenever their content
did not fill a screen.

## 4. Component consolidation targets

The stylesheet grew page by page, so several components exist in near-duplicate
form. Phase B reduces them. These are the targets, not the current state.

**Heroes: nine variants → two. Done.**

`home-hero` is unchanged; it remains the site's one signature composition.
Everything else — `projects-hero`, `project-hero`, `about-hero`,
`members-hero`, `publications-hero`, `contact-hero`, and `page-header` — is now
`page-hero`, rendered through `layouts/partials/page-hero.html`.

It has two shapes, and the partial picks between them: supplying an `image`
selects the split navy/photograph composition, otherwise it renders the navy
band with the title left and supporting text plus an optional `count` right.

Not every page wants the same weight, so the site uses three header scales:

- **Split hero with photograph** — About and project detail. Editorial pages
  with real imagery; these keep the full display type.
- **Compact band** — the section indexes, Contact and 404. A breadcrumb, the
  title with the same short orange rule the section headings carry, and a
  supporting line, in a single column about 250 px tall. An index title is a
  label, not a statement: at 4rem a single word such as "Мэдээ" read as a
  billboard.

  It carries no count. Large figures work on the reference's home page because
  they are impressive at that scale; on an index page they would announce that
  the laboratory has two publications, and the reference itself puts no counts
  on its inner pages. The breadcrumb replaced an eyebrow that only repeated the
  highlighted navigation item and the title beneath it.

  The block after any page header also drops to a reduced top padding. The
  standard `--section-space` is tuned for the gap *between* sections; stacked on
  a header's own bottom padding it produced 208 px of dead space before the
  first content on every index page.
- **Article header** — News articles, in `45-news.css`. A marketing band in
  front of a news story is the wrong instrument, so these follow an editorial
  article structure instead: breadcrumb, then the title and cover photograph at
  full container width, then a byline row carrying category, date and reading
  time on the left with share controls on the right. The body is set in a
  narrower column centred beneath them, so the measure stays readable while the
  title and image keep the page's full width.

  Note for any rule that sets `aspect-ratio` directly on an `<img>`: the image
  partial emits `width` and `height` attributes, and the height attribute wins
  unless the rule also sets `height: auto`. Setting the ratio on a wrapper
  element instead, as the card components do, avoids the trap entirely.

The band shape is now used by the News list, the generic single-page template,
and the 404 page as well, which previously used a lighter `page-header`. Those
three pages therefore changed from a pale band to the navy one — a deliberate
consistency change, not a regression.

Generic slots replaced the page-specific decorations: `stampLabel`/`stampValue`
render the orange founded chip on About, `mediaLabel` renders the vertical
label on a project detail page, and `back` renders the project back link.

**Cards: ten variants → three. Done.**

`project-card`, `project-list-card`, `news-card`, `home-member-card`,
`member-card`, `leadership-card`, `achievement-card`, and `teacher-card` are
replaced by three components, each with its own partial:

| Component | Partial | Covers |
| --- | --- | --- |
| `media-card` | `media-card.html` | Home project cards, Home news cards, and — with `feature` — About achievement cards |
| `person-card` | `person-card.html` | the Members grid and the Home newest-generation strip |
| `list-row` | `list-row.html` | Projects index rows, the About lecturer entry (`portrait`), and Members leadership cards (`compact`) |

`partner-card` stays separate: it is a text row with no media. `card` stays as
the generic `_default/list.html` fallback.

Every card surface is rounded with `--radius-card` (12 px) and clips its own
children, so a photograph at the top of a card follows the corner. The token is
the single place to change it. Full-width `list-row` records stay square: they
are separated by rules across the whole container rather than being panels, so
a radius would have nothing to sit on. Page heroes and the news cover stay
square for the same reason.

Three shared grid helpers come with them, and the mobile column count depends
on what the card carries:

| Helper | Desktop | Tablet ≤900 | Mobile ≤600 | ≤340 |
| --- | --- | --- | --- | --- |
| `card-grid--3` (media cards) | 3 | 2 | 1 | 1 |
| `card-grid--people` (person cards) | 3 | 2 | 2 | 1 |
| `card-grid--2` (feature cards) | 2 | 2 | 1 | 1 |

A media card carries metadata, a title and a three-line summary, so at two-up on
a 360 px screen its ~150 px column makes the text unreadable. A person card is a
portrait, a role and a name, which survives that column and halves the scroll on
a long members page — it just needs reduced padding and type, which the mobile
block applies. The one-column threshold is 340 px, not 380 px: 360, 375 and 390
are the most common phone widths and must keep two columns.

`provisional-badge` is the one overlay label for draft content on any card media.

Conventions:

- `list-row` alternates its media side using `:nth-of-type(even)`. The
  `compact` and `portrait` variants opt out of alternation and set their own
  column ratio; do not restate those ratios at the call site.
- The card arrow is decorative markup (`aria-hidden`), not a second link. The
  title link already reaches the same destination, so a focusable arrow would
  duplicate it for keyboard and screen-reader users.

**Section headings: five patterns → one. Done.**

`section-heading`, `about-section-heading`, `members-section-heading`,
`home-overview__heading`, and `generation-heading` are replaced by a single
`section-head`, rendered through `layouts/partials/section-head.html`.

The partial takes `title` (required) plus optional `eyebrow`, `support`,
`index`, `meta`, `linkURL`/`linkText`, `onDark`, and `id`. A `support`
paragraph automatically applies the `--split` modifier, which widens the aside
column; `onDark` applies the navy-surface color set.

Two conventions come with it:

- The eyebrow is muted inside a section head rather than orange, so the short
  orange rule beneath the title is the only accent in the block. `.eyebrow`
  stays orange everywhere else.
- The section head owns the space beneath itself. Any grid or list that follows
  one must not add its own `margin-top`.

## 5. Accessibility and quality bar

- Text and background combinations must meet WCAG AA. Orange `--accent-600` on
  white passes for large text and UI elements but not for body copy; use
  `--text-muted` for paragraphs.
- Every component must be checked in light and dark themes.
- Every component must be checked at 360, 768, and 1440 px, in Mongolian and
  English. Mongolian is the wrapping-risk language.
- Motion respects `prefers-reduced-motion`; the base file neutralises
  transitions and animations globally under that query.
- Keyboard focus uses the shared `:focus-visible` ring; components must not
  remove it.

## 6. Work log

**Phase A — foundation (complete, 2026-09-04).**
Split the single 63 KB `main.css` into twelve ordered parts concatenated by
Hugo, with the cascade verified against the original by selector diff. Extended
the token set beyond color to type, space, shape, elevation, and motion.
Removed dead rules for the unused legacy hero, `signal`, `intro-copy`,
`card__index`, the research `filter-pill` controls, and the decorative fake-map
elements superseded by the Google Maps embed. Fixed `var(--muted)`, which was
undefined and silently dropped the muted color on publication-table headings,
publication summaries, and project-fact labels.

**Phase B — consolidation (complete, 2026-09-04).**
Section headings are done: five patterns collapsed into one `section-head`
partial and component. Cards are done: ten variants collapsed into `media-card`,
`person-card`, and `list-row`, each with a partial, plus the shared
`card-grid--2`/`card-grid--3` helpers. Dead rules removed along the way: the
`project-card__media--*` category gradients and the badge override that no
longer had a reachable selector.

Heroes are done: nine variants collapsed into `home-hero` plus `page-hero`.
The unused `research-motif` partial and its rules were deleted at the
stakeholder's direction. A selector audit against the built HTML now reports
no orphaned rules; the eight remaining unmatched selectors are all
conditional-render states that their templates still emit.

The stylesheet went from one 63 KB file to twelve parts totalling 48 KB
minified.

Carried into Phase C: migrate the remaining `rgb(255 255 255 / x%)` literals to
`--on-dark-*`, remove the height-based queries outside Home, and fix the
desktop `min-height: 100svh` on the Mentor and Projects sections, which leaves
a large empty band beneath their content when it does not fill a viewport.

**Phase C — institutional language (complete, 2026-09-04).**
Added the utility strip above the navigation, carrying the laboratory's
location and, once their parameters are set, its email and social accounts. It
is hidden on Home so the full-bleed hero opens the page uninterrupted; the
theme toggle and language switcher stay in the main navigation row, so nothing
functional depends on the strip.

Added `media-card--invert`, the solid navy News treatment with the reference's
orange signal dot before the first metadata item.

Removed the rule that pinned the Mentor and Projects sections to the viewport
on desktop, along with the shrink-to-fit compensations that existed only to
squeeze content into it. Those sections now use the normal section rhythm, and
the height-based media queries are confined to Home.

Migrated 24 of the on-dark opacity literals to `--on-dark-*` and
`--line-on-dark`. Only values within three percentage points of a token were
converted, so the change is imperceptible; the genuinely distinct values were
left as literals rather than flattened into the wrong bucket.

The statistics were reviewed and deliberately left alone. The reference draws
them as circular progress rings; EPA's large figures with vertical rules
already read well and are more honest about provisional values, so copying the
rings would have been mimicry without benefit.

**Phase D — quality assurance (not started).**
Both themes, three widths, two languages, contrast audit, reduced motion. The
mobile and tablet verification owed from Phases B and C belongs here.

**Phase D — quality assurance (not started).**
Both themes, three widths, two languages, contrast audit, reduced motion.
