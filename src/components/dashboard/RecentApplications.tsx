import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { JobApplication } from "../../types/application";
import StatusBadge from "./StatusBadge";

interface RecentApplicationsProps {
  applications: JobApplication[];
}

const dateFormatter = new Intl.DateTimeFormat("en-ZA", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

function RecentApplications({
  applications,
}: RecentApplicationsProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
        <div>
          <h2 className="font-semibold text-slate-900">
            Recent applications
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your latest job application activity
          </p>
        </div>

        <Link
          to="/applications"
          className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          View all
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th scope="col" className="px-5 py-3 font-medium">
                Company
              </th>

              <th scope="col" className="px-5 py-3 font-medium">
                Position
              </th>

              <th scope="col" className="px-5 py-3 font-medium">
                Status
              </th>

              <th scope="col" className="px-5 py-3 font-medium">
                Type
              </th>

              <th scope="col" className="px-5 py-3 font-medium">
                Date applied
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {applications.map((application) => (
              <tr
                key={application.id}
                className="transition-colors hover:bg-slate-50"
              >
                <td className="px-5 py-4">
                  <div className="font-medium text-slate-900">
                    {application.company}
                  </div>

                  <div className="mt-1 text-sm text-slate-500">
                    {application.location}
                  </div>
                </td>

                <td className="px-5 py-4 text-sm text-slate-700">
                  {application.position}
                </td>

                <td className="px-5 py-4">
                  <StatusBadge status={application.status} />
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {application.jobType}
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {dateFormatter.format(
                    new Date(`${application.dateApplied}T00:00:00`),
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default RecentApplications;