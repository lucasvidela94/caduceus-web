import { useNavigate } from "@tanstack/react-router";
import { useCreateAdminCategory } from "#/queries/admin";
import { Button } from "#/components/ui/button";
import { Label } from "#/components/ui/label";
import { Input } from "#/components/ui/input";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useState } from "react";

export function AdminNewCategory() {
  const navigate = useNavigate();
  const create = useCreateAdminCategory();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    create.mutate(
      { name, slug, description: description || null },
      { onSuccess: () => navigate({ to: "/admin/categories" }) },
    );
  };

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
          <h1 className="text-2xl font-bold tracking-tight">Nueva categoría</h1>
          <p className="text-sm text-muted-foreground">Creá una nueva especialidad.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Matemática"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            placeholder="matematica"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descripción (opcional)</Label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            aria-label="Descripción"
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A5C6A]/30"
            placeholder="Preguntas de matemática"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit" disabled={create.isPending} className="gap-2">
            {create.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {create.isPending ? "Guardando..." : "Crear categoría"}
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
