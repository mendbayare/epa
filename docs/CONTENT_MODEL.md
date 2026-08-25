# EPA@Lab baseline content model

**Status:** Revised baseline for stakeholder review  
**Last updated:** 2026-08-26

This document defines the minimum content structure needed to build and test the
website. It is intentionally smaller than the final Pages CMS configuration.
Fields can be added after the layouts reveal a real need, but changing identifiers
after content migration should be avoided.

## Conventions

- Content is written in Markdown with TOML front matter.
- Mongolian and English translations live beside each other using `.mn.md` and
  `.en.md` suffixes and the same base filename.
- `title`, `summary`, and Markdown body content are translated independently.
- Identifiers such as category keys, dates, URLs, and image paths stay identical
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
| `email` | email | No | Official public email |
| `phone` | string | Yes | Public telephone number |
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
| `mentor_name` | string | Yes | Mentor display name |
| `mentor_role` | string | Yes | Mentor title/role |
| `mentor_image` | image path | Yes | Mentor portrait |
| `mentor_greeting` | rich text | Yes | Short Home-page greeting |
| `mentor_page` | page reference | No | Link to a full profile or About section |
| `stats` | ordered list | Yes | Key, numeric value, label, optional suffix |
| `equipment` | ordered string list | Yes | Compact Home-page hardware strip |

Baseline statistic keys:

- `publications`
- `graduates`
- `students`

News and featured research are selected from their content collections instead
of duplicated in Home front matter. An entry uses `featured = true`; the Home
template applies a display limit and newest/weight ordering.

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
| `joined_year` | integer | Yes | Year the member joined EPA@Lab, e.g. `2025` |
| `portrait` | image path | Yes | Approved portrait |
| `summary` | string | Yes | Card-length biography |
| `research_interests` | string list | No | Research topics |
| `achievements` | object list | No | Achievement title, year, optional detail/link |
| `links` | object list | No | Approved profile/research links |
| `alumni` | boolean | Yes | Current/alumni state |
| `weight` | integer | Yes | Manual ordering within a joined-year group |
| `draft` | boolean | Yes | Publication state |

The Markdown body contains the full biography. `joined_year` is the baseline
grouping and filter. The interface may call this a cohort/generation, but the
stored value has the precise meaning “year joined EPA@Lab.” Role may be added as
a second filter later without changing the record format.

Confirmed: member records do not expose email addresses. Optional approved
professional/research links may still be used when appropriate.

## 4. Research projects

Location: `content/projects/{slug}/index.{lang}.md`

| Field | Type | Required | Purpose |
| --- | --- | --- | --- |
| `title` | string | Yes | Project title |
| `date` | date | Yes | Publication or completion date |
| `summary` | string | Yes | Card and metadata summary |
| `category` | controlled key | Yes | Primary filter category |
| `tags` | string list | No | Secondary topics/technologies |
| `participants` | string list | Yes | Students or team members |
| `supervisor` | string | Yes | Supervisor display name |
| `year` | integer | Yes | Project year |
| `status` | controlled key | Yes | `ongoing` or `completed` |
| `cover` | image path | Yes | Card and social image |
| `gallery` | image list | No | Additional approved images/captions |
| `report` | file path | No | Public PDF report |
| `external_url` | URL | No | Demo, repository, or external result |
| `featured` | boolean | Yes | Eligible for Home display |
| `weight` | integer | No | Editorial feature ordering |
| `draft` | boolean | Yes | Publication state |

Baseline category keys:

- `automation-control`
- `protection-relays`
- `scada-hmi`
- `communication`
- `embedded-iot`
- `power-quality`

The Markdown body contains the problem, approach, implementation, and results.
Category labels are translated separately so stable keys are never translated.

Decision needed: confirm category names and whether source-code links may be public.

## 5. Publications — deferred

The stakeholder requested a Published list, but its scope is not yet clear.
Publication modeling and implementation are paused until the lab confirms what
belongs in that list. The following is a candidate model, not part of the current
approved baseline.

Location: `content/publications/{slug}/index.{lang}.md`

| Field | Type | Required | Purpose |
| --- | --- | --- | --- |
| `title` | string | Yes | Published work title |
| `authors` | string list | Yes | Ordered author list |
| `date` | date | Yes | Publication date; year-only dates use January 1 |
| `publication_type` | controlled key | Yes | Journal, conference, thesis, report, etc. |
| `venue` | string | Yes | Journal, conference, or publisher |
| `volume` | string | No | Volume/issue display value |
| `pages` | string | No | Page range/article number |
| `doi` | string | No | DOI value, without URL prefix |
| `external_url` | URL | No | Canonical external record |
| `pdf` | file path | No | Approved public PDF |
| `category` | controlled key | No | Related research category |
| `summary` | string | No | Short abstract/description |
| `featured` | boolean | Yes | Eligible for Home/stat highlights |
| `draft` | boolean | Yes | Publication state |

Baseline publication type keys:

- `journal`
- `conference`
- `thesis`
- `report`
- `other`

The Markdown body is optional and can contain an approved abstract or additional
context. A link or DOI does not imply permission to host the full PDF.

Decision needed: whether “Published list” includes student theses and internal
reports or only formally published academic work.

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

The Markdown body contains the article. The initial release does not require a
separate author record unless stakeholders request bylines.

## 7. Equipment — embedded About-page list

Equipment does not need individual pages or its own content collection in the
current scope. A compact names-only strip appears in the Home overview, while
About may present a concise ordered list or grouped visual section with slightly
more context.

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
- `intro_image`
- `mentor_image`
- ordered `goals`
- ordered `achievements` with title, year, and optional description
- ordered `equipment` items with name, optional category, description, and image

The body contains the laboratory introduction and mentor/profile narrative.

Contact front matter:

- `title`
- `description`
- `responsible_people` with name, role, telephone, and optional email
- `map_embed_url` only if the selected provider is privacy-acceptable

Address and general contact data come from site settings to prevent duplication.

## 9. Review checklist

Before treating this baseline as stable, confirm:

- [ ] Final values and labels for the three manually maintained Home statistics
- [x] Member email excluded; joined-year grouping confirmed
- [ ] Research category list
- [ ] Publication scope and publication type list (deferred)
- [ ] News category list
- [ ] Whether achievements need their own site-wide collection later
- [ ] Which fields must be mandatory in Pages CMS
- [ ] Approved Mongolian and English terminology for all controlled labels
