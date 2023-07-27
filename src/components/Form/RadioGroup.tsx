import React, { ChangeEvent } from "react";

interface IRadioGroupProps {
  title: string;
  required?: boolean;
  options: { key: string; value: string }[];
  value: string | null;
  handleChange: (value: string) => undefined;
}

export default function RadioGroup(props: IRadioGroupProps) {
  const { title, required, options, value, handleChange } = props;

  return (
    <div>
      <label
        className="block text-sm text-s mb-1 font-medium label"
        htmlFor="job-title"
      >
        {title}
        {required && <span className="required">*</span>}
      </label>

      <div className="flex">
        {options.map((option) => (
          <div className="flex items-center mr-4" key={option.key}>
            <input
              id="inline-radio"
              type="radio"
              value={value || ""}
              name="inline-radio-group"
              className={`radio ${value === option.key ? "selected" : ""}`}
              onChange={() => handleChange(option.key as string)}
            />
            <label
              htmlFor="inline-radio"
              className="ml-1 text-sm font-normal  radio_label"
            >
              {option.value}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
