import React, { useState } from "react";
import { FormikProps, useFormik } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";

import Form from "./Form";
import Alert from "./Alert";

interface ICreateJobState {
  jobTitle: string;
  companyName: string;
  industry: string;
  location: string;
  remoteType: string;
  // experience: {
  //   min: number;
  //   max: Number;
  // };
  // salary: {
  //   min: number;
  //   max: number;
  // };
  // totalEmployee: number;
  // applyType: null | "quick" | "external";
}

const CreateJobSchema = yup.object().shape({
  jobTitle: yup.string().required("Job Title is required"),
  companyName: yup.string().required("Company Name is required"),
  industry: yup.string().required("Industry is required"),
  location: yup.string(),
  remoteType: yup.string(),
  // experience: yup.object({
  //   min: yup.string().required(),
  //   max: yup.string().required(),
  // }),
  // salary: yup.object({
  //   min: yup.number().required(),
  //   max: yup.number().required(),
  // }),
  // totalEmployee: yup.string().required(),

  // applyType: null | "quick" | "external";
});

export default function CreateJob() {
  const [currentStep, setCurrentStep] = useState(1);

  const formik: FormikProps<ICreateJobState> = useFormik<ICreateJobState>({
    validationSchema: CreateJobSchema,
    initialValues: {
      jobTitle: "",
      companyName: "",
      industry: "",
      location: "",
      remoteType: "",
      // experience: {
      //   min: 0,
      //   max: 0,
      // },
      // salary: {
      //   min: 0,
      //   max: 0,
      // },
      // totalEmployee: 0,
      // applyType: null,
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
          <Alert msg={formik.errors[key] as string} toastId={t} />
        ));
      });
    }
  }

  return (
    <div className="job_form_container p-8">
      <div className="flex flex-row justify-between mb-6">
        <h2 className="text-xl">Create a job</h2>
        <h3 className="text-xl">Step {currentStep}</h3>
      </div>

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
