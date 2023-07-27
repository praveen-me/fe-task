import React from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Job } from "../@types";
import AppButton from "./AppButton";

interface IJobCardProps {
  job: Job;
  handleOperationOnJob: (jobId: string, operation: "edit" | "delete") => void;
}

export default function JobCard(props: IJobCardProps) {
  const { job } = props;

  return (
    <div className="display-inline rounded-lg	 overflow-hidden mb-12">
      <div className="flex flex-row display-inline py-4 px-6 bg-white">
        <div>
          <img src={require("../images/logo.png")} alt="" />
        </div>
        <div className="ml-2">
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl font-normal">{job.job_title}</h2>
            <div>
              <button
                className="px-2 hover:opacity-60"
                onClick={() =>
                  props.handleOperationOnJob(job?.id as string, "edit")
                }
              >
                <PencilIcon fill="#000" height="20px" width="20px" />
              </button>

              <button
                className="py-2 hover:opacity-60"
                onClick={() =>
                  props.handleOperationOnJob(job.id as string, "delete")
                }
              >
                <TrashIcon fill="#000" height="20px" width="20px" />
              </button>
            </div>
          </div>
          <h3 className="text-base font-normal">
            {job.company_name} - {job.industry}
          </h3>
          <h4 className="text-base font-normal job_card_location">
            {job.location}
          </h4>

          <div className="my-6">
            <p className="mb-2 font-normal">Part-Time (9:00am - 5:00pm IST)</p>
            <p className="mb-2 font-normal">
              Experience ({job.experience_min} - {job.experience_max} years)
            </p>
            <p className="mb-2 font-normal">
              INR (₹) ${job.salary_min} - ${job.salary_max} / Month{" "}
            </p>
            <p className="mb-2 font-normal">{job.total_employee} employee</p>
          </div>

          <div>
            <AppButton
              title={
                job.apply_type === "quick" ? "Apply Now" : "External Apply"
              }
              handleSubmit={() => {}}
              outline={!(job.apply_type === "quick")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
