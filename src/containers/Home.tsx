import React, { useEffect, useState } from "react";
import Modal from "../components/Modal";
import { setAllJobs, useStore } from "../store";
import { getAllJobs } from "../api";
import { Job } from "../@types";
import { AxiosResponse } from "axios";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const { state, dispatch } = useStore();

  function toggleModal(value?: boolean) {
    setShowModal(value || !showModal);
  }

  useEffect(() => {
    (async () => {
      const data: AxiosResponse<Job[]> = await getAllJobs();

      dispatch(setAllJobs(data.data));
    })();
  }, []);

  return (
    <div>
      <div className="flex flex-row justify-end">
        <button onClick={() => toggleModal()}>Create Job</button>
      </div>

      <Modal visible={showModal} toggleModal={toggleModal} />
    </div>
  );
}
