import axios from "axios";
import { Job } from "../@types";

const instance = axios.create({
  baseURL: "https://64c24682eb7fd5d6ebcf8b3b.mockapi.io/",
});

export const getAllJobs = () => instance.get("/jobs");

export const deleteJob = (jobId: string) => instance.get("/jobs/" + jobId);

export const createJob = (job: Job) => instance.post("/jobs", job);

export const updateJob = (jobId: string, job: Job) =>
  instance.put("/jobs/" + jobId, job);
