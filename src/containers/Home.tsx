import React, { useEffect, useState } from "react";
import Modal from "../components/Modal";
import { setAllJobs, useStore } from "../store";
import { getAllJobs } from "../api";
import { Job } from "../@types";
import { AxiosResponse } from "axios";
import JobCard from "../components/JobCard";
import CreateJob from "../components/CreateJob";
import helpers from "../helpers";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const { state, dispatch } = useStore();
  const [currentJobToEdit, setCurrentJobToEdit] = useState("");

  const { jobs } = state;

  function toggleModal(value?: boolean) {
    setShowModal(value || !showModal);
  }

  useEffect(() => {
    (async () => {
      helpers.getAllJobs(dispatch);
    })();
  }, []);

  async function handleOperationOnJob(
    jobId: string,
    operation: "delete" | "edit"
  ) {
    if (operation === "edit") {
      setCurrentJobToEdit(jobId);
      toggleModal();
    }
  }

  return (
    <div>
      <div className="flex flex-row justify-end">
        <button onClick={() => toggleModal()}>Create Job</button>
      </div>

      <div className="flex flex-row justify-between mt-24 flex-wrap">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            handleOperationOnJob={handleOperationOnJob}
          />
        ))}
      </div>

      <Modal visible={showModal} toggleModal={toggleModal}>
        {showModal ? (
          <CreateJob
            currentJobToEdit={
              jobs.find((j) => j.id === currentJobToEdit) as Job
            }
            toggleModal={toggleModal}
          />
        ) : (
          <></>
        )}
      </Modal>
    </div>
  );
}
