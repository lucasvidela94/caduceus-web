import { useNavigate, useParams } from "@tanstack/react-router";
import { useAdminCategory, useUpdateAdminCategory } from "#/queries/admin";
import { Card } from "#/components/ui/card";
import { Button } from "#/components/ui/button";
import { Label } from "#/components/ui/label";
import { Input } from "#/components/ui/input";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useReducer, useEffect } from "react";

type FormState = { name: string; slug: string; description: string };
type FormAction =
  | { type: "SET_FIELD"; field: string; value: string }
  | { type: "LOAD"; data: FormState }
  | { type: "RESET" };

const initialFormState: FormState = { name: "", slug: "", description: "" };

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

export function AdminEditCategory() {
  const { id } = useParams({ from: "/admin/categories_/$id" });
  const navigate = useNavigate();
  const { data: category, isLoading } = useAdminCategory(id);
  const update = useUpdateAdminCategory();
  const [form, dispatch] = useReducer(formReducer, initialFormState);

  useEffect(() => {
    if (category) {
      dispatch({
        type: "LOAD",
        data: {
          name: category.name,
          slug: category.slug,
          description: category.description ?? "",
        },
      });
    }
  }, [category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    update.mutate(
      { id, input: { name: form.name, slug: form.slug, description: form.description || null } },
      { onSuccess: () => navigate({ to: "/admin/categories" }) },
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 pt-12">
        <Loader2 className="h-4 w-4 animate-spin" />
        <p className="text-sm text-muted-foreground">Cargando categoría...</p>
      </div>
    );
  }

  if (!category) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">Categoría no encontrada.</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => navigate({ to: "/admin/categories" })}
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
          onClick={() => navigate({ to: "/admin/categories" })}
          className="h-8 w-8"
          aria-label="Volver"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Editar categoría</h1>
          <p className="text-sm text-muted-foreground">Modificá los datos de la categoría.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre</Label>
          <Input
            id="name"
            value={form.name}
            onChange={(e) => dispatch({ type: "SET_FIELD", field: "name", value: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={form.slug}
            onChange={(e) => dispatch({ type: "SET_FIELD", field: "slug", value: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descripción (opcional)</Label>
          <textarea
            id="description"
            value={form.description}
            onChange={(e) =>
              dispatch({ type: "SET_FIELD", field: "description", value: e.target.value })
            }
            rows={2}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A5C6A]/30"
            aria-label="Descripción"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit" disabled={update.isPending} className="gap-2">
            {update.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {update.isPending ? "Guardando..." : "Guardar cambios"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate({ to: "/admin/categories" })}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
