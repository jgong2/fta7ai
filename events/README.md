# FTA Event Radar · 活动雷达

Public tracker of external events FTA is watching. Live at:

- Page: https://fta7ai.com/events/
- Data: https://fta7ai.com/events/events.json

This is **not** a list of events FTA hosts. It is a personal radar: conferences, fairs, meetups and deadlines under consideration. The page is public and has no password. It is **not** linked from the site's top menu.

## Source of truth

`events.json` is the single source of truth. The HTML page fetches it (with a cache-busting query) and also embeds a copy inline, so the page still works if the fetch fails and so other agents can read the events from raw HTML.

Other AI agents (Claude, ChatGPT, Grok, etc.) should:

1. `GET https://fta7ai.com/events/events.json` (preferred), or read `events/events.json` in this repo.
2. Treat `updated` (ISO 8601, Asia/Shanghai / UTC+8) as the stamp of the last edit.
3. Not invent dates, fees, venues, or status. If a fact is not verified, leave it blank or write `未核实` / note the uncertainty.
4. After editing, keep `events/index.html` in sync: its embedded JSON (`#events-data`) and the plain-text `#events-plain` block must match `events.json`. The easiest way is to regenerate those two blocks from `events.json` when you change the file, then commit both.

## Theme and status colors

The page keeps a **light** (white) background. Status is color-coded the same way in the three-month overview, calendar chips, detail cards, badges, filter counts, and the legend at the top:

- **Near-black** (`#222222`): 观察 Watching and 考虑 Considering — found, not yet decided. Neutral, not orange.
- **Deep green** (`#1E7B3A`): 已报名 Registered and 决定去 Going.
- **Muted dark red** (`#B03A2E`): 不去 Not going. Not a bright red.

Items also have a left color bar and a lightly tinted border. Upcoming deadlines within 14 days are marked with a ⏰ label and a blue outline, not red, so they are not confused with the “not going” color.

## Three-month overview and folding

The top of the page is a **三个月总览** (three-month view): the current calendar month in Asia/Shanghai plus the next two, computed in the browser from today's date. Each month lists a one-line summary (date, name, city, status, short why). Clicking a summary expands that event's detail card and its month group below, then scrolls to it and briefly highlights it. An event that spans months appears in each month it touches.

Month blocks in the overview, month groups in the detail section, and each event card can be folded independently (▸ / ▾). The **全部展开** / **全部折叠** buttons open or close the detail month groups and event cards; **全部折叠** leaves the three-month overview months open so the visibility layer stays on screen. Overview months can still be folded individually. Fold state is remembered in `localStorage` (`fta-event-radar-folds-v1`) when available. The no-script fallback embeds the same three-month summaries (frozen at the last commit's "today") and uses `<details>` so items still fold.

## How to add or update an event

1. Edit `events.json` only after you have a verified `start` (and `end`) date from a source (official page, organizer email, or a teammate's researched note that cites a source).
2. Put new objects in the `events` array. Keep **GBWICO 2027** (`id`: `gbwico-2027`) as the first entry unless it is removed.
3. Set `updated` on the event (date, `YYYY-MM-DD`) and bump the file-level `updated` timestamp.
4. Sync the embedded copy in `index.html` (see above).
5. Commit as a normal commit on `main`. Do **not** rewrite git history and do **not** force-push. Do **not** edit other site pages, `lom/`, or the top navigation to advertise this folder.
6. Push to `main`. GitHub Pages usually updates https://fta7ai.com/events/ in one to two minutes. Confirm both the page and `events.json` return HTTP 200 with the new content.

## Schema

Top level:

| Field | Meaning |
|---|---|
| `title` | Page title |
| `timezone` | `Asia/Shanghai` |
| `updated` | Last update, ISO 8601 with offset |
| `note` | Short scope note for humans and agents |
| `events` | Array of event objects |

Each event:

| Field | Required | Meaning |
|---|---|---|
| `id` | yes | Stable kebab-case id, unique in the file |
| `name` | yes | Chinese (or usual) display name |
| `name_en` | yes | English name |
| `start` | yes | Inclusive start date `YYYY-MM-DD` |
| `end` | yes | Inclusive end date `YYYY-MM-DD` (same as `start` if one day) |
| `dates` | no | Explicit session dates when `start`/`end` is only a span (e.g. weekly meetups) |
| `city` | yes | City in Chinese |
| `city_en` | no | City in English |
| `venue` | yes | Venue; use `待核实` or `场馆待核实` if the city is known but the hall is not |
| `type` | yes | Type in Chinese (学术研讨会, 黑客松, 展会, …) |
| `type_en` | no | Type in English |
| `status` | yes | One of: `watching`, `considering`, `registered`, `going`, `not_going` |
| `status_zh` | yes | Chinese label: 观察 / 考虑 / 已报名 / 决定去 / 不去 |
| `cost` | yes | Fee notes in Chinese. Write `未核实` if unknown. Do not invent a price. |
| `deadlines` | yes | Array of `{ "date": "YYYY-MM-DD", "label_zh": "...", "label": "..." }`. Use `[]` if none. |
| `why` | yes | Why it is on the radar, plus caveats, schedule notes, conflicts |
| `official_url` | yes | Official or registration URL; empty string if none is verified |
| `source` | yes | Who found it (e.g. `f13`, `f13+SA`) |
| `updated` | yes | Date this record was last checked `YYYY-MM-DD` |

Status values are English in `status` so machines can filter; always pair them with `status_zh`.

## Local preview

Open `events/index.html` over a local static server (so `fetch('events.json')` works), or just open the file — the embedded fallback still renders the list.
