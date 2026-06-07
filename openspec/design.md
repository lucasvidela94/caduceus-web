# SDD Design — Caduceo Web

## Design Direction

### Admin Panel Aesthetic

- **Tone:** Professional, data-dense, utilitarian. Same teal accent (`#0A5C6A`) as the main app but with a more compact layout.
- **Layout:** Full-width tables with sticky headers. Inline actions (edit/delete) as icon buttons.
- **Forms:** Side panel or modal for create/edit to stay on the same page.
- **Typography:** Same font stack as main app (Geist Variable).

### Question Detail Aesthetic

- **Tone:** Clean, focused, educational. Same card-based design as the quiz session.
- **Layout:** Single card showing the question, options highlighted (correct green, wrong red if applicable), explanation below.
- **Navigation:** Back link to quiz page.

## Component Tree

### Question Detail Page

```
AppLayout (sidebar)
└── QuestionDetailPage
    ├── BackButton ("← Volver a practicar")
    ├── QuestionCard
    │   ├── QuestionBody (text)
    │   ├── OptionsList
    │   │   └── OptionItem × 4 (highlighted correct answer)
    │   └── CorrectBadge
    ├── ExplanationCard
    │   └── ExplanationText
    └── MetadataRow (category, tier, year)
```

### Admin Panel

```
AdminLayout
├── AdminSidebar
│   ├── NavItem: Dashboard
│   ├── NavItem: Preguntas
│   ├── NavItem: Categorías
│   ├── NavItem: Usuarios
│   └── NavItem: Pagos
└── AdminContent
    ├── AdminDashboard
    │   ├── StatsCard: Total Questions
    │   ├── StatsCard: Total Users
    │   ├── StatsCard: Total Payments
    │   └── StatsCard: Revenue
    ├── QuestionsList
    │   ├── SearchBar
    │   ├── DataTable (id, body, category, tier, actions)
    │   └── Pagination
    ├── QuestionForm (create/edit)
    │   ├── Body (textarea)
    │   ├── Options (4 inputs: a/b/c/d)
    │   ├── CorrectAnswer (select)
    │   ├── Category (select)
    │   ├── Tier (toggle free/plus)
    │   ├── Explanation (textarea)
    │   └── Year (optional input)
    ├── CategoriesList
    │   ├── DataTable (name, slug, actions)
    │   └── CreateButton → inline form
    ├── UsersList
    │   ├── DataTable (name, email, role, tier, actions)
    │   └── UserEditForm (role, tier toggles)
    └── PaymentsList
        ├── DataTable (id, user, amount, status, date)
        └── PaymentDetail (full info)
```

## Data Flow

```
TanStack Query → service.ts → api helper → Backend
       ↕
   hooks.ts → components (loading/error/data states)
```

### Key States per Component

- **Loading:** Skeleton cards/tables
- **Error:** Alert with retry button
- **Empty:** Empty state with CTA
- **Success:** Data rendered

## Navigation Flow

```
App Sidebar
  ├── Panel (/app)
  ├── Practicar (/app/quiz)
  ├── Progreso (/app/progreso)
  ├── Categorías (/app/categorias)
  ├── Plus (/app/plus)
  ├── Ajustes (/app/ajustes)
  └── Admin (/admin) ← NEW (only if role === 1)

Admin Sidebar
  ├── Dashboard (/admin)
  ├── Preguntas (/admin/questions)
  ├── Categorías (/admin/categories)
  ├── Usuarios (/admin/users)
  └── Pagos (/admin/payments)
```
