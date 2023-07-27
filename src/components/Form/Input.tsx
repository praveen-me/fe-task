import React, { ChangeEvent } from "react";

interface IInputProps {
  title: string;
  required?: boolean;
  placeholder: string;
  value: string | number;
  handleChange: (e: string | ChangeEvent<any>) => void;
  multiInput?: boolean;
  secondValue?: string | number;
  secondHandleChange?: (e: string | ChangeEvent<any>) => void;
  secondPlaceholder?: string;
}

export default function Input(props: IInputProps) {
  const {
    title,
    required,
    placeholder,
    value,
    handleChange,
    multiInput,
    secondValue,
    secondHandleChange,
    secondPlaceholder,
  } = props;

  return (
    <div className="mb-6">
      <label
        className="block text-sm text-s mb-1 font-medium label"
        htmlFor="job-title"
      >
        {title}
        {required && <span className="required">*</span>}
      </label>
      <div className={"flex flex-row justify-between"}>
        <input
          className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none text_input"
          id="job-title"
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />

        {multiInput && (
          <input
            className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none text_input ml-6"
            id="job-title"
            type="text"
            placeholder={secondPlaceholder}
            value={secondValue}
            onChange={secondHandleChange}
          />
        )}
      </div>
    </div>
  );
}
