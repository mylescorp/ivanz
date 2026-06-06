# IvanZ Construction — Project Tasks

Vault mirror: `MylesCorp-Brain/clients/IvanZ Construction/admin-tasks.md`

## Public website (complete — QA pending)

- [x] Core pages, portfolio, estimator, WhatsApp drawer
- [x] Security (cookies, CSRF, headers)
- [ ] Lighthouse QA, cross-browser testing
- [ ] Client assets (logo, photos, domain, brief)

## Admin panel — Phase 0: Scaffold & environment

- [x] `/admin` HTML shell (dashboard, login, pending)
- [x] Tailwind brand tokens + CSS build
- [x] Convex schema shell deployed (9 tables live)
- [x] Environment variables configured (`.env.local`)
- [x] `admin/js/config.js` with Convex URL (auto-synced on dev)
- [x] `npx convex dev --once` — functions ready
- [x] `npx convex run health:ping` — verified
- [x] Vercel TypeScript build fix
- [x] `admin/node_modules` gitignored
- [x] `/admin` local routing (rewrites + base href + admin CSP)
- [ ] GitHub repo under Mylesoft-Technologies org

## Admin panel — Phase 1: Database schema

- [x] Finalise all table fields in `convex/schema.ts`
- [x] Deploy schema — `npx convex dev` with zero errors
- [ ] Seed initial site_settings from `lib/config.ts`

## Admin panel — Phase 2: Authentication & RBAC

- [x] Convex Auth — Google + Password (`convex/auth.ts`)
- [x] RBAC helpers wired to `getAuthUserId`
- [x] Admin login, guard, pending flow (`admin/js/login.js`, `guard.js`)
- [x] Production Convex deployed (`laudable-crow-42`)
- [x] Vercel env vars set (production)
- [x] Bootstrap Owner on **dev** (`bootstrapSeed:seedOwner`)
- [x] `SITE_URL` set on dev Convex for localhost
- [x] Deploy Convex to production (`laudable-crow-42`)
- [x] Copy JWT keys + `SITE_URL` to Convex production
- [x] Vercel `NEXT_PUBLIC_SITE_URL` → `https://ivanz.mylescorptech.com`
- [ ] Set Google OAuth secrets on prod (+ Google redirect URI)
- [ ] Bootstrap Owner on **production** (run `CONVEX_SEED_PROD=1 npm run admin:seed-owner`)

## Admin panel — Phases 3–9

See vault admin-plan for backend, inquiry capture, UI, and deployment.

## Convex reference

| Setting | Value |
|---|---|
| Team | mylesoft |
| Project | ivanz |
| Deployment ref | dev/mylesoft |
| Dev cloud URL | https://elated-akita-553.convex.cloud |
| Prod cloud URL | https://laudable-crow-42.convex.cloud |
| Production site | https://ivanz.mylescorptech.com |
| Dashboard (dev) | https://dashboard.convex.dev/t/mylesoft/ivanz/elated-akita-553 |
| Dashboard (prod) | https://dashboard.convex.dev/t/mylesoft/ivanz/laudable-crow-42 |

