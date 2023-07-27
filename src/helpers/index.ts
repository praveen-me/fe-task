import { AxiosResponse } from "axios";
import { getAllJobs } from "../api";
import { ISetAllJobs, setAllJobs } from "../store";
import { Dispatch } from "react";
import { Job } from "../@types";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAllJobs: async (dispatch: Dispatch<ISetAllJobs>) => {
    const data: AxiosResponse<Job[]> = await getAllJobs();

    dispatch(setAllJobs(data.data));
  },
};
