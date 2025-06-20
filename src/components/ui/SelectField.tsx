"use client";

import { Listbox } from "@headlessui/react";
// import { HiSelector } from "react-icons/hi";
import { IoChevronDown } from "react-icons/io5";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (e: string) => void;
  onBlur?: () => void;
  options: SelectOption[];
  error?: string | null;
  disabled?: boolean;
  description?: string;
  className?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  value,
  onChange,
  onBlur,
  options,
  error,
  disabled,
  description,
  className = "select-class",
}) => {
  const selectedOption = options.find((opt) => opt.value === value);

  //   console.log(options);
  //   console.log(selectedOption);

  return (
    <div className="w-full">
      <label htmlFor={name} className="label-class">
        {label}
      </label>

      {description && (
        <p className="mb-1 text-sm text-gray-500">{description}</p>
      )}

      <Listbox value={value} onChange={onChange} disabled={disabled}>
        <div className="relative">
          <Listbox.Button
            onBlur={onBlur}
            className={`${className} text-left  ${
              error ? "border-[#B40000E5] text-[#B40000]" : "border-[#AAAAAA] "
            }
            `}
          >
            <span className="block truncate">
              {selectedOption?.label || "Select an option"}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center pr-2">
              <IoChevronDown
                className="h-4 w-4 text-[#aaa]"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>

          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-[#eeeeee] shadow-lg p-1 text-sm  focus:outline-none">
            {options.map((option) => (
              <Listbox.Option
                key={option.value}
                value={option.value}
                className={({ active }) =>
                  `cursor-pointer select-none px-2 py-2 font-medium rounded-[3px] ${
                    active
                      ? "bg-[#D9E4F8] text-text-strong"
                      : "text-text-strong"
                  }`
                }
              >
                {option.label}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>

      {error && <p className="mt-1 text-xs text-[#b40000]">{error}</p>}
    </div>
  );
};

export default SelectField;
