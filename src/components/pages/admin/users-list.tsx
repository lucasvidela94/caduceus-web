import { Link } from "@tanstack/react-router";
import { useAdminUsers } from "#/queries/admin";
import { Card } from "#/components/ui/card";
import { Button } from "#/components/ui/button";
import { Badge } from "#/components/ui/badge";
import { Pencil, Loader2 } from "lucide-react";

export function AdminUsersList() {
  const { data: users, isLoading } = useAdminUsers();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Usuarios</h1>
        <p className="mt-1 text-muted-foreground">Gestioná los usuarios registrados.</p>
      </div>

      {isLoading ? (
        <Card className="flex items-center justify-center gap-2 p-8">
          <Loader2 className="h-4 w-4 animate-spin" />
          <p className="text-sm text-muted-foreground">Cargando usuarios...</p>
        </Card>
      ) : !users || users.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">No hay usuarios registrados.</p>
        </Card>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border/40">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/40 bg-muted/50 text-left text-sm font-medium text-muted-foreground">
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Rol</th>
                <th className="px-4 py-3">Tier</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {users.map((u) => (
                <tr key={u.id} className="group text-sm transition-colors hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium">{u.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                  <td className="px-4 py-3">
                    <Badge variant={u.role === 1 ? "default" : "secondary"} className="text-xs">
                      {u.role === 1 ? "Admin" : "Student"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={u.tier === 1 ? "default" : "outline"} className="text-xs">
                      {u.tier === 1 ? "Plus" : "Free"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      asChild
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      aria-label="Editar"
                    >
                      <Link to="/admin/users/$id" params={{ id: u.id }}>
                        <Pencil className="h-4 w-4" />
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
