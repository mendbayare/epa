# EPA@Lab baseline content model

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
- Images live in page bundles when they belong to one entry. Shared institutional
  assets live under `assets/images/`.
- Every public record may be hidden with `draft = true`.
- Dates use ISO format: `YYYY-MM-DD`.
- Empty optional fields are omitted rather than filled with placeholder values.

## 1. Site settings

Site-wide values belong in `hugo.toml` or a structured data file rather than an
ordinary page.

| Field | Type | Required | Purpose |
| --- | --- | --- | --- |
| `lab_name` | localized string | Yes | Full laboratory name |
| `short_name` | string | Yes | `EPA@Lab` |
| `description` | localized string | Yes | Default metadata description |
| `logo` | image path | No | Approved logo; placeholder until supplied |
| `email` | email | No | Official public laboratory email |
| `address` | localized string | Yes | Public postal/location text |
| `map_url` | URL | No | External map destination |
| `social_links` | list | No | Label and URL for each approved account |

Confirmed: the EPA@Lab logo remains independent. The institution and school name
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
| `partners` | object list | No | Home-only partners with name, URL, description, mark, and provisional state |

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
| `role` | string | Yes | Mentor, leader, student, alumni, etc. |
| `program` | string | No | Academic program |
| `study_year` | string | No | Current study year/level |
| `generation` | controlled key | Yes | Stable generation/cohort key used for page grouping and anchors |
| `joined_year` | integer | No | Year the member joined EPA@Lab, if separately useful |
| `portrait` | image path | Yes | Approved portrait |
| `summary` | string | Yes | Card-length biography |
| `yearbook_quote` | string | No | Short member-approved quote shown on the card |
| `research_interests` | string list | No | Research topics |
| `achievements` | object list | No | Achievement title, year, optional detail/link |
| `links` | object list | No | Approved profile/research links |
| `alumni` | boolean | Yes | Current/alumni state |
| `weight` | integer | Yes | Manual ordering within a generation group |
| `draft` | boolean | Yes | Publication state |

The Markdown body may contain an extended biography for future use, but the
current public design has no individual member pages. `generation` is the
primary grouping on the Members page. Generation keys are stable and
untranslated; labels are localized.

Generations display in descending order: the newest generation is added at the
top, while the first generation remains at the bottom. The numeric `order` value
still represents the real chronological generation number.

Generation labels live in `data/generations.toml`, with a stable key, numeric
order, and Mongolian/English labels. Leadership terms live separately in
`data/leadership.toml` and reference a member slug, role labels, start/end year,
current state, and provisional state. This preserves former leaders when the
current laboratory leader changes.

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
| `objective` | rich text | Yes | Project objective |
| `implementation_site` | localized string | Yes | Implementation location, object, or site |
| `summary` | string | Yes | Card and metadata summary |
| `results` | rich text | Yes | Results and description of completed work |
| `related_publications` | page-reference list | No | Published outputs produced by the project |
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
| `category` | controlled key | Yes | Activity type |
| `cover` | image path | Yes | Card and social image |
| `gallery` | image list | No | Additional approved images/captions |
| `tags` | string list | No | Secondary topics |
| `featured` | boolean | Yes | Eligible for Home display |
| `draft` | boolean | Yes | Publication state |

Baseline category keys:

- `training`
- `experiment`
- `achievement`
- `conference`
- `activity`

News is a confirmed primary section and may also supply featured cards to Home.
The current records are provisional samples and must be replaced or approved
before launch.

## 7. Equipment — legacy prototype, not stakeholder-required

Equipment is not part of the stakeholder-confirmed structure. Keep the current
prototype data only until the Home and About redesign establishes whether any of
it should be reused; do not create an equipment collection for the initial release.

Each optional item contains only:

| Field | Type | Required | Purpose |
| --- | --- | --- | --- |
| `name` | string | Yes | Equipment name, optionally including model |
| `category` | string | No | Simple display grouping |
| `description` | string | No | One short sentence when useful |
| `image` | image path | No | Approved photo if the design uses one |

This list can later be promoted to a collection without changing the public URL
structure if detailed equipment pages become valuable.

## 8. About and Contact pages

These remain singleton translated Markdown pages rather than collections.

About front matter:

- `title`
- `description`
- `hero_image`
- `founded_label` and `founded_value`
- `history_intro`
- ordered `history` milestones with year, title, description, and provisional state
- ordered `achievements` with title, year, description, image, and provisional state
- ordered `teachers` with name, role, portrait, summary, biography, and provisional state
- page-level `provisional` state

The body may contain the longer laboratory history and supporting context.
Adding, removing, or replacing a history milestone, achievement, or teacher must
not require a template change. Until approved content arrives, every invented
sample record must retain `provisional = true` and a visible public label.

Contact front matter:

- `title`
- `description`
- `address`
- `email`
- `email`
- `supervisor_name` and `supervisor_role`
- `map_url`
- `map_embed_url`
- `source_note`
- `provisional`

The current baseline uses the stakeholder-supplied Google Maps embed and keeps
an external Maps link for opening directions. The changing laboratory leader
remains managed by the separate leadership-term data and is not duplicated in
Contact.

## 9. Review checklist

Before treating this baseline as stable, confirm:

- [ ] Final values and labels for the three manually maintained Home statistics
- [x] Member email excluded
- [x] Generation labels and newest-first page order confirmed from source PDF
- [x] Publication list fields confirmed
- [x] Free-text project duration selected for the baseline
- [ ] Whether achievements need their own site-wide collection later
- [ ] Which fields must be mandatory in Pages CMS
- [ ] Approved Mongolian and English terminology for all controlled labels
