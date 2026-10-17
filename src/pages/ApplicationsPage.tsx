import { BriefcaseBusiness, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import ApplicationFilters, {
  type StatusFilter,
} from "../components/applications/ApplicationFilters";
import ApplicationTable from "../components/applications/ApplicationTable";
import { mockApplications } from "../data/mockApplications";

function ApplicationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>("all");

  const filteredApplications = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return mockApplications.filter((application) => {
      const matchesSearch =
        normalizedSearch === "" ||
        application.company
          .toLowerCase()
          .includes(normalizedSearch) ||
        application.position
          .toLowerCase()
          .includes(normalizedSearch) ||
        application.location
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "all" ||
        application.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Applications
          </h1>

          <p className="mt-1 text-sm text-slate-600">
            Manage and track all your job applications.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Plus aria-hidden="true" className="h-4 w-4" />
          Add application
        </button>
      </div>

      <div className="mt-6">
        <ApplicationFilters
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          onSearchChange={setSearchTerm}
          onStatusChange={setStatusFilter}
        />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p
          aria-live="polite"
          className="text-sm text-slate-600"
        >
          Showing{" "}
          <span className="font-semibold text-slate-900">
            {filteredApplications.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-900">
            {mockApplications.length}
          </span>{" "}
          applications
        </p>

        <div className="hidden items-center gap-2 text-sm text-slate-500 sm:flex">
          <BriefcaseBusiness
            aria-hidden="true"
            className="h-4 w-4"
          />
          Application tracker
        </div>
      </div>

      <div className="mt-4">
        <ApplicationTable
          applications={filteredApplications}
        />
      </div>
    </div>
  );
}

export default ApplicationsPage;