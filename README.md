# RPS Technologies Blog

Ron Smith's software development blog, built with [Astro](https://astro.build). Content was migrated from an older WordPress blog.

## Project structure

```text
/
├── public/                  # static assets (favicon, etc.)
├── src/
│   ├── content/
│   │   ├── blog/            # blog posts (one folder per post, index.md + images/)
│   │   │   └── _drafts/     # unpublished drafts — excluded from the build entirely
│   │   └── pages/           # standalone pages (About, etc.)
│   ├── content.config.ts    # content collection schemas
│   ├── layouts/
│   │   └── BaseLayout.astro
│   └── pages/                # routes: /, /blog/, /blog/[slug]/, /about/
└── astro.config.mjs
```

Blog posts and pages are Markdown files with frontmatter (`title`, `date`, `tags`, `categories`, `draft`). Posts under `src/content/blog/_drafts/` are flagged `draft: true` and are skipped by `getStaticPaths` in `src/pages/blog/[...slug].astro`, so they are never built or deployed.

## Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
