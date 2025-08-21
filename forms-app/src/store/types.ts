export type FormData = {
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
  data: FormData;
  submittedAt: string;
};

export type AddSubmissionPayload = {
  formType: FormSubmission['formType'];
  data: FormData;
};

export type FormState = {
  submissions: FormSubmission[];
};
