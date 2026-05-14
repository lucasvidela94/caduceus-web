import { Button } from '#/components/ui/button'
import { Card } from '#/components/ui/card'
import { RotateCcw, BarChart3 } from 'lucide-react'

function getInsight(accuracy: number) {
  if (accuracy === 100) return { title: '¡Perfecto!', text: 'Dominás esta tanda. Aumentá el ritmo y probá con más preguntas.' }
  if (accuracy >= 80) return { title: '¡Muy bien!', text: 'Seguí así. Repetir ejercicios ayuda a fijar conceptos a largo plazo.' }
  if (accuracy >= 60) return { title: 'Buen avance', text: 'Revisá las preguntas que tuviste incorrectas para identificar temas que repasar.' }
  if (accuracy >= 1) return { title: 'Áreas de mejora', text: 'Repasá las explicaciones de las preguntas que fallaste. Cada error te acerca al aprendizaje.' }
  return { title: 'Primer paso', text: 'Todos empiezan así. Revisá los conceptos y volvé a intentarlo.' }
}

export function SessionResults({
  correct,
  total,
  onNewPractice,
  onViewProgress,
}: {
  correct: number
  total: number
  onNewPractice?: () => void
  onViewProgress?: () => void
}) {
  const incorrect = total - correct
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0
  const insight = getInsight(accuracy)

  return (
    <div className="mx-auto max-w-2xl pt-12 text-center">
      <Card className="p-8">
        <h2 className="text-2xl font-bold tracking-tight">¡Sesión completada!</h2>

        <div className="mt-8">
          <div className="text-6xl font-bold text-[#0A5C6A]">
            {correct}/{total}
          </div>
          <p className="mt-2 text-muted-foreground">respuestas correctas</p>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="rounded-xl bg-success/5 p-3">
            <p className="text-lg font-bold text-success">{correct}</p>
            <p className="text-xs text-muted-foreground">Correctas</p>
          </div>
          <div className="rounded-xl bg-destructive/5 p-3">
            <p className="text-lg font-bold text-destructive">{incorrect}</p>
            <p className="text-xs text-muted-foreground">Incorrectas</p>
          </div>
          <div className="rounded-xl bg-[#0A5C6A]/5 p-3">
            <p className="text-lg font-bold text-[#0A5C6A]">{accuracy}%</p>
            <p className="text-xs text-muted-foreground">Aciertos</p>
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-muted/50 p-4 text-left">
          <p className="text-sm font-semibold">{insight.title}</p>
          <p className="mt-1 text-sm text-muted-foreground">{insight.text}</p>
        </div>

        <div className="mt-8 flex justify-center gap-3">
          {onNewPractice && (
            <Button onClick={onNewPractice} className="gap-2">
              <RotateCcw className="h-4 w-4" /> Nueva práctica
            </Button>
          )}
          {onViewProgress && (
            <Button onClick={onViewProgress} variant="outline" className="gap-2">
              <BarChart3 className="h-4 w-4" /> Ver progreso
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}
