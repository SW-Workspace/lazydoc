'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Input, Button } from '@/components/ui';
import { cn } from '@/core/utils/utils';
import { useLoginForm } from '@/features/auth/hooks/useLoginForm';

gsap.registerPlugin(useGSAP);

export default function LoginPage() {
  const { form, onSubmit, onGitHubLogin, serverError, githubLoading } = useLoginForm();

  const [showPassword, setShowPassword] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = form;

  useGSAP(
    () => {
      gsap.set(['.auth-logo', '.auth-heading', '.auth-sub', '.auth-body'], { opacity: 0, y: 20 });
      const tl = gsap.timeline({ delay: 0.06 });
      tl.to('.auth-logo', { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
        .to('.auth-heading', { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, '-=0.3')
        .to('.auth-sub', { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }, '-=0.3')
        .to('.auth-body', { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.28');
    },
    { scope: cardRef },
  );

  return (
    <div ref={cardRef} className="w-full max-w-[400px] mx-auto px-5 py-8 sm:px-0">
      <div className="auth-logo flex justify-center mb-8">
        <Link href="/" className="group flex items-center gap-2.5">
          <div
            className="relative flex h-8 w-8 items-center justify-center rounded-[9px] overflow-hidden transition-all duration-300 group-hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)',
              boxShadow: '0 0 20px rgba(124,58,237,0.5), inset 0 1px 0 rgba(255,255,255,0.18)',
            }}
          >
            <svg className="h-4 w-4 text-white relative z-10" fill="none" viewBox="0 0 16 16">
              <path d="M3 2h7l3 3v9H3V2z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
              <path d="M10 2v3h3" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
              <path d="M5.5 7.5h5M5.5 10h3.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
            </svg>
          </div>
          <span
            className="font-semibold text-[15px]"
            style={{
              letterSpacing: '-0.025em',
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

      <div className="auth-heading mb-1.5 text-center">
        <h1
          className="font-bold text-[#f0f0f0]"
          style={{ fontSize: '1.625rem', letterSpacing: '-0.035em', lineHeight: '1.18' }}
        >
          Welcome back
        </h1>
      </div>

      <p className="auth-sub mb-8 text-center text-sm text-[#6b6b6b] leading-relaxed">
        Sign in to continue generating READMEs
      </p>

      <div
        className="auth-body relative rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(14,14,26,0.9)',
          border: '1px solid rgba(255,255,255,0.07)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
      >
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(124,58,237,0.4) 50%, transparent 100%)' }}
        />
        <div className="p-6 sm:p-7">
          <button
            type="button"
            onClick={onGitHubLogin}
            disabled={githubLoading}
            className={cn(
              'w-full flex items-center justify-center gap-2.5 h-10 rounded-lg text-[13.5px] font-medium',
              'text-[#d0d0d0] transition-all duration-200 cursor-pointer select-none',
              'border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)]',
              'hover:bg-[rgba(255,255,255,0.07)] hover:border-[rgba(255,255,255,0.13)] hover:text-[#f0f0f0]',
              'active:scale-[0.98]',
              'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
            )}
          >
            {githubLoading ? (
              <svg className="animate-spin shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="32" strokeDashoffset="12" />
              </svg>
            ) : (
              <svg className="shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            )}
            Continue with GitHub
          </button>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
            <span className="text-[11px] font-medium uppercase text-[#555555]" style={{ letterSpacing: '0.08em' }}>or</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
          </div>

          {serverError ? <div
              className="flex items-start gap-2.5 rounded-lg px-3.5 py-3 text-[13px] text-[#f87171] mb-4"
              style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)' }}
            >
              <svg className="shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.25" />
                <path d="M7 4.5v3.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                <circle cx="7" cy="10" r="0.75" fill="currentColor" />
              </svg>
              <span className="leading-relaxed">{serverError}</span>
            </div> : null}

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
            <Input
              label="Email"
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              error={errors.email?.message}
              {...register('email')}
            />

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-xs font-medium uppercase text-[#a0a0a0]"
                  style={{ letterSpacing: '0.06em' }}
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[11.5px] text-[#6b6b6b] hover:text-[#a0a0a0] transition-colors duration-150"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  error={errors.password?.message}
                  className="pr-11"
                  {...register('password')}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => { setShowPassword((v) => !v); }}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#555555] hover:text-[#6b6b6b] transition-colors duration-150"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                      <path d="M1 1l22 22" />
                    </svg>
                  ) : (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={isSubmitting}
              className="w-full mt-1"
              style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
                boxShadow: '0 0 24px rgba(124,58,237,0.35), inset 0 1px 0 rgba(255,255,255,0.14)',
              }}
            >
              Sign in
            </Button>
          </form>

          <p className="mt-5 text-center text-[13px] text-[#555555]">
            No account?{' '}
            <Link href="/register" className="text-[#7c3aed] hover:text-[#9f5fff] transition-colors duration-150 font-medium">
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
