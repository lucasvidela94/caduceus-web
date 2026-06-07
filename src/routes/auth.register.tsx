import { createFileRoute } from "@tanstack/react-router";
import { RegisterPage } from "#/components/pages/auth-register";

export const Route = createFileRoute("/auth/register")({
  component: RegisterPage,
});
