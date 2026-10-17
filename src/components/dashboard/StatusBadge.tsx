import type { ApplicationStatus } from "../../types/application";

interface StatusBadgeProps {
  status: ApplicationStatus;
}

const statusStyles: Record<ApplicationStatus, string> = {
  saved: "bg-slate-100 text-slate-700",
  applied: "bg-blue-100 text-blue-700",
  assessment: "bg-amber-100 text-amber-700",
  interview: "bg-purple-100 text-purple-700",
  offer: "bg-emerald-100 text-emerald-700",
  rejected: "bg-red-100 text-red-700",
};

const statusLabels: Record<ApplicationStatus, string> = {
  saved: "Saved",
  applied: "Applied",
  assessment: "Assessment",
  interview: "Interview",
  offer: "Offer",
  rejected: "Rejected",
};

function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}

export default StatusBadge;