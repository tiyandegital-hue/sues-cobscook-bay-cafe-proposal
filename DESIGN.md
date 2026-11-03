# DESIGN.md — Sue's Cobscook Bay Cafe (concept proposal)

**Project:** multipage concept website for Sue's Cobscook Bay Cafe, 2730 US-1, Edmunds Township, ME 04628 — a breakfast & lunch cafe with no website today.
**Built for:** Tiyan Digital lead pitch (lead-hunt-30min cron, 2026-11-03). Outreach handled by parent agent.
**Design authority:** `~/workspace/custom-skills/pro_design_developer_master/SKILL.md` incl. §18 (MotionSites).

## Mood (three words)
Warm. Honest. Unhurried.

## Psychology brief
- **Visitor:** hungry driver on US-1 / family camped at Cobscook Bay State Park, deciding on a phone, roadside, in under a minute.
- **Pain:** "Are they open? What's on the menu? How do I find them? Will my kids eat there?"
- **One action:** CALL (207) 726-4404. Secondary: see the menu, get directions.
- **Trust gap:** no website exists today — the demo must feel like a real cafe, not a template. Honesty about samples is a trust asset, not a weakness.
- **Emotion:** roadside relief + appetite. A diner that feels like it already knows your order.

## Niche research (done before design)
- magier.com 2026 restaurant audit: a good restaurant site answers five questions fast — what you serve, what it costs, whether you're open, where you are, how to book. Structure follows that.
- Pizzeria Beddia model (neighborhood cafe): friendly and short, clear line, walk-ins-welcome message — adopted for tone.
- Padella model (menu-first casual): menu with prices near the top — the Day Clock puts sample dishes on the home hero.
- Culture Espresso: warm beige palette, natural photography, intuitive nav — palette direction confirmed.
- Squarespace Hemlock: inviting colors + friendly copy for a casual local haunt — copy direction confirmed.
- What we did NOT copy: purple gradients, centered hero + 3 icon cards, reservation-widget clutter (a roadside cafe's CTA is a phone call, not Tock).

## Tokens
| Token | Value | Use |
|---|---|---|
| `--bg` | `#FAF5EA` | page background (first CSS rule — no white flash) |
| `--surface` | `#FFFFFF` | cards |
| `--surface-2` | `#F3EBD9` | alt sections |
| `--ink` | `#26201A` | text — 14.81:1 on bg |
| `--muted` | `#77694F` | secondary text — 4.93:1 on bg |
| `--hairline` | `rgba(38,32,26,.16)` | borders, depth (no shadows) |
| `--accent` | `#B3402A` | barn red — the ONE chromatic CTA color — 5.24:1 on bg, white 5.70:1 on it |
| `--accent-deep` | `#8E2F1D` | hover/press |
| `--radius` | `4px` | brand radius (diner-postcard honesty) |

**Type:** Fraunces (self-hosted variable woff2, 400–700 + italic) for display; system-ui for body; ui-monospace for labels (11–12px, uppercase, +0.2em tracking, 60% opacity). Max 2 families + mono accent.
**Scale:** H1 `clamp(2.75rem, 7vw, 6rem)` (44–96px), lh 0.95, tracking −0.03em — H1 ≈ 5–6× body. Section gap 120px desktop / 72px mobile. Container 1140px, side margins 24px (16–32). Accent on ≤3 element types (CTA buttons, active tab/segment, key links). Zero third-party requests: fonts + images self-hosted.

## Layout ideas (rotated, not repeated)
- **Home:** left-column editorial hero (eyebrow / H1 / sub / CTAs) + right media plane with offset hairline frame. Day Clock card below hero.
- **Menu:** diner ticket typography — dotted price leaders, mono category labels, sticky tab bar.
- **Visit:** two-column (plan builder / address card) → stacked on phone.
- **About:** editorial with ghost "US-1" numeral behind the lede.
- **Catering:** estimator panel + sample packages.
- **Contact:** form left, real info right.
- **Legal:** quiet single-column type pages.
- **404:** centered, one joke, one way home.

## Signature ideas (one live thing per page)
1. **index — "The Day Clock":** breakfast/lunch segmented toggle; auto-selects by time of day (before 11:00 → breakfast). Swaps hero-side featured plate (photo + 3 sample dishes + sample prices) and the open-now line computed from sample hours. The memorable moment.
2. **menu — tabbed chalkboard:** sticky category tabs (Breakfast / Lunch / Sides / Drinks); dotted-leader price rows; persistent "SAMPLE MENU" honesty banner.
3. **visit — "Make a day of it":** 3 trip plans (Park trails first / Breakfast first / Lunch after the park) → rendered timeline with illustrative times.
4. **about — ghost numeral:** oversized "US-1" behind editorial copy; quiet by design (supporting technique only).
5. **catering — headcount estimator:** slider 10–200 → suggested sample trays + "call for a real quote".
6. **contact — honest form:** full state design (labels, focus, inline errors, consent checkbox); submit shows a demo state, never pretends to send.
7. **legal —** plain-language, zero-tracking posture stated outright.
8. **404 —** "This plate never left the kitchen."

## Honesty law (enforced)
- REAL facts only: name, address, phone, "breakfast & lunch cafe", near Cobscook Bay State Park, real Facebook URL.
- Menu items, prices, hours: SAMPLES — visibly labeled everywhere they appear (banner + per-section note + "sample" tags).
- NO invented reviews, awards, stats, founding dates, or owner stories. About page carries a "real story to come" note.
- Footer: "Concept demo crafted by Tiyan Digital" + "Photos are AI-generated illustrations" + real proof link bluedhaka.com.
- Business name = ONE swappable constant (`SITE` in `assets/js/site.js`, injected via `data-site` attributes).
- No cookies, no analytics, no third-party embeds — stated on the cookie page; no consent banner needed (documented choice).

## Components / states
Header (sticky, hairline bottom), mobile nav overlay (state machine: open/close/Esc, focus to panel), buttons (hover lift ≤1.03, active 0.97), footer with legal links, mobile sticky call bar (<768px, home/visit/menu), form states (focus ring, error + aria-describedby, success demo panel), marquee (one, linear, pauses on reduced motion), reveal-on-scroll (opt-in via JS; visible by default without JS; disabled under prefers-reduced-motion).

## Motion budget (light tier only)
Entrances: opacity 0→1 + translateY 24px, 0.8s, cubic-bezier(0.16,1,0.3,1), stagger 0.1s, done by ~1.5s. Hovers ≤1.03 scale at 200ms. No WebGL, no scroll pins, no blur-on-motion. `prefers-reduced-motion` branch mandatory.

## Known gaps
1. Real food/interior photos and the cafe's true story, hours, and menu are pending from the owner — placeholders are samples, labeled as such.
2. Form submit is a demo state (no backend); real send path (email/CRM) to be wired on engagement.
3. No online ordering/reservations — deliberate: a roadside cafe converts by phone.
4. Directions use a Google Maps link, not an embed (zero third-party requests by design).
