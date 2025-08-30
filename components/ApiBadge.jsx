import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

const ApiBadge = ({ ok, label }) => (
  <span
    className={`
      inline-flex items-center gap-1 px-2 py-0.5 rounded-full
      text-[12px] font-medium
      ${
        ok
          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
      }
    `}
  >
    {ok ? (
      <CheckCircleIcon className="w-4 h-4" />
    ) : (
      <XCircleIcon className="w-4 h-4" />
    )}
    {label}
  </span>
);

export default ApiBadge;
