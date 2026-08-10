import type { UseFormRegisterReturn } from 'react-hook-form';

interface FormFieldProps {
  label: string;
  required?: boolean;
  placeholder: string;
  maxLength?: number;
  showCounter?: boolean;
  registration: UseFormRegisterReturn<'title'>;
  currentLength?: number;
  error?: string;
}

export function TitleSection({
  label,
  required = false,
  placeholder,
  maxLength,
  showCounter = false,
  registration,
  currentLength = 0,
  error,
}: FormFieldProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
      <label className="font-bold text-gray-900 md:col-span-1">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <div className="md:col-span-3">
        <input
          className={`block w-full rounded-md border pl-8 pr-12 sm:text-sm py-3 ${error ? 'border-red-400' : 'border-gray-200'}`}
          placeholder={placeholder}
          type="text"
          {...registration}
        />
        {showCounter && maxLength && (
          <div className="flex justify-start mt-2 ml-1">
            <span className="text-sm text-gray-400">
              {currentLength}/{maxLength}
            </span>
          </div>
        )}
        {error && <p className="mt-1 ml-1 text-sm text-red-400">{error}</p>}
      </div>
    </div>
  );
}
