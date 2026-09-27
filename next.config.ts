import type { NextConfig } from "next";

// Content-Security-Policy for the public site (finding P-M4).
//
// A nonce-based policy (script-src 'self' 'nonce-…' 'strict-dynamic') is
// stronger, but in Next it requires generating a per-request nonce in
// middleware, which forces every page to render dynamically and loses this
// site's static/ISR caching. We therefore ship a STATIC policy that still
// removes the dangerous primitives: no 'unsafe-eval', object-src 'none',
// base-uri 'self', frame-ancestors 'none'. 'unsafe-inline' is kept for
// script/style because Next injects inline hydration bootstrap scripts and the
// styling relies on inline styles; eliminating it is the nonce follow-up.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  // The public site reads the API from the server, but client navigation and
  // prefetch still talk to the same origin; allow the API origin explicitly.
  "connect-src 'self' https://api-e-grant.aztu.edu.az",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  // Do not advertise the framework.
  poweredByHeader: false,

  images: {
    // Only local images are optimised — no remote hosts (closes the /_next/image
    // SSRF/abuse surface), and SVGs are never processed as images (P-H1).
    remotePatterns: [],
    dangerouslyAllowSVG: false,
  },

  async headers() {
    // nginx already sends HSTS, X-Frame-Options, X-Content-Type-Options and
    // Referrer-Policy, so those are NOT duplicated here (P-M4).
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
