import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  description: string;
  icon: LucideIcon;
  iconClassName: string;
}

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  iconClassName,
}: StatCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-600">{title}</p>

          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </p>
        </div>

        <div className={`rounded-lg p-2.5 ${iconClassName}`}>
          <Icon aria-hidden="true" className="h-5 w-5" />
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-500">{description}</p>
    </article>
  );
}

export default StatCard;