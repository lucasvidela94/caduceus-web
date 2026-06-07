import { Outlet, Link } from "@tanstack/react-router";
import { TooltipProvider } from "#/components/ui/tooltip";
import { Button } from "#/components/ui/button";
import { RefreshCw, Home } from "lucide-react";

export function RootLayout() {
  return (
    <TooltipProvider>
      <Outlet />
    </TooltipProvider>
  );
}

export function RootErrorComponent({ error }: { error?: Error }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-8">
      <div className="mx-auto max-w-sm text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10">
          <img src="/logo.png" alt="Caduceo" width={512} height={512} className="h-10 w-auto" />
        </div>
        <h1 className="text-xl font-bold tracking-tight">Algo salió mal</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Se produjo un error inesperado. Si el problema persiste, recargá la página o intentá de
          nuevo más tarde.
        </p>
        {error?.message && (
          <p className="mt-4 rounded-lg bg-muted px-4 py-2 text-xs text-muted-foreground font-mono">
            {error.message}
          </p>
        )}
        <div className="mt-6 flex items-center justify-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="h-4 w-4" />
            Recargar
          </Button>
          <Link to="/">
            <Button size="sm" className="gap-2">
              <Home className="h-4 w-4" />
              Ir al inicio
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
