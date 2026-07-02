"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, User, Tag, Trophy, Users } from "lucide-react";
import { WinnerItem, groupByYear, fullName } from "@/lib/api";

export default function WinnersClient({ winners }: { winners: WinnerItem[] }) {
  const groups = useMemo(() => groupByYear(winners), [winners]);
  const [activeYear, setActiveYear] = useState<"all" | string>("all");

  const visibleGroups = useMemo(
    () => (activeYear === "all" ? groups : groups.filter((g) => g.label === activeYear)),
    [groups, activeYear]
  );

  if (winners.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-24 text-center">
        <Trophy className="mx-auto text-gray-300" size={56} />
        <p className="mt-4 text-lg text-gray-500">Hələ ki, qalib layihə elan olunmayıb.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 md:py-16">
      {/* Year filter */}
      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        <button
          onClick={() => setActiveYear("all")}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
            activeYear === "all"
              ? "bg-brand text-white"
              : "bg-white text-gray-600 border border-gray-200 hover:border-brand"
          }`}
        >
          Hamısı ({winners.length})
        </button>
        {groups.map((g) => (
          <button
            key={g.label}
            onClick={() => setActiveYear(g.label)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              activeYear === g.label
                ? "bg-brand text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:border-brand"
            }`}
          >
            {g.label} ({g.items.length})
          </button>
        ))}
      </div>

      {/* Grouped lists */}
      <div className="space-y-16">
        {visibleGroups.map((group) => (
          <section key={group.label} aria-labelledby={`year-${group.label}`}>
            <div className="flex items-center gap-4 mb-8">
              <h2 id={`year-${group.label}`} className="text-2xl md:text-3xl font-bold text-brand">
                {group.label}
              </h2>
              <span className="text-sm text-gray-400 font-medium">
                {group.items.length} qalib
              </span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.items.map((project) => (
                <Link
                  key={project.project_code}
                  href={`/projects/${project.project_code}`}
                  className="group relative flex flex-col bg-white rounded-2xl border border-amber-200/70 shadow-sm hover:shadow-md hover:border-amber-300 transition-all p-6"
                >
                  <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold px-2.5 py-1">
                    <Trophy size={12} /> Qalib
                  </span>
                  {project.priotet_name && (
                    <span className="inline-flex items-center gap-1.5 self-start bg-blue-50 text-brand text-xs font-semibold px-3 py-1 rounded-full mb-4 pr-4">
                      <Tag size={12} /> {project.priotet_name}
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-3 group-hover:text-brand transition-colors pr-16">
                    {project.project_name || "Adsız layihə"}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-4 flex-1">
                    {project.description || "Təsvir mövcud deyil."}
                  </p>
                  <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                      <User size={14} />
                      {project.lead ? fullName(project.lead) : "Naməlum"}
                    </span>
                    {project.collaborators.length > 0 && (
                      <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                        <Users size={14} /> {project.collaborators.length}
                      </span>
                    )}
                  </div>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand opacity-0 group-hover:opacity-100 transition-opacity">
                    Ətraflı <ArrowRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
