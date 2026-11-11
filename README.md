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

- `build.cjs`: shared layout, home, trip story, destinations, about, and films pages.
- `content.json`: all three original YouTube records, titles, descriptions, durations, and embed URLs.
- `styles.css`: responsive white/ocean-blue editorial design, reduced motion, visible focus, mobile navigation.
- `app.js`: film search and native modal dialog; videos load only on an explicit click. Escape closes playback and returns focus.
- `assets/`: local copies of images used by the redesign, including the original cruise story photographs and channel thumbnails.
- `archive/`: original visible page text and an inventory of original links/images. This preserves historical family details, old site placeholders, the full cruise journal, and original social URLs without presenting outdated information as current.

Adding a film: append a VideoObject to `content.json`, save its YouTube thumbnail in `assets/<video-id>.jpg`, and update the display-duration list in `build.cjs`. Adding a destination: extend the `trips` array. Rebuild and test before committing.

## Migration decisions

The Wix home, About, Travel, Upcoming Cruises, Eat, Relax, Videos, blog RSS feed, and sole published story were inspected on November 10, 2026 (America/Chicago). See `archive/inventory.json` and `MIGRATION.md`.

No newsletter or contact form backend was available. The old placeholder email was not made into a real contact action, and no nonfunctional signup was added. Visitors can follow the existing YouTube, Facebook, and Instagram links.

Existing image provenance is recorded in the inventory; reuse does not independently verify third-party image licensing. No new stock assets were introduced.

## Validation

`node test.cjs` checks every generated page, local link and asset, a single primary heading per page, preserved YouTube IDs, and the cruise story ending. The pull request workflow runs these checks on Linux. Browser QA covered desktop pages, mobile homepage/navigation, film filtering, live Nassau playback, and keyboard dialog dismissal/focus restoration.
