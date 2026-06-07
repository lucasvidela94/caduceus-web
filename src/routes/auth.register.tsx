import { createFileRoute } from "@tanstack/react-router";
import { RegisterPage } from "#/components/pages/auth-register";

export const Route = createFileRoute("/auth/register")({
  head: () => ({
    meta: [
      {
        title: "Creá tu cuenta gratis en Caduceo — Preparación para residencia",
      },
      {
        name: "description",
        content:
          "Registrate gratis en Caduceo y empezá a practicar con cientos de preguntas reales de examen de residencia médica.",
      },
    ],
  }),
  component: RegisterPage,
});
