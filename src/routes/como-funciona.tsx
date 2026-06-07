import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "#/components/layout/public-layout";
import { Button } from "#/components/ui/button";
import { Separator } from "#/components/ui/separator";
import {
	GraduationCap,
	FileText,
	ShieldCheck,
	Brain,
	ChevronDown,
	ArrowRight,
	Sparkles,
	BookOpen,
	BarChart3,
	CheckCircle2,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/como-funciona")({
	component: ComoFuncionaPage,
});

const steps = [
	{
		icon: BookOpen,
		title: "Elegí tu especialidad",
		desc: "Seleccioná la categoría que querés practicar: clínica, cirugía, neurología, pediatría y más.",
	},
	{
		icon: Brain,
		title: "Respondé preguntas",
		desc: "Modo práctica con preguntas aleatorias. Al responder ves al instante si acertaste, con explicación detallada.",
	},
	{
		icon: BarChart3,
		title: "Seguí tu progreso",
		desc: "Estadísticas por especialidad, aciertos, rachas y evolución en el tiempo.",
	},
];

const faqs = [
	{
		q: "¿De dónde vienen las preguntas?",
		a: "Las preguntas provienen de exámenes reales de residencias médicas, extraídas de materiales de estudio como los módulos del CEAR (Curso de Especialización en Áreas de la Residencia). El contenido cubre neurología, cirugía, y exámenes integradores, entre otros.",
	},
	{
		q: "¿Son preguntas reales de exámenes de residencia?",
		a: "Sí. Los materiales fuente son exámenes y módulos de estudio utilizados en la preparación para el concurso de residencias médicas. Todo el contenido fue extraído de PDFs originales y curado manualmente.",
	},
	{
		q: "¿Cada cuánto se actualiza el banco de preguntas?",
		a: "El banco se actualiza periódicamente a medida que disponemos de nuevos materiales. Nuestro objetivo es cubrir todas las especialidades y los últimos años de exámenes.",
	},
	{
		q: "¿Cuánto cuesta?",
		a: "Caduceo es gratuito con acceso a una selección de preguntas. El plan Caduceo Plus (un único pago de $18.000 ARS) desbloquea el banco completo de preguntas, todas las especialidades y estadísticas detalladas.",
	},
	{
		q: "¿Es único pago o suscripción?",
		a: "Es único pago. Pagás una sola vez y tenés acceso permanente al banco completo de preguntas. Sin renovaciones ni cargos recurrentes.",
	},
	{
		q: "¿Necesito instalar algo?",
		a: "No. Caduceo funciona directo en el navegador. Entrás desde cualquier dispositivo con internet.",
	},
	{
		q: "¿Tienen app mobile?",
		a: "Todavía no, pero la web es responsive y funciona bien en celulares y tablets. Una app nativa está en planes futuros.",
	},
	{
		q: "¿Cómo puedo contactarlos?",
		a: "Si tenés dudas, sugerencias, o querés reportar un error, mandanos un mensaje. Estamos mejorando la plataforma constantemente con el feedback de los usuarios.",
	},
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
	const [open, setOpen] = useState(false);

	return (
		<div className="border-b border-border/40 last:border-0">
			<button
				type="button"
				onClick={() => setOpen(!open)}
				className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-foreground/80"
			>
				<span className="text-base font-medium">{question}</span>
				<ChevronDown
					className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
						open ? "rotate-180" : ""
					}`}
				/>
			</button>
			<div
				className={`overflow-hidden transition-all duration-200 ${
					open ? "max-h-96 pb-5" : "max-h-0"
				}`}
			>
				<p className="text-sm leading-relaxed text-muted-foreground">
					{answer}
				</p>
			</div>
		</div>
	);
}

function ComoFuncionaPage() {
	return (
		<PublicLayout>
			{/* Hero */}
			<section className="mx-auto max-w-4xl px-4 pt-20 pb-12 text-center md:pt-28 md:pb-16">
				<div className="inline-flex items-center gap-2 rounded-full border bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-6">
					<Sparkles className="h-4 w-4" />
					Transparencia total
				</div>
				<h1 className="text-3xl font-bold tracking-tight md:text-5xl">
					Cómo funciona Caduceo
				</h1>
				<p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
					Preparate para el examen de residencia médica con preguntas reales,
					feedback inmediato y estadísticas detalladas.
				</p>
			</section>

			{/* How it works */}
			<section className="mx-auto max-w-5xl px-4 pb-16">
				<div className="grid gap-6 md:grid-cols-3">
					{steps.map((step, i) => (
						<div
							key={step.title}
							className="relative rounded-xl border bg-card p-6"
						>
							<div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
								<step.icon className="h-5 w-5" />
							</div>
							<div className="mb-2 flex items-center gap-2">
								<span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
									{i + 1}
								</span>
								<h3 className="font-semibold">{step.title}</h3>
							</div>
							<p className="text-sm text-muted-foreground">{step.desc}</p>
						</div>
					))}
				</div>
			</section>

			<Separator className="max-w-3xl mx-auto" />

			{/* Source of truth */}
			<section className="mx-auto max-w-3xl px-4 py-16">
				<div className="text-center mb-10">
					<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
						<ShieldCheck className="h-6 w-6" />
					</div>
					<h2 className="text-2xl font-bold tracking-tight md:text-3xl">
						¿De dónde vienen las preguntas?
					</h2>
					<p className="mt-3 text-muted-foreground">
						Creemos en la transparencia. Todo el contenido tiene una fuente
						verificable.
					</p>
				</div>

				<div className="space-y-6">
					<div className="rounded-xl border bg-card p-6">
						<div className="flex items-start gap-4">
							<FileText className="mt-1 h-5 w-5 shrink-0 text-primary" />
							<div>
								<h3 className="font-semibold mb-1">Materiales originales</h3>
								<p className="text-sm text-muted-foreground">
									Las preguntas fueron extraídas de exámenes y materiales de
									estudio reales utilizados en la preparación para el concurso
									de residencias médicas en Argentina. Los PDFs fuente incluyen
									módulos de neurología, cirugía y exámenes integradores.
								</p>
							</div>
						</div>
					</div>

					<div className="rounded-xl border bg-card p-6">
						<div className="flex items-start gap-4">
							<CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-500" />
							<div>
								<h3 className="font-semibold mb-1">Curado y verificado</h3>
								<p className="text-sm text-muted-foreground">
									Cada pregunta fue revisada y clasificada por especialidad. Las
									respuestas correctas están siendo validadas contra los
									materiales originales para garantizar su precisión.
								</p>
							</div>
						</div>
					</div>

					<div className="rounded-xl border bg-card p-6">
						<div className="flex items-start gap-4">
							<GraduationCap className="mt-1 h-5 w-5 shrink-0 text-primary" />
							<div>
								<h3 className="font-semibold mb-1">Cobertura actual</h3>
								<p className="text-sm text-muted-foreground">
									Hoy contamos con preguntas de neurología, cirugía y exámenes
									integradores del Módulo II. Estamos trabajando para agregar
									más especialidades y exámenes de años anteriores.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<Separator className="max-w-3xl mx-auto" />

			{/* FAQ */}
			<section className="mx-auto max-w-3xl px-4 py-16">
				<div className="text-center mb-10">
					<h2 className="text-2xl font-bold tracking-tight md:text-3xl">
						Preguntas frecuentes
					</h2>
					<p className="mt-3 text-muted-foreground">
						Todo lo que necesitás saber antes de empezar.
					</p>
				</div>

				<div className="rounded-xl border bg-card px-6">
					{faqs.map((faq) => (
						<FaqItem key={faq.q} question={faq.q} answer={faq.a} />
					))}
				</div>
			</section>

			{/* CTA */}
			<section className="mx-auto max-w-3xl px-4 pb-20">
				<div className="rounded-2xl bg-primary/5 border border-primary/20 p-8 md:p-12 text-center">
					<h2 className="text-2xl font-bold tracking-tight md:text-3xl">
						Empezá a practicar gratis
					</h2>
					<p className="mt-3 text-muted-foreground max-w-lg mx-auto">
						No necesás tarjeta de crédito. Creá tu cuenta y accedé a las
						preguntas de muestra al instante.
					</p>
					<div className="mt-6 flex flex-wrap justify-center gap-4">
						<Link to="/auth/register">
							<Button size="lg" className="gap-2">
								Crear cuenta gratis <ArrowRight className="h-4 w-4" />
							</Button>
						</Link>
						<Link to="/auth/login">
							<Button variant="outline" size="lg">
								Ya tengo cuenta
							</Button>
						</Link>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="border-t py-8 text-center text-sm text-muted-foreground">
				Caduceo — Preparación para el examen de residencia médica
			</footer>
		</PublicLayout>
	);
}
