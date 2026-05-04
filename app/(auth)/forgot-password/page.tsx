'use client';

import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Input, Button } from '@/components/ui';
import { useForgotPasswordForm } from '@/features/auth/hooks/useForgotPasswordForm';
import { FileText } from 'lucide-react';

gsap.registerPlugin(useGSAP);

export default function ForgotPasswordPage() {
  const { form, onSubmit, serverError, success } = useForgotPasswordForm();

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

  const accentGlow = 'rgba(6,182,212,0.4)';

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
            <FileText size={16} />
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
          {success ? 'Email sent' : 'Reset your password'}
        </h1>
      </div>

      <p className="auth-sub mb-8 text-center text-sm text-[#6b6b6b] leading-relaxed">
        {success ? 'Check your inbox for the reset link' : "Enter your email and we'll send you a link"}
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
          style={{ background: `linear-gradient(90deg, transparent 0%, ${accentGlow} 50%, transparent 100%)` }}
        />
        <div className="p-6 sm:p-7">
          {success ? (
            <div className="flex flex-col items-center gap-4 py-4 text-center">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full"
                style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.25)', boxShadow: '0 0 24px rgba(6,182,212,0.15)' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <p className="text-[15px] font-semibold text-[#f0f0f0] mb-1">Check your inbox</p>
                <p className="text-[13px] text-[#6b6b6b] leading-relaxed max-w-[260px]">
                  {"If that email is registered, you'll receive a password reset link shortly."}
                </p>
              </div>
              <Link href="/login" className="mt-2 text-[13px] text-[#7c3aed] hover:text-[#9f5fff] transition-colors duration-150 font-medium">
                Back to sign in
              </Link>
            </div>
          ) : (
            <>
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

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={isSubmitting}
                  className="w-full mt-1"
                  style={{
                    background: 'linear-gradient(135deg, #0e7490 0%, #06b6d4 100%)',
                    boxShadow: '0 0 24px rgba(6,182,212,0.3), inset 0 1px 0 rgba(255,255,255,0.14)',
                    border: '1px solid rgba(6,182,212,0.35)',
                  }}
                >
                  Send reset link
                </Button>
              </form>

              <p className="mt-5 text-center text-[13px] text-[#555555]">
                Remembered it?{' '}
                <Link href="/login" className="text-[#7c3aed] hover:text-[#9f5fff] transition-colors duration-150 font-medium">
                  Sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
