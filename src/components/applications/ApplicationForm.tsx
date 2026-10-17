import { useState, type FormEvent } from "react";
import type {
  ApplicationStatus,
  JobApplication,
  JobType,
} from "../../types/application";

interface ApplicationFormProps {
  onSubmit: (application: JobApplication) => void;
  onCancel: () => void;
}

interface FormData {
  company: string;
  position: string;
  location: string;
  status: ApplicationStatus;
  dateApplied: string;
  jobType: JobType;
}

interface FormErrors {
  company?: string;
  position?: string;
  location?: string;
  dateApplied?: string;
}

const initialFormData: FormData = {
  company: "",
  position: "",
  location: "",
  status: "saved",
  dateApplied: new Date().toISOString().slice(0, 10),
  jobType: "Full-time",
};

const inputClassName =
  "mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

function ApplicationForm({
  onSubmit,
  onCancel,
}: ApplicationFormProps) {
  const [formData, setFormData] =
    useState<FormData>(initialFormData);

  const [errors, setErrors] = useState<FormErrors>({});

  function validateForm() {
    const nextErrors: FormErrors = {};

    if (!formData.company.trim()) {
      nextErrors.company = "Company name is required.";
    }

    if (!formData.position.trim()) {
      nextErrors.position = "Position is required.";
    }

    if (!formData.location.trim()) {
      nextErrors.location = "Location is required.";
    }

    if (!formData.dateApplied) {
      nextErrors.dateApplied = "Application date is required.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newApplication: JobApplication = {
      id: crypto.randomUUID(),
      company: formData.company.trim(),
      position: formData.position.trim(),
      location: formData.location.trim(),
      status: formData.status,
      dateApplied: formData.dateApplied,
      jobType: formData.jobType,
    };

    onSubmit(newApplication);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="company"
            className="text-sm font-medium text-slate-700"
          >
            Company <span className="text-red-500">*</span>
          </label>

          <input
            id="company"
            type="text"
            value={formData.company}
            onChange={(event) =>
              setFormData((current) => ({
                ...current,
                company: event.target.value,
              }))
            }
            placeholder="Example: Microsoft"
            aria-invalid={Boolean(errors.company)}
            aria-describedby={
              errors.company ? "company-error" : undefined
            }
            className={inputClassName}
          />

          {errors.company && (
            <p
              id="company-error"
              className="mt-1.5 text-sm text-red-600"
            >
              {errors.company}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="position"
            className="text-sm font-medium text-slate-700"
          >
            Position <span className="text-red-500">*</span>
          </label>

          <input
            id="position"
            type="text"
            value={formData.position}
            onChange={(event) =>
              setFormData((current) => ({
                ...current,
                position: event.target.value,
              }))
            }
            placeholder="Example: Junior Frontend Developer"
            aria-invalid={Boolean(errors.position)}
            aria-describedby={
              errors.position ? "position-error" : undefined
            }
            className={inputClassName}
          />

          {errors.position && (
            <p
              id="position-error"
              className="mt-1.5 text-sm text-red-600"
            >
              {errors.position}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="location"
            className="text-sm font-medium text-slate-700"
          >
            Location <span className="text-red-500">*</span>
          </label>

          <input
            id="location"
            type="text"
            value={formData.location}
            onChange={(event) =>
              setFormData((current) => ({
                ...current,
                location: event.target.value,
              }))
            }
            placeholder="Example: Remote"
            aria-invalid={Boolean(errors.location)}
            aria-describedby={
              errors.location ? "location-error" : undefined
            }
            className={inputClassName}
          />

          {errors.location && (
            <p
              id="location-error"
              className="mt-1.5 text-sm text-red-600"
            >
              {errors.location}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="date-applied"
            className="text-sm font-medium text-slate-700"
          >
            Date applied <span className="text-red-500">*</span>
          </label>

          <input
            id="date-applied"
            type="date"
            value={formData.dateApplied}
            onChange={(event) =>
              setFormData((current) => ({
                ...current,
                dateApplied: event.target.value,
              }))
            }
            aria-invalid={Boolean(errors.dateApplied)}
            aria-describedby={
              errors.dateApplied
                ? "date-applied-error"
                : undefined
            }
            className={inputClassName}
          />

          {errors.dateApplied && (
            <p
              id="date-applied-error"
              className="mt-1.5 text-sm text-red-600"
            >
              {errors.dateApplied}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="status"
            className="text-sm font-medium text-slate-700"
          >
            Status
          </label>

          <select
            id="status"
            value={formData.status}
            onChange={(event) =>
              setFormData((current) => ({
                ...current,
                status: event.target.value as ApplicationStatus,
              }))
            }
            className={inputClassName}
          >
            <option value="saved">Saved</option>
            <option value="applied">Applied</option>
            <option value="assessment">Assessment</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="job-type"
            className="text-sm font-medium text-slate-700"
          >
            Job type
          </label>

          <select
            id="job-type"
            value={formData.jobType}
            onChange={(event) =>
              setFormData((current) => ({
                ...current,
                jobType: event.target.value as JobType,
              }))
            }
            className={inputClassName}
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
      </div>

      <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save application
        </button>
      </div>
    </form>
  );
}

export default ApplicationForm;