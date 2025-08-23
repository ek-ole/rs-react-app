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