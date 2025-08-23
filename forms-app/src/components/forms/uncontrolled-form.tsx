import type { ChangeEvent} from "react";
import { useState } from "react";

import { useUncontrolledForm } from "@/hooks/useUncontrolledForm";
import type { FormValues } from '@/store/types';
import { cn } from "@/utils/cn";
import { getPasswordStrength } from "@/utils/form-helpers";

type Props = {
  onSubmit: (data: FormValues) => void;
};

function UncontrolledForm({ onSubmit }: Props) {
const { formRef, handleSubmit, errors, handleFormChange, imagePreview, handleImageChange } =
  useUncontrolledForm(onSubmit);

  const [passwordStrength, setPasswordStrngth] = useState({strength: 'weak', message: ''});

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) =>  {
    const strength = getPasswordStrength(event.target.value);
    setPasswordStrngth(strength);
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} onChange={handleFormChange} className="space-y-4">
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
            errors.name && 'border-2 border-red-500',
          )}
        />
      </div>
      {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
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
            errors.age && 'border-2 border-red-500',
          )}
        />
      </div>
      {errors.age && <p className="text-error-message text-sm">{errors.age}</p>}
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
      {errors.email && <p className="text-error-message text-sm">{errors.email}</p>}
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

      {passwordStrength.message && (
        <div className="flex items-baseline justify-center gap-2">
          <div className={cn(
            'w-3 h-3 rounded-full',
            passwordStrength.strength === 'weak' && 'bg-red-500',
            passwordStrength.strength === 'medium' && 'bg-yellow-500',
            passwordStrength.strength === 'strong' && 'bg-green-500'
          )} />
          <span className={cn(
            'text-sm',
            passwordStrength.strength === 'weak' && 'text-red-500',
            passwordStrength.strength === 'medium' && 'text-yellow-600',
            passwordStrength.strength === 'strong' && 'text-green-600'
          )}>
            {passwordStrength.message}
          </span>
        </div>
      )}
      {errors.password && <p className="text-error-message text-sm">{errors.password}</p>}
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
      {errors.confirmPassword && (
        <p className="text-error-message text-sm">{errors.confirmPassword}</p>
      )}
      <div className="flex items-center gap-4">
        <label htmlFor="gender" className="font-medium">
          Gender
        </label>
        <select
          id="gender"
          name="gender"
          className={cn(
            'bg-input w-full',
            'rounded-xl px-2 py-1',
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
      {errors.gender && <p className="text-error-message text-sm">{errors.gender}</p>}
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
      {errors.acceptTerms && <p className="text-error-message text-sm">{errors.acceptTerms}</p>}
      <div className="flex items-center gap-4">
        <label htmlFor="picture" className="font-medium">
          Download picture
        </label>
        <input
          type="file"
          id="picture"
          name="picture"
          accept=".png,.jpeg,.jpg"
          placeholder="Download picture .png,.jpg or .jpeg"
          onChange={handleImageChange}
          className={cn(
            'bg-input w-full',
            'rounded-xl px-2 py-1',
            'focus:outline-none sm:px-4',
            'focus:ring-2',
            errors.picture && 'border-error-message border-2',
          )}
        />
      </div>
      {imagePreview && (
        <div className="flex justify-center">
          <img
            src={imagePreview}
            alt="Preview"
            className="lg h-32 w-32 rounded border object-cover"
          />
        </div>
      )}
      {errors.picture && <p className="text-error-message text-sm">{errors.picture}</p>}
      <div className="flex items-center gap-4">
        <label htmlFor="country" className="font-medium">
          Country
        </label>
        <select
          id="country"
          name="country"
          className={cn(
            'bg-input w-full',
            'rounded-xl px-2 py-1',
            'focus:outline-none sm:px-4',
            'focus:ring-2',
            errors.country && 'border-error-message border-2',
          )}
        >
          <option value="">Select country</option>
          <option value="USA">USA</option>
          <option value="Russia">Russia</option>
          <option value="Germany">Germany</option>
        </select>
      </div>
      {errors.country && <p className="text-error-message text-sm">{errors.country}</p>}
      <button
        type="submit"
        className={cn(
          'hover:bg-shadow hover:text-primary-light',
          'hover:border-shadow m-8 cursor-pointer',
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