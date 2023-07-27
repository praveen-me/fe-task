import React from "react";

interface IButtonProps {
  outline?: boolean;
  title: string;
  handleSubmit: () => void;
}

//@ts-ignore
export default function AppButton(props: IButtonProps) {
  const { outline, title, handleSubmit } = props;

  return (
    <>
      <button
        type="button"
        className={`button ${outline ? "outline_button" : ""}`}
        onClick={handleSubmit}
      >
        {title}
      </button>
    </>
  );
}
