import { Link } from "@tanstack/react-router";
import { useAdminCategories, useDeleteAdminCategory } from "#/queries/admin";
import { Card } from "#/components/ui/card";
import { Button } from "#/components/ui/button";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";

export function AdminCategoriesList() {
  const { data: categories, isLoading } = useAdminCategories();
  const deleteCat = useDeleteAdminCategory();

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`¿Eliminar la categoría "${name}"?`)) {
      deleteCat.mutate(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Categorías</h1>
          <p className="mt-1 text-muted-foreground">Gestioná las especialidades.</p>
        </div>
        <Button asChild className="gap-2">
          <Link to="/admin/categories/new">
            <Plus className="h-4 w-4" />
            Nueva categoría
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <Card className="flex items-center justify-center gap-2 p-8">
          <Loader2 className="h-4 w-4 animate-spin" />
          <p className="text-sm text-muted-foreground">Cargando categorías...</p>
        </Card>
      ) : !categories || categories.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">No hay categorías todavía.</p>
        </Card>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border/40">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/40 bg-muted/50 text-left text-sm font-medium text-muted-foreground">
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3">Descripción</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {categories.map((cat) => (
                <tr key={cat.id} className="group text-sm transition-colors hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium">{cat.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{cat.slug}</td>
                  <td className="max-w-xs truncate px-4 py-3 text-muted-foreground">
                    {cat.description ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        asChild
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        aria-label="Editar"
                      >
                        <Link to="/admin/categories/$id" params={{ id: cat.id }}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() => handleDelete(cat.id, cat.name)}
                        aria-label="Eliminar"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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
