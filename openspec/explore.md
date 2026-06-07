# SDD Explore — Caduceo Web

## Current State

### Tech Stack

- **React 19** + **TypeScript 6**
- **@tanstack/react-router** (file-based routing, route tree generation)
- **@tanstack/react-query** (data fetching)
- **zustand** (local state — quiz session persistence)
- **Tailwind CSS 4** + **shadcn/ui** (Radix UI primitives)
- **Vite 8** (build), **Cloudflare Pages** (deploy)

### Routes (existing)

| Path                | File                          | Description                    |
| ------------------- | ----------------------------- | ------------------------------ |
| `/`                 | `routes/index.tsx`            | Landing page                   |
| `/auth/login`       | `routes/auth.login.tsx`       | Login form                     |
| `/auth/register`    | `routes/auth.register.tsx`    | Registration form              |
| `/app`              | `routes/app.tsx`              | Authenticated layout (sidebar) |
| `/app/`             | `routes/app.index.tsx`        | Dashboard                      |
| `/app/quiz`         | `routes/app/quiz/index.tsx`   | Quiz config/start              |
| `/app/quiz/session` | `routes/app/quiz/session.tsx` | Quiz session                   |
| `/app/progreso`     | `routes/app.progreso.tsx`     | Progress stats                 |
| `/app/categorias`   | `routes/app.categorias.tsx`   | Category list                  |
| `/app/plus`         | `routes/app.plus.tsx`         | Plus subscription page         |
| `/app/ajustes`      | `routes/app.ajustes.tsx`      | Settings                       |
| `/pago/exito`       | `routes/pago.exito.tsx`       | Payment success                |
| `/pago/pendiente`   | `routes/pago.pendiente.tsx`   | Payment pending                |
| `/pago/error`       | `routes/pago.error.tsx`       | Payment error                  |

### API Queries (existing)

| Module     | Endpoints                           | Hooks                                                |
| ---------- | ----------------------------------- | ---------------------------------------------------- |
| Auth       | register, login, logout, getSession | `useRegister`, `useLogin`, `useLogout`, `useSession` |
| Categories | list                                | `useCategories`                                      |
| Questions  | list, answer                        | `useQuestions`, `useAnswerQuestion`                  |
| Progress   | get                                 | `useProgress`                                        |
| Payments   | createPreference                    | `useCreatePreference`                                |

### Missing / What We Need

#### 1. Question Detail View (`GET /api/v1/questions/:id`)

- Frontend has no detail page for a single question
- Endpoint exists in backend: `GET /api/v1/questions/:id` → `QuestionDetailResponse` (includes `correct_answer`, `explanation`)
- Need: new route `/app/questions/:id`, service method, hook, types

#### 2. Admin Panel

- Backend has 15 admin endpoints under `/admin/*`
- Frontend has zero admin functionality
- Need:
  - Admin layout/guard (check `role === 1`)
  - Question CRUD
  - Category CRUD
  - User management (list, detail, update)
  - Payment management (list, detail)
  - Navigation to admin section in sidebar (role-gated)

#### 3. Backend detail endpoint already deployed

- `GET /api/v1/questions/:id` returns `{ id, category_id, body, options, correct_answer, explanation, tier, year }`
- Already deployed to staging & production

## Constraints

- Must use `frontend-design` skill for new UI components
- Single PR (under 400 lines if possible, but admin panel likely exceeds — may need chained PRs)
- Existing patterns and conventions should be followed (file-based routes, service/hooks/types pattern)
