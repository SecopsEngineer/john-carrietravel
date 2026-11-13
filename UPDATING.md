# Updating the cruise journal

All trip facts, stories, destination summaries, hero text, photo credits, and video metadata live in **content.json**. You can edit that file on GitHub with the pencil button, preview the change in a pull request, and merge after checks pass. You do not need to edit page layout files for normal content updates.

## Change the next cruise

Find `upcoming`. Update `title`, `ship`, `departure` (YYYY-MM-DD), `durationDays` (a number), `intro`, and `notes` (one paragraph per quoted entry). `status` is the visible label, such as "Upcoming sailing" or "Planning our next cruise". Keep `slug` as `alaska-2027` unless you intend to change the page URL. The menu, homepage sailing details, trip page, About text, and first-story next-trip link all read this record.

The Alaska page describes only facts you supplied. Add confirmed ports and excursions to `notes` when ready. The Juneau photograph is credited as an illustration of the ship, not evidence of your itinerary.

## Add a past cruise story

Add an entry to the `stories` list. A new page and a collection card are generated automatically. Here is a template—replace every example with your real details before publishing:

```json
{
  "slug": "replace-with-a-unique-trip-name",
  "title": "Your cruise title",
  "subtitle": "A short heading for the story.",
  "label": "FROM OUR CRUISE JOURNAL",
  "status": "Cruise memory",
  "published": "2026-11-10",
  "ship": "Your ship name",
  "image": "your-photo.jpg",
  "imageAlt": "Describe what is in your photo",
  "summary": "One sentence for the story collection card.",
  "paragraphs": ["First paragraph.", "Second paragraph."],
  "photos": [
    {"image": "another-photo.jpg", "alt": "Describe the photo", "caption": "Your caption"}
  ]
}
```

Upload the photos into `assets/` first. Keep filenames simple: letters, numbers, dashes, underscores, and a file extension. Slugs must be unique lowercase words separated by dashes. No HTML is needed; content is escaped for safe display. Keep the original archived first-cruise entry intact. New stories can be added after it in your preferred collection order; the first entry is also the homepage archive feature.

## Edit the hero

Change `site.hero.image`, `alt`, `eyebrow`, `heading` (three lines), and `description`. If using someone else’s image, include its actual credit and license in `credits`. Photo credits are generated as a linked page.

## Add a video

Append to `videos` using an existing record as your guide. Provide `name`, `description`, `embedUrl` (`https://www.youtube.com/embed/VIDEO_ID`), and `displayDuration` (for example, `3:12`). Put its thumbnail at `assets/VIDEO_ID.jpg`. The gallery count and duration labels come from the file.

## Check before publishing

Run `node build.cjs` then `node test.cjs`, or let the pull request check run on GitHub. Build errors point out invalid dates, duplicate slugs, and missing images. Generated files are in `dist/`; edit the content source, not those files.

This is a simple content-file workflow, not a separate login or visual editing app. No cruise history has been invented—add entries as you recall the ships and dates.

## Film categories and popularity

The library is curated from the channel’s public Videos → Popular list. `films.reviewedOn` records the snapshot date; counts do not update automatically. Set `viewsApprox` to the rounded numeric estimate (for example 42000), `viewsLabel` to the public display label (for example "42K"), `category` to an existing category, and `popularOrder` to the tie-break order. Set `films.featuredVideoId` to an ID already in `videos`. The home preview shows the three highest-view films, while the Films page offers category filters, search, and most-watched/alphabetical sorting. Preserve original video records when updating counts. Titles and duration labels come from the public channel; labels such as "42 min" retain YouTube’s rounded duration where exact seconds were not shown.

## Add a destination

Add a record to `destinations` in `content.json`. Provide a unique `slug`, `name`, `region` (the small card label), `group` (exactly `Mexico`, `Caribbean & Central America`, or `Florida`), `img` (filename in `assets/`), `imageAlt`, `sub` (one short card sentence), and `text` (your destination introduction). A collection card and detail page are generated automatically. Existing country-level entries can stay broad until you confirm a port or town. Nassau represents the Bahamas; CocoCay remains a separate island stop.

For stock images, set `representativePhoto` to `true`, add `photoCaption` beginning with `Representative view:` and naming the actual place pictured, and add the creator/source/license record to `credits`. A representative town or beach does not mean that was your port of call. Original photo-license records are retained in `archive/destination-photo-sources.json`. Use `originalJournal: true` only for places genuinely in the first-cruise article. `homeFeatured: true` selects up to three homepage cards; leave it off new entries to keep the home preview focused.

Optional `videoIds` links matching videos already in the film library to the destination page—for example, the Cozumel page uses the ATV, buggy, and cooking-excursion video IDs.
