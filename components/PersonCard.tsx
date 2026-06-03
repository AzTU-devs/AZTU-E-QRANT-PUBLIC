import { Person, fullName } from "@/lib/api";
import { Crown, GraduationCap, Building2 } from "lucide-react";

function initials(p: Person | null): string {
  if (!p) return "?";
  return [p.name?.[0], p.surname?.[0]].filter(Boolean).join("").toUpperCase() || "?";
}

export default function PersonCard({
  person,
  role,
  isLead = false,
}: {
  person: Person | null;
  role?: string;
  isLead?: boolean;
}) {
  const subtitle = person?.duty || person?.department || person?.work_place;
  const degree = person?.scientific_degree || person?.scientific_name;

  return (
    <div
      className={`flex items-start gap-4 p-5 rounded-2xl border transition-shadow hover:shadow-sm ${
        isLead ? "bg-blue-50/60 border-brand/20" : "bg-white border-gray-100"
      }`}
    >
      <div
        className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold ${
          isLead ? "bg-brand text-white" : "bg-gray-100 text-gray-600"
        }`}
        aria-hidden
      >
        {initials(person)}
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-semibold text-gray-900">{fullName(person)}</p>
          {isLead && (
            <span className="inline-flex items-center gap-1 bg-brand text-white text-[11px] font-semibold px-2 py-0.5 rounded-full">
              <Crown size={11} /> {role || "Layihə rəhbəri"}
            </span>
          )}
          {!isLead && role && (
            <span className="bg-gray-100 text-gray-600 text-[11px] font-medium px-2 py-0.5 rounded-full">
              {role}
            </span>
          )}
        </div>
        {subtitle && (
          <p className="mt-1 text-sm text-gray-500 flex items-center gap-1.5">
            <Building2 size={13} className="flex-shrink-0" /> {subtitle}
          </p>
        )}
        {degree && (
          <p className="mt-0.5 text-xs text-gray-400 flex items-center gap-1.5">
            <GraduationCap size={13} className="flex-shrink-0" /> {degree}
          </p>
        )}
      </div>
    </div>
  );
}
