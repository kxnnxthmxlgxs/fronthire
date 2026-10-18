import { Pencil, Trash2 } from "lucide-react";
import type { JobApplication } from "../../types/application";
import StatusBadge from "../dashboard/StatusBadge";

interface ApplicationTableProps {
  applications: JobApplication[];
  onEdit: (application: JobApplication) => void;
  onDelete: (application: JobApplication) => void;
}

const dateFormatter = new Intl.DateTimeFormat("en-ZA", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

function ApplicationTable({
  applications,
  onEdit,
  onDelete,
}: ApplicationTableProps) {
  if (applications.length === 0) {
    return (
      <section className="rounded-xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          No applications found
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Try changing your search term or status filter.
        </p>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th scope="col" className="px-5 py-3 font-medium">
                Company
              </th>

              <th scope="col" className="px-5 py-3 font-medium">
                Position
              </th>

              <th scope="col" className="px-5 py-3 font-medium">
                Location
              </th>

              <th scope="col" className="px-5 py-3 font-medium">
                Status
              </th>

              <th scope="col" className="px-5 py-3 font-medium">
                Job type
              </th>

              <th scope="col" className="px-5 py-3 font-medium">
                Date applied
              </th>

              <th scope="col" className="px-5 py-3 text-right font-medium">
                Actions
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
                </td>

                <td className="px-5 py-4 text-sm text-slate-700">
                  {application.position}
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {application.location}
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

                <td className="px-5 py-4">
                  <div className="flex justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => onEdit(application)}
                      aria-label={`Edit ${application.company} application`}
                      title="Edit application"
                      className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <Pencil
                        aria-hidden="true"
                        className="h-4 w-4"
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete(application)}
                      aria-label={`Delete ${application.company} application`}
                      title="Delete application"
                      className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <Trash2
                        aria-hidden="true"
                        className="h-4 w-4"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ApplicationTable;