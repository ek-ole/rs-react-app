import { cn } from '@/utils/cn';

type FormErrorProps = {
  error?: string;
};

export const FormError = ({ error }: FormErrorProps) => {
  if (!error) return <div className='p-2.5'></div>;

  return <p className={cn('text-error-message text-end text-sm')}>{error}</p>;
};
