# EPA-Lab design system

**Status:** Phases A–D complete; built on Tailwind v4
**Last updated:** 2026-09-07
**Reference site:** <https://www.sict.edu.mn/mn> (institutional influence, not a template)

This document is the canonical reference for how the EPA-Lab site looks and how
its styles are organised. `docs/PROJECT.md` records *what* was decided and why;
this document records *how* to build against those decisions. Read it before
adding a component or a stylesheet part.

## 1. Direction

EPA-Lab uses a **hybrid** of the SICT institutional language and its own
editorial character.

Borrowed from the reference, because consistency is what makes that site work:

- A single section-heading pattern used on every section.
- Solid navy cards, with an orange signal dot on their metadata, for News.
- Cards in even grids, image on top. The reference keeps its cards square;
  EPA rounds them at the stakeholder's direction, using `--radius-card`.
- Navy for emphasis surfaces, `--surface-soft` for alternating bands, orange
  confined to eyebrows, rules, metadata, and calls to action.
- One container width and a predictable vertical rhythm.

Kept as EPA-Lab's own, because the laboratory is not the school:

- The full-screen photographic home hero with the animated power-network
  overlay, which is the site's single signature moment.
- Monospace technical labels for metadata and eyebrows.

Deliberately dropped in the hybrid direction:

- The `01`–`08` section numbering on inner pages. It reads as a design-studio
  device and competes with the content. It stays on Home only, where the
  sequence is a real navigational aid.
- Per-page hero inventions. Inner pages share one hero component.

## 2. Stylesheet structure

The site is built on **Tailwind v4**. Styling lives on the elements, in the
templates; `assets/css/main.css` holds only the things a utility class cannot
express. Hugo drives the Tailwind CLI from `node_modules` through
`css.TailwindCSS` in `layouts/partials/head.html`, which is why the repository
carries a `package.json` and the deploy workflow installs Node before building.

`main.css` has five parts, in this order:

| Part | Contains |
| --- | --- |
| `@theme` | Every design token. These become the utility scales, so `--color-accent-600` *is* `bg-accent-600`. |
| `@custom-variant` | The dark selector and the two height-based variants. |
| `@utility` | `container`, `eyebrow`, `title-rule` — the three named patterns worth a class. |
| `@layer base` | Element defaults, so headings and rendered Markdown work without classes. |
| `@layer components` | The compositions no utility can reach. |

Class names are extracted from `layouts/` and nowhere else — Goldmark runs with
unsafe HTML disabled, so content files cannot introduce markup.

### What belongs in the stylesheet

Only a rule that a utility genuinely cannot express: a pseudo-element carrying
generated content, a child the template does not own, or a layered composition
that would be unreadable inlined. The current list is the whole list — rendered
Markdown (`.prose`), the Home hero's blend-mode stack, the animated
power-network SVG, the scroll cue's travelling dot, the Home overview's masked
grid, the news byline's middot separators, the decorative ring, and the phone
transform that turns the publications table into labelled cards. Nothing goes
there for brevity's sake alone; a long class string is the normal cost.

### Rules that are not obvious

Tailwind's layer order is theme → base → components → utilities, and **custom
`@utility` rules are emitted after the built-in ones**. Several consequences
have already caused bugs:

- A custom utility outranks any built-in utility beside it. `eyebrow` therefore
  sets neither color nor margin — if it set a color, the muted eyebrow in a
  section head could not be written, and if it set a margin, the flush one in
  the Home hero kicker could not either. Every call site states both.
- `container` deliberately reuses Tailwind's own name, so the built-in
  breakpoint-stepped rules are emitted too. It resets `max-width` to neutralise
  them; without that the page clamps to 601px at `sm` and 901px at `md`.
- Because `container` clears `max-width`, **it cannot share an element with
  `prose`** — the readable measure would be lost. Put `container` on a wrapper
  and `prose` inside it.
- `max-w-prose` is a *static* built-in of `65ch` that a `--container-*` token
  does not override. The measure token is `--container-measure`, used as
  `max-w-measure`.
- Preflight resets things the old stylesheet got from the browser: heading
  `font-size` and `font-weight`, list markers and indent, link underlines, and
  every margin. The base layer restores heading weight and paragraph margins;
  `.prose` restores the rest, because Markdown from the CMS carries no classes.
- A rule in `@layer components` loses to any utility on the same element. Where
  a component rule must own a property at one breakpoint — the publications
  table on a phone — scope the competing utility to `sm:` rather than fighting
  it.
- Tailwind must see **literal, complete class strings**. Where a template picks
  between treatments it assigns whole strings to a variable; it never builds
  one by concatenating fragments.

### Breakpoints

CSS cannot use custom properties in media queries and Tailwind's defaults are
cleared, so the design system's two breakpoints are the only ones:

| Name | Utility | Query |
| --- | --- | --- |
| mobile | `max-sm:` | `max-width: 600px` |
| tablet and below | `max-md:` | `max-width: 900px` |
| tablet and up | `sm:` | `min-width: 601px` |
| desktop | `md:` | `min-width: 901px` |

Height-based queries are permitted only for the full-viewport Home hero, where
the composition genuinely depends on available height: `desk-short:` and
`phone-short:`. No other section may be pinned to the viewport — doing so
previously left a large empty band under the Mentor and Projects sections
whenever their content did not fill a screen.

### The theme

The dark theme redefines the semantic color tokens on `html[data-theme="dark"]`
and nothing else, so `bg-surface` and `text-body` follow the theme on their own.
Reach for the `dark:` variant only when an element changes in some way other
than color — in practice just the sun and moon icons in the theme toggle.

## 3. Tokens

All values live in the `@theme` block in `assets/css/main.css`, and each one
becomes a utility. Components consume tokens; they do not restate raw values.

**Color.** The default Tailwind palette is cleared, so a color that is not in
`@theme` is not in the design system. The brand palette and its intended use are
specified in `docs/PROJECT.md` §8. Two groups matter for implementation:

- The semantic set — `page`, `surface`, `surface-soft`, `body`, `muted`, `line`,
  `header`, `link`, `link-hover` — is the one that flips with the theme. Prefer
  it over the raw palette for anything that must read in both.
- The `on-dark-*` group and `line-on-dark` are for navy surfaces, which exist in
  both themes and therefore do not flip. Use them instead of writing
  `rgb(255 255 255 / x%)` by hand.

**Type.** A nine-step scale from `text-2xs` to `text-4xl`, most steps using
`clamp()` so they are responsive without a breakpoint. Headings also have
`leading-*` and `tracking-*` steps. Mongolian Cyrillic sets wider than Latin at
the same size, so any new heading must be checked in both languages before its
step is considered final.

**Space.** Fixed steps come from Tailwind's numeric scale — `p-4` is 1rem, and
the old `--space-1`…`--space-8` map onto `1, 2, 3, 4, 6, 8, 12, 16`. The four
fluid steps the numeric scale cannot express are named: `py-section` for
vertical rhythm, `px-page` for the container gutter, `p-block` for padding
inside large panels, and `gap-grid` for card grids.

**Width.** `max-w-page` is the single container width, applied through the
`container` utility. `max-w-measure` is the readable measure for body copy.

**Shape, elevation, motion.** `rounded-sm|md|lg|card`, `shadow-sm|md|lg`, and
the three keyframe animations `animate-network-flow`, `animate-node-pulse` and
`animate-scroll-cue`. The site's easing curve is Tailwind's own `ease-in-out`.
Durations are written literally: `duration-[180ms]`, `duration-300`,
`duration-[550ms]`.

Two cautions carried over from the old stylesheet:

- Tailwind's `filter` utilities compose in a fixed order. Where an image applies
  more than one function, or a hover replaces the whole filter rather than one
  function of it, write the filter out — `[filter:saturate(.8)_contrast(1.04)]`
  — so the result does not depend on that order.
- `scale-*` and `translate-*` set the standalone `scale` and `translate`
  properties, not `transform`. Anything inspecting `transform` will report
  `none`.

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

  For the same reason, two consecutive sections that share a background get
  half that space at their seam. With no change of ground there is no edge for
  the padding to separate, so a full measure from each section reads as one
  void rather than as two sections. Home has two such seams: the navy hero into
  the navy overview, and News into the generation section, which share
  `--surface-soft`.
- **Article header** — News articles, in `layouts/news/single.html`. A marketing band in
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
a long members page — it just needs reduced padding and type, which the card
carries as its own `max-sm:` steps, since both grids that use it are
`card-grid--people`. The one-column threshold is 340 px, not 380 px: 360, 375 and 390
are the most common phone widths and must keep two columns.

The provisional badge is the one overlay label for draft content on any card
media: a navy chip with a backdrop blur, set by the three card partials. Its
counterpart is the same marker in solid accent set inline in text flow rather
than laid over a photograph, used by the page hero and the news byline.
Both are written inline where they are used. Do not use the inline marker as an
overlay: the solid accent fill is meant to be read against the page, not
against an image.

Conventions:

- `list-row` alternates its media side, but the caller drives it: the Projects
  index passes `flip` from its own loop index rather than making the row work
  out its position in the document. Alternation is a two-column effect only —
  on one column the media leads the copy whatever the row's position. The
  `compact` and `portrait` variants do not alternate and set their own column
  ratio; do not restate those ratios at the call site.
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

**Phase D — Tailwind migration (desktop complete, 2026-09-07).**
The twelve ordered stylesheet parts are gone. Tailwind v4 builds one
`assets/css/main.css` through Hugo's `css.TailwindCSS`, the tokens moved into
`@theme`, and every component is now written as utilities on the elements in
`layouts/`. What remains as hand-written CSS is listed in §2 and is there
because no utility reaches it.

The migration was verified by rendering the old and new builds side by side and
diffing the computed styles and geometry of every text-bearing element on every
page, in both languages and both themes. At 1440 px the two builds are
identical apart from the deliberate change below. Verification at 768 and 360 px
is still owed.

Three things surfaced that were latent in the old stylesheet:

- The Mentor portrait never got the `aspect-ratio: .9` it asked for. The image
  partial emits `width` and `height` attributes, and without `height: auto` the
  attribute ratio wins — the trap §4 already warned about for `<img>`. Tailwind's
  preflight sets `height: auto`, so the ratio now applies and the portrait is
  18 px taller at 1440 px and considerably shorter at 768 px. This is the one
  intended visual change in the migration.
- The mobile rule `.page-hero { padding-block: 4.5rem }` sat after
  `.page-hero--split { padding-block: 0 }` in the cascade, so the split hero got
  144 px of navy back on a phone that its `--split` rule had explicitly removed.
  It is reproduced as `max-sm:py-18` so the migration changes nothing on its
  own, but it looks unintended and is worth a decision.
- `.page-hero + *` was meant to give the block after any page header a reduced
  top step, but every page file from `40-projects.css` onward came later in the
  cascade and overrode it. Only the three templates using the plain `.section`
  helper ever got it. The current padding is reproduced per template as it
  actually rendered, not as the rule intended.

The stylesheet went from 51 KB to 64 KB raw, 10.5 KB to 12.7 KB gzipped — the
cost of Tailwind's preflight and of one rule per utility.

**Phase E — quality assurance (not started).**
Tablet and mobile verification, contrast audit, reduced motion. Both themes and
both languages are covered at desktop by the diff described above.
