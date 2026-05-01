'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { cn } from '@/core/utils/utils';
import { NAV_LINKS } from '@/features/documents/constants';

gsap.registerPlugin(useGSAP);

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const bar1Ref = useRef<HTMLSpanElement>(null);
  const bar2Ref = useRef<HTMLSpanElement>(null);
  const bar3Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onScroll = () => { setScrolled(window.scrollY > 24); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); };
  }, []);

  useGSAP(
    () => {
      gsap.set(['.h-logo', '.h-nav-item', '.h-cta'], { opacity: 0, y: -12 });
      const tl = gsap.timeline({ delay: 0.08 });
      tl.to('.h-logo', { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' })
        .to('.h-nav-item', { opacity: 1, y: 0, stagger: 0.055, duration: 0.45, ease: 'power3.out' }, '-=0.35')
        .to('.h-cta', { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }, '-=0.3');
    },
    { scope: headerRef },
  );

  useEffect(() => {
    if (!bar1Ref.current || !bar2Ref.current || !bar3Ref.current) return;
    if (menuOpen) {
      gsap.to(bar1Ref.current, { y: 6, rotate: 45, duration: 0.3, ease: 'power2.inOut' });
      gsap.to(bar2Ref.current, { scaleX: 0, opacity: 0, duration: 0.2, ease: 'power2.in' });
      gsap.to(bar3Ref.current, { y: -6, rotate: -45, duration: 0.3, ease: 'power2.inOut' });
    } else {
      gsap.to(bar1Ref.current, { y: 0, rotate: 0, duration: 0.3, ease: 'power2.inOut' });
      gsap.to(bar2Ref.current, { scaleX: 1, opacity: 1, duration: 0.25, ease: 'power2.out' });
      gsap.to(bar3Ref.current, { y: 0, rotate: 0, duration: 0.3, ease: 'power2.inOut' });
    }
  }, [menuOpen]);

  return (
    <header
      ref={headerRef}
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-500',
        scrolled
          ? 'border-b border-[rgba(255,255,255,0.06)] bg-[rgba(8,8,16,0.9)] backdrop-blur-2xl'
          : 'bg-transparent',
      )}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-[60px] items-center justify-between">

          <Link href="/" className="h-logo flex items-center gap-2.5 group shrink-0">
            <div
              className="relative flex h-7 w-7 items-center justify-center rounded-[8px] overflow-hidden transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]"
              style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)',
                boxShadow: '0 0 14px rgba(124,58,237,0.4), inset 0 1px 0 rgba(255,255,255,0.18)',
              }}
            >
              <svg className="h-3.5 w-3.5 text-white relative z-10" fill="none" viewBox="0 0 16 16">
                <path d="M3 2h7l3 3v9H3V2z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
                <path d="M10 2v3h3" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
                <path d="M5.5 7.5h5M5.5 10h3.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
              </svg>
            </div>
            <span
              className="font-semibold text-[14px]"
              style={{
                letterSpacing: '-0.02em',
                backgroundImage: 'linear-gradient(135deg, #e2d9f3 0%, #c4b5fd 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              LazyDoc
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-0">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="h-nav-item group relative px-4 py-1.5 text-[13px] text-[#6b6b6b] hover:text-[#f0f0f0] transition-colors duration-200"
              >
                <span className="relative z-10">{link.label}</span>
                <span
                  className="absolute bottom-0 inset-x-4 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"
                  style={{ background: 'linear-gradient(90deg, #7c3aed, #06b6d4)' }}
                />
              </Link>
            ))}
          </nav>

          <div className="h-cta hidden md:flex items-center gap-2">
            <Link
              href="/login"
              className="px-4 py-1.5 text-[13px] text-[#a0a0a0] hover:text-[#f0f0f0] transition-colors duration-200 rounded-lg hover:bg-[rgba(255,255,255,0.05)]"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="group relative inline-flex h-8 items-center gap-1.5 rounded-lg px-4 text-[13px] font-medium text-[#f0f0f0] overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)',
                boxShadow: '0 0 20px rgba(124,58,237,0.3), 0 0 40px rgba(6,182,212,0.1), inset 0 1px 0 rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <span className="relative z-10">Get started</span>
              <svg
                className="h-3 w-3 relative z-10 transition-transform duration-200 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 12 12"
              >
                <path d="M2.5 6h7M6.5 3.5L9 6l-2.5 2.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(135deg, #8b47ff 0%, #0ea5e9 100%)' }}
              />
            </Link>
          </div>

          <button
            className="md:hidden relative flex h-8 w-8 items-center justify-center rounded-lg text-[#6b6b6b] hover:text-[#f0f0f0] hover:bg-[rgba(255,255,255,0.05)] transition-colors duration-200"
            onClick={() => { setMenuOpen((v) => !v); }}
            aria-label="Toggle menu"
          >
            <span className="flex flex-col gap-[5px] w-4">
              <span ref={bar1Ref} className="block w-full h-px bg-current origin-center" />
              <span ref={bar2Ref} className="block w-full h-px bg-current origin-center" />
              <span ref={bar3Ref} className="block w-full h-px bg-current origin-center" />
            </span>
          </button>
        </div>

        <div
          className={cn(
            'md:hidden overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
            menuOpen ? 'max-h-72 pb-4' : 'max-h-0',
          )}
        >
          <div
            className="border-t pt-3 flex flex-col gap-0.5"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2.5 text-sm text-[#6b6b6b] hover:text-[#f0f0f0] rounded-lg hover:bg-[rgba(255,255,255,0.04)] transition-colors duration-150"
                onClick={() => { setMenuOpen(false); }}
              >
                {link.label}
              </Link>
            ))}
            <div
              className="mt-2 flex flex-col gap-1.5 pt-3 border-t"
              style={{ borderColor: 'rgba(255,255,255,0.06)' }}
            >
              <Link
                href="/login"
                className="px-3 py-2 text-sm text-[#a0a0a0] hover:text-[#f0f0f0] rounded-lg hover:bg-[rgba(255,255,255,0.04)] transition-colors duration-150"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg text-sm font-medium text-[#f0f0f0]"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)',
                  boxShadow: '0 0 18px rgba(124,58,237,0.3)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
