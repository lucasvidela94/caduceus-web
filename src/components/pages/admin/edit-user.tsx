import { useNavigate, useParams } from "@tanstack/react-router";
import { useAdminUser, useUpdateAdminUser } from "#/queries/admin";
import { Card } from "#/components/ui/card";
import { Button } from "#/components/ui/button";
import { Label } from "#/components/ui/label";
import { Input } from "#/components/ui/input";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useReducer, useEffect } from "react";

type FormState = { name: string; email: string; role: number; tier: number };
type FormAction =
  | { type: "SET_FIELD"; field: string; value: string | number }
  | { type: "LOAD"; data: FormState }
  | { type: "RESET" };

const initialFormState: FormState = { name: "", email: "", role: 0, tier: 0 };

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "LOAD":
      return action.data;
    case "RESET":
      return initialFormState;
    default:
      return state;
  }
}

export function AdminEditUser() {
  const { id } = useParams({ from: "/admin/users_/$id" });
  const navigate = useNavigate();
  const { data: user, isLoading } = useAdminUser(id);
  const update = useUpdateAdminUser();
  const [form, dispatch] = useReducer(formReducer, initialFormState);

  useEffect(() => {
    if (user) {
      dispatch({
        type: "LOAD",
        data: { name: user.name, email: user.email, role: user.role, tier: user.tier },
      });
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    update.mutate(
      { id, input: { name: form.name, email: form.email, role: form.role, tier: form.tier } },
      { onSuccess: () => navigate({ to: "/admin/users" }) },
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 pt-12">
        <Loader2 className="h-4 w-4 animate-spin" />
        <p className="text-sm text-muted-foreground">Cargando usuario...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">Usuario no encontrado.</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate({ to: "/admin/users" })}>
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
          onClick={() => navigate({ to: "/admin/users" })}
          className="h-8 w-8"
          aria-label="Volver"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Editar usuario</h1>
          <p className="text-sm text-muted-foreground">Modificá los datos del usuario.</p>
        </div>
      </div>

      <Card className="p-5 space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-border/40">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0A5C6A]/10 text-lg font-semibold text-[#0A5C6A]">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) =>
                dispatch({ type: "SET_FIELD", field: "name", value: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) =>
                dispatch({ type: "SET_FIELD", field: "email", value: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Rol</Label>
            <select
              id="role"
              value={form.role}
              onChange={(e) =>
                dispatch({ type: "SET_FIELD", field: "role", value: Number(e.target.value) })
              }
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A5C6A]/30"
            >
              <option value={0}>Student</option>
              <option value={1}>Admin</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tier">Tier</Label>
            <select
              id="tier"
              value={form.tier}
              onChange={(e) =>
                dispatch({ type: "SET_FIELD", field: "tier", value: Number(e.target.value) })
              }
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A5C6A]/30"
            >
              <option value={0}>Free</option>
              <option value={1}>Plus</option>
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={update.isPending} className="gap-2">
              {update.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              {update.isPending ? "Guardando..." : "Guardar cambios"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate({ to: "/admin/users" })}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
