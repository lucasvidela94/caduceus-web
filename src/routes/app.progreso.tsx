import { createFileRoute, Link } from '@tanstack/react-router'
import { useProgress } from '#/queries/progress'
import { useCategories } from '#/queries/categories'
import { useQuizStore } from '#/stores/quiz.store'
import { Card } from '#/components/ui/card'
import { Button } from '#/components/ui/button'
import { Brain, BarChart3, Target, ArrowRight, RotateCcw, Clock } from 'lucide-react'

export const Route = createFileRoute('/app/progreso')({
  component: ProgressPage,
})

function getInsight(accuracy: number, total: number) {
  if (total === 0) return null
  if (accuracy >= 80) return '¡Muy bien! Seguí así, estás construyendo buena base.'
  if (accuracy >= 60) return 'Buen avance. Repasá las preguntas incorrectas para fortalecer áreas clave.'
  return 'Cada práctica suma. Revisá las explicaciones para aprender de los errores.'
}

function ProgressPage() {
  const { data: progress } = useProgress()
  const { data: categories } = useCategories()
  const session = useQuizStore((s) => s.session)

  const hasData = progress && progress.total_answered > 0
  const insight = hasData ? getInsight(progress.accuracy, progress.total_answered) : null

  const lastSession = session?.completedAt ? session : null
  const sessionAnswered = lastSession ? Object.keys(lastSession.answers).length : 0
  const sessionCorrect = lastSession
    ? Object.values(lastSession.answers).filter((a) => a.correct).length
    : 0
  const sessionAccuracy = sessionAnswered > 0
    ? Math.round((sessionCorrect / sessionAnswered) * 100)
    : 0

  const sessionByCategory = lastSession
    ? lastSession.questions.reduce(
        (acc, q) => {
          const answer = lastSession.answers[q.id]
          if (!acc[q.category_id]) acc[q.category_id] = { total: 0, correct: 0, name: '' }
          acc[q.category_id].total++
          if (answer?.correct) acc[q.category_id].correct++
          return acc
        },
        {} as Record<number, { total: number; correct: number; name: string }>,
      )
    : null

  if (sessionByCategory && categories) {
    for (const [id, data] of Object.entries(sessionByCategory)) {
      const cat = categories.find((c) => c.id === Number(id))
      if (cat) data.name = cat.name
    }
  }

  const maxCategoryCount = hasData
    ? Math.max(...Object.values(progress.by_category).map(Number), 1)
    : 1

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tu progreso</h1>
        <p className="mt-1 text-muted-foreground">Seguí tu evolución y encontrá áreas para mejorar.</p>
      </div>

      {!hasData && (
        <Card className="p-10 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
            <BarChart3 className="h-7 w-7 text-muted-foreground" />
          </div>
          <h2 className="text-lg font-semibold">Todavía no hay datos</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Respondé algunas preguntas para ver tu progreso.
          </p>
          <Link to="/app/quiz" className="mt-5 inline-block">
            <Button className="gap-2">
              Empezar a practicar <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </Card>
      )}

      {hasData && (
        <>
          {insight && (
            <Card className="border-l-4 border-[#0A5C6A] bg-[#0A5C6A]/5 px-5 py-4">
              <p className="text-sm font-medium text-[#0A5C6A]">{insight}</p>
            </Card>
          )}

          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="p-5">
              <div className="flex items-center gap-3">
                <Brain className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{progress.total_answered}</p>
                  <p className="text-sm text-muted-foreground">Respondidas</p>
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <div className="flex items-center gap-3">
                <Target className="h-8 w-8 text-success" />
                <div>
                  <p className="text-2xl font-bold text-success">{progress.correct_count}</p>
                  <p className="text-sm text-muted-foreground">Correctas</p>
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{progress.accuracy}%</p>
                  <p className="text-sm text-muted-foreground">Precisión</p>
                </div>
              </div>
            </Card>
          </div>

          {lastSession && (
            <Card className="overflow-hidden">
              <div className="flex items-center gap-2 border-b border-border/40 bg-muted/50 px-5 py-3">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <h2 className="text-sm font-semibold">Última sesión</h2>
                <span className="ml-auto text-xs text-muted-foreground">
                  {sessionCorrect}/{sessionAnswered} correctas · {sessionAccuracy}%
                </span>
              </div>
              <div className="divide-y divide-border/40">
                {sessionByCategory &&
                  Object.entries(sessionByCategory)
                    .sort(([, a], [, b]) => b.total - a.total)
                    .map(([id, data]) => {
                      const catAccuracy = data.total > 0
                        ? Math.round((data.correct / data.total) * 100)
                        : 0
                      return (
                        <div key={id} className="flex items-center gap-3 px-5 py-3">
                          <span className="flex-1 text-sm font-medium truncate">
                            {data.name || `Categoría ${id}`}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {data.correct}/{data.total}
                          </span>
                          <span
                            className={`text-xs font-semibold tabular-nums ${
                              catAccuracy >= 60
                                ? 'text-success'
                                : catAccuracy >= 1
                                  ? 'text-warning'
                                  : 'text-destructive'
                            }`}
                          >
                            {catAccuracy}%
                          </span>
                        </div>
                      )
                    })}
              </div>
            </Card>
          )}

          {categories && progress.by_category && Object.keys(progress.by_category).length > 0 && (
            <div>
              <h2 className="mb-4 text-lg font-semibold">Por especialidad</h2>
              <div className="space-y-1 rounded-xl border border-border/40">
                {Object.entries(progress.by_category)
                  .sort(([, a], [, b]) => b - a)
                  .map(([categoryId, count]) => {
                    const cat = categories.find((c) => String(c.id) === categoryId)
                    const pct = Math.round((count / maxCategoryCount) * 100)
                    return (
                      <div
                        key={categoryId}
                        className="flex items-center gap-4 px-5 py-3.5 first:rounded-t-xl last:rounded-b-xl hover:bg-muted/30"
                      >
                        <span className="w-40 flex-1 truncate text-sm font-medium">
                          {cat?.name ?? `Categoría ${categoryId}`}
                        </span>
                        <div className="hidden h-2 w-full max-w-48 overflow-hidden rounded-full bg-muted sm:block">
                          <div
                            className="h-full rounded-full bg-[#0A5C6A]/40 transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="shrink-0 text-right text-sm tabular-nums text-muted-foreground">
                          {count} preguntas
                        </span>
                      </div>
                    )
                  })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
