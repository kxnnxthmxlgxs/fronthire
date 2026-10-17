import { useState, type ReactNode } from "react";
import { ApplicationsContext } from "./applications-context";
import { mockApplications } from "../data/mockApplications";
import type { JobApplication } from "../types/application";

interface ApplicationsProviderProps {
  children: ReactNode;
}

function ApplicationsProvider({
  children,
}: ApplicationsProviderProps) {
  const [applications, setApplications] =
    useState<JobApplication[]>(mockApplications);

  function addApplication(application: JobApplication) {
    setApplications((currentApplications) => [
      application,
      ...currentApplications,
    ]);
  }

  return (
    <ApplicationsContext.Provider
      value={{
        applications,
        addApplication,
      }}
    >
      {children}
    </ApplicationsContext.Provider>
  );
}

export default ApplicationsProvider;