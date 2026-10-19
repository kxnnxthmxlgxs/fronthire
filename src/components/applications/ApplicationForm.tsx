import { useState, type FormEvent } from "react";
import type {
  ApplicationStatus,
  InterviewFormat,
  JobApplication,
  JobType,
} from "../../types/application";

interface ApplicationFormProps {
  initialApplication?: JobApplication;
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
  interviewDate: string;
  interviewTime: string;
  interviewFormat: InterviewFormat;
  meetingLink: string;
  interviewNotes: string;
}

interface FormErrors {
  company?: string;
  position?: string;
  location?: string;
  dateApplied?: string;
}

function getInitialFormData(
  initialApplication?: JobApplication,
): FormData {
  if (initialApplication) {
    return {
      company: initialApplication.company,
      position: initialApplication.position,
      location: initialApplication.location,
      status: initialApplication.status,
      dateApplied: initialApplication.dateApplied,
      jobType: initialApplication.jobType,
      interviewDate: initialApplication.interviewDate ?? "",
      interviewTime: initialApplication.interviewTime ?? "",
      interviewFormat:
        initialApplication.interviewFormat ?? "Online",
      meetingLink: initialApplication.meetingLink ?? "",
      interviewNotes: initialApplication.interviewNotes ?? "",
    };
  }

  return {
    company: "",
    position: "",
    location: "",
    status: "saved",
    dateApplied: new Date().toISOString().slice(0, 10),
    jobType: "Full-time",
    interviewDate: "",
    interviewTime: "",
    interviewFormat: "Online",
    meetingLink: "",
    interviewNotes: "",
  };
}

const inputClassName =
  "mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

function ApplicationForm({
  initialApplication,
  onSubmit,
  onCancel,
}: ApplicationFormProps) {
  const [formData, setFormData] = useState<FormData>(() =>
    getInitialFormData(initialApplication),
  );

  const [errors, setErrors] = useState<FormErrors>({});

  const isEditing = Boolean(initialApplication);

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

    const application: JobApplication = {
  id: initialApplication?.id ?? crypto.randomUUID(),
  company: formData.company.trim(),
  position: formData.position.trim(),
  location: formData.location.trim(),
  status: formData.status,
  dateApplied: formData.dateApplied,
  jobType: formData.jobType,
  interviewDate:
    formData.status === "interview" && formData.interviewDate
      ? formData.interviewDate
      : undefined,
  interviewTime:
    formData.status === "interview" && formData.interviewTime
      ? formData.interviewTime
      : undefined,
  interviewFormat:
    formData.status === "interview"
      ? formData.interviewFormat
      : undefined,
  meetingLink:
    formData.status === "interview" &&
    formData.meetingLink.trim()
      ? formData.meetingLink.trim()
      : undefined,
  interviewNotes:
    formData.status === "interview" &&
    formData.interviewNotes.trim()
      ? formData.interviewNotes.trim()
      : undefined,
};

    onSubmit(application);
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

      *   <input
            id="company"            type="text"
            value={formData.company}
            onChange={(event) => {
              setFormData((current) => ({
                ...current,
                company: event.target.value,
              }));

              if (errors.company) {
                setErrors((current) => ({
                  ...current,
                  company: undefined,
                }));
              }
            }}
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
            onChange={(event) => {
              setFormData((current) => ({
                ...current,
                position: event.target.value,
              }));

              if (errors.position) {
                setErrors((current) => ({
                  ...current,
                  position: undefined,
                }));
              }
            }}
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
            onChange={(event) => {
              setFormData((current) => ({
                ...current,
                location: event.target.value,
              }));

              if (errors.location) {
                setErrors((current) => ({
                  ...current,
                  location: undefined,
                }));
              }
            }}
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
            onChange={(event) => {
              setFormData((current) => ({
                ...current,
                dateApplied: event.target.value,
              }));

              if (errors.dateApplied) {
                setErrors((current) => ({
                  ...current,
                  dateApplied: undefined,
                }));
              }
            }}
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


      {formData.status === "interview" && (
  <fieldset className="mt-6 rounded-xl border border-blue-200 bg-blue-50/50 p-5">
    <legend className="px-2 text-sm font-semibold text-blue-900">
      Interview details
    </legend>

    <p className="mb-5 text-sm text-blue-800">
      Add the schedule and preparation information for this interview.
    </p>

    <div className="grid gap-5 sm:grid-cols-2">
      <div>
        <label
          htmlFor="interview-date"
          className="text-sm font-medium text-slate-700"
        >
          Interview date
        </label>

        <input
          id="interview-date"
          type="date"
          value={formData.interviewDate}
          onChange={(event) =>
            setFormData((current) => ({
              ...current,
              interviewDate: event.target.value,
            }))
          }
          className={inputClassName}
        />
      </div>

      <div>
        <label
          htmlFor="interview-time"
          className="text-sm font-medium text-slate-700"
        >
          Interview time
        </label>

        <input
          id="interview-time"
          type="time"
          value={formData.interviewTime}
          onChange={(event) =>
            setFormData((current) => ({
              ...current,
              interviewTime: event.target.value,
            }))
          }
          className={inputClassName}
        />
      </div>

      <div>
        <label
          htmlFor="interview-format"
          className="text-sm font-medium text-slate-700"
        >
          Interview format
        </label>

        <select
          id="interview-format"
          value={formData.interviewFormat}
          onChange={(event) =>
            setFormData((current) => ({
              ...current,
              interviewFormat:
                event.target.value as InterviewFormat,
            }))
          }
          className={inputClassName}
        >
          <option value="Online">Online</option>
          <option value="Phone">Phone</option>
          <option value="In-person">In-person</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="meeting-link"
          className="text-sm font-medium text-slate-700"
        >
          Meeting link
        </label>

        <input
          id="meeting-link"
          type="url"
          value={formData.meetingLink}
          onChange={(event) =>
            setFormData((current) => ({
              ...current,
              meetingLink: event.target.value,
            }))
          }
          placeholder="https://teams.microsoft.com/..."
          className={inputClassName}
        />
      </div>

      <div className="sm:col-span-2">
        <label
          htmlFor="interview-notes"
          className="text-sm font-medium text-slate-700"
        >
          Preparation notes
        </label>

        <textarea
          id="interview-notes"
          rows={4}
          value={formData.interviewNotes}
          onChange={(event) =>
            setFormData((current) => ({
              ...current,
              interviewNotes: event.target.value,
            }))
          }
          placeholder="Topics to review, people attending, questions to ask..."
          className={inputClassName}
        />
      </div>
    </div>
  </fieldset>
)}


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
          {isEditing ? "Save changes" : "Save application"}
        </button>
      </div>
    </form>
  );
}

export default ApplicationForm;