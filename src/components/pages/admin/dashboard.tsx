import {
  useAdminQuestions,
  useAdminCategories,
  useAdminUsers,
  useAdminPayments,
} from "#/queries/admin";
import { Card } from "#/components/ui/card";
import { FileQuestion, FolderTree, Users, CreditCard } from "lucide-react";

export function AdminDashboard() {
  const { data: questions } = useAdminQuestions();
  const { data: categories } = useAdminCategories();
  const { data: users } = useAdminUsers();
  const { data: payments } = useAdminPayments();

  const totalRevenue =
    payments?.reduce((sum, p) => sum + (p.status === "approved" ? p.amount : 0), 0) ?? 0;

  const stats = [
    {
      label: "Preguntas",
      value: questions?.length ?? 0,
      icon: FileQuestion,
      color: "text-blue-600",
    },
    {
      label: "Categorías",
      value: categories?.length ?? 0,
      icon: FolderTree,
      color: "text-emerald-600",
    },
    { label: "Usuarios", value: users?.length ?? 0, icon: Users, color: "text-violet-600" },
    { label: "Pagos", value: payments?.length ?? 0, icon: CreditCard, color: "text-amber-600" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">Resumen del panel de administración.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-5">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg bg-muted ${s.color}`}
              >
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {totalRevenue > 0 && (
        <Card className="p-5">
          <p className="text-sm text-muted-foreground">Ingresos totales (aprobados)</p>
          <p className="text-3xl font-bold text-[#0A5C6A]">
            ${(totalRevenue / 100).toLocaleString("es-AR")}
          </p>
        </Card>
      )}
    </div>
  );
}
