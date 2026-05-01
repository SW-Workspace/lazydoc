---
name: Design tokens and color system
description: Full multicolor palette, surface layers, aurora system finalized in globals.css @theme block — updated 2026-04-30 full redesign
type: project
---

Base background: #080810 (--color-base) — deeper than before, slight blue tint for space feel
Surface layers (depth hierarchy): #0e0e1a / #131320 / #1a1a2a / #202033
Text scale: #f0f0f0 primary / #a0a0a0 secondary / #6b6b6b muted / #3a3a3a faint

Primary accent — Violet: #7c3aed (--color-violet), light #9f5fff
Secondary accent — Cyan: #06b6d4 (--color-cyan), light #22d3ee
Tertiary accent — Pink: #ec4899 (--color-pink), light #f472b6
Warm highlight — Amber: #f59e0b (--color-amber)
Success/generating — Emerald: #10b981 (--color-emerald)

Glow values: rgba(124,58,237,0.35) violet / rgba(6,182,212,0.35) cyan / rgba(236,72,153,0.35) pink
Borders: rgba(255,255,255,0.06) standard / rgba(255,255,255,0.035) subtle / rgba(255,255,255,0.1) strong

Aurora orbs: Three absolutely-positioned divs with CSS keyframe animations (aurora-1 18s, aurora-2 24s, aurora-3 30s). Violet top-left, cyan top-right, pink bottom-center. filter: blur(120-140px). Opacity animated between 0.035–0.08 via keyframes in globals.css. Classes: .aurora-orb-1/2/3.

Grain noise overlay: SVG feTurbulence on body::before, opacity 0.032, fixed z-index 9999
Scrollbar: 4px, transparent track, #1a1a2a thumb, violet on hover
Selection: rgba(124,58,237,0.28)
No pure white (#ffffff) anywhere

Tab color personality system:
- Prompt tab → violet (#7c3aed)
- GitHub tab → cyan (#06b6d4)
- URL tab → pink (#ec4899)
Each tab drives the active border color, glow, and generate button gradient.

Logo + "LazyDoc" wordmark: gradient from violet → cyan on both the icon and the text
CTA button: linear-gradient(135deg, #7c3aed, #06b6d4) with matching dual-color glow
Tagline gradient: violet → cyan → pink across all three accents

**Why:** The previous design was monochromatic violet-only which felt sterile. The multicolor aurora-space direction makes it feel alive. Three accent colors are assigned by intent — not randomly.
**How to apply:** Always reference --color-* CSS vars. Violet = primary/brand, cyan = secondary/GitHub, pink = URL/tertiary. Never use zinc-* Tailwind colors for surfaces.
