import { createFileRoute } from "@tanstack/react-router";
import { AdminCategoriesList } from "#/components/pages/admin/categories-list";

export const Route = createFileRoute("/admin/categories")({
  component: AdminCategoriesList,
});
