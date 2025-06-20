"use client";

import { Field, Label, Description } from "@headlessui/react";
import React from "react";

interface TextAreaProps {
  name: string;
  label: string;
  placeholder?: string;
  value: string;
  readonly?: boolean;
  error?: string | null;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  description?: string;
  rows?: number;
  className?: string;
}

const TextAreaField: React.FC<TextAreaProps> = ({
  name,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  readonly,
  disabled,
  error,
  description,
  className = "textarea-class",
  rows = 4,
}) => {
  return (
    <Field>
      <Label htmlFor={name} className="label-class">
        {label}
      </Label>
      {description && (
        <Description className="mb-1 text-sm text-gray-500">
          {description}
        </Description>
      )}
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        readOnly={readonly}
        disabled={disabled}
        rows={rows}
        className={` ${className} resize-none ${
          error ? "border-[#B40000E5] text-[#B40000]" : "border-[#AAAAAA]"
        }`}
      />
      {error && (
        <Description className="mt-1 text-xs text-[#b40000]">
          {error}
        </Description>
      )}
    </Field>
  );
};

export default TextAreaField;
