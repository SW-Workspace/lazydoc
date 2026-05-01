---
name: Hero page architecture
description: Full redesign 2026-04-30 — single-column centered layout, tabbed generator panel, aurora background, modal, floating help button
type: project
---

**Layout:** Single-column centered (max-w-2xl). Everything stacks vertically. No two-column split. No TerminalPreview typewriter (removed in redesign).

**Generator panel:** Rounded-2xl card with glassmorphism (backdrop-blur-20px, rgba(14,14,26,0.85) bg). Contains:
1. Tab strip with 3 tabs — each has own color identity (violet/cyan/pink). Active tab shows colored bottom border + glow.
2. Tab content area (ref'd for GSAP fade transitions on tab switch)
3. Model selector row (Dropdown component) — always visible for all tabs, shows "Model:" label
4. Generate button — full-width, gradient matches active tab color

**Tab content transitions:** GSAP fade out (0.14s power2.in) → setState → fade in (0.22s power2.out). contentRef holds the tab content wrapper.

**Background aurora:** Three absolutely-positioned orbs with CSS keyframe animation classes (.aurora-orb-1/2/3 defined in globals.css). No JS animation — pure CSS @keyframes for performance.

**Floating help button:** Fixed bottom-right, gradient circle, opens Modal via useState. GSAP glow on mouseEnter/mouseLeave.

**Modal:** uses Modal component from components/ui/modal.tsx. GSAP scale+opacity entrance/exit. Content: "What is LazyDoc?" copy + CTA link.

**Stats row:** Three stats below panel with per-stat gradient colors (violet/cyan/pink). Sits above the border-top.

**GSAP entrance sequence:** hero-headline → hero-sub → hero-panel → hero-float (the stats row + floating button share same class). power3.out, delay 0.12.

**Nav hover:** Gradient underline bar slides in (scale-x 0→1) on hover, origin-left, violet→cyan gradient.

**Why:** The tabbed generator-panel-as-hero approach puts the actual product UI front-and-center, reducing time-to-first-use.
**How to apply:** If adding features or modes, add a new tab to the TABS array in page.tsx. Tab color assignment: new tabs should get amber as the next available color.
