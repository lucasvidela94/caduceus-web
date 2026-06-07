# SDD Tasks — Caduceo Web

## Phase 1: Question Detail View

### Task 1.1 — Add question detail types, service, hook, key

**Files:**

- `src/queries/questions/types.ts` — add `QuestionDetail` type
- `src/queries/questions/service.ts` — add `getQuestion(id)`
- `src/queries/questions/hooks.ts` — add `useQuestion(id)` hook
- `src/queries/questions/keys.ts` — add `detail(id)` key

### Task 1.2 — Create question detail route

**Files:**

- `src/routes/app/questions.$id.tsx` — route with TanStack Router file convention
- Regenerate route tree

### Task 1.3 — Build question detail UI

**Files:**

- Implements: body, highlighted correct answer, explanation, back button
- Uses frontend-design skill for aesthetics

## Phase 2: Admin Panel

### Task 2.1 — Create admin queries module

**Files:**

- `src/queries/admin/types.ts` — all admin types
- `src/queries/admin/service.ts` — all admin API calls
- `src/queries/admin/hooks.ts` — all admin hooks
- `src/queries/admin/keys.ts` — query keys
- `src/queries/admin/index.ts` — barrel export

### Task 2.2 — Create admin layout with role guard

**Files:**

- `src/routes/admin.tsx` — layout with admin check + admin sidebar

### Task 2.3 — Create admin dashboard

**Files:**

- `src/routes/admin.index.tsx` — stats overview

### Task 2.4 — Questions CRUD views

**Files:**

- `src/routes/admin.questions.tsx` — list
- `src/routes/admin.questions_.new.tsx` — create form
- `src/routes/admin.questions.$id.tsx` — edit form

### Task 2.5 — Categories CRUD views

**Files:**

- `src/routes/admin.categories.tsx` — list
- `src/routes/admin.categories_.new.tsx` — create form
- `src/routes/admin.categories.$id.tsx` — edit form

### Task 2.6 — Users management

**Files:**

- `src/routes/admin.users.tsx` — list
- `src/routes/admin.users.$id.tsx` — edit form

### Task 2.7 — Payments views

**Files:**

- `src/routes/admin.payments.tsx` — list
- `src/routes/admin.payments.$id.tsx` — detail

### Task 2.8 — Add admin link to app sidebar

**Files:**

- `src/components/layout/app-shell.tsx` — add admin nav item (role-gated)

### Task 2.9 — Regenerate route tree

**Command:** `npx tsc --noEmit && npx @tanstack/router-plugin` (or the dev server auto-generates)
