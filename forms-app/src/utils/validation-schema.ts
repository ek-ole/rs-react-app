import { z } from 'zod';

export const formSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .regex(/^[A-Z]/, 'Name must start with capital letter'),

    age: z
      .number()
      .min(1, 'Age is required')
      .min(0, 'Age cannot be negative')
      .max(123, 'Age must be reasonable'),

    email: z.string().min(1, 'Email is required').refine(val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), 'Invalid email address'),

    password: z
      .string()
      .min(1, 'Field is required')
      .regex(/[0-9]/, 'Password must contain at least 1 number')
      .regex(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least 1 lowercase letter')
      .regex(/[^a-zA-Z0-9]/, 'Password must contain at least 1 special character'),

    confirmPassword: z.string().min(1, 'Field is required').optional(),

    gender: z.string().min(1, 'Please select gender'),

    acceptTerms: z.boolean().refine((val) => val == true, 'You must accept terms and conditions'),

    picture: z.string().min(1, 'Field is required'),

    country: z.string().min(1, 'Please select country'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type formSchema = z.infer<typeof formSchema>;
