'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema, type ForgotPasswordFormData } from '../validation';
import { forgetPasswordService } from '../services/auth-services';

export function useForgotPasswordForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  async function onSubmit(data: ForgotPasswordFormData) {
    setServerError(null);
    try {
      await forgetPasswordService({ email: data.email });
      setSuccess(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Something went wrong');
    }
  }

  return { form, onSubmit, serverError, success };
}
