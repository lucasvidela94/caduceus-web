import { createFileRoute } from "@tanstack/react-router";
import { ProgressPage } from "#/components/pages/progress-page";

export const Route = createFileRoute("/app/progreso")({
  component: ProgressPage,
});
