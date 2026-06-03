# AzTU E-Qrant — Public Website

Public-facing website for the **AzTU Daxili Qrant Müsabiqəsi** (internal grant
competition). Built with **Next.js 16 (App Router)**, **TypeScript** and
**Tailwind CSS v4**.

It is a separate frontend from the existing admin/applicant SPA
(`AZTU-E-QRANT-FRONT`) and the Flask backend (`AZTU-E-QRANT-BACK`).

## Pages

| Route              | Description                                                            |
| ------------------ | --------------------------------------------------------------------- |
| `/`                | Home — grant competition info (ported from the old `Intro` page).     |
| `/projects`        | Approved projects grouped by year. Shows only **name + description**. |
| `/projects/[code]` | Single project: description, **project lead** and **collaborators**.  |
| `/leads`           | **Tree view** of project leads and their collaborators (searchable).  |

No budget/smeta or other sensitive details are ever shown.

## Data source

The site reads from public (no-auth) endpoints added to the Flask backend:

- `GET /api/public/projects` — approved projects (name, description, year, lead).
- `GET /api/public/project/<project_code>` — single project + lead + collaborators.
- `GET /api/public/leads-tree` — leads with their collaborators.

Data is fetched with ISR (`revalidate: 300s`).

## Configuration

Copy `.env.example` to `.env.local` and adjust:

```
NEXT_PUBLIC_SITE_URL=https://e-grant.aztu.edu.az    # this site's public URL
NEXT_PUBLIC_API_BASE_URL=http://e-grant.aztu.edu.az # Flask backend URL
```

`NEXT_PUBLIC_SITE_URL` is important for correct canonical URLs, sitemap and
OpenGraph tags.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve production build
```

## SEO

- Per-page `<title>`/description with a global title template.
- Canonical URLs, OpenGraph and Twitter cards.
- JSON-LD structured data (`EducationalOrganization`, `WebSite`,
  `CollectionPage`/`ItemList`, `ResearchProject`).
- `app/sitemap.ts` (includes every project page) and `app/robots.ts`.
- `app/manifest.ts` (PWA manifest), `lang="az"`, theme color.
