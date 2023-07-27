import React, { useState } from "react";
import { FormikProps, useFormik } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";

import Form from "./Form";
import Alert from "./Alert";

interface ICreateJobState {
  step1: {
    jobTitle: string;
    companyName: string;
    industry: string;
    location: string;
    remoteType: string;
  };
  step2: {
    experience: {
      min: string;
      max: string;
    };
    salary: {
      min: string;
      max: string;
    };
    totalEmployee: string;
    applyType: null | "quick" | "external";
  };
}

const CreateJobStep1Schema = yup.object().shape({
  jobTitle: yup.string().required("Job Title is required"),
  companyName: yup.string().required("Company Name is required"),
  industry: yup.string().required("Industry is required"),
  location: yup.string(),
  remoteType: yup.string(),
});

const CreateJobStep2Schema = yup.object().shape({
  experience: yup
    .object({
      min: yup.number(),
      max: yup.number(),
    })
    .test(
      "superior",
      "minimum experience must be smaller than maximum experience",
      (min, max) => min > max
    ),
  salary: yup
    .object({
      min: yup.number(),
      max: yup.number(),
    })
    .test(
      "superior",
      `minimum salary must be smaller than maximum salary`,
      (min, max) => min > max
    ),
  totalEmployee: yup.string(),
  applyType: yup.string(),
});

function CreateJobStep1() {
  const formik: FormikProps<ICreateJobState["step1"]> = useFormik<
    ICreateJobState["step1"]
  >({
    validationSchema: CreateJobStep1Schema,
    initialValues: {
      jobTitle: "",
      companyName: "",
      industry: "",
      location: "",
      remoteType: "",
    },
    onSubmit: handleSubmit,
  });

  function handleSubmit() {
    console.log(formik.errors);
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
    <div>
      <Form.Input
        title="Job title"
        placeholder="ex. UX UI Designer"
        required
        value={formik.values.jobTitle}
        handleChange={formik.handleChange("jobTitle")}
      />
      <Form.Input
        title="Company name"
        placeholder="ex. Google"
        required
        value={formik.values.companyName}
        handleChange={formik.handleChange("companyName")}
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
          value={formik.values.remoteType}
          handleChange={formik.handleChange("remoteType")}
        />
      </div>

      <div className="flex flex-row justify-end">
        <button
          type="button"
          className="text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2  focus:outline-none dark:focus:ring-blue-800 button"
          onClick={handleSubmitStep}
        >
          Next
        </button>
      </div>
    </div>
  );
}

function CreateJobStep2() {
  const formik: FormikProps<ICreateJobState["step2"]> = useFormik<
    ICreateJobState["step2"]
  >({
    validationSchema: CreateJobStep2Schema,
    initialValues: {
      experience: {
        min: "",
        max: "",
      },
      salary: {
        min: "",
        max: "",
      },
      totalEmployee: "",
      applyType: null,
    },
    onSubmit: handleSubmit,
  });

  function handleSubmit() {
    console.log(formik.errors);
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

  console.log(formik.errors);

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
        value={formik.values.totalEmployee}
        handleChange={formik.handleChange("totalEmployee")}
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
      />

      <div className="flex flex-row justify-end">
        <button
          type="button"
          className="text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2  focus:outline-none dark:focus:ring-blue-800 button"
          onClick={handleSubmitStep}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default function CreateJob() {
  const [currentStep, setCurrentStep] = useState(2);

  return (
    <div className="job_form_container p-8">
      <div className="flex flex-row justify-between mb-6">
        <h2 className="text-xl">Create a job</h2>
        <h3 className="text-xl">Step {currentStep}</h3>
      </div>

      {currentStep === 1 && <CreateJobStep1 />}

      <CreateJobStep2 />
    </div>
  );
}
