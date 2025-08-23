import type { FormEvent} from "react";
import { useRef } from "react";

import type { FormValues } from '@/store/types';
import { convertFileToBase64, getBooleanValue, getNumberValue, getStringValue, validateForm } from "@/utils/form-helpers";

export const useUncontrolledForm = (onSubmit: (data: FormValues) => void) => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const pictureFile = formData.get('picture') as File;

    let pictureBase64 = '';
    if (pictureFile && pictureFile.size > 0) {
      pictureBase64 = await convertFileToBase64(pictureFile);
    }

    const data: FormValues = {
      name: getStringValue(formData, 'name'),
      age: getNumberValue(formData, 'age'),
      email: getStringValue(formData, 'email'),
      password: getStringValue(formData, 'password'),
      confirmPassword: getStringValue(formData, 'confirmPassword'),
      gender: getStringValue(formData, 'gender'),
      acceptTerms: getBooleanValue(formData, 'acceptTerms'),
      picture: pictureBase64,
      country: getStringValue(formData, 'country'),
    };

    const validation = validateForm(data);
    if (!validation.isValid) {
      console.log('Validation error:', validation.errors);
      return;
    }

    onSubmit(data);
  };

  return {
    formRef,
    handleSubmit,
  };
};

