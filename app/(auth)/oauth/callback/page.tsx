'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { supabaseClient } from '@/core/config/supabase';

gsap.registerPlugin(useGSAP);

export default function OAuthCallbackPage() {
  const router = useRouter();

  const [status, setStatus] = useState<'loading' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from('.callback-content', { opacity: 0, y: 16, duration: 0.5, ease: 'power3.out' });
    },
    { scope: containerRef },
  );

  useEffect(() => {
    async function handleCallback() {
      const { data, error } = await supabaseClient.auth.getSession();

      if (error) {
        setErrorMessage(error.message);
        setStatus('error');
        return;
      }

      if (data.session) {
        router.replace('/dashboard');
        return;
      }

      const { data: { subscription } } = supabaseClient.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' && session) {
          subscription.unsubscribe();
          router.replace('/dashboard');
        }
      });

      setTimeout(() => {
        subscription.unsubscribe();
        setErrorMessage('Authentication timed out. Please try again.');
        setStatus('error');
      }, 8000);
    }

    handleCallback();
  }, [router]);

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center min-h-screen px-5">
      <div className="callback-content flex flex-col items-center gap-5 text-center max-w-[320px]">
        {status === 'loading' ? (
          <>
            <div
              className="relative flex h-14 w-14 items-center justify-center rounded-full"
              style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}
            >
              <svg className="animate-spin text-[#7c3aed]" width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="32" strokeDashoffset="12" />
              </svg>
            </div>
            <div>
              <p className="text-[15px] font-semibold text-[#f0f0f0] mb-1">{"Signing you in…"}</p>
              <p className="text-[13px] text-[#6b6b6b]">Finishing up your GitHub login</p>
            </div>
          </>
        ) : (
          <>
            <div
              className="flex h-14 w-14 items-center justify-center rounded-full"
              style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.25)' }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <div>
              <p className="text-[15px] font-semibold text-[#f0f0f0] mb-1">Authentication failed</p>
              <p className="text-[13px] text-[#6b6b6b] leading-relaxed">{errorMessage ?? 'Something went wrong. Please try again.'}</p>
            </div>
            <button
              type="button"
              onClick={() => { router.push('/login'); }}
              className="mt-1 text-[13px] text-[#7c3aed] hover:text-[#9f5fff] transition-colors duration-150 font-medium"
            >
              Back to sign in
            </button>
          </>
        )}
      </div>
    </div>
  );
}
