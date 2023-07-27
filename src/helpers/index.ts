import { AxiosResponse } from "axios";
import { getAllJobs } from "../api";
import { ISetAllJobs, ISetIsLoading, setAllJobs, setIsLoading } from "../store";
import { Dispatch } from "react";
import { Job } from "../@types";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAllJobs: async (dispatch: Dispatch<ISetAllJobs | ISetIsLoading>) => {
    try {
      dispatch(setIsLoading());

      const data: AxiosResponse<Job[]> = await getAllJobs();

      dispatch(setAllJobs(data.data));
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setIsLoading());
    }
  },
};
