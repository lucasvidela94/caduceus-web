import { ArrowRight } from "lucide-react";
import { Button } from "#/components/ui/button";
import { Card } from "#/components/ui/card";
import type { QuizSession } from "#/stores/quiz.store";

function getStats(session: QuizSession) {
  const answered = Object.keys(session.answers).length;
  const correct = Object.values(session.answers).filter((a) => a.correct).length;
  const accuracy = answered > 0 ? Math.round((correct / answered) * 100) : 0;
  return { answered, correct, accuracy };
}

export function ActiveSessionCard({
  session,
  onContinue,
}: {
  session: QuizSession;
  onContinue: () => void;
}) {
  const { answered, correct, accuracy } = getStats(session);
  const progress =
    session.questions.length > 0 ? (session.currentIndex / session.questions.length) * 100 : 0;

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center gap-2.5 bg-[#0A5C6A]/5 px-6 py-3.5">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0A5C6A]/40" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0A5C6A]" />
        </span>
        <h2 className="text-sm font-semibold text-[#0A5C6A]">Práctica en curso</h2>
      </div>

      <div className="p-6">
        <div className="mb-5 grid grid-cols-3 gap-4">
          <Stat value={answered} label="Respondidas" />
          <Stat value={correct} label="Correctas" className="text-success" />
          <Stat value={`${accuracy}%`} label="Aciertos" />
        </div>

        <div className="mb-5">
          <div className="mb-1.5 flex justify-between text-sm">
            <span className="text-muted-foreground">Progreso</span>
            <span className="font-medium">
              {session.currentIndex} / {session.questions.length}
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-[#0A5C6A] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <Button onClick={onContinue} className="w-full gap-2">
          Continuar práctica <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}

function Stat({
  value,
  label,
  className,
}: {
  value: string | number;
  label: string;
  className?: string;
}) {
  return (
    <div className="text-center">
      <p className={`text-2xl font-bold ${className ?? ""}`}>{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
