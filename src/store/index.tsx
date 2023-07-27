import React, { createContext, useReducer, useContext } from "react";
import { Job } from "../@types";

// Action Types
const SET_ALL_JOBS = "SET_ALL_JOBS";
const SET_IS_LOADING = "SET_IS_LOADING";

// Define your state type
interface AppState {
  jobs: Job[];
  isLoading: boolean;
}

export interface ISetAllJobs {
  type: typeof SET_ALL_JOBS;
  payload: { jobs: Job[] };
}

export interface ISetIsLoading {
  type: typeof SET_IS_LOADING;
}

// Define your action types
type AppAction = ISetAllJobs | ISetIsLoading;

// Define your initial state
const initialState: AppState = {
  jobs: [],
  isLoading: false,
};

// Actions
export function setAllJobs(jobs: AppState["jobs"]): ISetAllJobs {
  return {
    type: SET_ALL_JOBS,
    payload: {
      jobs,
    },
  };
}

export function setIsLoading(): ISetIsLoading {
  return {
    type: SET_IS_LOADING,
  };
}

// Define your reducer function
const reducer = (
  state: AppState = initialState,
  action: AppAction
): AppState => {
  switch (action.type) {
    case SET_ALL_JOBS: {
      return {
        ...state,
        jobs: action.payload.jobs,
      };
    }

    case SET_IS_LOADING: {
      return {
        ...state,
        isLoading: state.isLoading,
      };
    }

    default:
      return state;
  }
};

const StoreContext = createContext<
  { state: AppState; dispatch: React.Dispatch<AppAction> } | undefined
>(undefined);

const StoreProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};

export { StoreProvider, useStore };
