import { Link } from "@tanstack/react-router";
import {
	useAdminQuestions,
	useDeleteAdminQuestion,
	useAdminCategories,
} from "#/queries/admin";
import { Card } from "#/components/ui/card";
import { Button } from "#/components/ui/button";
import { Badge } from "#/components/ui/badge";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";

export function AdminQuestionsList() {
	const { data: questions, isLoading } = useAdminQuestions();
	const { data: categories } = useAdminCategories();
	const deleteQ = useDeleteAdminQuestion();

	const categoryMap = new Map(categories?.map((c) => [c.id, c.name]) ?? []);

	const handleDelete = (id: string, body: string) => {
		if (window.confirm(`¿Eliminar "${body.slice(0, 60)}..."?`)) {
			deleteQ.mutate(id);
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold tracking-tight">Preguntas</h1>
					<p className="mt-1 text-muted-foreground">
						Gestioná el banco de preguntas.
					</p>
				</div>
				<Button asChild className="gap-2">
					<Link to="/admin/questions/new">
						<Plus className="h-4 w-4" />
						Nueva pregunta
					</Link>
				</Button>
			</div>

			{isLoading ? (
				<Card className="flex items-center justify-center gap-2 p-8">
					<Loader2 className="h-4 w-4 animate-spin" />
					<p className="text-sm text-muted-foreground">Cargando preguntas...</p>
				</Card>
			) : !questions || questions.length === 0 ? (
				<Card className="p-8 text-center">
					<p className="text-muted-foreground">No hay preguntas todavía.</p>
					<Button asChild variant="outline" size="sm" className="gap-2 mt-3">
						<Link to="/admin/questions/new">
							<Plus className="h-4 w-4" />
							Crear primera pregunta
						</Link>
					</Button>
				</Card>
			) : (
				<div className="overflow-hidden rounded-xl border border-border/40">
					<table className="w-full">
						<thead>
							<tr className="border-b border-border/40 bg-muted/50 text-left text-sm font-medium text-muted-foreground">
								<th className="px-4 py-3">Pregunta</th>
								<th className="px-4 py-3">Categoría</th>
								<th className="px-4 py-3">Tier</th>
								<th className="px-4 py-3 text-right">Acciones</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-border/40">
							{questions.map((q) => (
								<tr
									key={q.id}
									className="group text-sm transition-colors hover:bg-muted/30"
								>
									<td className="max-w-xs truncate px-4 py-3 font-medium">
										{q.body}
									</td>
									<td className="px-4 py-3 text-muted-foreground">
										{categoryMap.get(q.category_id) ?? (
											<code className="rounded bg-muted px-1.5 py-0.5 text-xs">
												{q.category_id.slice(0, 8)}...
											</code>
										)}
									</td>
									<td className="px-4 py-3">
										<Badge
											variant={q.tier === 1 ? "default" : "secondary"}
											className="text-xs"
										>
											{q.tier === 1 ? "Plus" : "Free"}
										</Badge>
									</td>
									<td className="px-4 py-3 text-right">
										<div className="flex justify-end gap-1">
											<Button
												asChild
												variant="ghost"
												size="icon"
												className="h-8 w-8"
												aria-label="Editar"
											>
												<Link to="/admin/questions/$id" params={{ id: q.id }}>
													<Pencil className="h-4 w-4" />
												</Link>
											</Button>
											<Button
												variant="ghost"
												size="icon"
												className="h-8 w-8 text-destructive"
												onClick={() => handleDelete(q.id, q.body)}
												aria-label="Eliminar"
											>
												<Trash2 className="h-4 w-4" />
											</Button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}
