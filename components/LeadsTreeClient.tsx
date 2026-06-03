"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Crown,
  Users,
  Search,
  GitBranch,
  ExternalLink,
} from "lucide-react";
import { LeadTreeNode, Person, fullName } from "@/lib/api";

function personInitials(p: Person | null): string {
  if (!p) return "?";
  return [p.name?.[0], p.surname?.[0]].filter(Boolean).join("").toUpperCase() || "?";
}

function TreeNode({ node, defaultOpen }: { node: LeadTreeNode; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const count = node.collaborators.length;

  return (
    <li className="relative">
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        {/* Lead row */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center gap-4 p-4 sm:p-5 text-left hover:bg-gray-50 transition-colors"
          aria-expanded={open}
        >
          <ChevronRight
            size={20}
            className={`flex-shrink-0 text-gray-400 transition-transform ${open ? "rotate-90" : ""}`}
          />
          <div className="flex-shrink-0 w-11 h-11 rounded-full bg-brand text-white flex items-center justify-center font-bold">
            {personInitials(node.lead)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-gray-900">{fullName(node.lead)}</span>
              <span className="inline-flex items-center gap-1 bg-brand text-white text-[11px] font-semibold px-2 py-0.5 rounded-full">
                <Crown size={11} /> Rəhbər
              </span>
            </div>
            <p className="mt-0.5 text-sm text-gray-500 line-clamp-1">
              {node.project_name || "Adsız layihə"}
              {node.year ? ` • ${node.year}` : ""}
            </p>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-gray-500 flex-shrink-0">
            <Users size={14} /> {count}
          </span>
        </button>

        {/* Collaborators */}
        {open && (
          <div className="px-4 sm:px-5 pb-5 pt-1">
            <div className="ml-5 sm:ml-6 border-l-2 border-dashed border-gray-200 pl-5 sm:pl-6 space-y-2">
              {count > 0 ? (
                node.collaborators.map((c) => (
                  <div key={c.fin_kod} className="relative flex items-center gap-3 py-1.5">
                    <span className="absolute -left-[21px] sm:-left-[25px] top-1/2 w-4 sm:w-5 h-px bg-gray-200" aria-hidden />
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-xs font-bold">
                      {personInitials(c)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-800">{fullName(c)}</p>
                      {(c.duty || c.department) && (
                        <p className="text-xs text-gray-400 line-clamp-1">
                          {c.duty || c.department}
                        </p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400 py-1.5">İcraçı əlavə edilməyib.</p>
              )}

              <Link
                href={`/projects/${node.project_code}`}
                className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold text-brand hover:underline"
              >
                Layihəyə bax <ExternalLink size={12} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </li>
  );
}

export default function LeadsTreeClient({ nodes }: { nodes: LeadTreeNode[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return nodes;
    return nodes.filter((n) => {
      const haystack = [
        fullName(n.lead),
        n.project_name ?? "",
        ...n.collaborators.map((c) => fullName(c)),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [nodes, query]);

  if (nodes.length === 0) {
    return (
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-24 text-center">
        <GitBranch className="mx-auto text-gray-300" size={56} />
        <p className="mt-4 text-lg text-gray-500">Hələ ki, məlumat yoxdur.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
      {/* Search */}
      <div className="relative max-w-md mx-auto mb-10">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rəhbər, icraçı və ya layihə axtarın..."
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
          aria-label="Axtarış"
        />
      </div>

      <p className="text-center text-sm text-gray-400 mb-6">
        {filtered.length} rəhbər
      </p>

      <ul className="space-y-4">
        {filtered.map((node) => (
          <TreeNode key={node.project_code} node={node} defaultOpen={!!query} />
        ))}
      </ul>
    </div>
  );
}
