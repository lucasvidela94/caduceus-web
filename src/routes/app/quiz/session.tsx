import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useQuestions, useAnswerQuestion } from '#/queries/questions'
import { useQuizStore } from '#/stores/quiz.store'
import { SessionResults } from '#/components/quiz/session-results'
import { Button } from '#/components/ui/button'
import { Card } from '#/components/ui/card'
import { Progress } from '#/components/ui/progress'
import { useState, useEffect } from 'react'
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react'

export const Route = createFileRoute('/app/quiz/session')({
  component: QuizSession,
})

const OPTIONS = ['a', 'b', 'c', 'd'] as const

function QuizSession() {
  const navigate = useNavigate()
  const session = useQuizStore((s) => s.session)
  const startSession = useQuizStore((s) => s.startSession)
  const addAnswer = useQuizStore((s) => s.addAnswer)
  const goNext = useQuizStore((s) => s.goNext)
  const completeSession = useQuizStore((s) => s.completeSession)

  const answer = useAnswerQuestion()
  const { data: freshQuestions, isLoading, refetch } = useQuestions({ limit: 10 })

  const [selected, setSelected] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    if (freshQuestions && !session) {
      startSession(freshQuestions)
    }
  }, [freshQuestions, session, startSession])

  if (!session || session.questions.length === 0) {
    if (isLoading) {
      return (
        <div className="mx-auto max-w-2xl pt-12 text-center">
          <Card className="p-8">
            <p className="text-muted-foreground">Cargando preguntas...</p>
          </Card>
        </div>
      )
    }
    navigate({ to: '/app/quiz' })
    return null
  }

  const { questions, currentIndex, answers } = session
  const question = questions[currentIndex]
  const existingAnswer = answers[question?.id]
  const answeredCount = Object.keys(answers).length
  const correctCount = Object.values(answers).filter((a) => a.correct).length

  if (currentIndex >= questions.length) {
    return (
      <SessionResults
        correct={correctCount}
        total={answeredCount}
        onNewPractice={async () => {
          const result = await refetch()
          if (result.data) startSession(result.data)
        }}
        onViewProgress={() => navigate({ to: '/app/progreso' })}
      />
    )
  }

  if (!question) return null

  const handleAnswer = (option: string) => {
    if (showResult || !question) return
    setSelected(option)
    setShowResult(true)
    answer.mutate(
      { questionId: question.id, answer: option },
      { onSuccess: (data) => addAnswer(question.id, data) },
    )
  }

  const handleNext = () => {
    setSelected(null)
    setShowResult(false)
    if (currentIndex >= questions.length - 1) {
      completeSession()
    } else {
      goNext()
    }
  }

  const currentCorrectAnswer = existingAnswer?.correctAnswer ?? answer.data?.correct_answer

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-[#0A5C6A]">{correctCount}/{answeredCount} correctas</span>
        <span className="text-sm text-muted-foreground">{currentIndex + 1} de {questions.length}</span>
      </div>

      <Progress value={((currentIndex + 1) / questions.length) * 100} className="h-1.5" />

      <Card className="p-6">
        <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#0A5C6A]/60">
          Pregunta {currentIndex + 1}
        </div>
        <h2 className="text-lg font-medium leading-relaxed">{question.body}</h2>
      </Card>

      <div className="space-y-3">
        {OPTIONS.map((opt) => {
          const isSelected = selected === opt
          const isCorrect = showResult && currentCorrectAnswer === opt
          const isWrong = showResult && isSelected && currentCorrectAnswer !== opt

          return (
            <button
              key={opt}
              type="button"
              onClick={() => handleAnswer(opt)}
              disabled={showResult}
              className={`w-full rounded-xl border p-4 text-left transition-all ${
                isCorrect ? 'border-success bg-success/5' : isWrong ? 'border-destructive bg-destructive/5' : isSelected ? 'border-[#0A5C6A] bg-[#0A5C6A]/5' : 'border-border hover:border-[#0A5C6A]/30 hover:bg-muted/50'
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-medium ${
                    isCorrect ? 'bg-success text-success-foreground' : isWrong ? 'bg-destructive text-destructive-foreground' : isSelected ? 'bg-[#0A5C6A] text-white' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {isCorrect ? '✓' : isWrong ? '✗' : opt.toUpperCase()}
                </span>
                <span className="pt-0.5">{question.options[opt]}</span>
              </div>
            </button>
          )
        })}
      </div>

      {showResult && answer.data && (
        <Card
          className="border-l-4 p-4"
          style={{
            borderLeftColor: answer.data.correct ? 'var(--success)' : 'var(--destructive)',
          }}
        >
          <div className="flex items-start gap-3">
            {answer.data.correct ? (
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
            ) : (
              <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
            )}
            <div>
              <p className="font-medium">
                {answer.data.correct
                  ? '¡Correcto!'
                  : `Incorrecto — La respuesta era ${currentCorrectAnswer?.toUpperCase()}`}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{answer.data.explanation}</p>
            </div>
          </div>
        </Card>
      )}

      {showResult && (
        <Button onClick={handleNext} className="w-full gap-2">
          {currentIndex >= questions.length - 1 ? 'Ver resultados' : 'Siguiente'}
          <ArrowRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
