export type ApplicationStatus =
  | "saved"
  | "applied"
  | "assessment"
  | "interview"
  | "offer"
  | "rejected";

export type JobType =
  | "Full-time"
  | "Part-time"
  | "Contract"
  | "Internship";

export interface JobApplication {
  id: string;
  company: string;
  position: string;
  location: string;
  status: ApplicationStatus;
  dateApplied: string;
  jobType: JobType;
}