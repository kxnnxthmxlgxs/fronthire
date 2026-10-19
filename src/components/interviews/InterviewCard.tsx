// src/components/interviews/InterviewCard.tsx

import { Calendar, Clock, MapPin, ExternalLink, Video, Phone, Users, FileText } from 'lucide-react';
import type { JobApplication, InterviewFormat } from '../../types/application';

interface InterviewCardProps {
  application: JobApplication;
}

function formatInterviewDate(dateString?: string): string {
  if (!dateString) {
    return 'Date to be confirmed';
  }

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return 'Date to be confirmed';
  }

  return date.toLocaleDateString('en-ZA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function getFormatIcon(format?: InterviewFormat) {
  switch (format) {
    case 'Online':
      return <Video aria-hidden="true" className="h-4 w-4" />;
    case 'Phone':
      return <Phone aria-hidden="true" className="h-4 w-4" />;
    case 'In-person':
      return <Users aria-hidden="true" className="h-4 w-4" />;
    default:
      return <MapPin aria-hidden="true" className="h-4 w-4" />;
  }
}

export default function InterviewCard({ application }: InterviewCardProps) {
  const hasInterviewDetails =
    Boolean(application.interviewDate) ||
    Boolean(application.interviewTime) ||
    Boolean(application.interviewFormat) ||
    Boolean(application.meetingLink) ||
    Boolean(application.interviewNotes);

  if (!hasInterviewDetails) {
    return null;
  }

  return (
    <article
      aria-labelledby={`interview-card-${application.id}-heading`}
      className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <header className="mb-4">
        <h3
          id={`interview-card-${application.id}-heading`}
          className="text-lg font-semibold text-slate-900"
        >
          {application.position}
        </h3>
        <p className="text-sm text-slate-600">{application.company}</p>
        {application.location && (
          <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
            <MapPin aria-hidden="true" className="h-4 w-4" />
            <span>{application.location}</span>
          </p>
        )}
      </header>

      <dl className="space-y-3">
        <div className="flex items-start gap-2">
          <dt className="sr-only">Interview date</dt>
          <Calendar aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
          <dd className="text-sm text-slate-700">
            {formatInterviewDate(application.interviewDate)}
          </dd>
        </div>

        <div className="flex items-start gap-2">
          <dt className="sr-only">Interview time</dt>
          <Clock aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
          <dd className="text-sm text-slate-700">
            {application.interviewTime ? application.interviewTime : 'Time to be confirmed'}
          </dd>
        </div>

        <div className="flex items-start gap-2">
          <dt className="sr-only">Interview format</dt>
          <span className="mt-0.5 shrink-0 text-slate-500">
            {getFormatIcon(application.interviewFormat)}
          </span>
          <dd className="text-sm text-slate-700">
            {application.interviewFormat ?? 'Format not specified'}
          </dd>
        </div>
      </dl>

      {application.interviewNotes && (
        <div className="mt-4 rounded-md bg-slate-50 p-3">
          <div className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <FileText aria-hidden="true" className="h-3.5 w-3.5" />
            <span>Notes</span>
          </div>
          <p className="whitespace-pre-line text-sm text-slate-700">
            {application.interviewNotes}
          </p>
        </div>
      )}

      <div className="mt-4">
        {application.meetingLink ? (
          <a
            href={application.meetingLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Join meeting
            <ExternalLink aria-hidden="true" className="h-4 w-4" />
          </a>
        ) : application.interviewFormat === 'Phone' ? (
          <p className="text-sm font-medium text-slate-700">Phone interview</p>
        ) : null}
      </div>
    </article>
  );
}