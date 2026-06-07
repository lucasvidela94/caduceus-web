import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useQuizStore } from "#/stores/quiz.store";
import { ActiveSessionCard } from "#/components/quiz/active-session-card";
import { Button } from "#/components/ui/button";
import { Card } from "#/components/ui/card";
import { Brain, ArrowRight, RotateCcw, BarChart3 } from "lucide-react";

export const Route = createFileRoute("/app/quiz/")({
  component: QuizEntry,
});

function useSessionStats() {
  const session = useQuizStore((s) => s.session);
  if (!session) return { session: null as null, answered: 0, correct: 0, accuracy: 0 };
  const answered = Object.keys(session.answers).length;
  const correct = Object.values(session.answers).filter((a) => a.correct).length;
  const accuracy = answered > 0 ? Math.round((correct / answered) * 100) : 0;
  return { session, answered, correct, accuracy };
}

function QuizEntry() {
  const navigate = useNavigate();
  const resetSession = useQuizStore((s) => s.resetSession);
  const { session, answered, correct, accuracy } = useSessionStats();

  const startNew = () => {
    resetSession();
    navigate({ to: "/app/quiz/session" });
  };

  if (!session) {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <Header />
        <Card className="p-8 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0A5C6A]/10">
            <Brain className="h-8 w-8 text-[#0A5C6A]" />
          </div>
          <h2 className="text-xl font-semibold">¿Listo para practicar?</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
            Te mostramos 10 preguntas al azar. Respondé, aprendé con las explicaciones y seguí tu
            progreso.
          </p>
          <Button onClick={startNew} className="mt-6 gap-2">
            Empezar práctica <ArrowRight className="h-4 w-4" />
          </Button>
        </Card>
        <p className="text-center text-xs text-muted-foreground">
          Las preguntas se guardan automáticamente. Podés salir y retomar después.
        </p>
      </div>
    );
  }

  if (session.completedAt) {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <Header />
        <Card className="overflow-hidden">
          <div className="border-b border-border/40 bg-muted/50 px-6 py-3.5">
            <h2 className="flex items-center gap-2 text-sm font-semibold">
              <BarChart3 className="h-4 w-4 text-primary" />
              Última sesión
            </h2>
          </div>
          <div className="p-6">
            <div className="mb-6 grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold">{answered}</p>
                <p className="text-xs text-muted-foreground">Preguntas</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-success">{correct}</p>
                <p className="text-xs text-muted-foreground">Correctas</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{accuracy}%</p>
                <p className="text-xs text-muted-foreground">Aciertos</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={startNew} variant="outline" className="flex-1 gap-2">
                <RotateCcw className="h-4 w-4" /> Nueva práctica
              </Button>
              <Link to="/app/progreso" className="flex-1">
                <Button variant="outline" className="w-full gap-2">
                  <BarChart3 className="h-4 w-4" /> Ver progreso
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Header />
      <ActiveSessionCard
        session={session}
        onContinue={() => navigate({ to: "/app/quiz/session" })}
      />
    </div>
  );
}

function Header() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Practicar</h1>
      <p className="mt-1 text-muted-foreground">
        Respondé preguntas de residencia y medí tu progreso.
      </p>
    </div>
  );
}
