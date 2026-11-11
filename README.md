# John & Carrie Travel

A cinematic, responsive travel journal built for GitHub Pages. No framework, external fonts, dependencies, API keys, or paid service required.

## Local preview

Requires Node.js 22 or newer.

```sh
node build.cjs
node test.cjs
node serve.cjs
```

Open http://localhost:4173. Re-run the build after source edits and refresh the browser. Deployable files are generated in `dist/`, which is intentionally ignored by Git.

## Publish to GitHub Pages

1. Review and merge the redesign pull request into `main`.
2. In repository Settings → Pages → Build and deployment, choose **GitHub Actions** as the source.
3. The included workflow validates every pull request and deploys only pushes to `main` or a manual workflow run on `main`. If the first run happened before Pages was enabled, re-run it.
4. Expected project URL: https://secopsengineer.github.io/john-carrietravel/ (not live until Pages is enabled and deployment succeeds).

All normal page and asset URLs are relative, so the project subdirectory works without a framework router or rewrite rules. The custom 404 uses the repository base path; update its `<base>` generation in `build.cjs` when moving to a custom domain or another repository.

## Content and design

- `build.cjs`: shared layouts and generated homepage, story collection, story pages, Alaska trip page, destinations, About, films, and photo credits.
- `content.json`: hero text, upcoming sailing, cruise stories, destinations, videos, durations, and photo credits. See [UPDATING.md](UPDATING.md) for copy-and-edit examples.
- `styles.css`: responsive white/ocean-blue editorial design, reduced motion, visible focus, mobile navigation.
- `app.js`: film search and native modal dialog; videos load only on an explicit click. Escape closes playback and returns focus.
- `assets/`: local copies of images used by the redesign, including the original cruise story photographs and channel thumbnails.
- `archive/`: original visible page text and an inventory of original links/images. This preserves historical family details, old site placeholders, the full cruise journal, and original social URLs without presenting outdated information as current.

For routine updates, edit `content.json` and upload photographs to `assets/`. Adding a story automatically generates its page and collection card. One upcoming-trip record supplies the menu, homepage, trip page, and About details. Full instructions: [UPDATING.md](UPDATING.md).

## Migration decisions

The Wix home, About, Travel, Upcoming Cruises, Eat, Relax, Videos, blog RSS feed, and sole published story were inspected on November 10, 2026 (America/Chicago). See `archive/inventory.json` and `MIGRATION.md`.

No newsletter or contact form backend was available. The old placeholder email was not made into a real contact action, and no nonfunctional signup was added. Visitors can follow the existing YouTube, Facebook, and Instagram links.

Existing image provenance is recorded in the inventory; reuse does not independently verify third-party image licensing. The Quantum of the Seas photograph is licensed CC BY 2.0 and attributed on `photo-credits.html`; its source, author, license, and modifications are stored in `content.json`.

## Validation

`node test.cjs` checks every generated page, local link and asset, a single primary heading per page, preserved YouTube IDs, and the cruise story ending. The pull request workflow runs these checks on Linux. Browser QA covered desktop pages, mobile homepage/navigation, film filtering, live Nassau playback, and keyboard dialog dismissal/focus restoration.

## Films refresh

The Films page contains 16 cruise-related channel videos, a most-watched feature, category filters, search, and sorting. View counts are approximate public labels reviewed November 10, 2026; see `archive/youtube-review.json` for the source and selection record. The homepage shows only three viewer favorites. Update metadata in `content.json` following `UPDATING.md`; no live API or credentials are required.
