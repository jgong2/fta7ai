# Changelog

## 2026-11-21 (founder bio)

- What we do: added "Who you'll work with" founder bio (Jinsong Gong; based in Chicago and Hong Kong), after services/scope and before the CTA.

## 2026-11-21 (copy + employee map)

- Homepage / What we do: industry-open copy. Automotive, medical device, aerospace, and general manufacturing as peers. Services: process audit, production audit, supplier audit, APQP, PPAP, 8D/CAPA; scope includes IATF 16949, VDA 6.3, ISO 13485, and AS9100-type work (scope, not certification). Removed the duplicate Field notes band and the overlapping in-page Insight Series / SAA video blocks (Insight Series lives at /videos/).
- Quiet "Employee only" link at the bottom of the homepage footer → /employee/, separate employee gate and session (not the site gate). noindex. Site map of FTA pages, SAA worker, LOM addresses, GitHub repos, and the revert tag. Access codes are not listed on the page.

## 2026-11-21

- Restore point: git tag `pre-consolidation-20261121` on the previous main tip
- Public site (homepage, /partners/, /videos/) opens with no password; "not yet public" gate text removed
- Public top nav in two groups, with a visible gap: Home · What we do · Insight Series · Contact  |  SAA · Data Center · Partners (quieter). Mobile wraps instead of hiding the menu
- SAA (/saa/, including Ask SAA) gated with 0000; the landing before the code shows "AI Audit Agents (SAA and more)" and an under-development teaser
- Homepage: a modest "AI Audit Agents (SAA and more) — under development" entry near the bottom of Home; the large SAA hero/strip was removed so the main focus stays audit services
- Data Center content moved to /datacenter/ (films and ASTM demo unchanged); the homepage nav still says only "Data Center" (no extra explanation). The gate says "For internal usage"
- The same client-side 0000 gate (one sessionStorage key, one entry unlocks all) plus noindex on /events/, /as/, /kb/, /internal/, /cn/, and the Data Center / ASTM demo

## 2026-11-09

- Removed an unused page
- New public /partners/ page (U.S. auditor-partner recruiting, EP1 video; no password); Partners added to nav
- Nav: two items removed from public menu; new /internal/ (0000) links internal tools and /internal/saa/ (SAA internal area moved off the public SAA page)
- Homepage cleanup: removed "since 1992", leaked HTML comment, duplicate "What we do" block, "Video coming soon" placeholder
- SAA: full MIT notice moved to saa/data/LICENSE-Quality-Engineering-Skills.txt + /internal/saa/; short credit line on public page

## 2026-10-20

- Add note under the password gate (e29d4e7, 9a4cef9)
- Add SAA (Supplier Audit Agent) page with ISO 9001 §8.4 module (e41d32e)
- Add SAA data files: ISO 9001 §8.4 question set and expert-rules interface (0a15af0)
- Add SAA to site navigation (1cab50b, a799359)
- Add interactive "Ask SAA" box (9afc6c8)
- Connect Ask SAA to the AI backend (20df669)
- SAA page: dark styling for FTA-added blocks (6f58d4b)
- Homepage: add SAA section with video placeholder and "Try SAA (Alpha)" button (d9be30e)
- SAA page: fold internal area; render AI replies as formatted text (a09848b)
- Homepage: update experience wording to "20+ years"; rename old SAA link to "Internal testing SAA" (5f93680)
- Homepage: restyle SAA section to match the hero (5f4c19e)

ISO 9001 §8.4 framework adapted from Ricardo Braga's Quality-Engineering-Skills (MIT License).
