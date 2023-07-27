import { XMarkIcon } from "@heroicons/react/24/solid";

import { ReactElement } from "react";

interface IModalProps {
  visible: boolean;
  toggleModal: (v?: boolean) => void;
  children: ReactElement;
}

export default function Modal(props: IModalProps) {
  return (
    <div
      className={`modal_container ${
        props.visible ? "fixed flex h-[calc(100%)]" : "hidden"
      }`}
    >
      <button
        type="button"
        className="modal_close_button"
        data-modal-hide="authentication-modal"
        onClick={(e) => {
          e.stopPropagation();
          props.toggleModal();
        }}
      >
        <XMarkIcon />
      </button>

      <div>
        <div className="relative">{props.children}</div>
      </div>
    </div>
  );
}
