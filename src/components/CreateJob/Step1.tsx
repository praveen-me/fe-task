import { FormikProps, useFormik } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";

import Form from "../Form";
import Alert from "../Alert";
import AppButton from "../AppButton";

import { ICreateJobState } from "../../@types";

import { ICreateJobStepProps } from ".";

const CreateJobStep1Schema = yup.object().shape({
  job_title: yup.string().required("Job Title is required"),
  company_name: yup.string().required("Company Name is required"),
  industry: yup.string().required("Industry is required"),
  location: yup.string(),
  remote_type: yup.string(),
});

function CreateJobStep1(
  props: ICreateJobStepProps & { oldValues: ICreateJobState["step1"] | null }
) {
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

export default CreateJobStep1;
