'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Input, Button } from '@/components/ui';
import { useResetPasswordForm } from '@/features/auth/hooks/useResetPasswordForm';
import { FileText } from 'lucide-react';

gsap.registerPlugin(useGSAP);

export default function ResetPasswordPage() {
  const { form, onSubmit, serverError, success } = useResetPasswordForm();

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

  const accentGlow = success ? 'rgba(16,185,129,0.4)' : 'rgba(124,58,237,0.4)';

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
          {success ? 'Password updated' : 'Set new password'}
        </h1>
      </div>

      <p className="auth-sub mb-8 text-center text-sm text-[#6b6b6b] leading-relaxed">
        {success ? 'Your account is secured with a new password' : 'Choose a strong password for your account'}
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
                style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)', boxShadow: '0 0 24px rgba(16,185,129,0.15)' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>
                <p className="text-[15px] font-semibold text-[#f0f0f0] mb-1">All set!</p>
                <p className="text-[13px] text-[#6b6b6b] leading-relaxed">{'Redirecting you to sign in…'}</p>
              </div>
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
                <div className="relative">
                  <Input
                    label="New password"
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min. 8 characters"
                    autoComplete="new-password"
                    error={errors.password?.message}
                    hint={!errors.password ? 'At least 8 characters' : undefined}
                    className="pr-11"
                    {...register('password')}
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => { setShowPassword((v) => !v); }}
                    className="absolute right-3.5 top-[30px] text-[#555555] hover:text-[#6b6b6b] transition-colors duration-150"
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

                <Input
                  label="Confirm new password"
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Repeat your password"
                  autoComplete="new-password"
                  error={errors.confirmPassword?.message}
                  {...register('confirmPassword')}
                />

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
                  Update password
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
