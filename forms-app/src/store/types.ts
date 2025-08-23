export type FormValues = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  acceptTerms: boolean;
  picture: string;
  country: string;
};

export type FormSubmission = {
  id: number;
  formType: 'uncontrolled' | 'react-hook-form';
  data: FormValues;
  submittedAt: string;
};

export type AddSubmissionPayload = {
  formType: FormSubmission['formType'];
  data: FormValues;
};

export type FormState = {
  submissions: FormSubmission[];
};
