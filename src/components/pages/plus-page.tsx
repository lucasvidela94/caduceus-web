import { useSession } from "#/queries/auth";
import { useCreatePreference } from "#/queries/payments";
import { Card } from "#/components/ui/card";
import { Button } from "#/components/ui/button";
import { Badge } from "#/components/ui/badge";
import { CheckCircle2, Crown, Sparkles, AlertCircle } from "lucide-react";

const features = [
  "Banco completo de preguntas",
  "Todas las especialidades",
  "Preguntas de exámenes 2019-2025",
  "Estadísticas detalladas",
  "Sin límite diario",
];

export function PlusPage() {
  const { data: user } = useSession();
  const createPreference = useCreatePreference();

  const handleUpgrade = () => {
    createPreference.mutate(undefined, {
      onSuccess: (data) => {
        window.location.href = data.init_point;
      },
    });
  };

  if (user?.tier === 1) {
    return (
      <div className="mx-auto max-w-2xl pt-12 text-center">
        <Card className="p-8">
          <Crown className="mx-auto mb-4 h-12 w-12 text-amber-500" />
          <h2 className="text-2xl font-bold">Ya tenés Caduceo Plus</h2>
          <p className="mt-2 text-muted-foreground">Disfrutás del banco completo de preguntas.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8 pt-4">
      <div className="text-center">
        <Badge variant="secondary" className="mb-4">
          <Sparkles className="mr-1 h-3 w-3" />
          Caduceo Plus
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight">Desbloqueá el banco completo</h1>
        <p className="mt-2 text-muted-foreground">
          Accedé a todas las preguntas y llevá tu preparación al siguiente nivel.
        </p>
      </div>

      <Card className="relative overflow-hidden border-primary/20 p-8">
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/5" />

        <div className="relative">
          <div className="mb-6 flex items-baseline gap-1">
            <span className="text-4xl font-bold">$</span>
            <span className="text-5xl font-bold">18.000</span>
            <span className="text-muted-foreground">/único pago</span>
          </div>

          <ul className="mb-8 space-y-3">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          {createPreference.isError && (
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0" />
              No se pudo iniciar el pago. Intentá de nuevo.
            </div>
          )}

          <Button
            size="lg"
            className="w-full gap-2"
            onClick={handleUpgrade}
            disabled={createPreference.isPending}
          >
            <Crown className="h-5 w-5" />
            {createPreference.isPending ? "Preparando pago..." : "Obtener Plus"}
          </Button>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Pago único con Mercado Pago. Acceso permanente.
          </p>
        </div>
      </Card>
    </div>
  );
}
