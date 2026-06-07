import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "#/components/layout/public-layout";
import { Button } from "#/components/ui/button";
import {
	Brain,
	BarChart3,
	FolderOpen,
	Crown,
	ArrowRight,
	CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/")({
	head: () => ({
		meta: [
			{ title: "Caduceo — Practicá para tu residencia médica" },
			{ name: "description", content: "Preparate para el examen de residencia médica con cientos de preguntas reales, feedback inmediato y estadísticas detalladas. Gratis." },
			{ property: "og:title", content: "Caduceo — Practicá para tu residencia médica" },
			{ property: "og:description", content: "Preparate para el examen de residencia médica gratis con cientos de preguntas reales." },
		],
	}),
	component: LandingPage,
});

const features = [
	{
		icon: Brain,
		title: "Modo práctica",
		desc: "Preguntas aleatorias por especialidad con feedback inmediato y explicación detallada.",
	},
	{
		icon: FolderOpen,
		title: "Todas las especialidades",
		desc: "Clínica, cardio, neuro, pediatría, cirugía y más. Organizado por categorías.",
	},
	{
		icon: BarChart3,
		title: "Estadísticas",
		desc: "Seguí tu progreso, aciertos por categoría y evolución en el tiempo.",
	},
	{
		icon: Crown,
		title: "Banco completo",
		desc: "Cientos de preguntas reales de exámenes de residencia desde 2019.",
	},
];

function LandingPage() {
	return (
		<PublicLayout>
			<section className="mx-auto max-w-6xl px-4 pt-20 pb-16 md:pt-32 md:pb-24">
				<div className="mx-auto max-w-3xl text-center">
					<div className="inline-flex items-center gap-2 rounded-full border bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-8">
						<CheckCircle2 className="h-4 w-4" />
						Preparación para residencias médicas
					</div>

					<h1 className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
						Practicá para tu
						<span className="block text-primary">residencia médica</span>
					</h1>

					<p className="mt-6 text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
						Cientos de preguntas reales de exámenes de residencia con feedback
						inmediato, estadísticas y modo práctica por especialidad.
					</p>

					<div className="mt-10 flex flex-wrap justify-center gap-4">
						<Link to="/auth/register">
							<Button size="lg" className="gap-2">
								Empezar gratis <ArrowRight className="h-4 w-4" />
							</Button>
						</Link>
						<Link to="/auth/login">
							<Button variant="outline" size="lg">
								Ya tengo cuenta
							</Button>
						</Link>
						<Link to="/como-funciona">
							<Button variant="ghost" size="lg">
								Cómo funciona
							</Button>
						</Link>
					</div>
				</div>
			</section>

			<section className="mx-auto max-w-6xl px-4 pb-24">
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
					{features.map((f) => (
						<div
							key={f.title}
							className="rounded-xl border bg-card p-6 transition-colors hover:border-primary/20"
						>
							<f.icon className="mb-4 h-8 w-8 text-primary" />
							<h3 className="mb-2 font-semibold">{f.title}</h3>
							<p className="text-sm text-muted-foreground">{f.desc}</p>
						</div>
					))}
				</div>
			</section>

			<footer className="border-t py-8 text-center text-sm text-muted-foreground">
				<div className="mx-auto max-w-6xl px-4">
					<p>Caduceo — Preparación para el examen de residencia médica</p>
					<div className="mt-3 flex flex-wrap justify-center gap-4">
						<Link
							to="/privacidad"
							className="hover:text-foreground transition-colors"
						>
							Política de Privacidad
						</Link>
						<Link
							to="/terminos"
							className="hover:text-foreground transition-colors"
						>
							Términos del Servicio
						</Link>
						<Link
							to="/como-funciona"
							className="hover:text-foreground transition-colors"
						>
							Cómo funciona
						</Link>
					</div>
				</div>
				<p className="mt-6 text-xs text-muted-foreground/60">
					Desarrollado por{" "}
					<a
						href="https://www.nevex-labs.com"
						target="_blank"
						rel="noopener noreferrer"
						className="hover:text-foreground transition-colors"
					>
						Nevex Labs
					</a>
				</p>
			</footer>
		</PublicLayout>
	);
}
