import React, { createContext, useReducer, useContext } from "react";
import { Job } from "../@types";

// Define your state type
interface AppState {
  jobs: Job[];
}

// Define your action types
type AppAction =
  | { type: typeof types.SET_ALL_JOBS; payload: { jobs: Job[] } }
  | { type: "DECREMENT" };

// Define your initial state
const initialState: AppState = {
  jobs: [],
};

// Actions

const types = {
  SET_ALL_JOBS: "SET_ALL_JOBS",
  REMOVE_JOB: "REMOVE_JOB",
  EDIT_JOB: "EDIT_JOB",
};

export function setAllJobs(jobs: AppState["jobs"]) {
  return {
    type: types.SET_ALL_JOBS,
    payload: {
      jobs,
    },
  };
}

export function removeJob(jobId: string) {
  return {
    type: types.SET_ALL_JOBS,
    payload: {
      jobId,
    },
  };
}

export function editJob(job: Job) {
  return {
    type: types.SET_ALL_JOBS,
    payload: {
      job,
    },
  };
}

// Define your reducer function
const reducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    default:
      return state;
  }
};

// Create the context for the store
const StoreContext = createContext<
  { state: AppState; dispatch: React.Dispatch<AppAction> } | undefined
>(undefined);

// Create the provider to wrap your app with
const StoreProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

// Create a custom hook to easily access the store values and dispatch function
const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};

export { StoreProvider, useStore };
