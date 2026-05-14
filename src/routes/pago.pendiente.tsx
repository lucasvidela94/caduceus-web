import { createFileRoute, Link } from '@tanstack/react-router'
import { Card } from '#/components/ui/card'
import { Button } from '#/components/ui/button'
import { Clock, ArrowRight } from 'lucide-react'

export const Route = createFileRoute('/pago/pendiente')({
  component: PaymentPending,
})

function PaymentPending() {
  return (
    <div className="flex min-h-svh items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#0A5C6A]/10">
          <Clock className="h-8 w-8 text-[#0A5C6A]" />
        </div>

        <h1 className="text-2xl font-bold tracking-tight">Pago pendiente</h1>
        <p className="mt-2 text-muted-foreground">
          Tu pago está siendo procesado por Mercado Pago. Podés tardar unos minutos en ver reflejado el acceso Plus.
        </p>

        <div className="mt-6 rounded-lg bg-muted/50 p-4 text-sm text-muted-foreground">
          <p>Si el pago se aprueba, tu cuenta se actualizará automáticamente. Si tenés dudas, volvé al panel en unos minutos.</p>
        </div>

        <div className="mt-8 space-y-3">
          <Link to="/app" className="block">
            <Button className="w-full gap-2">
              Ir al panel <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}
