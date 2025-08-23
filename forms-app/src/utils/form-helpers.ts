import type { FormValues } from '@/store/types';

import { formSchema } from './validation-schema';

export const getStringValue = (formData: FormData, key: string): string => {
  const value = formData.get(key);
  return value instanceof File ? '' : String(value ?? '');
};

export const getNumberValue = (formData: FormData, key: string): number => {
  const value = formData.get(key);
  if (value instanceof File) return 0;

  const numericValue = Number(value ?? 0);
  return isNaN(numericValue) ? 0 : numericValue;
};

export const getBooleanValue = (formData: FormData, key: string): boolean => {
  const value = formData.get(key);
  return value === 'on';
};

export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Expected string result'));
      }
    };
  });
};

export const validateForm = (data: FormValues) => {
  const zodData = {
    ...data,
    age: Number(data.age),
    acceptTerms: Boolean(data.acceptTerms),
  };

  const result = formSchema.safeParse(zodData);

  if (!result.success) {
    const errors: Record<string, string> = {};

    for (const error of result.error.issues) {
      const fieldName = error.path[0];
      if (fieldName && typeof fieldName === 'string') {
        errors[fieldName] = error.message;
      }
    }

    return {
      isValid: false,
      errors,
    };
  }

  return { isValid: true, errors: {} };
};

export const getPasswordStrength = (password: string): {
  strength: 'weak' | 'medium' | 'strong';
  message: string;
} => {
  if (password.length === 0) {
return { strength: 'weak', message: '' };
  }

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
  const isLongEnough = password.length >= 8;

  const score = [hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar, isLongEnough].filter(Boolean).length;

  if (score <= 2) return {strength: 'weak', message: 'Weak password' };
   if (score <= 4) return { strength: 'medium', message: 'Medium password' };
   return {strength: 'strong', message: 'Strong password' };
}