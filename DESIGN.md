---
name: Nox
description: Motion design partner for tech teams — pitch-ready video delivered in a week.
colors:
  deep-void: "oklch(15% 0 0)"
  off-white: "oklch(97% 0 0)"
  signal-gold: "oklch(70% 0.17 88)"
  muted-red: "oklch(57% 0.10 22)"
  carbon-surface: "oklch(21% 0 0)"
  boundary-gray: "oklch(35% 0 0)"
typography:
  display:
    fontFamily: "Geist Sans, Arial, sans-serif"
    fontSize: "clamp(2rem, 5vw, 2.5rem)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Geist Sans, Arial, sans-serif"
    fontSize: "2rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Geist Mono, Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Geist Mono, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "-0.02em"
  label:
    fontFamily: "Geist Mono, Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.04em"
  eyebrow:
    fontFamily: "Geist Mono, Arial, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.08em"
rounded:
  none: "0px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.off-white}"
    textColor: "{colors.deep-void}"
    rounded: "{rounded.none}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.boundary-gray}"
    textColor: "{colors.off-white}"
    rounded: "{rounded.none}"
    padding: "12px 24px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.off-white}"
    rounded: "{rounded.none}"
    padding: "12px 24px"
  button-nav-cta:
    backgroundColor: "{colors.terminal-mint}"
    textColor: "{colors.deep-void}"
    rounded: "{rounded.none}"
    padding: "8px 20px"
  button-nav-cta-hover:
    backgroundColor: "{colors.off-white}"
    textColor: "{colors.deep-void}"
    rounded: "{rounded.none}"
    padding: "8px 20px"
---

# Design System: Nox

## 1. Overview

**Creative North Star: "The Signal Room"**

Everything dark except what matters. A broadcast studio at 2am: true achromatic void, hairline dividers, and a single live indicator — Signal Gold — blinking at the edge of attention. The aesthetic is not minimal for its own sake; it exists so videos render at full luminance. The UI is the dark room. The work is the light.

The system rejects two failure modes by name. First, generic SaaS landing pages: light backgrounds, hero-metric templates, floating device mockups, feature-icon grids — the kind of design that could belong to any software company. Second, crypto/web3 dark: neon-on-black, particle explosions, glow effects, digital noise used decoratively. Nox is dark for the same reason a cinema is dark. Not for style. For the screen.

Type runs at two temperatures: Geist Sans for headlines (editorial confidence, tight tracking) and Geist Mono everywhere else (terminal-native, functional signal). The monospace body is a deliberate signal to the technical founder: we understand your world. Layout uses the same restraint — a full-bleed container just inside the viewport edge, generous vertical rhythm, no decorative wrappers. The cursor is a crosshair sitewide. A small declaration of precision.

**Key Characteristics:**
- True achromatic ground (oklch 15% 0 0) with one saturated accent (Signal Gold, oklch 70% 0.17 88) reserved for live-state signals, active states, and section heading accents. Neutrals carry zero hue — the gold is the only chromatic event on screen.
- Zero border radius on all interactive elements. Sharp edges are the aesthetic.
- Entrance animations simulate a CRT reboot — rapid opacity flicker sequences via anime.js, not fades.
- A fixed 6% SVG noise grain on `body::after` adds analogue texture without competing with video content.
- Hairline dividers at rgba(255,255,255,0.08) mark all structural boundaries. Nothing heavier.
- The interaction section uses a Dune: Part Two interior corridor still (`interaction-bg.jpg`, 3412×1919) filtered at `brightness-[0.65] contrast-[1.1]`. The single light orb at center distance aligns with the crosshair focal point. The warm amber floor glow harmonises with Signal Gold. No breathing animation — the background is static.

## 2. Colors: The Signal Room Palette

One accent, used with discipline. Every other surface is achromatic void.

### Primary
- **Signal Gold** (oklch(70% 0.17 88)): The only saturated color. Used for: the nav CTA button, active/selected states, section heading second lines (the "active claim" line in every h2), blinking live-indicator dots, top-border accents on featured columns, and focus rings at 65% opacity. Appears on 10-12% of any given screen — its rarity is the signal.

### Tertiary
- **Muted Red** (oklch(57% 0.10 22)): Reserved for destructive actions and error states. Near-neutral desaturated red — signals danger without competing with gold. Not used in marketing or decorative contexts.

### Neutral
- **Deep Void** (oklch(15% 0 0) / `#0b0b0b`): Primary surface. True achromatic near-black. Background of every section.
- **Carbon Surface** (oklch(21% 0 0) / `#181818`): Raised surface. Signal/notification bars, table headers, mobile menu background. One tonal step above Deep Void.
- **Boundary Gray** (oklch(35% 0 0) / `#3a3a3a`): Button hover state and shadcn muted foreground. Not used decoratively.
- **Off-White** (oklch(97% 0 0)): Primary text, CTA button backgrounds, logo. True achromatic near-white.
- **Divider** (rgba(255,255,255,0.08)): Hairline borders and table dividers. A structural utility, not a brand color.

### Named Rules
**The One Signal Rule.** Signal Gold appears on at most one attention-drawing element per viewport. When it simultaneously colors a button, a heading, and a blinking dot in the same visible area, it loses its signal value. Reserve it for the element the eye should land on first.

**The Achromatic Ground Rule.** Every surface except the gold accent carries zero chroma. No tints, no temperature bias. The gold is the first and only warmth — it has the room to itself.

## 3. Typography

**Display Font:** Geist Sans (fallback: Arial, sans-serif)
**Body / Label Font:** Geist Mono (fallback: Arial, sans-serif)

**Character:** A two-temperature pairing. Sans at the top of hierarchy (editorial confidence, tight tracking) and Mono throughout the body (terminal-native, functional, present without being decorative). The contrast between typefaces carries more hierarchy than weight variation alone — weight is nearly constant (400) across the system.

### Hierarchy
- **Display** (400, clamp(2rem, 5vw, 2.5rem), line-height 1.05, tracking -0.04em, Geist Sans): Hero h1 only. Always two lines: white first line, Signal Gold second line. The color break is structural — do not collapse to a single color.
- **Headline** (400, 2rem, line-height 1.2, tracking -0.04em, Geist Sans): Section h2. Same two-line color pattern as Display. The mint second line is always the active claim ("Why it works.", "No surprises.", "Before you book.").
- **Title** (400, 1.25rem, line-height 1.2, tracking -0.04em, Geist Mono): Card and panel headings (h3). Uppercase in service rows. Mixed case in process cards and package columns.
- **Body** (400, 1rem, line-height 1.5, tracking -0.02em, Geist Mono): Section supporting copy. Max 42-48ch line length. Secondary body text uses Off-White at 70% opacity (rgba(250,250,248,0.70)).
- **Label** (400, 0.75rem, line-height 1.2, tracking 0.04em, Geist Mono): Button text, nav links, table cell values, answer panel text.
- **Eyebrow** (400, 0.6875rem, line-height 1, tracking 0.08em, Geist Mono, uppercase): Section prefix labels. Two-part: `./` in Signal Gold + section slug in Off-White/40. Mandatory before every section h2.

### Named Rules
**The Two-Temperature Rule.** Geist Sans is reserved for Display and Headline roles. Geist Mono carries everything else. Mixing them within a single type role breaks the system.

**The Mint Second Line Rule.** Every h2 and h1 follows the pattern: white first line, Signal Gold second line. The second line is the active claim — the sentence that carries the argument. If a heading has only one line, the entire heading is white; the mint only applies to multi-line headings where the break is intentional.

## 4. Elevation

This system is flat. No `box-shadow` values exist anywhere in the codebase. Depth is expressed exclusively through tonal layering: Deep Void (#09090b) is the ground; Carbon Surface (#1c1c1c) is the raised layer. The tonal gap between them is narrow by design — surfaces lift slightly, not dramatically.

The sole textural element is the 6% SVG fractal noise on `body::after` (fixed, pointer-events: none). This reads as analogue film grain, not as depth or shadow.

### Named Rules
**The Flat-By-Default Rule.** No surface gets a shadow at rest. If a floating layer (modal, tooltip) is added in future, shadows are permitted only then. Depth comes from tonal color, never shadow. When you reach for `box-shadow`, reach for a background-color change instead.

## 5. Components

### Buttons

All variants: zero border radius, zero border-radius (sharp corners). Font is Geist Mono, 0.75rem, tracking 0.04em, line-height 1.2. Every button contains a ColonIcon (SVG colon) that blinks at 1s via `colon-blink` CSS animation. The blinking colon is part of the component — not optional decoration.

- **Primary:** Off-White (#fafaf8) background, Deep Void text. Padding 12px 24px. Hover: background → Boundary Gray (#3a3a3a), text → Off-White. 200ms transition. Outer element gets `ui-blink` opacity pulse on hover (35% low at 35%). ColonIcon shifts to Signal Gold on hover.
- **Ghost:** Transparent background, `1px solid rgba(255,255,255,0.3)` border. Off-White/70 text. Hover: border opacity 0.6, background rgba(255,255,255,0.06), text → full Off-White. Same blink animation. ColonIcon: white/40 default, mint on hover.
- **Nav CTA:** Signal Gold (#00C896) background, Deep Void text. Padding 8px 20px. Hover: background → Off-White. 180ms transition. Blink animation on hover.

### Navigation

Fixed header, full viewport width, transparent background over content. Desktop layout: logo left, 5 anchor links spread across center (Geist Mono 0.75rem, tracking 0.04em, white), Nav CTA rightmost. Link hover: `nav-underline` class applies the `ui-blink` opacity pulse — not an underline or color shift. Mobile: logo + "Menu" text toggle. Dropdown uses Framer Motion spring (stiffness 300, damping 30) with staggered link entrance at 40ms delay intervals.

### Section Eyebrow

Mandatory component before every section h2. Structure: flex row, gap 8px. `./` prefix in Signal Gold (0.75rem Geist Mono). Section slug in Off-White/40 (0.75rem Geist Mono). Aria-hidden on the slash. No uppercase, no other ornamentation.

### Service Rows

Full-bleed (outside container). Hairline `border-t` separators. Content within container. Three columns: step counter (0.75rem mono, white/20, w-6), service name (1.75rem mono uppercase, white), descriptor (0.75rem mono, tracking 0.08em, white/70, hidden on mobile). Closing `border-t` after last item. Entrance: glitch-flicker sequence (opacity 0→1→0→1 via anime.js on IntersectionObserver).

### Process Cards (Step Cards)

Three-column CSS grid on desktop (`grid-cols-3`, `gap-px`, `bg-white/[0.08]` creating hairline gutters). Single column mobile. Outer container: full border at `rgba(255,255,255,0.08)` + corner tick marks (4 white rectangles, 4px×16px, at each corner). Per card: Carbon Surface/Void background, 2px Signal Gold top accent (animates `scaleX` from 0 on entrance), step number (eyebrow style), heading row (1.25rem Geist Mono, white), bulleted list rows with mint dashes. List items separated by hairline borders.

### Packages Comparison Table

Bordered outer container with corner ticks. Overflow-x scroll on small viewports. Column grid: `grid-cols-[9rem_1fr_1fr_1fr]`. Featured column (Sprint): 2px Signal Gold top accent, column heading in Signal Gold. Non-featured heading in Off-White. Price display: "Starting from" eyebrow (0.625rem, tracking 0.08em, white/40) + price value (2rem mono, tracking -0.06em, white). Row labels: 0.625rem mono uppercase, tracking 0.1em, white. Cell values: 0.75rem mono, white/70. Boolean check: custom SVG checkmark in Signal Gold; negative: em-dash in white/20. Rows stagger in on scroll with 80ms between rows.

### FAQ Panel

Desktop: two-column split. Left: question list (42% width). Each question is a `button` element with `border-l-2` that transitions from transparent to Signal Gold on active state (2px left border is the one permitted side-stripe — state indicator on interactive tab-like navigation, not a decorative card accent). Active: white text, mint left border. Inactive: white/40 text, transparent border. Hover activates via `onMouseEnter`. Right: answer panel (flex-1), Geist Mono 0.75rem, white/70, max 48ch. Answer transitions via anime.js: fade-out + translateY(-6px), then fade-in + translateY(6px→0). Mobile: stacked flat list — question (1rem Geist Sans, white) + answer inline.

### Signal Bar

Full-width. Carbon Surface (#1c1c1c) background, no border radius, no border. Internal padding 12px 24px. Contains: a 6px blinking mint dot (square, `colon-blink` 1s animation) and a Geist Mono 0.75rem line with `font-bold` emphasis on the first clause. Used as availability indicators (slots, deadlines) immediately before pricing tables.

## 6. Do's and Don'ts

### Do:
- **Do** use Signal Gold on 10-12% of any screen surface maximum. More and it loses signal value.
- **Do** follow the two-line heading pattern: white first line, Signal Gold second line for every h1 and multi-line h2.
- **Do** precede every section h2 with the `./section-slug` eyebrow in the two-part structure (mint slash + white/40 label).
- **Do** use zero border radius on all interactive elements. Sharp corners are non-negotiable.
- **Do** include the blinking ColonIcon inside every button variant. It is structural, not decorative.
- **Do** keep body copy below 48ch line length. Geist Mono becomes dense beyond this.
- **Do** keep section backgrounds exclusively at Deep Void (#09090b) or Carbon Surface (#1c1c1c).
- **Do** respect `prefers-reduced-motion` in all anime.js sequences — the existing pattern must be applied to every new animated element without exception.
- **Do** use corner ticks (4-point registration marks) on bordered containers that frame significant content (video containers, process grids, pricing tables).

### Don't:
- **Don't** use generic SaaS landing page patterns: white or light-grey backgrounds, hero-metric templates (large number + small label), floating device mockups, feature-icon grids, or testimonial carousels. These are prohibited by name.
- **Don't** use crypto/web3 dark patterns: glow effects, neon color bleeding, particle systems, digital-noise textures applied decoratively, or glassmorphism of any kind.
- **Don't** use gradient text (`background-clip: text` with a gradient fill). Signal Gold appears as a solid color on text, never as part of a gradient.
- **Don't** round button, card, or input corners. The `rounded.none: 0px` token is the only valid value for all Nox brand surfaces.
- **Don't** use shadows. If depth is needed, use a tonal surface shift (deep-void → carbon-surface), not `box-shadow`.
- **Don't** apply `border-left` or `border-right` greater than 2px as a colored accent on cards, callouts, or list items. The 2px left border is permitted only as an active-state indicator on tab-like navigation (FAQ question list). All other side-stripe usage is prohibited.
- **Don't** use Geist Sans for body text, labels, or supporting copy. The two-temperature type system depends on a hard separation between Sans (headlines) and Mono (everything else).
- **Don't** add Signal Gold to multiple competing elements within the same viewport. One live signal at a time.
- **Don't** use copy that restates the eyebrow label. The `./work` prefix and "Stories that did the work." already share domain — patterns where the eyebrow and heading are synonymous are padding.
