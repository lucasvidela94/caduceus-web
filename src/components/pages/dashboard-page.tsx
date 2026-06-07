import { Link } from "@tanstack/react-router";
import { useSession } from "#/queries/auth";
import { useProgress } from "#/queries/progress";
import { useCategories } from "#/queries/categories";
import { Card } from "#/components/ui/card";
import { Button } from "#/components/ui/button";
import { Brain, BarChart3, ArrowRight } from "lucide-react";

export function DashboardPage() {
  const { data: user } = useSession();
  const { data: progress } = useProgress();
  const { data: categories } = useCategories();

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Hola, {user?.name}</h1>
        <p className="mt-1 text-muted-foreground">
          {user?.tier === 1
            ? "Tenés acceso completo al banco de preguntas."
            : "Accedé a preguntas gratis o desbloqueá el banco completo."}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <Brain className="h-8 w-8 text-primary" />
            <div>
              <p className="text-2xl font-bold">{progress?.total_answered ?? 0}</p>
              <p className="text-sm text-muted-foreground">Respondidas</p>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-primary" />
            <div>
              <p className="text-2xl font-bold">{progress?.accuracy ?? 0}%</p>
              <p className="text-sm text-muted-foreground">Aciertos</p>
            </div>
          </div>
        </Card>

        <Card className="p-5 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Caduceo" className="h-10 w-auto" />
            <div>
              <p className="text-2xl font-bold">{categories?.length ?? 0}</p>
              <p className="text-sm text-muted-foreground">Especialidades</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Empezá a practicar</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Respondé preguntas al azar o elegí una especialidad
            </p>
          </div>
          <Link to="/app/quiz">
            <Button className="gap-2">
              Practicar <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </Card>

      {categories && categories.length > 0 && (
        <div>
          <h2 className="mb-4 text-lg font-semibold">Especialidades</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categories.slice(0, 6).map((cat) => (
              <Link key={cat.id} to="/app/categorias">
                <Card className="p-4 transition-colors hover:border-primary/20">
                  <h3 className="font-medium">{cat.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {cat.question_count} preguntas
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
