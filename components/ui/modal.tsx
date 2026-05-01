'use client';

import { useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ open, onClose, title, children }: ModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const prevOpen = useRef(false);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (open) document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useGSAP(() => {
    if (!backdropRef.current || !panelRef.current) return;

    if (open && !prevOpen.current) {
      gsap.set(backdropRef.current, { opacity: 0, display: 'flex' });
      gsap.set(panelRef.current, { opacity: 0, scale: 0.92, y: 12 });
      gsap.to(backdropRef.current, { opacity: 1, duration: 0.22, ease: 'power2.out' });
      gsap.to(panelRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.38, ease: 'expo.out' });
    }

    if (!open && prevOpen.current) {
      gsap.to(panelRef.current, { opacity: 0, scale: 0.94, y: 8, duration: 0.2, ease: 'power2.in' });
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.22,
        ease: 'power2.in',
        onComplete: () => {
          if (backdropRef.current) gsap.set(backdropRef.current, { display: 'none' });
        },
      });
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[100] items-center justify-center p-4"
      style={{
        display: 'none',
        background: 'rgba(8, 8, 16, 0.8)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
      onClick={(e) => {
        if (e.target === backdropRef.current) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative w-full max-w-lg rounded-2xl overflow-hidden"
        style={{
          background: '#0e0e1a',
          border: '1px solid rgba(255,255,255,0.09)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(124,58,237,0.08), 0 0 60px rgba(124,58,237,0.06)',
        }}
      >
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.4) 40%, rgba(6,182,212,0.3) 70%, transparent)' }}
        />

        <div
          className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <h2
            id="modal-title"
            className="text-[15px] font-semibold text-[#f0f0f0]"
            style={{ letterSpacing: '-0.02em' }}
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-[#6b6b6b] transition-all duration-150 hover:bg-[rgba(255,255,255,0.07)] hover:text-[#d0d0d0] cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>

        <div className="px-6 py-5">
          {children}
        </div>
      </div>
    </div>
  );
}
