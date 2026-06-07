import { createFileRoute } from "@tanstack/react-router";
import { AdminNewQuestion } from "#/components/pages/admin/new-question";

export const Route = createFileRoute("/admin/questions_/new")({
  component: AdminNewQuestion,
});
