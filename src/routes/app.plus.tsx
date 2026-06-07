import { createFileRoute } from "@tanstack/react-router";
import { PlusPage } from "#/components/pages/plus-page";

export const Route = createFileRoute("/app/plus")({
  component: PlusPage,
});
