# West Coast Prenup

A production build of the Figma frame **“West Coast Prenup - V2 - Desktop”** (1440 × 3218) as a
static site: semantic HTML5, modern CSS, and a small amount of vanilla JavaScript. No build step,
no dependencies, no external network requests at runtime.

## Running locally

Any static file server works. From this directory:

```bash
python -m http.server 4182
```

Then open <http://localhost:4182>.

Opening `index.html` straight off the filesystem also works, though a server is preferable so the
self-hosted font is served with the right MIME type.

## Structure

```
West_Coast_Prenup/
├── index.html          # Single page, one section per Figma frame
├── styles.css          # Design tokens, layout, responsive rules
├── script.js           # Marquee cloning + mobile navigation
├── assets/
│   ├── images/         # Photographs (hero, marquee slides, service cards)
│   ├── icons/          # Feature icons and decorative line art
│   ├── logos/          # WCP wordmark
│   └── fonts/          # Inter (variable, latin subset)
└── README.md
```

## Design system

Every value below was read from the Figma file rather than estimated. The file defines no Figma
variables, so the palette is declared as CSS custom properties in `:root`.

| Token | Value | Used for |
| --- | --- | --- |
| `--c-ink` | `#173c3a` | Headings, solid buttons, footer field |
| `--c-ink-soft` | `#315b55` | Nav links, icon badges, decorative strokes |
| `--c-eyebrow` | `#58706a` | Section eyebrows |
| `--c-eyebrow-alt` | `#61736d` | Trust eyebrow |
| `--c-body` | `#4b5c56` | Primary body copy |
| `--c-body-hero` | `#53625d` | Hero body copy |
| `--c-muted` | `#6f7773` | Secondary body copy |
| `--c-step-no` | `#82928d` | Process step numerals |
| `--c-rule` | `#d9ddd4` | Hairlines and card borders |
| `--c-surface-warm` | `#f4f2ed` | Services section field |
| `--c-nav-rule` | `rgba(23,60,58,.22)` | Header underline |

**Type.** Georgia for display (headlines, service titles, step numerals, footer CTA) and Inter for
everything else. Inter is self-hosted as a variable woff2 in `assets/fonts/` so the page has no
third-party font dependency.

**Layout.** The 1440px frame uses a 100px gutter over a 1240px content column, expressed as
`--gutter: clamp(24px, 6.944vw, 100px)`. Every section — including the hero card — puts its content
inside `.wrap`, so all headings share one column and stay aligned when that column centres above
1440px. Service cards sit in their own 48px gutter (`--card-gutter`). Flexbox and CSS Grid carry
the layout; absolute positioning is reserved for the
three places the design genuinely layers content: the hero landscape and its gradient washes, the
photo marquee, and the decorative line icons on the service cards.

## Assets

All imagery and the wordmark were exported from the Figma file — nothing is redrawn or substituted.
The only exception is the three assurance icons, which were swapped for Lucide equivalents (see
*Fidelity*). Photographs were converted from their source encodings to progressive JPEG and
resized to roughly 2× their rendered size, which cuts the page payload from ~35 MB to ~1.9 MB with
no visible change at 1× or 2× density. Icons remain SVG.

The marquee is a repeating five-image cycle: the frame's slides 6–10 carry the same five captions
as slides 1–5, but their fills are only ~280px wide and were being scaled up ~1.6× to fill a 250px
card, which read as visibly soft. Both cycles now draw from the high-resolution originals, so every
slide has at least 2.5× the pixels of its render box and stays sharp on retina displays.

## Navigation

The header links scroll to in-page sections (smooth, disabled under
`prefers-reduced-motion`, with 24px of `scroll-margin-top` on the targets):

| Link | Target | Section |
| --- | --- | --- |
| Home | `#top` | Hero |
| About Us | `#about` | “Clarity now. Confidence later.” |
| Our Services | `#services` | “A Prenup That Reflects Your Life.” |
| Contact Us | `#contact` | Footer CTA |
| Journal | — | *no counterpart in this frame* |
| Information | `#process` | “Simple by design. Personal by nature.” |

Every section in the frame is reachable. **Journal** is the one nav item with nothing to point at —
the design has six links and five sections — so it is left as an inert placeholder pending a real
Journal page.

## Behaviour

`script.js` does two things and nothing more:

- **Marquee** — clones the ten slides once so the loop restarts seamlessly, and measures the real
  rendered geometry to set the scroll distance. The animation itself is CSS, and it is disabled
  under `prefers-reduced-motion: reduce`.
- **Mobile navigation** — toggles the collapsed nav below 760px, keeping `aria-expanded` in sync
  and closing on link activation.

## Responsive behaviour

- **≥ 1201px** — the design as drawn. Section origins, the 3218px document height, and every
  content box match the Figma frame.
- **761–1200px** — two-column rows (trust, services head, process) stack; assurance columns become
  equal-width; service cards keep their split layout at 50/50.
- **≤ 760px** — single column throughout. The marquee moves into normal flow beneath the hero, the
  header collapses behind a menu button, service cards stack photo-over-copy, and the decorative
  line icons are dropped since there is no room for them to read.

## Accessibility

Landmark elements throughout, a skip link, a single `h1` with a logical heading order, visible
focus rings, alt text on every content image, decorative art marked `alt=""`, and an
`aria-expanded` mobile nav toggle. Cloned marquee slides are `aria-hidden` so screen readers hear
each caption once.

## Fidelity

Verified by rendering the page at 1440px and diffing it against the Figma export: mean per-pixel
difference of 2.5/255 across the full 1440 × 3218 page, with residual differences confined to text
antialiasing and photo resampling.

One quirk is reproduced deliberately: the trust section eyebrow reads “GUIDANCE FOR WHAT MATTERS”
because the frame draws it in a 220px clipped box that trims the trailing word. The full string is
in the markup; only the visible line is clipped, exactly as the design renders.

Four deliberate departures from the frame:

- **Header rule.** The frame draws the nav at `x=94, width=1235`, so its underline runs 94→1329
  while every other section's column runs 100→1340 — 6px wide on the left, 11px short on the right.
  The rule is inset to the shared content column instead, and the logo and nav links moved with it,
  so the header lines up with the kicker rules and headings below. It is also lightened from the
  frame's `rgba(23,60,58,.42)` to `.22`, and drops to a true half-pixel hairline at `2dppx`.
- **Slide resolution.** The second half of the marquee cycle uses the high-resolution originals
  rather than the frame's ~280px duplicates (see *Assets*).
- **Card shadow.** Reduced from `0 18px 36px -10px rgba(0,0,0,.55)` to
  `0 10px 22px -8px rgba(23,60,58,.42)` — a much tighter falloff, tinted to the brand green. The
  original was also being sheared off flat: the trust section paints after the hero, so its white
  background covered the shadow at exactly y=738. The hero now carries `z-index: 1` so the falloff
  resolves completely.
- **Edge fade.** The strip fades out on both sides via a `mask-image` gradient, which is the
  behaviour the frame's unfilled “Fade mask” layer was reaching for.
- **Service card split.** The frame divides the three cards at 688.39, 687.39 and 704 — three
  slightly different splits. All three are now an even `1fr 1fr`, which lands the photo/copy divide
  on the same centreline (x=720 in the 1440 frame) on every row.
- **Assurance icons.** The frame sets 28px white glyphs on 54px solid green discs. Those are
  replaced with 44px [Lucide](https://lucide.dev) outline icons (`house`, `message-circle`,
  `shield`, v1.28.0, ISC) drawn in `--c-ink-soft` with no disc behind them, for a lighter editorial
  read. Stroke is thinned to 1.5 so the weight stays right at the larger size, and each glyph gets
  a small negative `margin-left` to sit optically flush with its text column — Lucide glyphs carry
  differing padding inside their 24px box (the shield 4px, the speech bubble under 2px), which
  otherwise leaves the row visibly ragged. Icon-to-heading spacing goes 24px → 30px, heading weight
  700 → 800, and heading-to-body 4px → 8px. Column widths, type sizes, section height and the
  divider rules are untouched.
