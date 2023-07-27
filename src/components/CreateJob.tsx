import React, { useState } from "react";
import { FormikProps, useFormik } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";

import Form from "./Form";
import Alert from "./Alert";
import { createJob, updateJob } from "../api";
import { Job } from "../@types";
import { useStore } from "../store";
import helpers from "../helpers";
import AppButton from "./AppButton";

interface ICreateJobState {
  step1: {
    job_title: string;
    company_name: string;
    industry: string;
    location: string;
    remote_type: string;
  };
  step2: {
    experience: {
      min: number;
      max: number;
    };
    salary: {
      min: number;
      max: number;
    };
    total_employee: string;
    apply_type: string | null;
  };
}

interface ICreateJobStepProps {
  handleSetJob: (
    values: ICreateJobState["step1"] | ICreateJobState["step2"]
  ) => void;
}

const CreateJobStep1Schema = yup.object().shape({
  job_title: yup.string().required("Job Title is required"),
  company_name: yup.string().required("Company Name is required"),
  industry: yup.string().required("Industry is required"),
  location: yup.string(),
  remote_type: yup.string(),
});

const CreateJobStep2Schema = yup.object().shape({
  experience: yup
    .object({
      min: yup.number(),
      max: yup.number(),
    })
    .test({
      name: "superior",
      test: (f) => {
        if (!f.min || !f.max) return true;

        return !(f.min > f.max);
      },
      message: "minimum experience must be smaller than maximum experience",
    }),
  salary: yup
    .object({
      min: yup.number(),
      max: yup.number(),
    })
    .test(
      "superior",
      `minimum salary must be smaller than maximum salary`,
      (f) => {
        if (!f.min || !f.max) return true;

        return !(f.min > f.max);
      }
    ),
  total_employee: yup.string(),
  apply_type: yup.string().nullable(),
});

function CreateJobStep1(
  props: ICreateJobStepProps & { oldValues: ICreateJobState["step1"] | null }
) {
  console.log(props.oldValues);

  const formik: FormikProps<ICreateJobState["step1"]> = useFormik<
    ICreateJobState["step1"]
  >({
    validationSchema: CreateJobStep1Schema,
    initialValues: props.oldValues || {
      job_title: "",
      company_name: "",
      industry: "",
      location: "",
      remote_type: "",
    },
    onSubmit: handleSubmit,
  });

  function handleSubmit() {
    props.handleSetJob(formik.values);
  }

  function handleSubmitStep() {
    if (Object.keys(formik.errors).length === 0) {
      formik.handleSubmit();
    } else {
      Object.keys(formik.errors).forEach(
        //@ts-ignore
        (key: keyof ICreateJobState["step1"]) => {
          toast.custom((t) => {
            return <Alert msg={formik.errors[key] as string} toastId={t} />;
          });
        }
      );
    }
  }

  return (
    <form onSubmit={handleSubmitStep}>
      <Form.Input
        title="Job title"
        placeholder="ex. UX UI Designer"
        required
        value={formik.values.job_title}
        handleChange={formik.handleChange("job_title")}
      />
      <Form.Input
        title="Company name"
        placeholder="ex. Google"
        required
        value={formik.values.company_name}
        handleChange={formik.handleChange("company_name")}
      />
      <Form.Input
        title="Industry"
        placeholder="ex. Information Technology"
        required
        value={formik.values.industry}
        handleChange={formik.handleChange("industry")}
      />

      <div className="flex flex-row justify-between">
        <Form.Input
          title="Location"
          placeholder="ex. Chennai"
          value={formik.values.location}
          handleChange={formik.handleChange("location")}
        />
        <Form.Input
          title="Remote type"
          placeholder="ex. In-office"
          value={formik.values.remote_type}
          handleChange={formik.handleChange("remote_type")}
        />
      </div>

      <div className="flex flex-row justify-end mt-[calc(72px)] ">
        <AppButton title="Next" handleSubmit={handleSubmitStep} />
      </div>
    </form>
  );
}

function CreateJobStep2(
  props: ICreateJobStepProps & { oldValues: ICreateJobState["step2"] | null }
) {
  const formik: FormikProps<ICreateJobState["step2"]> = useFormik<
    ICreateJobState["step2"]
  >({
    validationSchema: CreateJobStep2Schema,
    initialValues: props.oldValues || {
      experience: {
        min: 0,
        max: 0,
      },
      salary: {
        min: 0,
        max: 0,
      },
      total_employee: "",
      apply_type: null,
    },
    onSubmit: handleSubmit,
  });

  function handleSubmit() {
    props.handleSetJob(formik.values);
  }

  function handleSubmitStep() {
    if (Object.keys(formik.errors).length === 0) {
      formik.handleSubmit();
    } else {
      //@ts-ignore
      Object.keys(formik.errors).forEach((key: keyof ICreateJobState) => {
        toast.custom((t) => (
          //@ts-ignore
          <Alert msg={formik.errors[key] as string} toastId={t} />
        ));
      });
    }
  }

  return (
    <div>
      <Form.Input
        title="Experience"
        placeholder="Minimum"
        value={formik.values.experience.min}
        secondValue={formik.values.experience.max}
        handleChange={formik.handleChange("experience.min")}
        secondHandleChange={formik.handleChange("experience.max")}
        multiInput
      />

      <Form.Input
        title="Salary"
        placeholder="ex. UX UI Designer"
        value={formik.values.salary.min}
        secondValue={formik.values.salary.max}
        handleChange={formik.handleChange("salary.min")}
        secondHandleChange={formik.handleChange("salary.max")}
        multiInput
      />
      <Form.Input
        title="Total employee"
        placeholder="ex. 100"
        value={formik.values.total_employee}
        handleChange={formik.handleChange("total_employee")}
      />
      <Form.RadioGroup
        title="Apply type"
        options={[
          {
            key: "quick",
            value: "Quick apply",
          },
          {
            key: "external",
            value: "External apply",
          },
        ]}
        value={formik.values.apply_type}
        //@ts-ignore
        handleChange={(value: string) => {
          formik.setFieldValue("apply_type", value);
        }}
      />

      <div className="flex flex-row justify-end mt-[calc(72px)] ">
        <AppButton title="Save" handleSubmit={handleSubmitStep} />
      </div>
    </div>
  );
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
