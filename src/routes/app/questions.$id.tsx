import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useQuestion } from "#/queries/questions";
import { Card } from "#/components/ui/card";
import { Button } from "#/components/ui/button";
import { ArrowLeft, CheckCircle2, BookOpen } from "lucide-react";

export const Route = createFileRoute("/app/questions/$id")({
	component: QuestionDetailPage,
});

const OPTIONS = ["a", "b", "c", "d"] as const;

function QuestionDetailPage() {
	const { id } = useParams({ from: "/app/questions/$id" });
	const { data: question, isLoading } = useQuestion(id);

	if (isLoading) {
		return (
			<div className="mx-auto max-w-2xl space-y-4 pt-8">
				<div className="h-6 w-32 animate-pulse rounded bg-muted" />
				<Card className="p-6">
					<div className="mb-4 h-6 w-3/4 animate-pulse rounded bg-muted" />
					<div className="space-y-3">
						{[1, 2, 3, 4].map((i) => (
							<div key={i} className="h-14 animate-pulse rounded-xl bg-muted" />
						))}
					</div>
				</Card>
			</div>
		);
	}

	if (!question) {
		return (
			<div className="mx-auto max-w-2xl pt-12 text-center">
				<Card className="p-8">
					<BookOpen className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />
					<h2 className="text-lg font-semibold">Pregunta no encontrada</h2>
					<p className="mt-1 text-sm text-muted-foreground">
						Esta pregunta no existe o no está disponible.
					</p>
					<Link to="/app/quiz" className="mt-5 inline-block">
						<Button variant="outline" className="gap-2">
							<ArrowLeft className="h-4 w-4" />
							Volver a practicar
						</Button>
					</Link>
				</Card>
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-2xl space-y-6">
			{/* Back link */}
			<Link
				to="/app/quiz"
				className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
			>
				<ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
				Volver a practicar
			</Link>

			{/* Question card */}
			<Card className="p-6">
				<div className="mb-4 flex items-center gap-3">
					<span className="rounded-md bg-[#0A5C6A]/10 px-2.5 py-1 text-xs font-semibold text-[#0A5C6A]">
						{question.tier === 1 ? "PLUS" : "FREE"}
					</span>
					{question.year && (
						<span className="text-xs text-muted-foreground">
							{question.year}
						</span>
					)}
				</div>

				<h2 className="text-lg font-medium leading-relaxed">{question.body}</h2>
			</Card>

			{/* Options */}
			<div className="space-y-3">
				{OPTIONS.map((opt) => {
					const isCorrect = question.correct_answer === opt;
					return (
						<div
							key={opt}
							className={`flex items-start gap-3 rounded-xl border p-4 ${
								isCorrect ? "border-success bg-success/5" : "border-border"
							}`}
						>
							<span
								className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-medium ${
									isCorrect
										? "bg-success text-success-foreground"
										: "bg-muted text-muted-foreground"
								}`}
							>
								{isCorrect ? (
									<CheckCircle2 className="h-4 w-4" />
								) : (
									opt.toUpperCase()
								)}
							</span>
							<span className="pt-0.5">{question.options[opt]}</span>
						</div>
					);
				})}
			</div>

			{/* Explanation */}
			{question.explanation && (
				<Card className="border-l-4 border-[#0A5C6A] bg-[#0A5C6A]/5 p-5">
					<h3 className="mb-2 text-sm font-semibold text-[#0A5C6A]">
						Explicación
					</h3>
					<p className="text-sm leading-relaxed text-muted-foreground">
						{question.explanation}
					</p>
				</Card>
			)}

			{/* Action */}
			<div className="flex justify-center">
				<Link to="/app/quiz">
					<Button className="gap-2">
						<ArrowLeft className="h-4 w-4" />
						Seguir practicando
					</Button>
				</Link>
			</div>
		</div>
	);
}
