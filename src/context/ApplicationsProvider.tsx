import { useEffect, useState, type ReactNode } from "react";
import { mockApplications } from "../data/mockApplications";
import type { JobApplication } from "../types/application";
import { ApplicationsContext } from "./applications-context";

interface ApplicationsProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = "fronthire-applications";

function loadApplications(): JobApplication[] {
  try {
    const storedApplications = localStorage.getItem(STORAGE_KEY);

    if (!storedApplications) {
      return mockApplications;
    }

    const parsedApplications: unknown = JSON.parse(storedApplications);

    if (!Array.isArray(parsedApplications)) {
      return mockApplications;
    }

    return parsedApplications as JobApplication[];
  } catch (error) {
    console.error("Unable to load stored applications:", error);
    return mockApplications;
  }
}

function ApplicationsProvider({
  children,
}: ApplicationsProviderProps) {
  const [applications, setApplications] =
    useState<JobApplication[]>(loadApplications);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(applications),
      );
    } catch (error) {
      console.error("Unable to save applications:", error);
    }
  }, [applications]);

  function addApplication(application: JobApplication) {
    setApplications((currentApplications) => [
      application,
      ...currentApplications,
    ]);
  }

  function updateApplication(updatedApplication: JobApplication) {
    setApplications((currentApplications) =>
      currentApplications.map((application) =>
        application.id === updatedApplication.id
          ? updatedApplication
          : application,
      ),
    );
  }

  function deleteApplication(applicationId: string) {
    setApplications((currentApplications) =>
      currentApplications.filter(
        (application) => application.id !== applicationId,
      ),
    );
  }

  return (
    <ApplicationsContext.Provider
      value={{
        applications,
        addApplication,
        updateApplication,
        deleteApplication,
      }}
    >
      {children}
    </ApplicationsContext.Provider>
  );
}

export default ApplicationsProvider;
