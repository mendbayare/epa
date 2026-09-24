# EPA-Lab baseline content model

**Status:** Revised from stakeholder-confirmed site structure
**Last updated:** 2026-09-02

This document defines the minimum content structure needed to build and test the
website. It is intentionally smaller than the final Pages CMS configuration.
Fields can be added after the layouts reveal a real need, but changing identifiers
after content migration should be avoided.

## Conventions

- Content is written in Markdown with TOML front matter.
- Mongolian and English translations live beside each other using `.mn.md` and
  `.en.md` suffixes and the same base filename.
- `title`, `summary`, and Markdown body content are translated independently.
- Identifiers such as generation keys, dates, URLs, and image paths stay identical
  across translations.
- Every News, Projects, Publications and Members entry carries a `slug`: a short
  Latin key such as `relay-protection`, identical in both languages. The CMS
  names the entry's folder after it (`{slug}/index.mn.md`), so the two language
  files land in one bundle and Hugo pairs them as translations, and it is the
  last segment of the page address. Folder names used to come from each
  language's own title, which put a new entry's translations in two different
  folders. Set it once when the entry is created; changing it later changes the
  address.
- Images live in page bundles when they belong to one entry. Shared institutional
  assets live under `assets/images/`.
- Every public record may be hidden with `draft = true`.
- Dates use ISO format: `YYYY-MM-DD`.
- Empty optional fields are omitted rather than filled with placeholder values.

## Page metadata

Every page's search and social-sharing metadata comes from fields editors
already fill, in `layouts/partials/head.html`; there is nothing extra to
maintain:

- **Title** — the page title, followed by "— EPA-Lab" (on Home, preceded).
- **Description** — the page's `description`, else its `summary` (news
  articles and projects), else the site description in `hugo.toml`. Keep
  summaries to one or two sentences: they are what Google and a shared link
  show.
- **Share image** — the page's `cover`, else its `hero_image`, else Home's
  hero photograph, cropped to a 1200×630 card.
- News articles are shared as articles with their publication date; Home
  carries structured data naming the laboratory, its address, contact email
  (from Contact) and parent university.

Icons (`favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, the
`icon-192`/`icon-512` PNGs and `site.webmanifest`) live in `static/`.

## 1. Site settings

Site-wide values belong in `hugo.toml` or a structured data file rather than an
ordinary page.

| Field | Type | Required | Purpose |
| --- | --- | --- | --- |
| `lab_name` | localized string | Yes | Full laboratory name |
| `short_name` | string | Yes | `EPA-Lab` |
| `description` | localized string | Yes | Default metadata description |
| `logo` | image path | No | Approved logo; placeholder until supplied |
| `email` | email | No | Official public laboratory email |
| `address` | localized string | Yes | Public postal/location text |
| `map_url` | URL | No | External map destination |
| `social_links` | list | No | Label and URL for each approved account |

Confirmed: the EPA-Lab logo remains independent. The institution and school name
are displayed as ordinary supporting text beside or beneath it, allowing the text
to shorten or hide on smaller screens without altering the logo.

## 2. Home page

The Home page is one translated page at `content/_index.{lang}.md`. Its main
fields define the stakeholder-requested sections.

| Field | Type | Required | Purpose |
| --- | --- | --- | --- |
| `title` | string | Yes | Main hero heading |
| `description` | string | Yes | Short hero introduction |
| `hero_image` | image path | Yes | Large introductory photograph |
| `vision` | short rich text | Yes | Алсын хараа |
| `mission` | short rich text | Yes | Эрхэм зорилго |
| `stats` | ordered list | Yes | Key, numeric value, label, optional suffix |
| `equipment` | string list | Yes | Compact Home strip of laboratory equipment brands/models |
| `partners` | object list | No | Home-only partners: name, optional logo, URL and one-line description, and provisional state. Logos show on a white panel and need the organization's permission |

Baseline statistic keys:

- `publications`
- `projects`
- `alumni`

Confirmed for the baseline: statistics are manually maintained in Home front
matter. Their labels and values remain provisional until stakeholder approval.
They may later be calculated from published records if that becomes reliable and
useful.

## 3. Members

Location: `content/members/{slug}/index.{lang}.md`

| Field | Type | Required | Purpose |
| --- | --- | --- | --- |
| `title` | string | Yes | Full public name |
| `program` | string | No | Academic program |
| `study_year` | string | No | Current study year/level, shown while not alumni |
| `generation` | controlled key | Yes | Stable generation/cohort key used for page grouping and anchors |
| `joined_year` | integer | No | Year the member joined EPA-Lab, if separately useful |
| `portrait` | image path | Yes | Approved portrait |
| `yearbook_quote` | string | No | Short member-approved quote shown on the card |
| `research_interests` | string list | No | Research topics |
| `links` | object list | No | Approved profile/research links |
| `alumni` | boolean | Yes | Current/alumni state |
| `graduated_year` | integer | No | Graduation year, shown on the card when alumni |
| `leader` | boolean | No | The generation's leader: card framed, badged, and placed first |
| `weight` | integer | Yes | Manual ordering within a generation group |
| `draft` | boolean | Yes | Publication state |

The Markdown body may contain an extended biography for future use, but the
current public design has no individual member pages. `generation` is the
primary grouping on the Members page. Generation keys are stable and
untranslated; labels are localized.

Generations display in ascending order: the first generation leads the page and
each new generation is added at the end, so the page reads as the laboratory's
history. Home still shows the newest generation. The numeric `order` value is the
real chronological generation number.

Generation labels live in `data/generations.toml`, with a stable key, numeric
order, and Mongolian/English labels. Each generation has one leader, marked with
`leader = true` on that member's own record; because every generation keeps its
own leader, former leaders are preserved without a separate leadership file.

A member card shows portrait, name, `program`, a year line and
`yearbook_quote`. The year line is `study_year` for a current member, and
"Төгссөн" — "2026 онд төгссөн" when `graduated_year` is set — for alumni.

Confirmed: member records do not expose email addresses. Optional approved
professional/research links may still be used when appropriate.

## 4. Research projects

Location: `content/projects/{slug}/index.{lang}.md`

| Field | Type | Required | Purpose |
| --- | --- | --- | --- |
| `title` | string | Yes | Project title |
| `client` | string | Yes | Client or commissioning organization |
| `collaborators` | string list | No | Collaborating implementers/organizations |
| `duration_text` | localized string | Yes | Stakeholder-written project duration |
| `objective` | Markdown text | Yes | Project objective; a paragraph or a `- ` bullet list |
| `implementation_site` | localized string | Yes | Implementation location, object, or site |
| `summary` | string | Yes | Card and metadata summary |
| `results` | Markdown text | Yes | Results and completed work; a paragraph or a `- ` bullet list |
| `related_publications` | publication reference list | No | Published outputs produced by the project, picked from the Publications collection; each links straight to its file or external URL |
| `cover` | image path | No | Card and social image |
| `gallery` | image list | No | Additional approved images/captions |
| `featured` | boolean | Yes | Eligible for Home display |
| `weight` | integer | No | Editorial feature ordering |
| `draft` | boolean | Yes | Publication state |

Duration uses free-form localized text for now because the source data may not
consistently provide exact dates. The Markdown body may expand on implementation
and results.

Projects do not use categories or category filtering. Automation, relay
protection, SCADA/HMI, and similar phrases may occur naturally in a project's
title or description, but they are not stored as classification fields.

## 5. Publications

Publications are presented as a compact, structured table. A title and
year/month are always displayed; file, text, and external link are optional.

Location: `content/publications/{slug}/index.{lang}.md`

| Field | Type | Required | Purpose |
| --- | --- | --- | --- |
| `title` | string | Yes | Published work title |
| `year` | integer | Yes | Publication year |
| `month` | integer | Yes | Publication month, 1–12 |
| `file` | file path | No | Approved downloadable document |
| `external_url` | URL | No | External publication or source address |
| `summary` | string | No | Optional table/detail description |
| `draft` | boolean | Yes | Publication state |

The Markdown body is optional descriptive text. At least one of `file`,
`external_url`, `summary`, or body content should normally be present. A public
link does not imply permission to host a copy of the file.

Publications have no pages of their own: they appear only as rows of the table
and in a project's related publications, both of which link straight to the
file or external URL. `hugo.toml` keeps them in lists but does not render them.

The index sorts by year and month in descending order. File and external-link
actions render independently; when neither exists, the table shows a neutral
pending state instead of a broken or empty control.

## 6. News

Location: `content/news/{slug}/index.{lang}.md`

| Field | Type | Required | Purpose |
| --- | --- | --- | --- |
| `title` | string | Yes | Article title |
| `date` | date/time | Yes | Publication date |
| `summary` | string | Yes | Card and metadata summary |
| `cover` | image path | Yes | Card and social image |
| `gallery` | image list | No | Additional approved images/captions |
| `tags` | string list | No | Secondary topics |
| `featured` | boolean | Yes | Eligible for Home display |
| `draft` | boolean | Yes | Publication state |

Confirmed: News records carry no category. The field and its label data were
removed at the stakeholder's direction; article and card metadata show the
publication date and reading time only. Reintroducing categories would mean
restoring the field, its localized labels, and a filter worth the reader's
attention, so it should be a deliberate decision rather than a leftover.

Reading time is derived by Hugo from the body text and is not stored.

Records are ordered newest-first by `date`. The templates still render a visible
pending state for a record without one, and fall back to editorial `weight` for
ordering while no record has a date.

News is a confirmed primary section and may also supply featured cards to Home.
The current records are provisional samples and must be replaced or approved
before launch.

## 7. Home equipment

Laboratory equipment is shown as a compact string list on Home. It does not need
a standalone section, categories, images, or detail pages for the initial
release. Each value may be a brand, platform, or model name such as `ABB`,
`SEL`, `RTAC`, or `PLC`.

## 8. About and Contact pages

These remain singleton translated Markdown pages rather than collections.

About front matter:

- `title`
- `description`
- `hero_image`
- `history_intro`
- ordered `history` milestones with year, title, description, and provisional state
- ordered `achievements` with title, year, description, image, and provisional state
- one `supervisor` object with name, role, portrait, summary, biography, and provisional state
- page-level `provisional` state

The body may contain the longer laboratory history and supporting context. About
contains only the supervising teacher; it is not a directory of lecturers or
researchers. Until approved content arrives, every invented sample record must
retain `provisional = true` and a visible public label.

Contact front matter:

- `title`
- `description`
- `address`
- `email`
- `supervisor_name`
- `map_url`
- `map_embed_url`
- `source_note`
- `provisional`

The current baseline uses the stakeholder-supplied Google Maps embed and keeps
an external Maps link for opening directions. Generation leaders are marked on
member records and are not duplicated in Contact.

## 9. Review checklist

Before treating this baseline as stable, confirm:

- [ ] Final values and labels for the three manually maintained Home statistics
- [x] Member email excluded
- [x] Generation labels confirmed from source PDF; page order changed to oldest-first at the stakeholder's direction (2026-09-24)
- [x] Publication list fields confirmed
- [x] Free-text project duration selected for the baseline
- [ ] Whether achievements need their own site-wide collection later
- [ ] Which fields must be mandatory in Pages CMS
- [ ] Approved Mongolian and English terminology for all controlled labels
