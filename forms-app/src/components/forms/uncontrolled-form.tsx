import { useState } from 'react';

import { useUncontrolledForm } from '@/hooks/use-uncontrolled-form';
import type { FormValues } from '@/store/types';
import { cn } from '@/utils/cn';

import CountryAutocomplete from '../country-autocomplete/country-autocomplete';
import { FormError } from '../ui/form-error';
import { ImageUpload } from '../ui/image-upload';
import { PasswordStrengthIndicator } from '../ui/password-strength-indicator';


type Props = {
  onSubmit: (data: FormValues) => void;
};

function UncontrolledForm({ onSubmit }: Props) {
  const {
    formRef,
    handleSubmit,
    errors,
    handleFormChange,
    imagePreview,
    handleImageChange,
    password,
    handlePasswordChange,
  } = useUncontrolledForm(onSubmit);
  const [country, setCountry] = useState('');


  return (
    <form ref={formRef} onSubmit={handleSubmit} onChange={handleFormChange} className="space-y-2">
      <div className="flex items-center gap-4">
        <label htmlFor="name" className="font-medium">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your name..."
          className={cn(
            'bg-input w-full',
            'rounded-xl px-2 py-1',
            'focus:outline-none sm:px-4',
            'focus:ring-2',
            errors.name && 'border-error-message border-2',
          )}
        />
      </div>
      <FormError error={errors.name} />

      <div className="flex items-center gap-4">
        <label htmlFor="age" className="font-medium">
          Age
        </label>
        <input
          type="number"
          id="age"
          name="age"
          placeholder="Enter your age..."
          className={cn(
            'bg-input w-full',
            'rounded-xl px-2 py-1',
            'focus:outline-none sm:px-4',
            'focus:ring-2',
            errors.age && 'border-error-message border-2',
          )}
        />
      </div>
      <FormError error={errors.age} />

      <div className="flex items-center gap-4">
        <label htmlFor="email" className="font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email@gmail.com"
          className={cn(
            'bg-input w-full',
            'rounded-xl px-2 py-1',
            'focus:outline-none sm:px-4',
            'focus:ring-2',
            errors.email && 'border-error-message border-2',
          )}
        />
      </div>
      <FormError error={errors.email} />

      <div className="flex items-center gap-4">
        <label htmlFor="password" className="font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter password"
          onChange={handlePasswordChange}
          className={cn(
            'bg-input w-full',
            'rounded-xl px-2 py-1',
            'focus:outline-none sm:px-4',
            'focus:ring-2',
            errors.password && 'border-error-message border-2',
          )}
        />
      </div>
      <PasswordStrengthIndicator password={password} />
      <FormError error={errors.password} />

      <div className="flex items-center gap-4">
        <label htmlFor="confirmPassword" className="font-medium">
          Confirm password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Repeat password"
          className={cn(
            'bg-input w-full',
            'rounded-xl px-2 py-1',
            'focus:outline-none sm:px-4',
            'focus:ring-2',
            errors.confirmPassword && 'border-error-message border-2',
          )}
        />
      </div>
      <FormError error={errors.confirmPassword} />

      <div className="flex items-center gap-4">
        <label htmlFor="gender" className="font-medium">
          Gender
        </label>
        <select
          id="gender"
          name="gender"
          className={cn(
            'bg-input w-full',
            'rounded-xl px-2 py-2',
            'focus:outline-none sm:px-4',
            'focus:ring-2',
            errors.gender && 'border-error-message border-2',
          )}
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <FormError error={errors.gender} />

      <div className="flex items-center gap-4">
        <label htmlFor="acceptTerms" className="font-medium">
          Accept Terms and Conditions agreement
        </label>
        <input
          type="checkbox"
          id="acceptTerms"
          name="acceptTerms"
          placeholder="Accept terms"
          className={cn(
            'bg-input h-4 w-4',
            'rounded-xl px-2 py-1',
            'focus:outline-none sm:px-4',
            'focus:ring-2',
            errors.acceptTerms && 'border-error-message border-2',
          )}
        />
      </div>
      <FormError error={errors.acceptTerms} />

      <ImageUpload
        onImageChange={handleImageChange}
        imagePreview={imagePreview}
        error={errors.picture}
      />
      <FormError error={errors.picture} />

      <div className="flex items-center gap-4">
        <label htmlFor="country" className="font-medium">
          Country
        </label>
        <CountryAutocomplete value={country} onChange={setCountry} error={errors.country} />
        <input type="hidden" name="country" value={country} />
      </div>
      <FormError error={errors.country} />
      <button
        type="submit"
        className={cn(
          'hover:bg-shadow hover:text-primary-light',
          'hover:border-shadow my-8 mx-18 cursor-pointer',
          'rounded-2xl border-3 px-2 font-medium',
          'shadow-shadow shadow-[0px_0px_5px_2px]',
          'px-14 pt-1 transition-colors duration-400 sm:border-4',
          'transition-transform duration-400 hover:scale-105',
        )}
      >
        Submit
      </button>
    </form>
  );
}

export default UncontrolledForm;
