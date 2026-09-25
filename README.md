# EPA-Lab website

The website of the Electrical Power Automation Laboratory (EPA-Lab) at MUST,
live at [epalab.mn](https://epalab.mn). It is a static site built with Hugo,
in Mongolian (at `/`) and English (at `/en/`).

## Editing content

Lab members edit the site through [Pages CMS](https://app.pagescms.org), not
by changing files. Every form field has a Mongolian hint. The editors' guide
lives at [epalab.mn/guide](https://epalab.mn/guide/). It is left out of the
menu and search engines, so share the link directly.

Saving in the CMS commits to `main`, and every push to `main` rebuilds and
deploys the site through GitHub Actions in two to three minutes.

## Where things are

```text
content/            Page text, one folder per section
  _index.mn.md      Home (Mongolian); every page has an .mn.md and an .en.md
  about/ contact/   Single pages
  news/ projects/   One folder per entry: index.mn.md and index.en.md,
  members/          linked across languages by sharing the folder name
  publications/     Listed only; they have no pages of their own
  guide/            The editors' guide (Mongolian only, unlisted)
data/
  generations.toml  Member generations (I үе, II үе, …)
layouts/            Hugo templates
  baseof.html       The frame every page renders inside
  home.html         Home
  <section>/        The list and single pages of each section
  _default/         Fallback for a page with no template of its own
  partials/         Pieces shared between pages: header, footer, cards, …
assets/
  css/main.css      Tailwind entry point and the design tokens
  js/site.js        Menu, theme switch, copy buttons, members carousel
  images/           Photographs, resized to WebP by Hugo at build time
  fonts/            Noto Sans
static/             Copied to the site as is: icons, manifest, files/ (PDFs)
scripts/            hyphenate.mjs adds soft hyphens to Mongolian text
                    after the build (browsers cannot hyphenate Mongolian)
docs/               Content model, design system and project log
.pages.yml          The Pages CMS forms
hugo.toml           Site settings, languages and menus
```

## Local development

Hugo Extended and Node.js are needed. Tailwind runs from `node_modules`, so
install the build dependencies once:

```sh
npm ci
hugo server
```

Open `http://localhost:1313/`. Add `--buildDrafts` to see entries marked as
drafts (Ноорог) in the CMS.

Run the hyphenation tests with `npm test`.

## Production build

```sh
hugo --minify
node scripts/hyphenate.mjs public
```

The output goes to `public/`, which is not committed. The GitHub Actions
workflow in `.github/workflows/hugo.yaml` runs these same steps on every
push to `main`.

## Documentation

- [`docs/CONTENT_MODEL.md`](docs/CONTENT_MODEL.md): every content type and field.
- [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md): colours, type, spacing and
  components. Read it before adding a component.
- [`docs/PROJECT.md`](docs/PROJECT.md): decisions and the project log.

## License

The code is released under the [MIT License](LICENSE). That covers the
templates, styles, scripts and configuration. It does not cover the
laboratory's content: the text, photographs, member portraits and partner
logos belong to EPA-Lab and their owners and may not be reused without
permission. Noto Sans is under the SIL Open Font License; see
[`docs/licenses/NotoSans-OFL.txt`](docs/licenses/NotoSans-OFL.txt).
