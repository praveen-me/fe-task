import React from "react";
import toast from "react-hot-toast";

interface IAlertProps {
  msg: string;
  toastId: {
    id: string;
  };
}

export default function Alert(props: IAlertProps) {
  function handleClose() {
    toast.remove(props.toastId.id);
  }

  return (
    <div id="alert-2" className="alert" role="alert">
      <svg
        className="flex-shrink-0 w-4 h-4"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <span className="sr-only">Info</span>
      <div className="ml-3 text-sm font-medium">{props.msg}</div>
      <button
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg ml-1.5 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
        data-dismiss-target="#alert-2"
        aria-label="Close"
        onClick={handleClose}
      >
        <span className="sr-only" role="button">
          Close
        </span>
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
}
