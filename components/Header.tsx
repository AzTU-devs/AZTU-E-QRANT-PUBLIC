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
  { href: "/winners", label: "Qaliblər" },
  { href: "/leads", label: "Rəhbərlər" },
  { href: "/announcements", label: "Elanlar" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-brand">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center justify-between py-3.5">
          {/* Logos */}
          <Link href="/" className="flex items-center gap-4 flex-shrink-0" aria-label="Ana səhifə">
            <Image
              src="/aztu-logo-light.png"
              alt="Azərbaycan Texniki Universiteti"
              width={48}
              height={48}
              className="h-10 md:h-11 w-auto object-contain"
              priority
            />
            <span className="h-8 w-px bg-white/20 hidden sm:block" />
            <Image
              src="/e-grant-logo-light.png"
              alt="AzTU E-Qrant"
              width={48}
              height={48}
              className="h-10 md:h-11 w-auto object-contain hidden sm:block"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Əsas naviqasiya">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-1 text-sm font-medium tracking-wide transition-colors ${
                  isActive(item.href) ? "text-white" : "text-blue-100/70 hover:text-white"
                }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <span className="absolute -bottom-[3px] left-0 h-0.5 w-full bg-accent" />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={siteConfig.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden sm:inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#b84e30]"
            >
              <span className="hidden lg:block">Qrant portalı</span>
              <LogIn className="transition-transform group-hover:translate-x-0.5" size={18} />
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
              className="mt-1 flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-white"
            >
              <LogIn size={18} /> Qrant portalı
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
