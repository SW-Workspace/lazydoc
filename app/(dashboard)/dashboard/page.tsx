'use client';

import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { cn, formatDate } from '@/core/utils/utils';
import type { ActivityItem } from '@/features/documents/types';
import { MOCK_ACTIVITY, MOCK_DOCUMENTS, MOCK_REPOSITORIES } from '@/features/documents/data/mock-data';
import { getContentPreview, getDocumentTitle } from '@/features/documents/utils/utils';
import { ICON_COLORS, LANG_COLORS, LANG_TEXT } from '@/features/documents/constants';
import { FileText, Globe } from 'lucide-react';

gsap.registerPlugin(useGSAP);

function ActivityIcon({ type }: { type: ActivityItem['icon'] }) {
  if (type === 'github') {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    );
  }
  if (type === 'scrape') {
    return <Globe size={14} />;
  }
  return <FileText size={14} />;
}

export default function DashboardPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.set('.dash-section-header', { opacity: 0, y: 16 });
      gsap.set('.dash-doc-card', { opacity: 0, y: 16 });
      gsap.set('.dash-activity-item', { opacity: 0, x: -10 });
      gsap.set('.dash-repo-row', { opacity: 0, x: -8 });
      gsap.set('.dash-panel', { opacity: 0, y: 12 });

      const tl = gsap.timeline({ delay: 0.1 });

      tl.to('.dash-section-header', { opacity: 1, y: 0, stagger: 0.07, duration: 0.5, ease: 'power3.out' })
        .to('.dash-doc-card', { opacity: 1, y: 0, stagger: 0.05, duration: 0.45, ease: 'power3.out' }, '-=0.35')
        .to('.dash-activity-item', { opacity: 1, x: 0, stagger: 0.04, duration: 0.4, ease: 'power3.out' }, '-=0.5')
        .to('.dash-panel', { opacity: 1, y: 0, stagger: 0.06, duration: 0.45, ease: 'power3.out' }, '-=0.5')
        .to('.dash-repo-row', { opacity: 1, x: 0, stagger: 0.04, duration: 0.38, ease: 'power3.out' }, '-=0.5');
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="min-h-screen px-8 py-10 max-w-[1100px] mx-auto">
      <div className="dash-section-header mb-10">
        <h1
          className="font-bold text-[#f0f0f0] mb-1"
          style={{ fontSize: '1.5rem', letterSpacing: '-0.03em' }}
        >
          Dashboard
        </h1>
        <p className="text-sm text-[#4a4a4a]">Your README generation activity at a glance.</p>
      </div>

      <section className="mb-10">
        <div className="dash-section-header flex items-center justify-between mb-4">
          <h2 className="text-[13px] font-semibold text-[#6b6b6b] uppercase" style={{ letterSpacing: '0.07em' }}>
            Documents generated
          </h2>
          <Link
            href="/documents"
            className="text-[12px] text-[#555555] hover:text-[#7c3aed] transition-colors duration-150"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-3">
          {MOCK_DOCUMENTS.map((doc) => {
            const title = getDocumentTitle(doc, MOCK_REPOSITORIES);
            const preview = getContentPreview(doc.content);
            return (
              <div
                key={doc.id}
                className="dash-doc-card group relative rounded-xl overflow-hidden flex flex-col"
                style={{
                  background: 'rgba(14,14,26,0.9)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(124,58,237,0.25)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(124,58,237,0.1)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)';
                }}
              >
                <div
                  className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(124,58,237,0.5) 50%, transparent 100%)' }}
                />

                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex items-start gap-2.5 mb-3">
                    <div
                      className="shrink-0 flex h-7 w-7 items-center justify-center rounded-lg mt-0.5"
                      style={{ background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.18)' }}
                    >
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                        <path d="M3 2h7l3 3v9H3V2z" stroke="#9f5fff" strokeWidth="1.25" strokeLinejoin="round" />
                        <path d="M10 2v3h3" stroke="#9f5fff" strokeWidth="1.25" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[13px] font-semibold text-[#e0e0e0] leading-tight truncate" title={title}>
                        {title}
                      </p>
                      <p className="text-[11px] text-[#555555] mt-0.5">{formatDate(doc.created_at ?? new Date().toISOString())}</p>
                    </div>
                  </div>

                  <p className="text-[12px] text-[#4a4a4a] leading-relaxed flex-1 line-clamp-3">
                    {preview}
                  </p>
                </div>

                <div
                  className="px-4 py-2.5 flex items-center justify-between"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
                >
                  <span className="text-[11px] text-[#3a3a3a] font-medium uppercase" style={{ letterSpacing: '0.06em' }}>README.md</span>
                  <button
                    type="button"
                    className="flex items-center gap-1 text-[11.5px] text-[#555555] hover:text-[#9f5fff] transition-colors duration-150 cursor-pointer"
                  >
                    Open
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6h7M6.5 3.5L9 6l-2.5 2.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 mb-10">
        <section>
          <div className="dash-panel">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[13px] font-semibold text-[#6b6b6b] uppercase" style={{ letterSpacing: '0.07em' }}>
                GitHub repositories
              </h2>
              <span className="text-[11px] text-[#5a5a5a] font-medium px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                {MOCK_REPOSITORIES.length} total
              </span>
            </div>

            <div
              className="rounded-xl overflow-hidden"
              style={{
                background: 'rgba(14,14,26,0.9)',
                border: '1px solid rgba(255,255,255,0.06)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
              }}
            >
              {MOCK_REPOSITORIES.map((repo, idx) => {
                const repoName = repo.link ? repo.link.split('/').pop() ?? repo.id : repo.id;
                const isLast = idx === MOCK_REPOSITORIES.length - 1;
                return (
                  <div
                    key={repo.id}
                    className={cn(
                      'dash-repo-row flex items-center gap-3 px-4 py-3 group hover:bg-[rgba(255,255,255,0.02)] transition-colors duration-150',
                      !isLast && 'border-b border-[rgba(255,255,255,0.04)]',
                    )}
                  >
                    <div
                      className="shrink-0 flex h-7 w-7 items-center justify-center rounded-lg text-[#6b6b6b]"
                      style={{ background: 'rgba(255,255,255,0.04)' }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                      </svg>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-[#c0c0c0] truncate leading-tight">{repoName}</p>
                      <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                        {repo.languages.map((lang) => (
                          <span
                            key={lang}
                            className="text-[10.5px] font-medium px-1.5 py-0.5 rounded"
                            style={{
                              background: LANG_COLORS[lang] ?? 'rgba(255,255,255,0.06)',
                              color: LANG_TEXT[lang] ?? '#9198a1',
                            }}
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-[11px] text-[#555555]">{formatDate(repo.created_at)}</span>
                      {repo.link ? <a
                          href={repo.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#555555] hover:text-[#9f5fff] transition-colors duration-150"
                          onClick={(e) => { e.stopPropagation(); }}
                        >
                          <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
                            <path d="M5 2H2v8h8V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M7 2h3v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10 2L5.5 6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                          </svg>
                        </a> : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section>
          <div className="dash-panel">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[13px] font-semibold text-[#6b6b6b] uppercase" style={{ letterSpacing: '0.07em' }}>
                Scraped URLs
              </h2>
            </div>

            <div
              className="rounded-xl overflow-hidden flex flex-col items-center justify-center text-center"
              style={{
                background: 'rgba(14,14,26,0.9)',
                border: '1px solid rgba(255,255,255,0.06)',
                minHeight: '200px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
              }}
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl mb-4"
                style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.12)' }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6.5" stroke="#22d3ee" strokeWidth="1.25" />
                  <path d="M8 1.5C8 1.5 6 4 6 8s2 6.5 2 6.5" stroke="#22d3ee" strokeWidth="1.25" strokeLinecap="round" />
                  <path d="M8 1.5C8 1.5 10 4 10 8s-2 6.5-2 6.5" stroke="#22d3ee" strokeWidth="1.25" strokeLinecap="round" />
                  <path d="M1.5 8h13" stroke="#22d3ee" strokeWidth="1.25" strokeLinecap="round" />
                </svg>
              </div>
              <p className="text-[13px] font-medium text-[#555555] mb-1">Coming soon</p>
              <p className="text-[12px] text-[#4a4a4a] leading-relaxed max-w-[200px]">
                URL scraping history will appear here once the feature is live.
              </p>
            </div>
          </div>
        </section>
      </div>

      <section>
        <div className="dash-section-header flex items-center justify-between mb-4">
          <h2 className="text-[13px] font-semibold text-[#6b6b6b] uppercase" style={{ letterSpacing: '0.07em' }}>
            Recent activity
          </h2>
        </div>

        <div
          className="rounded-xl overflow-hidden"
          style={{
            background: 'rgba(14,14,26,0.9)',
            border: '1px solid rgba(255,255,255,0.06)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
          }}
        >
          {MOCK_ACTIVITY.map((item, idx) => {
            const { bg, text } = ICON_COLORS[item.icon];
            const isLast = idx === MOCK_ACTIVITY.length - 1;
            return (
              <div
                key={item.id}
                className={cn(
                  'dash-activity-item flex items-center gap-3 px-4 py-3 hover:bg-[rgba(255,255,255,0.015)] transition-colors duration-150',
                  !isLast && 'border-b border-[rgba(255,255,255,0.035)]',
                )}
              >
                <div
                  className="shrink-0 flex h-7 w-7 items-center justify-center rounded-lg"
                  style={{ background: bg }}
                >
                  <span style={{ color: text }}>
                    <ActivityIcon type={item.icon} />
                  </span>
                </div>

                <p className="flex-1 text-[13px] text-[#9198a1] truncate">
                  {item.description}
                </p>

                <span className="shrink-0 text-[11.5px] text-[#555555] whitespace-nowrap">
                  {item.timestamp}
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
