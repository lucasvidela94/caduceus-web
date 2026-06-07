import { createFileRoute } from "@tanstack/react-router";
import { AdminEditCategory } from "#/components/pages/admin/edit-category";

export const Route = createFileRoute("/admin/categories_/$id")({
  component: AdminEditCategory,
});
