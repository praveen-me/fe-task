import { XMarkIcon } from "@heroicons/react/24/solid";

import CreateJob from "./CreateJob";

interface IModalProps {
  visible: boolean;
  toggleModal: (v?: boolean) => void;
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
        <div className="relative">
          <CreateJob />
        </div>
      </div>
    </div>
  );
}
