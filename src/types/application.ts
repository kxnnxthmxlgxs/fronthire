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

export type InterviewFormat =
  | "Online"
  | "Phone"
  | "In-person";

export interface JobApplication {
  id: string;
  company: string;
  position: string;
  location: string;
  status: ApplicationStatus;
  dateApplied: string;
  jobType: JobType;
  interviewDate?: string;
  interviewTime?: string;
  interviewFormat?: InterviewFormat;
  meetingLink?: string;
  interviewNotes?: string;
}