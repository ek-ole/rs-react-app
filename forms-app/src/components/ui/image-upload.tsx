import type { ChangeEvent } from 'react';

import { cn } from '@/utils/cn';

type ImageUploadProps = {
  onImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  imagePreview?: string;
  error?: string;
};

export const ImageUpload = ({ onImageChange, imagePreview, error }: ImageUploadProps) => {
  return (
    <>
      <div className="flex items-center gap-4">
        <label htmlFor="picture" className="font-medium">
          Download picture
        </label>
        <input
          type="file"
          id="picture"
          name="picture"
          accept=".png,.jpeg,.jpg"
          onChange={onImageChange}
          className={cn(
            'bg-input w-full',
            'rounded-xl px-2 py-1',
            'focus:outline-none sm:px-4',
            'focus:ring-2',
            error && 'border-error-message border-2',
          )}
        />
      
      {imagePreview && (
        
          <img src={imagePreview} alt="Preview" className="h-22 w-22 rounded-2xl border object-cover" />
        
      )}</div>
    </>
  );
};
