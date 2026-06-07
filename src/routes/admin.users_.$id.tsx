import { createFileRoute } from "@tanstack/react-router";
import { AdminEditUser } from "#/components/pages/admin/edit-user";

export const Route = createFileRoute("/admin/users_/$id")({
  component: AdminEditUser,
});
