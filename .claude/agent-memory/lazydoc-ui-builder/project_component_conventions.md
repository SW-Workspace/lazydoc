---
name: Component visual conventions
description: How each UI primitive is styled — button gradients, input glow rings, badge inner glow
type: project
---

**Button primary:** Linear gradient #7c3aed→#6d28d9, inset top highlight rgba(255,255,255,0.12), box-shadow glow. Hover via ::before pseudo overlay with lighter gradient. active:scale-[0.975].
**Button secondary:** #161616 bg, rgba(255,255,255,0.08) border, inset shadow.
**Button ghost:** Transparent, hover bg rgba(255,255,255,0.04).
**Button outline:** Transparent, rgba(124,58,237,0.4) border, hover glow shadow.
**Button destructive:** rgba(248,113,113,0.12) bg with matching border — not a solid red.
**Button loading:** Custom SVG circle with strokeDasharray/strokeDashoffset (not the filled arc pattern).

**Input/Textarea focus:** box-shadow 0 0 0 3px rgba(124,58,237,0.12) + 0 0 20px rgba(124,58,237,0.06) — glow ring, not a plain ring-2.
**Input label:** 10px, uppercase, letter-spacing 0.06em, color #a0a0a0 — not standard label size.
**Input error:** Animated border rgba(248,113,113,0.4) + glow. Error message includes inline SVG circle-exclamation icon.
**Input placeholder:** #3a3a3a — very faint, not the default zinc-500.

**Badge:** 11px font, tracking-wide. Colored variants use bg-dim + matching border + inset box-shadow glow. No solid color backgrounds.

**Logo mark:** 7x7 rounded-[8px] div, gradient #7c3aed→#5b21b6, inset highlight, custom SVG file icon (path-based, not the heroicons doc icon).
**Logo text:** #f0f0f0, font-semibold, letter-spacing -0.02em, 14px.

**Why:** Established during full UI remake to feel premium/handcrafted vs generic AI-generated defaults.
**How to apply:** When adding new UI components, follow these visual patterns for consistency.
