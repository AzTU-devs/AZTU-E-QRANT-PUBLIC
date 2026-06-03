"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LogIn, Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/site";

const navItems = [
  { href: "/", label: "Ana səhifə" },
  { href: "/projects", label: "Layihələr" },
  { href: "/leads", label: "Rəhbərlər" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-[rgb(20,30,79)] via-[rgb(30,45,120)] to-[rgb(20,30,79)] shadow-md border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between py-3">
          {/* Logos */}
          <Link href="/" className="flex items-center gap-4 flex-shrink-0" aria-label="Ana səhifə">
            <Image
              src="/aztu-logo-light.png"
              alt="Azərbaycan Texniki Universiteti"
              width={48}
              height={48}
              className="h-10 md:h-12 w-auto object-contain"
              priority
            />
            <span className="h-8 w-px bg-white/20 hidden sm:block" />
            <Image
              src="/e-grant-logo-light.png"
              alt="AzTU E-Qrant"
              width={48}
              height={48}
              className="h-10 md:h-12 w-auto object-contain hidden sm:block"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Əsas naviqasiya">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-white/15 text-white"
                    : "text-blue-100/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={siteConfig.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all border border-white/10"
            >
              <span className="hidden lg:block text-white text-sm font-medium">
                Daxili qrant portalı
              </span>
              <LogIn className="text-white transition-transform group-hover:translate-x-0.5" size={20} />
            </a>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
              aria-label="Menyu"
              aria-expanded={open}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {open && (
          <nav className="md:hidden pb-4 flex flex-col gap-1" aria-label="Mobil naviqasiya">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-white/15 text-white"
                    : "text-blue-100/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={siteConfig.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 text-white text-sm font-medium"
            >
              <LogIn size={18} /> Daxili qrant portalı
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
