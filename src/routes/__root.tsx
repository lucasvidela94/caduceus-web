import { createRootRoute } from "@tanstack/react-router";
import { RootLayout, RootErrorComponent } from "#/components/pages/root-layout";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: "Caduceo — Practicá para tu residencia médica" },
			{
				name: "description",
				content:
					"Caduceo es la plataforma para estudiantes de medicina que se preparan para el examen de residencia. Preguntas reales, estadísticas y más.",
			},
		],
		links: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
	}),
	errorComponent: RootErrorComponent,
	component: RootLayout,
});
