import z from 'zod';

export const authSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must contain at least 8 characters'),
  displayName: z.string().min(2, 'Name too short').optional(),
});

export type AuthFormData = z.infer<typeof authSchema>;
