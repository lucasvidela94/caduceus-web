import { createFileRoute } from "@tanstack/react-router";
import { AdminNewCategory } from "#/components/pages/admin/new-category";

export const Route = createFileRoute("/admin/categories_/new")({
  component: AdminNewCategory,
});
