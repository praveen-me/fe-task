import { FormikProps, useFormik } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";

import Form from "../Form";
import Alert from "../Alert";
import AppButton from "../AppButton";

import { ICreateJobStepProps } from ".";
import { ICreateJobState } from "../../@types";

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

function CreateJobStep2(
  props: ICreateJobStepProps & { oldValues: ICreateJobState["step2"] | null }
) {
  const formik: FormikProps<ICreateJobState["step2"]> = useFormik<
    ICreateJobState["step2"]
  >({
    validationSchema: CreateJobStep2Schema,
    //@ts-ignore
    initialValues: props.oldValues || {
      experience: {
        min: "",
        max: "",
      },
      salary: {
        min: "",
        max: "",
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
        secondPlaceholder="Minimum"
      />

      <Form.Input
        title="Salary"
        placeholder="ex. UX UI Designer"
        value={formik.values.salary.min}
        secondValue={formik.values.salary.max}
        handleChange={formik.handleChange("salary.min")}
        secondHandleChange={formik.handleChange("salary.max")}
        multiInput
        secondPlaceholder="Minimum"
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

export default CreateJobStep2;
