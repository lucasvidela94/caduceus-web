import { createFileRoute } from "@tanstack/react-router";
import { AdminQuestionsList } from "#/components/pages/admin/questions-list";

export const Route = createFileRoute("/admin/questions")({
  component: AdminQuestionsList,
});
