// src/pages/InterviewsPage.tsx

import {
  CalendarDays,
  Monitor,
  Phone,
  Users,
} from "lucide-react";
import { useMemo } from "react";
import StatCard from "../components/dashboard/StatCard";
import InterviewCard from "../components/interviews/InterviewCard";
import InterviewEmptyState from "../components/interviews/InterviewEmptyState";
import { useApplications } from "../hooks/useApplications";
import type { JobApplication } from "../types/application";

function hasInterviewDetails(application: JobApplication): boolean {
  return Boolean(
    application.interviewDate ||
      application.interviewTime ||
      application.interviewFormat ||
      application.meetingLink ||
      application.interviewNotes,
  );
}

function compareByInterviewDate(
  firstApplication: JobApplication,
  secondApplication: JobApplication,
): number {
  const firstDate = firstApplication.interviewDate;
  const secondDate = secondApplication.interviewDate;

  // Applications without a date sort after applications with a date.
  if (!firstDate && !secondDate) {
    return 0;
  }

  if (!firstDate) {
    return 1;
  }

  if (!secondDate) {
    return -1;
  }

  return firstDate.localeCompare(secondDate);
}

function InterviewsPage() {
  const { applications } = useApplications();

  const interviewApplications = useMemo(
    () =>
      applications
        .filter(
          (application) =>
            application.status === "interview" &&
            hasInterviewDetails(application),
        )
        .sort(compareByInterviewDate),
    [applications],
  );

  const onlineInterviews = interviewApplications.filter(
    (application) =>
      application.interviewFormat === "Online",
  ).length;

  const phoneInterviews = interviewApplications.filter(
    (application) =>
      application.interviewFormat === "Phone",
  ).length;

  const inPersonInterviews = interviewApplications.filter(
    (application) =>
      application.interviewFormat === "In-person",
  ).length;

  return (
    <div className="mx-auto max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Interviews
        </h1>

        <p className="mt-1 text-sm text-slate-600">
          Review your interview schedule and preparation notes.
        </p>
      </div>

      <section
        aria-label="Interview statistics"
        className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <StatCard
          title="Total interviews"
          value={interviewApplications.length}
          description="Applications at interview stage"
          icon={CalendarDays}
          iconClassName="bg-slate-100 text-slate-700"
        />

        <StatCard
          title="Online"
          value={onlineInterviews}
          description="Video or web interviews"
          icon={Monitor}
          iconClassName="bg-blue-100 text-blue-700"
        />

        <StatCard
          title="Phone"
          value={phoneInterviews}
          description="Scheduled phone calls"
          icon={Phone}
          iconClassName="bg-amber-100 text-amber-700"
        />

        <StatCard
          title="In-person"
          value={inPersonInterviews}
          description="Interviews at a physical location"
          icon={Users}
          iconClassName="bg-purple-100 text-purple-700"
        />
      </section>

      <div className="mt-6">
        {interviewApplications.length === 0 ? (
          <InterviewEmptyState />
        ) : (
          <section
            aria-label="Scheduled interviews"
            className="grid gap-5 xl:grid-cols-2"
          >
            {interviewApplications.map((application) => (
              <InterviewCard
                key={application.id}
                application={application}
              />
            ))}
          </section>
        )}
      </div>
    </div>
  );
}

export default InterviewsPage;