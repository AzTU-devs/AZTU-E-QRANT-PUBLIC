import Link from "next/link";
import { Home, FolderKanban } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20">
      <p className="text-7xl font-bold text-brand">404</p>
      <h1 className="mt-4 text-2xl font-bold text-gray-900">Səhifə tapılmadı</h1>
      <p className="mt-3 text-gray-500 max-w-md">
        Axtardığınız səhifə mövcud deyil və ya köçürülüb.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-brand text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
        >
          <Home size={18} /> Ana səhifə
        </Link>
        <Link
          href="/projects"
          className="inline-flex items-center justify-center gap-2 bg-white text-brand border border-gray-200 px-6 py-3 rounded-xl font-semibold hover:border-brand transition-colors"
        >
          <FolderKanban size={18} /> Layihələr
        </Link>
      </div>
    </div>
  );
}
