import { Link } from "@tanstack/react-router";
import { useAdminPayments } from "#/queries/admin";
import { Card } from "#/components/ui/card";
import { Button } from "#/components/ui/button";
import { Badge } from "#/components/ui/badge";
import { Eye, Loader2 } from "lucide-react";

const statusColors: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  approved: "default",
  pending: "secondary",
  rejected: "destructive",
  cancelled: "outline",
};

export function AdminPaymentsList() {
  const { data: payments, isLoading } = useAdminPayments();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Pagos</h1>
        <p className="mt-1 text-muted-foreground">Historial de pagos de los usuarios.</p>
      </div>

      {isLoading ? (
        <Card className="flex items-center justify-center gap-2 p-8">
          <Loader2 className="h-4 w-4 animate-spin" />
          <p className="text-sm text-muted-foreground">Cargando pagos...</p>
        </Card>
      ) : !payments || payments.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">No hay pagos registrados.</p>
        </Card>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border/40">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/40 bg-muted/50 text-left text-sm font-medium text-muted-foreground">
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Usuario</th>
                <th className="px-4 py-3">Monto</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Fecha</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {payments.map((p) => (
                <tr key={p.id} className="group text-sm transition-colors hover:bg-muted/30">
                  <td className="px-4 py-3 font-mono text-xs">
                    <code className="rounded bg-muted px-1.5 py-0.5">{p.id.slice(0, 8)}...</code>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                      {p.user_id.slice(0, 8)}...
                    </code>
                  </td>
                  <td className="px-4 py-3 font-medium">
                    ${(p.amount / 100).toLocaleString("es-AR")}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={statusColors[p.status] ?? "outline"} className="text-xs">
                      {p.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(p.created_at).toLocaleDateString("es-AR")}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      asChild
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      aria-label="Ver detalle"
                    >
                      <Link to="/admin/payments/$id" params={{ id: p.id }}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
