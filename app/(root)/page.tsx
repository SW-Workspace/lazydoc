'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { HelpCircle, Zap, Shield, Globe, FileText } from 'lucide-react';
import { Button, Input, Textarea, Dropdown, Modal, Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui';
import type { TabId } from '@/features/documents/types';
import { MODELS } from '@/features/documents/constants';

gsap.registerPlugin(useGSAP);

const TABS: { id: TabId; label: string; icon: React.ReactNode; color: string; glow: string; border: string; dim: string }[] = [
  {
    id: 'prompt',
    label: 'Prompt',
    icon: <FileText size={14} />,
    color: '#7c3aed',
    glow: 'rgba(124,58,237,0.45)',
    border: 'rgba(124,58,237,0.5)',
    dim: 'rgba(124,58,237,0.12)',
  },
  {
    id: 'github',
    label: 'GitHub',
    icon: <Shield size={14} />,
    color: '#06b6d4',
    glow: 'rgba(6,182,212,0.45)',
    border: 'rgba(6,182,212,0.5)',
    dim: 'rgba(6,182,212,0.12)',
  },
  {
    id: 'url',
    label: 'Web URL',
    icon: <Globe size={14} />,
    color: '#ec4899',
    glow: 'rgba(236,72,153,0.45)',
    border: 'rgba(236,72,153,0.5)',
    dim: 'rgba(236,72,153,0.12)',
  },
];

export default function RootPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<TabId>('prompt');
  const [model, setModel] = useState('gemini-2.5-flash');
  const [promptValue, setPromptValue] = useState('');
  const [githubValue, setGithubValue] = useState('');
  const [urlValue, setUrlValue] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const activeTabData = TABS.find((t) => t.id === activeTab)!;

  useGSAP(
    () => {
      gsap.set(['.hero-headline', '.hero-sub', '.hero-panel', '.hero-float'], {
        opacity: 0,
        y: 32,
      });

      const tl = gsap.timeline({ delay: 0.12 });
      tl.to('.hero-headline', { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' })
        .to('.hero-sub', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.45')
        .to('.hero-panel', { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, '-=0.38')
        .to('.hero-float', { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }, '-=0.25');
    },
    { scope: pageRef },
  );

  function switchTab(id: TabId) {
    if (id === activeTab) return;
    gsap.to(contentRef.current, {
      opacity: 0,
      y: 6,
      duration: 0.14,
      ease: 'power2.in',
      onComplete: () => {
        setActiveTab(id);
        gsap.to(contentRef.current, { opacity: 1, y: 0, duration: 0.22, ease: 'power2.out' });
      },
    });
  }

  return (
    <div ref={pageRef} className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="aurora-orb-1 absolute rounded-full"
          style={{
            width: '700px',
            height: '700px',
            top: '-15%',
            left: '-10%',
            background: 'radial-gradient(circle, rgba(124,58,237,1) 0%, transparent 70%)',
            filter: 'blur(120px)',
          }}
        />
        <div
          className="aurora-orb-2 absolute rounded-full"
          style={{
            width: '600px',
            height: '600px',
            top: '-10%',
            right: '-8%',
            background: 'radial-gradient(circle, rgba(6,182,212,1) 0%, transparent 70%)',
            filter: 'blur(120px)',
          }}
        />
        <div
          className="aurora-orb-3 absolute rounded-full"
          style={{
            width: '800px',
            height: '800px',
            bottom: '-20%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'radial-gradient(circle, rgba(236,72,153,1) 0%, transparent 70%)',
            filter: 'blur(140px)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl px-5 pt-36 pb-32 flex flex-col items-center">

        <div className="hero-headline mb-5 text-center">
          <div
            className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full"
            style={{
              background: 'rgba(124,58,237,0.1)',
              border: '1px solid rgba(124,58,237,0.22)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: '#7c3aed', boxShadow: '0 0 8px rgba(124,58,237,0.9)' }}
            />
            <span
              className="text-[11px] font-medium tracking-widest uppercase"
              style={{ color: 'rgba(167,139,250,0.85)', letterSpacing: '0.1em' }}
            >
              AI-powered documentation
            </span>
          </div>

          <h1
            className="font-bold text-[#f0f0f0] text-center"
            style={{
              fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
              lineHeight: '1.04',
              letterSpacing: '-0.04em',
            }}
          >
            Stop writing{' '}
            <span
              style={{
                backgroundImage: 'linear-gradient(135deg, #a78bfa 0%, #06b6d4 50%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontStyle: 'italic',
              }}
            >
              docs.
            </span>
            <br />
            <span style={{ color: '#f0f0f0' }}>Start shipping.</span>
          </h1>
        </div>

        <p
          className="hero-sub mb-12 text-center leading-relaxed"
          style={{
            fontSize: '16px',
            color: '#6b6b6b',
            maxWidth: '420px',
          }}
        >
          LazyDoc generates professional README files from your repo, a URL, or a description&nbsp;— in seconds.
        </p>

        <div
          className="hero-panel relative w-full rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(14,14,26,0.85)',
            border: '1px solid rgba(255,255,255,0.07)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.07)',
          }}
        >
          <div
            className="absolute inset-x-0 top-0 h-px"
            style={{
              background: `linear-gradient(90deg, transparent, ${activeTabData.glow} 50%, transparent)`,
              transition: 'background 0.4s ease',
            }}
          />

          <Tabs value={activeTab} onValueChange={switchTab}>
            <TabsList>
              {TABS.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  color={tab.color}
                  glow={tab.glow}
                >
                  {tab.icon}
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <div ref={contentRef} className="p-5">
              <TabsContent value="prompt">
                <Textarea
                  placeholder="Describe your project... e.g. A REST API built with Node.js for managing user authentication with JWT tokens, refresh rotation, and rate limiting."
                  value={promptValue}
                  onChange={(e) => { setPromptValue(e.target.value); }}
                  className="min-h-[160px] text-[13px] leading-relaxed bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.07)] focus:border-[rgba(124,58,237,0.55)] focus:shadow-[0_0_0_3px_rgba(124,58,237,0.1),0_0_24px_rgba(124,58,237,0.07)] placeholder:text-[#2e2e45]"
                />
              </TabsContent>

              <TabsContent value="github">
                <div className="relative">
                  <span
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: '#06b6d4' }}
                  >
                    <Shield size={14} />
                  </span>
                  <Input
                    placeholder="https://github.com/username/repo"
                    value={githubValue}
                    onChange={(e) => { setGithubValue(e.target.value); }}
                    className="pl-10 font-mono text-[13px] bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.07)] focus:border-[rgba(6,182,212,0.55)] focus:shadow-[0_0_0_3px_rgba(6,182,212,0.1),0_0_24px_rgba(6,182,212,0.07)] placeholder:text-[#2e2e45]"
                    inputSize="lg"
                  />
                </div>
              </TabsContent>

              <TabsContent value="url">
                <div className="relative">
                  <span
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: '#ec4899' }}
                  >
                    <Globe size={15} />
                  </span>
                  <Input
                    placeholder="https://example.com/my-project"
                    value={urlValue}
                    onChange={(e) => { setUrlValue(e.target.value); }}
                    className="pl-10 font-mono text-[13px] bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.07)] focus:border-[rgba(236,72,153,0.55)] focus:shadow-[0_0_0_3px_rgba(236,72,153,0.1),0_0_24px_rgba(236,72,153,0.07)] placeholder:text-[#2e2e45]"
                    inputSize="lg"
                  />
                </div>
              </TabsContent>

              <div className="mt-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-[#555555] font-medium uppercase tracking-widest">Model</span>
                  <Dropdown
                    value={model}
                    onChange={setModel}
                    options={MODELS}
                  />
                </div>
                <div className="flex items-center gap-1.5">
                  {activeTab === 'prompt' ? <span className="text-[11px]" style={{ color: '#555555' }}>
                      {promptValue.length} chars
                    </span> : null}
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="mt-3 w-full"
                style={{
                  background: `linear-gradient(135deg, ${activeTabData.color} 0%, ${activeTabData.color}cc 100%)`,
                  boxShadow: `0 0 24px ${activeTabData.glow}, inset 0 1px 0 rgba(255,255,255,0.14)`,
                  border: `1px solid ${activeTabData.border}40`,
                }}
              >
                <Zap size={15} />
                Generate README
              </Button>
            </div>
          </Tabs>
        </div>

        <div
          className="hero-float mt-10 flex items-center justify-center gap-6 pt-10"
          style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
        >
          {[
            { value: '2-step', label: 'AI pipeline', color: '#7c3aed' },
            { value: '<10s', label: 'avg generation', color: '#06b6d4' },
            { value: '3', label: 'input modes', color: '#ec4899' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-[22px] font-bold mb-0.5"
                style={{
                  letterSpacing: '-0.03em',
                  backgroundImage: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}99 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {stat.value}
              </div>
              <div
                className="text-[10px] uppercase tracking-widest"
                style={{ color: '#555555', letterSpacing: '0.1em' }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => { setModalOpen(true); }}
        className="hero-float fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full text-[#f0f0f0] transition-all duration-200 hover:scale-110 cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)',
          boxShadow: '0 0 24px rgba(124,58,237,0.4), 0 0 48px rgba(6,182,212,0.15)',
          border: '1px solid rgba(255,255,255,0.12)',
        }}
        onMouseEnter={(e) => {
          gsap.to(e.currentTarget, {
            boxShadow: '0 0 32px rgba(124,58,237,0.6), 0 0 64px rgba(6,182,212,0.25)',
            duration: 0.25,
            ease: 'power2.out',
          });
        }}
        onMouseLeave={(e) => {
          gsap.to(e.currentTarget, {
            boxShadow: '0 0 24px rgba(124,58,237,0.4), 0 0 48px rgba(6,182,212,0.15)',
            duration: 0.3,
            ease: 'power2.out',
          });
        }}
        aria-label="What is LazyDoc?"
      >
        <HelpCircle size={18} />
      </button>

      <Modal open={modalOpen} onClose={() => { setModalOpen(false); }} title="What is LazyDoc?">
        <div className="space-y-4 text-[14px] leading-relaxed text-[#8a8a9a]">
          <p>
            LazyDoc is an AI-powered README generator built for developers who&apos;d rather ship than write documentation.
          </p>
          <p>
            We built it because writing a good README is tedious, repetitive, and nobody wants to do it — yet every project needs one. LazyDoc takes what you&apos;ve already built and turns it into professional documentation in seconds.
          </p>
          <p>
            Just paste your GitHub repo, drop in a URL, or describe your project in a few sentences. LazyDoc&apos;s two-step AI pipeline extracts the important stuff and formats it into a structured, professional <code className="px-1.5 py-0.5 rounded text-[12px] font-mono" style={{ background: 'rgba(124,58,237,0.15)', color: '#c4b5fd', border: '1px solid rgba(124,58,237,0.2)' }}>README.md</code> — ready to copy, commit, and ship.
          </p>
          <p
            className="text-[12px] font-medium"
            style={{
              backgroundImage: 'linear-gradient(135deg, #a78bfa 0%, #06b6d4 60%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Built for lazy developers, by lazy developers.
          </p>
        </div>
        <div className="mt-5 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <Link href="/register">
            <Button variant="primary" size="md" className="w-full">
              Get started free
            </Button>
          </Link>
        </div>
      </Modal>
    </div>
  );
}
