import { zodResolver } from '@hookform/resolvers/zod';
import { useState, type ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import type { FormValues } from '@/store/types';
import { cn } from '@/utils/cn';
import { convertFileToBase64 } from '@/utils/form-helpers';
import { formSchema } from '@/utils/validation-schema';

import CountryAutocomplete from '../country-autocomplete/country-autocomplete';
import { FormError } from '../ui/form-error';
import { ImageUpload } from '../ui/image-upload';
import { PasswordStrengthIndicator } from '../ui/password-strength-indicator';

type Props = {
  onSubmit: (data: FormValues) => void;
};

type FormData = z.output<typeof formSchema>;

function HookForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });
  const [imagePreview, setImagePreview] = useState('');

  const password = watch('password') || '';
  const country = watch('country') || '';

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      void convertFileToBase64(file).then((base64) => {
        setValue('picture', base64, { shouldValidate: true });
      });
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void handleSubmit(onSubmit)(e);
      }}
      className="space-y-2"
    >
      <div className="flex items-center gap-4">
        <label htmlFor="name" className="font-medium">
          Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="Enter your name..."
          className={cn(
            'bg-input w-full',
            'rounded-xl px-2 py-1',
            'focus:outline-none sm:px-4',
            'focus:ring-2',
            errors.name && 'border-error-message border-2',
          )}
          {...register('name')}
        />
      </div>
      <FormError error={errors.name?.message} />

      <div className="flex items-center gap-4">
        <label htmlFor="age" className="font-medium">
          Age
        </label>
        <input
          type="number"
          id="age"
          placeholder="Enter your age..."
          className={cn(
            'bg-input w-full',
            'rounded-xl px-2 py-1',
            'focus:outline-none sm:px-4',
            'focus:ring-2',
            errors.age && 'border-error-message border-2',
          )}
          {...register('age', { valueAsNumber: true })}
        />
      </div>
      <FormError error={errors.age?.message} />

      <div className="flex items-center gap-4">
        <label htmlFor="email" className="font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="email@gmail.com"
          className={cn(
            'bg-input w-full',
            'rounded-xl px-2 py-1',
            'focus:outline-none sm:px-4',
            'focus:ring-2',
            errors.email && 'border-error-message border-2',
          )}
          {...register('email')}
        />
      </div>
      <FormError error={errors.email?.message} />

      <div className="flex items-center gap-4">
        <label htmlFor="password" className="font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Enter password"
          className={cn(
            'bg-input w-full',
            'rounded-xl px-2 py-1',
            'focus:outline-none sm:px-4',
            'focus:ring-2',
            errors.password && 'border-error-message border-2',
          )}
          {...register('password')}
        />
      </div>
      <PasswordStrengthIndicator password={password} />
      <FormError error={errors.password?.message} />

      <div className="flex items-center gap-4">
        <label htmlFor="confirmPassword" className="font-medium">
          Confirm password
        </label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Repeat password"
          className={cn(
            'bg-input w-full',
            'rounded-xl px-2 py-1',
            'focus:outline-none sm:px-4',
            'focus:ring-2',
            errors.confirmPassword && 'border-error-message border-2',
          )}
          {...register('confirmPassword')}
        />
      </div>
      <FormError error={errors.confirmPassword?.message} />

      <div className="flex items-center gap-4">
        <label htmlFor="gender" className="font-medium">
          Gender
        </label>
        <select
          id="gender"
          className={cn(
            'bg-input w-full',
            'rounded-xl px-2 py-2',
            'focus:outline-none sm:px-4',
            'focus:ring-2',
            errors.gender && 'border-error-message border-2',
          )}
          {...register('gender')}
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <FormError error={errors.gender?.message} />

      <div className="flex items-center gap-4">
        <label htmlFor="acceptTerms" className="font-medium">
          Accept Terms and Conditions agreement
        </label>
        <input
          type="checkbox"
          id="acceptTerms"
          placeholder="Accept terms"
          className={cn(
            'bg-input h-4 w-4',
            'rounded-xl px-2 py-1',
            'focus:outline-none sm:px-4',
            'focus:ring-2',
            errors.acceptTerms && 'border-error-message border-2',
          )}
          {...register('acceptTerms')}
        />
      </div>
      <FormError error={errors.acceptTerms?.message} />

      <ImageUpload
        onImageChange={handleImageChange}
        imagePreview={imagePreview}
        error={errors.picture?.message}
      />
      <FormError error={errors.picture?.message} />

      <div className="flex items-center gap-4">
        <label htmlFor="country" className="font-medium">
          Country
        </label>
        <CountryAutocomplete
          value={country}
          onChange={(value) => setValue('country', value, { shouldValidate: true })}
          error={errors.country?.message}
        />
        <input type="hidden" value={country} {...register('country')} />
      </div>
      <FormError error={errors.country?.message} />
      <button
        type="submit"
        disabled={!isValid}
        className={cn(
          'hover:bg-shadow hover:text-primary-light',
          'hover:border-shadow mx-18 my-8 cursor-pointer',
          'rounded-2xl border-3 px-2 font-medium',
          'shadow-shadow shadow-[0px_0px_5px_2px]',
          'px-14 pt-1 transition-colors duration-400 sm:border-4',
          'transition-transform duration-400 hover:scale-105',
          !isValid && 'cursor-not-allowed opacity-50',
        )}
      >
        Submit
      </button>
    </form>
  );
}

export default HookForm;
