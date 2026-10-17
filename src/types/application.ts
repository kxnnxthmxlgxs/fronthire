export type ApplicationStatus =
  | "saved"
  | "applied"
  | "assessment"
  | "interview"
  | "offer"
  | "rejected";

export interface JobApplication {
  id: string;
  company: string;
  position: string;
  location: string;
  status: ApplicationStatus;
  dateApplied: string;
  jobType: "Full-time" | "Part-time" | "Contract" | "Internship";
}