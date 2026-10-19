import { CalendarPlus } from "lucide-react";
import { Link } from "react-router-dom";

function InterviewEmptyState() {
  return (
    <section className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-700">
        <CalendarPlus
          aria-hidden="true"
          className="h-6 w-6"
        />
      </div>

      <h2 className="mt-4 text-lg font-semibold text-slate-900">
        No interviews scheduled
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
        Change an application's status to Interview and add its
        scheduling details to make it appear here.
      </p>

      <Link
        to="/applications"
        className="mt-5 inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        View applications
      </Link>
    </section>
  );
}

export default InterviewEmptyState;