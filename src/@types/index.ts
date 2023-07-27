export interface ICreateJobState {
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

export type Job = {
  id?: string;
  job_title: string;
  company_name: string;
  industry: string;
  location: string;
  remote_type: string;
  experience_min: number;
  experience_max: number;
  salary_min: number;
  salary_max: number;
  total_employee: string;
  apply_type: string;
};
