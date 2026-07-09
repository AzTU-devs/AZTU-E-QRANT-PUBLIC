import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/site";

/* Brand logos are not part of lucide-react, so they are inlined as SVG paths. */
type IconProps = { className?: string };

const FacebookIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.988h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.128 22 16.991 22 12z" />
  </svg>
);
const InstagramIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.311 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.311-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.311-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.336-2.633 1.311-3.608C4.519 2.567 5.786 2.293 7.152 2.231 8.418 2.175 8.796 2.163 12 2.163zm0 1.802c-3.15 0-3.522.012-4.764.069-1.024.047-1.58.218-1.95.362-.49.19-.84.418-1.207.785-.367.367-.595.717-.785 1.207-.144.37-.315.926-.362 1.95-.057 1.242-.069 1.614-.069 4.764s.012 3.522.069 4.764c.047 1.024.218 1.58.362 1.95.19.49.418.84.785 1.207.367.367.717.595 1.207.785.37.144.926.315 1.95.362 1.242.057 1.614.069 4.764.069s3.522-.012 4.764-.069c1.024-.047 1.58-.218 1.95-.362.49-.19.84-.418 1.207-.785.367-.367.595-.717.785-1.207.144-.37.315-.926.362-1.95.057-1.242.069-1.614.069-4.764s-.012-3.522-.069-4.764c-.047-1.024-.218-1.58-.362-1.95-.19-.49-.418-.84-.785-1.207-.367-.367-.717-.595-1.207-.785-.37-.144-.926-.315-1.95-.362-1.242-.057-1.614-.069-4.764-.069zm0 3.064A5.971 5.971 0 1 0 12 18a5.971 5.971 0 0 0 0-11.971zm0 9.853A3.882 3.882 0 1 1 12 8.118a3.882 3.882 0 0 1 0 7.764zm6.406-10.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);
const LinkedinIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const YoutubeIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);
const TelegramIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

const socials = [
  { icon: FacebookIcon, href: siteConfig.social.facebook, label: "Facebook" },
  { icon: InstagramIcon, href: siteConfig.social.instagram, label: "Instagram" },
  { icon: LinkedinIcon, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { icon: YoutubeIcon, href: siteConfig.social.youtube, label: "YouTube" },
  { icon: TelegramIcon, href: siteConfig.social.telegram, label: "Telegram" },
];

export default function Footer() {
  return (
    <footer className="bg-brand text-white">
      <div className="h-1 w-full bg-accent" />
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="flex flex-col items-start gap-6 col-span-1 md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-4">
              <Image src="/aztu-logo-light.png" alt="AzTU" width={48} height={48} className="h-12 w-auto" unoptimized />
              <Image src="/e-grant-logo-light.png" alt="E-Qrant" width={48} height={48} className="h-12 w-auto" unoptimized />
            </div>
            <p className="text-blue-100/70 text-sm leading-relaxed max-w-xs">
              Azərbaycan Texniki Universiteti elmi potensialın inkişafı və innovativ
              tədqiqatların dəstəklənməsi üçün daxili qrant müsabiqələri təşkil edir.
            </p>
            <div className="flex flex-wrap gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Icon className="w-[18px] h-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 border-b border-white/10 pb-2 inline-block">
              Naviqasiya
            </h4>
            <ul className="space-y-4 text-sm text-blue-100/70">
              <li><Link href="/" className="hover:text-white transition-colors">Ana səhifə</Link></li>
              <li><Link href="/projects" className="hover:text-white transition-colors">Layihələr</Link></li>
              <li><Link href="/winners" className="hover:text-white transition-colors">Qalib layihələr</Link></li>
              <li><Link href="/leads" className="hover:text-white transition-colors">Rəhbərlər və icraçılar</Link></li>
              <li><Link href="/announcements" className="hover:text-white transition-colors">Elanlar</Link></li>
              <li>
                <a href={siteConfig.portalUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Qrant portalı
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-lg font-bold mb-6 border-b border-white/10 pb-2 inline-block">Əlaqə</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <a href={siteConfig.contacts.addressMap} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group">
                  <MapPin className="text-blue-400 mt-0.5 flex-shrink-0" size={18} />
                  <span className="text-sm text-blue-100/70 group-hover:text-white transition-colors leading-relaxed">
                    {siteConfig.contacts.address}
                  </span>
                </a>
                <a href={`tel:${siteConfig.contacts.universityPhoneHref}`} className="flex items-center gap-3 group">
                  <Phone className="text-blue-400 flex-shrink-0" size={18} />
                  <span className="text-sm text-blue-100/70 group-hover:text-white transition-colors">
                    AzTU: {siteConfig.contacts.universityPhone}
                  </span>
                </a>
                <a href={`tel:${siteConfig.contacts.grantPhoneHref}`} className="flex items-center gap-3 group">
                  <Phone className="text-blue-400 flex-shrink-0" size={18} />
                  <span className="text-sm text-blue-100/70 group-hover:text-white transition-colors">
                    Qrant: {siteConfig.contacts.grantPhone}
                  </span>
                </a>
              </div>
              <div className="space-y-4">
                <a href={`mailto:${siteConfig.contacts.universityEmail}`} className="flex items-center gap-3 group">
                  <Mail className="text-blue-400 flex-shrink-0" size={18} />
                  <span className="text-sm text-blue-100/70 group-hover:text-white transition-colors">
                    {siteConfig.contacts.universityEmail}
                  </span>
                </a>
                <a href={`mailto:${siteConfig.contacts.email}`} className="flex items-center gap-3 group">
                  <Mail className="text-blue-400 flex-shrink-0" size={18} />
                  <span className="text-sm text-blue-100/70 group-hover:text-white transition-colors">
                    {siteConfig.contacts.email}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-blue-100/50">
          <p>© {new Date().getFullYear()} Azərbaycan Texniki Universiteti. Bütün hüquqlar qorunur.</p>
          <p>AzTU Tədqiqat və İnkişaf Departamenti</p>
        </div>
      </div>
    </footer>
  );
}
