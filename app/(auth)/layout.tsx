'use client';

import Link from 'next/link';
import { GuestGuard } from '@/features/auth/components/GuestGuard';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <GuestGuard>
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center">
      <Link
        href="/"
        className="absolute top-6 left-6 z-20 flex items-center gap-1.5 text-[12.5px] text-[#555555] hover:text-[#6b6b6b] transition-colors duration-150"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        Back
      </Link>
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="aurora-orb-1 absolute rounded-full"
          style={{
            width: '600px',
            height: '600px',
            top: '-20%',
            left: '-15%',
            background: 'radial-gradient(circle, rgba(124,58,237,1) 0%, transparent 70%)',
            filter: 'blur(110px)',
          }}
        />
        <div
          className="aurora-orb-2 absolute rounded-full"
          style={{
            width: '500px',
            height: '500px',
            bottom: '-15%',
            right: '-12%',
            background: 'radial-gradient(circle, rgba(6,182,212,1) 0%, transparent 70%)',
            filter: 'blur(110px)',
          }}
        />
        <div
          className="aurora-orb-3 absolute rounded-full"
          style={{
            width: '400px',
            height: '400px',
            top: '40%',
            left: '60%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(236,72,153,1) 0%, transparent 70%)',
            filter: 'blur(120px)',
          }}
        />
      </div>

      <div className="relative z-10 w-full py-12 px-4">
        {children}
      </div>
    </div>
    </GuestGuard>
  );
}
