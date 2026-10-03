# Design system

Premium utilitarian minimalism. Editorial, warm monochrome, colour used only
for meaning.

## Tokens

Defined once in `app/globals.css` under `@theme`. No `tailwind.config.js` —
Tailwind v4 is configured in CSS.

| Token | Value | Use |
| --- | --- | --- |
| `--color-ink` | `#111111` | Primary text, solid buttons. Never `#000` |
| `--color-body` | `#2F3437` | Body copy |
| `--color-muted` | `#787774` | Secondary text, meta |
| `--color-line` | `#EAEAEA` | Every border. `1px solid` |
| `--color-bone` | `#F7F6F3` | Canvas / section wash |
| `--color-surface` | `#FFFFFF` | Cards, header, popovers |
| `--color-red` / `--color-red-ink` | `#FDEBEC` / `#9F2F2D` | Tag pair |
| `--color-blue` / `--color-blue-ink` | `#E1F3FE` / `#1F6C9F` | Tag pair |
| `--color-green` / `--color-green-ink` | `#EDF3EC` / `#346538` | Tag pair |
| `--color-yellow` / `--color-yellow-ink` | `#FBF3DB` / `#956400` | Tag pair |

## Type

- Sans (UI, body, buttons): `'SF Pro Display', 'Geist Sans', 'Helvetica Neue', 'Switzer', sans-serif`. Body at `line-height: 1.6`.
- Serif (hero, quotes): `'Lyon Text', 'Newsreader', 'Playfair Display', 'Instrument Serif', serif` at `letter-spacing: -0.03em`, `line-height: 1.1`.
- Mono (code, order ids, keys): `'Geist Mono', 'SF Mono', 'JetBrains Mono', monospace`.

Hero heading: serif, `clamp(2.5rem, 6vw, 4.5rem)`, tight leading. Section
headings: sans, uppercase, `letter-spacing: 0.05em`, 13px.

## Surfaces

- Cards: `1px solid --color-line`, radius `12px`, padding `24px`–`40px`.
- Buttons (primary): `#111` bg, white text, radius `6px`, no shadow. `:active` → `scale(0.98)`. Hover → `#333`.
- Tags: radius `9999px`, 11px, uppercase, `letter-spacing: 0.05em`, on a pastel bg.
- `<kbd>`: `1px solid --color-line`, radius `4px`, bg `--color-bone`, mono.
- Accordions (FAQ): no container box, `border-bottom` only, `+` / `−` toggle.

## Banned

`shadow-md/lg/xl` · gradients · `rounded-full` on cards or buttons · Inter /
Roboto / Open Sans · Lucide / Feather / Heroicons · emojis · `#000000` body
text · bright coloured section backgrounds · `Lorem Ipsum` / `John Doe`.

## Layout

- Section padding: `py-24` desktop, `py-16` mobile.
- Text column: `max-w-4xl` / `max-w-5xl`.
- Grids: asymmetric bento, gapless where the design calls for it.

## Depth

Sections are never flat bone. Each gets one of: a full-width image at
`opacity: 0.04`, a warm `radial-gradient` at `opacity: 0.03`, or a 1px line
pattern. One slow ambient blob (20s+, `opacity: 0.02`) on a
`position: fixed; pointer-events: none` layer behind the hero only.

## Verify

Visual pass at 375px and 1440px. Borders checked at `#EAEAEA`, radius never
above 12px on cards.
