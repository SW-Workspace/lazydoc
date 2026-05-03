'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterFormData } from '../validation';
import { signUpService, oAuthGitHubService } from '../services/auth-services';

export function useRegisterForm() {
  const router = useRouter();

  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { displayName: '', email: '', password: '', confirmPassword: '' },
  });

  async function onSubmit(data: RegisterFormData) {
    setServerError(null);
    try {
      await signUpService({ email: data.email, password: data.password, displayName: data.displayName });
      setSuccess(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Something went wrong');
    }
  }

  async function onGitHubRegister() {
    setGithubLoading(true);
    try {
      await oAuthGitHubService();
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'GitHub sign-up failed');
      setGithubLoading(false);
    }
  }

  return { form, onSubmit, onGitHubRegister, serverError, success, githubLoading, router };
}
