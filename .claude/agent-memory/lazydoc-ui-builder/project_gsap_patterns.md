---
name: GSAP animation patterns
description: Entrance timelines, tab transitions, modal animate, hover glow, hamburger — all GSAP patterns in LazyDoc
type: project
---

**Standard entrance timeline (header, hero):**
- gsap.set(targets, { opacity: 0, y: -12 or y: 32 })
- gsap.timeline({ delay: 0.08–0.15 })
- Elements staggered with '-=0.3' to '-=0.45' overlap
- ease: 'power3.out' for entrances / 'expo.out' for modals/panels
- Duration 0.45–0.75s per element

**Tab content transition (hero page):**
- Fade out: gsap.to(contentRef.current, { opacity:0, y:6, duration:0.14, ease:'power2.in', onComplete: setState + fade in })
- Fade in: gsap.to(contentRef.current, { opacity:1, y:0, duration:0.22, ease:'power2.out' })
- contentRef wraps the tab content div

**Modal entrance/exit (modal.tsx):**
- Backdrop: gsap.to(backdropRef, { opacity:1/0, duration:0.22, ease:'power2.out/in' })
- Panel: gsap.to(panelRef, { opacity:1, scale:1, y:0, duration:0.38, ease:'expo.out' }) enter
- Panel exit: { opacity:0, scale:0.94, y:8, duration:0.2, ease:'power2.in' }
- Uses prevOpen ref to track open→closed transitions. display toggled via gsap.set on complete.

**Floating button hover glow:**
- gsap.to(e.currentTarget, { boxShadow: '...', duration:0.25, ease:'power2.out' }) mouseEnter
- gsap.to(e.currentTarget, { boxShadow: '...original...', duration:0.3 }) mouseLeave

**Hamburger bars:**
- 3 separate refs (bar1Ref, bar2Ref, bar3Ref) — each a <span> with h-px bg-current
- Open: bar1 → y:6, rotate:45 / bar2 → scaleX:0, opacity:0 / bar3 → y:-6, rotate:-45
- Close: reverse all. duration 0.3, ease: 'power2.inOut'
- Driven by useEffect([menuOpen]) — NOT inside useGSAP

**Footer ScrollTrigger:**
- start: 'top 92%', once: true
- gsap.to('.f-col', { opacity:1, y:0, stagger:0.07, duration:0.65, ease:'power3.out' })

**Nav hover underline:**
- CSS-only: scale-x-0 → group-hover:scale-x-100, origin-left, transition-transform. Gradient bar.
- No GSAP needed for simple nav underlines — keep GSAP for complex interactions.

**Always:** gsap.registerPlugin(useGSAP) at module level. { scope: ref } on all useGSAP calls.
**Always:** useGSAP for setup animations, separate useEffect for event-driven (menuOpen, etc).

**Why:** Consistent easing creates coherent feel. expo.out for panels (big snappy arrival), power3.out for standard entrances, power2.in for exits (always faster).
**How to apply:** Copy these patterns for any new animated component. power3.out is the house easing.
