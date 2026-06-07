import { useRouter } from "@tanstack/react-router";
import { useSession, useLogout } from "#/queries/auth";
import { Card } from "#/components/ui/card";
import { Button } from "#/components/ui/button";
import { Separator } from "#/components/ui/separator";
import { User, Mail, Crown, LogOut } from "lucide-react";

export function SettingsPage() {
  const router = useRouter();
  const { data: user } = useSession();
  const logout = useLogout();

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Ajustes</h1>

      <Card className="p-6">
        <h2 className="mb-4 font-semibold">Perfil</h2>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <User className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Nombre</p>
              <p className="font-medium">{user?.name}</p>
            </div>
          </div>

          <Separator />

          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{user?.email}</p>
            </div>
          </div>

          <Separator />

          <div className="flex items-center gap-3">
            <Crown className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Plan</p>
              <p className="font-medium">{user?.tier === 1 ? "Caduceo Plus" : "Free"}</p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="mb-4 font-semibold">Cuenta</h2>
        <Button
          variant="destructive"
          className="gap-2"
          onClick={() =>
            logout.mutate(undefined, {
              onSuccess: () => router.navigate({ to: "/auth/login" }),
            })
          }
          disabled={logout.isPending}
        >
          <LogOut className="h-4 w-4" />
          {logout.isPending ? "Cerrando sesión..." : "Cerrar sesión"}
        </Button>
      </Card>
    </div>
  );
}
