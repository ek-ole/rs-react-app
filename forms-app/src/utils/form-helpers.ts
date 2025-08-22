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
