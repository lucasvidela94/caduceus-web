import { createFileRoute, Link } from '@tanstack/react-router'
import { Card } from '#/components/ui/card'
import { Button } from '#/components/ui/button'
import { XCircle, RotateCcw } from 'lucide-react'

export const Route = createFileRoute('/pago/error')({
  component: PaymentError,
})

function PaymentError() {
  return (
    <div className="flex min-h-svh items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <XCircle className="h-8 w-8 text-destructive" />
        </div>

        <h1 className="text-2xl font-bold tracking-tight">No se pudo procesar el pago</h1>
        <p className="mt-2 text-muted-foreground">
          Algo salió mal con Mercado Pago. No te preocupes, no se realizó ningún cargo.
        </p>

        <div className="mt-8 space-y-3">
          <Link to="/app/plus" className="block">
            <Button className="w-full gap-2">
              <RotateCcw className="h-4 w-4" /> Intentar de nuevo
            </Button>
          </Link>
          <Link to="/app" className="block">
            <Button variant="outline" className="w-full">
              Volver al panel
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}
