# Sue's Cobscook Bay Cafe — concept proposal site

Concept demo website built by **Tiyan Digital** for lead outreach to
Sue's Cobscook Bay Cafe (2730 US-1, Edmunds Township, ME 04628 — breakfast &
lunch cafe, no website today).

- **Suggested repo:** `tiyandegital-hue/sues-cobscook-bay-cafe-proposal`
- **Stack:** plain HTML/CSS/JS, no build step, zero third-party requests
  (fonts + images self-hosted). Deploy as a static site; Framework Preset: Other.
- **Preview locally:** `python3 -m http.server` in this folder, open `index.html`.
- **Business details = one constant:** edit `SITE` in `assets/js/site.js`
  (name, phone, address, hours…) — every page updates.
- **Honesty:** menu items, prices, and hours are marked SAMPLES throughout;
  photos are AI-generated illustrations (disclosed in footer);
  no invented reviews/stats/awards. Real proof link: bluedhaka.com.
- **Design record:** see `DESIGN.md` (tokens, psychology, signature ideas, known gaps).
- **QA:** `.qa/qa.js` re-runs the full check (screenshots 1440/390, console,
  overflow, links, interactions) with puppeteer-core + chrome-headless-shell;
  last full report in `.qa/report.json` — 20/20 page×width combos passed.
