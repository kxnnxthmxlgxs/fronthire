import { createContext } from "react";
import type { JobApplication } from "../types/application";

export interface ApplicationsContextValue {
  applications: JobApplication[];
  addApplication: (application: JobApplication) => void;
}

export const ApplicationsContext =
  createContext<ApplicationsContextValue | undefined>(undefined);