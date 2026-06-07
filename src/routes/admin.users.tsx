import { createFileRoute } from "@tanstack/react-router";
import { AdminUsersList } from "#/components/pages/admin/users-list";

export const Route = createFileRoute("/admin/users")({
  component: AdminUsersList,
});
