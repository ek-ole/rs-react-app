import type { FormEvent} from "react";
import { useRef } from "react";

import type { FormData } from '@/store/types'
import { convertFileToBase64, getBooleanValue, getNumberValue, getStringValue } from "@/utils/form-helpers";

export const useUncontrolledForm = (onSubmit: (data: FormData) => void) => {
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

    const data: FormData = {
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

    onSubmit(data);
  };

  return {
    formRef,
    handleSubmit,
  };
};

