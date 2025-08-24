import { cn } from '@/utils/cn';

type FormErrorProps = {
  error?: string;
};

export const FormError = ({ error }: FormErrorProps) => {
  if (!error) return null;

  return <p className={cn('text-error-message text-end text-sm')}>{error}</p>;
};
