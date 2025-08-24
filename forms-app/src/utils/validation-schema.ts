import { z } from 'zod';

export const formSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .refine((val) => /^\p{Lu}/u.test(val), 'Name must start with capital letter'),

    age: z
      .number()
      .refine((val) => !isNaN(val), 'Age is required')
      .refine((val) => val >= 0, 'Age cannot be negative')
      .refine((val) => val <= 123, 'Age must be reasonable'),

    email: z
      .string()
      .min(1, 'Email is required')
      .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), 'Invalid email address'),

    password: z
      .string()
      .min(1, 'Field is required')
      .regex(/[0-9]/, 'Password must contain at least 1 number')
      .regex(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least 1 lowercase letter')
      .regex(/[^a-zA-Z0-9]/, 'Password must contain at least 1 special character'),

    confirmPassword: z.string().min(1, 'Field is required'),

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
