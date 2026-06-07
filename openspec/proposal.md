# SDD Proposal — Caduceo Web

## Problem

La app frontend no tiene:

1. Vista de detalle de pregunta individual (existe el endpoint, no la UI)
2. Panel de administración para gestionar preguntas, categorías, usuarios y pagos

## Proposed Solution

### 1. Question Detail View

- Nueva ruta: `/app/questions/:id`
- Muestra: body, options, correct_answer, explanation
- Llamada a `GET /api/v1/questions/:id`
- Servicio + hook + types en `queries/questions/`

### 2. Admin Panel

- Nuevo layout `/admin` con sidebar propia y guard de rol (`role === 1`)
- Módulos dentro de admin:
  - **Questions**: list, create, edit, delete
  - **Categories**: list, create, edit, delete
  - **Users**: list, detail, edit
  - **Payments**: list, detail
- API queries nuevas bajo `queries/admin/`
- Sidebar de la app principal muestra enlace a admin si el user es admin

### Non-goals

- No se toca el backend (los endpoints ya existen)
- No se cambian los estilos existentes de la app
- No se agregan tests (el proyecto no tiene test setup)

## Risks

- **Review workload**: admin panel es ~400+ líneas de componentes nuevos. Evaluar si dividir en PRs encadenados.
- **Type consistency**: admin responses incluyen `created_at`, `updated_at`, `correct_answer` — hay que tiparlos correctamente.

## Next

- Spec: definir tipos exactos y contratos de cada endpoint admin
- Design: wireframes de cada pantalla admin
