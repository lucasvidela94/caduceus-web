import { useParams, useNavigate } from "@tanstack/react-router";
import { useAdminPayment } from "#/queries/admin";
import { Card } from "#/components/ui/card";
import { Button } from "#/components/ui/button";
import { Badge } from "#/components/ui/badge";
import { ArrowLeft, Loader2 } from "lucide-react";

const statusColors: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  approved: "default",
  pending: "secondary",
  rejected: "destructive",
  cancelled: "outline",
};

export function AdminPaymentDetail() {
  const { id } = useParams({ from: "/admin/payments_/$id" });
  const navigate = useNavigate();
  const { data: payment, isLoading } = useAdminPayment(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 pt-12">
        <Loader2 className="h-4 w-4 animate-spin" />
        <p className="text-sm text-muted-foreground">Cargando pago...</p>
      </div>
    );
  }

  if (!payment) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">Pago no encontrado.</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => navigate({ to: "/admin/payments" })}
        >
          Volver
        </Button>
      </Card>
    );
  }

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate({ to: "/admin/payments" })}
          className="h-8 w-8"
          aria-label="Volver"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Detalle del pago</h1>
          <p className="text-sm text-muted-foreground">Información completa del pago.</p>
        </div>
      </div>

      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Estado</span>
          <Badge variant={statusColors[payment.status] ?? "outline"}>{payment.status}</Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Monto</span>
          <span className="font-semibold">${(payment.amount / 100).toLocaleString("es-AR")}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">ID de pago</span>
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
            {payment.mp_payment_id || "—"}
          </code>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Preferencia MP</span>
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
            {payment.mp_preference_id || "—"}
          </code>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Usuario</span>
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs">{payment.user_id}</code>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Creado</span>
          <span className="text-sm">{new Date(payment.created_at).toLocaleString("es-AR")}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Actualizado</span>
          <span className="text-sm">{new Date(payment.updated_at).toLocaleString("es-AR")}</span>
        </div>
      </Card>

      <Button
        variant="outline"
        className="gap-2"
        onClick={() => navigate({ to: "/admin/payments" })}
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a pagos
      </Button>
    </div>
  );
}
