export interface ICreateJobState {
  step1: {
    job_title: string;
    company_name: string;
    industry: string;
    location: string;
    remote_type: string;
  };
  step2: {
    experience: {
      min: number;
      max: number;
    };
    salary: {
      min: number;
      max: number;
    };
    total_employee: string;
    apply_type: string | null;
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
