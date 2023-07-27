import React, { useState } from "react";

import { createJob, updateJob } from "../../api";
import { ICreateJobState, Job } from "../../@types";
import { useStore } from "../../store";
import helpers from "../../helpers";

import CreateJobStep1 from "./Step1";
import CreateJobStep2 from "./Step2";

export interface ICreateJobStepProps {
  handleSetJob: (
    values: ICreateJobState["step1"] | ICreateJobState["step2"]
  ) => void;
}

interface ICreateJobProps {
  currentJobToEdit: Job;
  toggleModal: () => void;
}

export default function CreateJob(props: ICreateJobProps) {
  const { currentJobToEdit } = props;

  const { dispatch } = useStore();

  const [currentStep, setCurrentStep] = useState(1);
  const [job, setJob] = useState<Job>(
    currentJobToEdit || {
      job_title: "",
      company_name: "",
      industry: "",
      location: "",
      remote_type: "",
      experience_min: 0,
      experience_max: 0,
      salary_min: 0,
      salary_max: 0,
      total_employee: "",
      apply_type: null,
    }
  );

  function handleSetJob(
    values: ICreateJobState["step1"] | ICreateJobState["step2"]
  ) {
    if ("experience" in values) {
      const updatedJob = {
        ...job,
        apply_type: values.apply_type,
        total_employee: values.total_employee,
        experience_min: values.experience.min,
        experience_max: values?.experience.max,
        salary_min: values?.salary.min,
        salary_max: values?.salary.max,
      } as Job;

      setJob(updatedJob);
      handleCreateJob(updatedJob);
    } else {
      const updatedJob: Job = {
        ...job,
        ...values,
      };

      setJob(updatedJob);
      setCurrentStep(2);
    }
  }

  async function handleCreateJob(job: Job) {
    if (job.id) {
      await updateJob(job.id, job);
    } else {
      await createJob(job);
    }

    helpers.getAllJobs(dispatch);

    props.toggleModal();
  }

  const step1 = currentJobToEdit
    ? {
        job_title: currentJobToEdit.job_title,
        company_name: currentJobToEdit.company_name,
        industry: currentJobToEdit.industry,
        location: currentJobToEdit.location,
        remote_type: currentJobToEdit.remote_type,
      }
    : null;

  const step2 = currentJobToEdit
    ? {
        total_employee: currentJobToEdit.total_employee,
        apply_type: currentJobToEdit.apply_type,
        experience: {
          min: currentJobToEdit.experience_min,
          max: currentJobToEdit.experience_max,
        },
        salary: {
          min: currentJobToEdit.salary_min,
          max: currentJobToEdit.salary_max,
        },
      }
    : null;

  return (
    <div className="job_form_container p-8 bg-white">
      <div className="flex flex-row justify-between mb-6">
        <h2 className="text-xl">Create a job</h2>
        <h3 className="text-xl">Step {currentStep}</h3>
      </div>

      {currentStep === 1 ? (
        <CreateJobStep1 handleSetJob={handleSetJob} oldValues={step1} />
      ) : (
        <CreateJobStep2 handleSetJob={handleSetJob} oldValues={step2} />
      )}
    </div>
  );
}
