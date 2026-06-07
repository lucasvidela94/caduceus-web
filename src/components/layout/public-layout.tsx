import { Link } from "@tanstack/react-router";

export function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="flex h-14 items-center justify-between border-b bg-card px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo192.webp" alt="" width={192} height={128} className="h-7 w-auto" />
          <span className="text-lg font-semibold tracking-tight">Caduceo</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            to="/como-funciona"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Cómo funciona
          </Link>
          <Link
            to="/auth/login"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Ingresar
          </Link>
          <Link
            to="/auth/register"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Registrarse
          </Link>
        </nav>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
