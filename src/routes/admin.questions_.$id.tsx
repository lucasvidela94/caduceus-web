import { createFileRoute } from "@tanstack/react-router";
import { AdminEditQuestion } from "#/components/pages/admin/edit-question";

export const Route = createFileRoute("/admin/questions_/$id")({
  component: AdminEditQuestion,
});
