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
					"Preparate para el examen de residencia médica con cientos de preguntas reales, feedback inmediato y estadísticas detalladas. Gratis.",
			},
			{ name: "keywords", content: "residencia médica, preparación residencia, examen residencia, medicina, caduceo" },
			{ name: "author", content: "Nevex Labs" },
			{ name: "robots", content: "index, follow" },
			{ property: "og:title", content: "Caduceo — Practicá para tu residencia médica" },
			{ property: "og:description", content: "Preparate para el examen de residencia médica con cientos de preguntas reales." },
			{ property: "og:image", content: "https://caduceus-web-mu.vercel.app/logo512.png" },
			{ property: "og:url", content: "https://caduceus-web-mu.vercel.app" },
			{ property: "og:type", content: "website" },
			{ property: "og:locale", content: "es_AR" },
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:title", content: "Caduceo — Practicá para tu residencia médica" },
			{ name: "twitter:description", content: "Preparate para el examen de residencia médica con cientos de preguntas reales." },
			{ name: "twitter:image", content: "https://caduceus-web-mu.vercel.app/logo512.png" },
		],
		links: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
	}),
	errorComponent: RootErrorComponent,
	component: RootLayout,
});
