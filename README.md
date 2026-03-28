# pkbm-admin

Administrator dashboard for the PKBM Budiman Drestanta administrative platform. Provides staff with a dedicated interface to manage submissions, records, and workflows efficiently.

**Live Demo:** [pkbm-web-admin.vercel.app](https://pkbm-web-admin.vercel.app)

> Part of a three-repo system — see [pkbm-client](https://github.com/katarinakanti/pkbm-client) and [pkbm-api](https://github.com/katarinakanti/pkbm-api).

## Tech Stack

- React, TypeScript, React Router, Tailwind CSS
- Deployed on [Vercel](https://vercel.com)

## Features

- Manage and review incoming document submissions
- Update and track submission workflow status
- Access and manage student records
- JWT-based authentication with admin-only access

## Folder Structure

```
pkbm-admin/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── routes/
│   ├── services/        # API call functions
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
├── .env.example
├── index.html
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js v18+
- [pkbm-api](https://github.com/katarinakanti/pkbm-api) running locally or deployed

### Installation

```bash
git clone https://github.com/katarinakanti/pkbm-admin
cd pkbm-admin
npm install
```

### Environment Variables

Create a `.env` file based on `.env.example`:

```
VITE_API_URL=http://localhost:3000
```

For production, set `VITE_API_URL` to the deployed API URL.

### Run Locally

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

## Related Repos

| Repo | Role |
|------|------|
| [pkbm-client](https://github.com/katarinakanti/pkbm-client) | Student-facing portal |
| [pkbm-api](https://github.com/katarinakanti/pkbm-api) | Centralized API backend |

## Author

[Katarina Kanti Moksakamarga](https://linkedin.com/in/katarinakantim)
