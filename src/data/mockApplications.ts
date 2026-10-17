import type { JobApplication } from "../types/application";

export const mockApplications: JobApplication[] = [
  {
    id: "1",
    company: "Acme Digital",
    position: "Junior Frontend Developer",
    location: "Cape Town, Western Cape",
    status: "applied",
    dateApplied: "2026-10-15",
    jobType: "Full-time",
  },
  {
    id: "2",
    company: "Nova Systems",
    position: "Graduate Software Developer",
    location: "Johannesburg, Gauteng",
    status: "assessment",
    dateApplied: "2026-10-12",
    jobType: "Full-time",
  },
  {
    id: "3",
    company: "Pixel Works",
    position: "React Developer Intern",
    location: "Remote",
    status: "interview",
    dateApplied: "2026-10-10",
    jobType: "Internship",
  },
  {
    id: "4",
    company: "Bright Labs",
    position: "Frontend Developer",
    location: "Gqeberha, Eastern Cape",
    status: "offer",
    dateApplied: "2026-10-08",
    jobType: "Contract",
  },
  {
    id: "5",
    company: "Cloudline",
    position: "Junior Web Developer",
    location: "Remote",
    status: "rejected",
    dateApplied: "2026-10-05",
    jobType: "Full-time",
  },
];