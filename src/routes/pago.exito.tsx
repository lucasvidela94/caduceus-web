import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { authKeys } from '#/queries/auth'
import { Card } from '#/components/ui/card'
import { Button } from '#/components/ui/button'
import { CheckCircle2, ArrowRight } from 'lucide-react'

export const Route = createFileRoute('/pago/exito')({
  component: PaymentSuccess,
})

function PaymentSuccess() {
  const queryClient = useQueryClient()

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: authKeys.session() })
  }, [queryClient])

  return (
    <div className="flex min-h-svh items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
          <CheckCircle2 className="h-8 w-8 text-success" />
        </div>

        <h1 className="text-2xl font-bold tracking-tight">¡Pago exitoso!</h1>
        <p className="mt-2 text-muted-foreground">
          Ya tenés acceso a Caduceo Plus. Estamos actualizando tu cuenta.
        </p>

        <div className="mt-8 space-y-3">
          <Link to="/app" className="block">
            <Button className="w-full gap-2">
              Ir al panel <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/app/quiz" className="block">
            <Button variant="outline" className="w-full">
              Empezar a practicar
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}
