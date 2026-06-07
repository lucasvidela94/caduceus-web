# SDD Spec — Caduceo Web

## 1. Question Detail View

### Route

- **Path:** `/app/questions/$id`
- **File:** `src/routes/app/questions.$id.tsx`
- **Layout:** Inherits from `/app` (sidebar)

### API

- **Method:** `GET /api/v1/questions/:id`
- **Auth:** Bearer token required
- **Response:**

```ts
interface QuestionDetail {
  id: string;
  category_id: string;
  body: string;
  options: Record<"a" | "b" | "c" | "d", string>;
  correct_answer: string;
  explanation: string | null;
  tier: number;
  year: number | null;
}
```

### Types

Add to `src/queries/questions/types.ts`:

```ts
export type QuestionDetail = Question & {
  correct_answer: string;
  explanation: string | null;
};
```

### Service

Add to `src/queries/questions/service.ts`:

```ts
export const getQuestion = async (id: string): Promise<QuestionDetail> => {
  return api.get<QuestionDetail>(`/api/v1/questions/${id}`);
};
```

### Hook

Add to `src/queries/questions/hooks.ts`:

```ts
export const useQuestion = (id: string) => {
  return useQuery<QuestionDetail>({
    queryKey: questionKeys.detail(id),
    queryFn: () => getQuestion(id),
    enabled: !!id,
  });
};
```

### Key

Add to `src/queries/questions/keys.ts`:

```ts
detail: (id: string) => [...questionKeys.all, 'detail', id] as const,
```

### UI

- Card con el body de la pregunta
- Opciones (a/b/c/d) con highlight de la correcta
- Explanation debajo
- Botón "Volver" o link a `/app/quiz`
- El frontend-design skill define el look exacto

---

## 2. Admin Panel

### Route Structure

```
/admin                  → admin layout (role guard + sidebar)
/admin/                → Admin dashboard (stats overview)
/admin/questions       → Questions CRUD
/admin/questions/:id   → Edit question
/admin/questions/new   → Create question
/admin/categories     → Categories list
/admin/categories/:id → Edit category
/admin/categories/new → Create category
/admin/users          → Users list
/admin/users/:id      → Edit user
/admin/payments       → Payments list
/admin/payments/:id   → Payment detail
```

### API Contracts (Admin)

#### Questions

| Method   | Path                   | Response          |
| -------- | ---------------------- | ----------------- |
| `GET`    | `/admin/questions`     | `AdminQuestion[]` |
| `POST`   | `/admin/questions`     | `AdminQuestion`   |
| `GET`    | `/admin/questions/:id` | `AdminQuestion`   |
| `PUT`    | `/admin/questions/:id` | `AdminQuestion`   |
| `DELETE` | `/admin/questions/:id` | `204`             |

```ts
interface AdminQuestion {
  id: string;
  category_id: string;
  body: string;
  options: Record<string, string>;
  correct_answer: string;
  explanation: string | null;
  tier: number;
  year: number | null;
  created_at: string;
  updated_at: string;
}

interface CreateQuestionInput {
  categoryId: string;
  body: string;
  options: Record<string, string>;
  correctAnswer: string;
  explanation?: string | null;
  tier: number;
  year?: number | null;
}
```

#### Categories

| Method   | Path                    | Response          |
| -------- | ----------------------- | ----------------- |
| `GET`    | `/admin/categories`     | `AdminCategory[]` |
| `POST`   | `/admin/categories`     | `AdminCategory`   |
| `GET`    | `/admin/categories/:id` | `AdminCategory`   |
| `PUT`    | `/admin/categories/:id` | `AdminCategory`   |
| `DELETE` | `/admin/categories/:id` | `204`             |

```ts
interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

interface CreateCategoryInput {
  name: string;
  slug: string;
  description?: string | null;
}
```

#### Users

| Method | Path               | Response      |
| ------ | ------------------ | ------------- |
| `GET`  | `/admin/users`     | `AdminUser[]` |
| `GET`  | `/admin/users/:id` | `AdminUser`   |
| `PUT`  | `/admin/users/:id` | `AdminUser`   |

```ts
interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: number;
  tier: number;
  created_at: string;
  updated_at: string;
}

interface UpdateUserInput {
  name: string;
  email: string;
  role: number;
  tier: number;
}
```

#### Payments

| Method | Path                  | Response         |
| ------ | --------------------- | ---------------- |
| `GET`  | `/admin/payments`     | `AdminPayment[]` |
| `GET`  | `/admin/payments/:id` | `AdminPayment`   |

```ts
export interface AdminPayment {
  id: string;
  user_id: string;
  mp_preference_id: string | null;
  mp_payment_id: string | null;
  status: string;
  amount: number;
  created_at: string;
  updated_at: string;
}
```

### Admin Layout

- New layout file `src/routes/admin.tsx` with admin guard + sidebar
- Sidebar with nav: Dashboard, Questions, Categories, Users, Payments
- Each section uses table/list view with inline action buttons
- Forms for create/edit use shadcn/ui components

### Auth Guard for Admin

- Check `user.role === 1` on admin layout
- Redirect to `/app` if not admin
- Llamar `useSession()` en el layout

### Folder Structure

```
src/
  routes/
    admin.tsx                       → admin layout
    admin.index.tsx                 → admin dashboard
    admin.questions.tsx             → questions list
    admin.questions_.new.tsx        → create question
    admin.questions.$id.tsx         → edit question
    admin.categories.tsx            → categories list
    admin.categories_.new.tsx       → create category
    admin.categories.$id.tsx        → edit category
    admin.users.tsx                 → users list
    admin.users.$id.tsx             → edit user
    admin.payments.tsx              → payments list
    admin.payments.$id.tsx          → payment detail
  queries/
    admin/
      index.ts
      keys.ts
      types.ts
      hooks.ts
      service.ts
```

### Sidebar Nav Update

- Add "Admin" item to `app-shell.tsx` sidebar, visible only when `user.role === 1`
- Link to `/admin`
