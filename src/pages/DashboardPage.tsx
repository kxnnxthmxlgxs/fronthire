import {
  BriefcaseBusiness,
  CalendarCheck,
  CircleCheckBig,
  Send,
} from "lucide-react";
import RecentApplications from "../components/dashboard/RecentApplications";
import StatCard from "../components/dashboard/StatCard";
import { mockApplications } from "../data/mockApplications";

function DashboardPage() {
  const totalApplications = mockApplications.length;

  const appliedApplications = mockApplications.filter(
    (application) =>
      application.status !== "saved" &&
      application.status !== "rejected",
  ).length;

  const interviews = mockApplications.filter(
    (application) => application.status === "interview",
  ).length;

  const offers = mockApplications.filter(
    (application) => application.status === "offer",
  ).length;

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-600">
            Track your job-search progress from one place.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <BriefcaseBusiness aria-hidden="true" className="h-4 w-4" />
          Add application
        </button>
      </div>

      <section
        aria-label="Application statistics"
        className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <StatCard
          title="Total applications"
          value={totalApplications}
          description="All tracked opportunities"
          icon={BriefcaseBusiness}
          iconClassName="bg-slate-100 text-slate-700"
        />

        <StatCard
          title="Active applications"
          value={appliedApplications}
          description="Currently in progress"
          icon={Send}
          iconClassName="bg-blue-100 text-blue-700"
        />

        <StatCard
          title="Interviews"
          value={interviews}
          description="Interview stage reached"
          icon={CalendarCheck}
          iconClassName="bg-purple-100 text-purple-700"
        />

        <StatCard
          title="Offers"
          value={offers}
          description="Offers received"
          icon={CircleCheckBig}
          iconClassName="bg-emerald-100 text-emerald-700"
        />
      </section>

      <div className="mt-6">
        <RecentApplications applications={mockApplications} />
      </div>
    </div>
  );
}

export default DashboardPage;