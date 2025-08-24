import { cn } from '@/utils/cn';
import { getPasswordStrength } from '@/utils/form-helpers';

type PasswordStrengthIndicatorProps = {
  password: string;
};

export const PasswordStrengthIndicator = ({ password }: PasswordStrengthIndicatorProps) => {
  const strength = getPasswordStrength(password);

  if (!password) return null;

  return (
    <div className="flex items-baseline justify-center gap-2">
      <div
        className={cn(
          'h-3 w-3 rounded-full',
          strength.strength === 'weak' && 'bg-red-500',
          strength.strength === 'medium' && 'bg-yellow-500',
          strength.strength === 'strong' && 'bg-green-500',
        )}
      />
      <span
        className={cn(
          'text-sm',
          strength.strength === 'weak' && 'text-red-500',
          strength.strength === 'medium' && 'text-yellow-600',
          strength.strength === 'strong' && 'text-green-600',
        )}
      >
        {strength.message}
      </span>
    </div>
  );
};
