'use client';

import { useRef, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { LayoutDashboard, FileText, ExternalLink, Settings, LogOut, ChevronRight } from 'lucide-react';
import { cn } from '@/core/utils/utils';
import { supabaseClient } from '@/core/config/supabase';
import { AuthGuard } from '@/features/auth/components/AuthGuard';
import type { User } from '@supabase/supabase-js';
import { getInitials, truncateEmail } from '@/features/documents/utils/utils';

gsap.registerPlugin(useGSAP);

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/documents', label: 'Documents', icon: FileText },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<User | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const sidenavRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const displayName = user?.user_metadata?.display_name ?? user?.user_metadata?.full_name ?? null;
  const email = user?.email ?? null;
  const initials = getInitials(displayName, email);

  useEffect(() => {
    supabaseClient.auth.getUser().then(({ data }) => { setUser(data.user); });
  }, []);

  useEffect(() => {
    if (!dropdownOpen) return;
    function onClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => { document.removeEventListener('mousedown', onClickOutside); };
  }, [dropdownOpen]);

  useGSAP(
    () => {
      gsap.set('.sidenav-logo', { opacity: 0, y: -8 });
      gsap.set('.sidenav-nav-item', { opacity: 0, x: -12 });
      gsap.set('.sidenav-user-trigger', { opacity: 0, y: 8 });

      const tl = gsap.timeline({ delay: 0.04 });
      tl.to('.sidenav-logo', { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
        .to('.sidenav-nav-item', { opacity: 1, x: 0, stagger: 0.06, duration: 0.45, ease: 'power3.out' }, '-=0.28')
        .to('.sidenav-user-trigger', { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }, '-=0.2');
    },
    { scope: sidenavRef },
  );

  async function handleSignOut() {
    await supabaseClient.auth.signOut();
    router.push('/login');
  }

  return (
    <AuthGuard>
      <div className="flex min-h-screen">
        <nav
          ref={sidenavRef}
          className="fixed left-0 top-0 bottom-0 w-[220px] flex flex-col z-40 shrink-0"
          style={{
            background: 'rgba(10,10,20,0.97)',
            borderRight: '1px solid rgba(255,255,255,0.055)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          <div
            className="sidenav-logo flex items-center gap-2.5 px-5 h-[60px] shrink-0"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
          >
            <Link href="/dashboard" className="group flex items-center gap-2.5">
              <div
                className="relative flex h-7 w-7 items-center justify-center rounded-[8px] overflow-hidden transition-all duration-300 group-hover:shadow-[0_0_18px_rgba(124,58,237,0.5)]"
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
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-0.5">
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'sidenav-nav-item relative flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-200',
                    isActive
                      ? 'text-[#c4b5fd] bg-[rgba(124,58,237,0.12)]'
                      : 'text-[#6b6b6b] hover:text-[#d0d0d0] hover:bg-[rgba(255,255,255,0.04)]',
                  )}
                >
                  {isActive ? <span
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-r-full"
                      style={{ background: '#7c3aed', boxShadow: '0 0 6px rgba(124,58,237,0.6)' }}
                    /> : null}
                  <Icon size={15} className={cn('shrink-0', isActive ? 'text-[#9f5fff]' : 'text-current')} />
                  {label}
                </Link>
              );
            })}
          </div>

          <div
            className="px-3 py-3 shrink-0"
            style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
            ref={dropdownRef}
          >
            <div className="relative">
              {dropdownOpen ? <div
                  className="absolute bottom-full mb-2 left-0 right-0 rounded-xl overflow-hidden z-50"
                  style={{
                    background: '#0e0e1a',
                    border: '1px solid rgba(255,255,255,0.09)',
                    boxShadow: '0 -8px 32px rgba(0,0,0,0.7), 0 0 0 1px rgba(124,58,237,0.06)',
                  }}
                >
                  <div className="p-1">
                    <Link
                      href="/"
                      onClick={() => { setDropdownOpen(false); }}
                      className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-[12.5px] text-[#a0a0a0] hover:text-[#f0f0f0] hover:bg-[rgba(255,255,255,0.05)] transition-all duration-150"
                    >
                      <ExternalLink size={13} className="text-[#6b6b6b]" />
                      Go to landing page
                    </Link>
                    <Link
                      href="/settings"
                      onClick={() => { setDropdownOpen(false); }}
                      className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-[12.5px] text-[#a0a0a0] hover:text-[#f0f0f0] hover:bg-[rgba(255,255,255,0.05)] transition-all duration-150"
                    >
                      <Settings size={13} className="text-[#6b6b6b]" />
                      Settings
                    </Link>
                    <div className="my-1 mx-2 h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-[12.5px] text-[#f87171] hover:bg-[rgba(248,113,113,0.08)] transition-all duration-150 cursor-pointer"
                    >
                      <LogOut size={13} />
                      Log out
                    </button>
                  </div>
                </div> : null}

              <button
                type="button"
                onClick={() => { setDropdownOpen((v) => !v); }}
                className={cn(
                  'sidenav-user-trigger w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg',
                  'transition-all duration-200 cursor-pointer group',
                  dropdownOpen
                    ? 'bg-[rgba(124,58,237,0.1)] border border-[rgba(124,58,237,0.2)]'
                    : 'hover:bg-[rgba(255,255,255,0.04)] border border-transparent',
                )}
              >
                <div
                  className="shrink-0 flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)' }}
                >
                  {initials}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-[12px] font-medium text-[#d0d0d0] truncate leading-tight">
                    {displayName ?? truncateEmail(email, 16)}
                  </p>
                  {displayName ? <p className="text-[11px] text-[#4a4a4a] truncate leading-tight mt-0.5">
                      {truncateEmail(email)}
                    </p> : null}
                </div>
                <ChevronRight
                  size={13}
                  className={cn('shrink-0 transition-all duration-200', dropdownOpen ? 'text-[#7c3aed] rotate-90' : 'text-[#555555] group-hover:text-[#6b6b6b]')}
                />
              </button>
            </div>
          </div>
        </nav>

        <main
          className="flex-1 min-h-screen overflow-y-auto"
          style={{ marginLeft: '220px', background: 'rgba(8,8,16,1)' }}
        >
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
