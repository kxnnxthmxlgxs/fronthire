import { BriefcaseBusiness, Plus, TriangleAlert } from "lucide-react";
import { useMemo, useState } from "react";
import ApplicationFilters, {
  type StatusFilter,
} from "../components/applications/ApplicationFilters";
import ApplicationForm from "../components/applications/ApplicationForm";
import ApplicationTable from "../components/applications/ApplicationTable";
import Modal from "../components/ui/Modal";
import { useApplications } from "../hooks/useApplications";
import type { JobApplication } from "../types/application";

function ApplicationsPage() {
  const {
    applications,
    addApplication,
    updateApplication,
    deleteApplication,
  } = useApplications();

  const [searchTerm, setSearchTerm] = useState("");

  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>("all");

  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  const [applicationToEdit, setApplicationToEdit] =
    useState<JobApplication | null>(null);

  const [applicationToDelete, setApplicationToDelete] =
    useState<JobApplication | null>(null);

  const filteredApplications = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return applications.filter((application) => {
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
  }, [applications, searchTerm, statusFilter]);

  function handleAddApplication(
    application: JobApplication,
  ) {
    addApplication(application);
    setIsAddFormOpen(false);
  }

  function handleUpdateApplication(
    application: JobApplication,
  ) {
    updateApplication(application);
    setApplicationToEdit(null);
  }

  function handleConfirmDelete() {
    if (!applicationToDelete) {
      return;
    }

    deleteApplication(applicationToDelete.id);
    setApplicationToDelete(null);
  }

  return (
    <>
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
            onClick={() => setIsAddFormOpen(true)}
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
              {applications.length}
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
            onEdit={setApplicationToEdit}
            onDelete={setApplicationToDelete}
          />
        </div>
      </div>

      <Modal
        isOpen={isAddFormOpen}
        title="Add application"
        description="Record a new job opportunity in your tracker."
        onClose={() => setIsAddFormOpen(false)}
      >
        <ApplicationForm
          onSubmit={handleAddApplication}
          onCancel={() => setIsAddFormOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={applicationToEdit !== null}
        title="Edit application"
        description="Update the details and current status of this application."
        onClose={() => setApplicationToEdit(null)}
      >
        {applicationToEdit && (
          <ApplicationForm
            key={applicationToEdit.id}
            initialApplication={applicationToEdit}
            onSubmit={handleUpdateApplication}
            onCancel={() => setApplicationToEdit(null)}
          />
        )}
      </Modal>

      <Modal
        isOpen={applicationToDelete !== null}
        title="Delete application"
        description="This action cannot be undone."
        onClose={() => setApplicationToDelete(null)}
      >
        {applicationToDelete && (
          <div>
            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                <TriangleAlert
                  aria-hidden="true"
                  className="h-5 w-5"
                />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  Delete {applicationToDelete.company}?
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  The application for{" "}
                  <span className="font-medium text-slate-900">
                    {applicationToDelete.position}
                  </span>{" "}
                  will be permanently removed from your tracker.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setApplicationToDelete(null)}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmDelete}
                className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Delete application
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

export default ApplicationsPage;