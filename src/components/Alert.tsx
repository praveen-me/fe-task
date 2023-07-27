import { XMarkIcon, InformationCircleIcon } from "@heroicons/react/24/solid";
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
      <InformationCircleIcon height="20px" width="20px" />

      <div className="ml-3 text-sm font-medium">{props.msg}</div>
      <button
        type="button"
        className="alert_close_btn"
        data-dismiss-target="#alert-2"
        aria-label="Close"
        onClick={handleClose}
      >
        <XMarkIcon height="20px" width="20px" />
      </button>
    </div>
  );
}
