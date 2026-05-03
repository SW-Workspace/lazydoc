'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema, type ResetPasswordFormData } from '../validation';
import { updatePasswordService } from '../services/auth-services';

export function useResetPasswordForm() {
  const router = useRouter();

  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  async function onSubmit(data: ResetPasswordFormData) {
    setServerError(null);
    try {
      await updatePasswordService(data.password);
      setSuccess(true);
      setTimeout(() => { router.push('/login'); }, 2000);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Something went wrong');
    }
  }

  return { form, onSubmit, serverError, success };
}
