"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, User, Tag, FolderOpen } from "lucide-react";
import { ProjectListItem, groupByYear, fullName } from "@/lib/api";

export default function ProjectsClient({ projects }: { projects: ProjectListItem[] }) {
  const groups = useMemo(() => groupByYear(projects), [projects]);
  const [activeYear, setActiveYear] = useState<"all" | string>("all");

  const visibleGroups = useMemo(
    () => (activeYear === "all" ? groups : groups.filter((g) => g.label === activeYear)),
    [groups, activeYear]
  );

  if (projects.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-24 text-center">
        <FolderOpen className="mx-auto text-gray-300" size={56} />
        <p className="mt-4 text-lg text-gray-500">Hələ ki, təsdiqlənmiş layihə yoxdur.</p>
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
          Hamısı ({projects.length})
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
              <h2 id={`year-${group.label}`} className="font-serif text-2xl md:text-3xl font-semibold text-brand">
                {group.label}
              </h2>
              <span className="text-sm text-gray-400 font-medium">
                {group.items.length} layihə
              </span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.items.map((project) => (
                <Link
                  key={project.project_code}
                  href={`/projects/${project.project_code}`}
                  className="group flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-brand/30 transition-all p-6"
                >
                  {project.priotet_name && (
                    <span className="inline-flex items-center gap-1.5 self-start bg-blue-50 text-brand text-xs font-semibold px-3 py-1 rounded-full mb-4">
                      <Tag size={12} /> {project.priotet_name}
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-3 group-hover:text-brand transition-colors">
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
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand opacity-0 group-hover:opacity-100 transition-opacity">
                      Ətraflı <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
