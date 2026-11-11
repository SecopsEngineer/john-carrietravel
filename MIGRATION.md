# Wix migration inventory

Working brand: **John & Carrie Travel**. Source: https://mesquitebaseballof.wixsite.com/johncarrietravel

| Original content | New destination | Preservation |
| --- | --- | --- |
| Home and About | `index.html`, `about.html` | Original visible text archived; dated marriage/college details rewritten as historical context |
| Travel | `destinations.html` | All three ports from the published cruise story |
| Our First Cruise (February 2, 2019) | `our-first-cruise.html` | Full original body and original story photographs retained; better typography and paragraphs |
| Nassau / Key West / Cocoa Cay | `nassau.html`, `key-west.html`, `cococay.html` | Summaries grounded in the original article; original Cocoa Cay spelling noted |
| Upcoming Cruises | `cruise-archive.html` | Royal Caribbean November 27, 2021 and Norwegian January 31, 2022 labeled historical |
| Eat and Relax | `eat.html`, `relax.html` | Original categories retained; honest empty states, with relevant existing travel memories |
| Videos | `videos.html` | All three Wix embeds, full original metadata in `content.json`, direct watch links, channel link |
| Mailing list / contact | Social channel links | No fake form success or placeholder email used as real contact information |

## Original YouTube embeds

- Rough Seas on Royal Caribbean's Vision of the Seas — https://www.youtube.com/watch?v=-8CrYi-A8pg — 2:05
- A Tour around Key West, Florida — https://www.youtube.com/watch?v=Z00bvTX22YY — 1:39
- Tour Nassau, Bahamas — https://www.youtube.com/watch?v=m69hzZpjbdo — 2:40
- Channel: https://www.youtube.com/channel/UCmTwsd2YTjS9xykmScB_SrA
- Original subscribe link retained in video metadata: https://www.youtube.com/channel/UCmTwsd2YTjS9xykmScB_SrA?sub_confirmation=1

The Wix RSS feed listed only `post/our-first-cruise`. No other published story appeared in the inspected categories. This is an inventory of the public Wix site; it does not claim to export private Wix drafts or the entire current YouTube channel library.

`archive/*.txt` retains the visible original page text, including footer material and placeholders. `archive/inventory.json` retains outbound URLs and original image URLs. Those archive files are source records, not current visitor-facing claims.

Existing repository before this change: one commit containing only `README.md`. Work is isolated on a new branch and offered as a pull request; no merge or production deployment was performed.
