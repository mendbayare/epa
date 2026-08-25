# EPA@Lab website

Multilingual static website for the Electrical Power Automation Laboratory at MUST, built with Hugo Extended.

Project decisions, progress, session handoffs, and next actions are maintained in
[`docs/PROJECT.md`](docs/PROJECT.md). Read it before starting work and update it
at the end of every working session.

## Local development

```sh
hugo server --buildDrafts
```

Open `http://localhost:1313/`. Mongolian is the default language and English is available under `/en/`.

## Production build

```sh
hugo --minify
```

Generated files are written to `public/` and are not committed.

## Content

Translated pages live beside each other using language suffixes:

```text
content/about/_index.mn.md
content/about/_index.en.md
```

Create structured entries using the included archetypes, for example:

```sh
hugo new content news/example.mn.md
hugo new content projects/example.en.md
```

All current public copy and contact details are provisional until approved by the laboratory.
