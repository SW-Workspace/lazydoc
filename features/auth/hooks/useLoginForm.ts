'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '../validation';
import { logInService, oAuthGitHubService } from '../services/auth-services';

export function useLoginForm() {
  const router = useRouter();

  const [serverError, setServerError] = useState<string | null>(null);
  const [githubLoading, setGithubLoading] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  async function onSubmit(data: LoginFormData) {
    setServerError(null);
    try {
      await logInService({ email: data.email, password: data.password });
      router.push('/dashboard');
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Something went wrong');
    }
  }

  async function onGitHubLogin() {
    setGithubLoading(true);
    try {
      await oAuthGitHubService();
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'GitHub login failed');
      setGithubLoading(false);
    }
  }

  return { form, onSubmit, onGitHubLogin, serverError, githubLoading };
}
