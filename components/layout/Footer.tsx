'use client';

import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { PRODUCT_LINKS, RESOURCE_LINKS } from '@/features/documents/constants';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.set('.f-col', { opacity: 0, y: 22 });

      ScrollTrigger.create({
        trigger: footerRef.current,
        start: 'top 92%',
        onEnter: () => {
          gsap.to('.f-col', {
            opacity: 1,
            y: 0,
            stagger: 0.07,
            duration: 0.65,
            ease: 'power3.out',
          });
        },
        once: true,
      });
    },
    { scope: footerRef },
  );

  return (
    <footer
      ref={footerRef}
      className="relative"
      style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
    >
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.35) 30%, rgba(6,182,212,0.25) 60%, transparent)',
        }}
      />

      <div
        className="absolute inset-x-0 top-0 h-28 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(124,58,237,0.025), transparent)',
        }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 relative">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8">

          <div className="f-col col-span-2 md:col-span-5">
            <Link href="/" className="flex items-center gap-2.5 mb-5 w-fit group">
              <div
                className="relative flex h-7 w-7 items-center justify-center rounded-[8px] transition-all duration-300 group-hover:shadow-[0_0_18px_rgba(6,182,212,0.55)]"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)',
                  boxShadow: '0 0 12px rgba(124,58,237,0.35), inset 0 1px 0 rgba(255,255,255,0.15)',
                }}
              >
                <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 16 16">
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
            <p className="text-sm text-[#6b6b6b] max-w-[240px] leading-relaxed mb-6">
              Generate comprehensive READMEs in seconds. Stop writing docs, start shipping code.
            </p>
            <p
              className="text-[11px] font-medium tracking-widest uppercase"
              style={{
                backgroundImage: 'linear-gradient(135deg, #a78bfa 0%, #06b6d4 60%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '0.1em',
              }}
            >
              by lazy developers, for lazy developers.
            </p>
          </div>

          <div className="f-col md:col-span-3 md:col-start-7">
            <h4
              className="text-[10px] font-semibold uppercase mb-5 text-[#555555]"
              style={{ letterSpacing: '0.1em' }}
            >
              Product
            </h4>
            <ul className="space-y-2.5">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-[#6b6b6b] hover:text-[#d0d0d0] transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="f-col md:col-span-3 md:col-start-10">
            <h4
              className="text-[10px] font-semibold uppercase mb-5 text-[#555555]"
              style={{ letterSpacing: '0.1em' }}
            >
              Resources
            </h4>
            <ul className="space-y-2.5">
              {RESOURCE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-[#6b6b6b] hover:text-[#d0d0d0] transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="f-col mt-14 pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <p className="text-[12px] text-[#555555]">
            &copy; {new Date().getFullYear()} LazyDoc. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="text-[12px] text-[#555555]">Made with</span>
            <span
              className="text-[12px] font-medium"
              style={{
                backgroundImage: 'linear-gradient(135deg, #7c3aed, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              way too much coffee
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
