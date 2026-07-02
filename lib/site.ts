/**
 * Central site configuration. Values can be overridden with environment
 * variables (see .env.example).
 */

export const siteConfig = {
  name: "AzTU Daxili Qrant Müsabiqəsi",
  shortName: "AzTU E-Qrant",
  description:
    "Azərbaycan Texniki Universiteti (AzTU) elmi-tədqiqat işlərinin və innovasiyaların dəstəklənməsi məqsədilə daxili qrant müsabiqəsi təşkil edir. Qalib layihələr, layihə rəhbərləri və icraçılar.",
  // Public-facing URL of THIS website (used for canonical URLs, sitemap, OG).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://e-grant.aztu.edu.az",
  // Base URL of the Flask backend API.
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://e-grant.aztu.edu.az",
  locale: "az_AZ",
  // Where users go to actually apply (the existing admin/portal SPA).
  portalUrl: "https://admin-e-grant.aztu.edu.az",
  keywords: [
    "AzTU",
    "Azərbaycan Texniki Universiteti",
    "qrant",
    "daxili qrant",
    "elmi-tədqiqat",
    "innovasiya",
    "layihə",
    "qrant müsabiqəsi",
    "AzTU qrant",
    "research grant",
  ],
  contacts: {
    grantPhone: "(+994 12) 538-33-83",
    grantPhoneHref: "+994125383383",
    universityPhone: "(+994 12) 539-13-05",
    universityPhoneHref: "+994125391305",
    email: "qrant@aztu.edu.az",
    universityEmail: "aztu@aztu.edu.az",
    address: "H.Cavid prospekti 25, Bakı, Azərbaycan AZ 1073",
    addressMap: "https://maps.app.goo.gl/uSbCPTZDsVBZZ4n16",
    workingHours: "09:00 - 18:00",
  },
  social: {
    facebook: "https://www.facebook.com/aztu1950.official/",
    instagram: "https://www.instagram.com/aztueduaz",
    linkedin: "https://www.linkedin.com/school/aztueduaz/",
    youtube: "https://www.youtube.com/channel/UCu_PoZ-9DKNYs3hxuK9pW1Q",
    telegram: "https://t.me/aztu_edu_az",
    x: "https://x.com/aztueduaz",
  },
  organization: "Azərbaycan Texniki Universiteti",
} as const;

export const BRAND = "rgb(20,30,79)";
