import { createContext } from "react";
import type { JobApplication } from "../types/application";

export interface ApplicationsContextValue {
  applications: JobApplication[];
  addApplication: (application: JobApplication) => void;
  updateApplication: (application: JobApplication) => void;
  deleteApplication: (applicationId: string) => void;
}

export const ApplicationsContext =
  createContext<ApplicationsContextValue | undefined>(undefined);