import { createFileRoute, Outlet, Link, useMatchRoute, useNavigate } from "@tanstack/react-router";
import { useSession } from "#/queries/auth";
import { clearToken } from "#/lib/api";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarInset,
  SidebarRail,
} from "#/components/ui/sidebar";
import {
  LayoutDashboard,
  FileQuestion,
  FolderTree,
  Users,
  CreditCard,
  ArrowLeftFromLine,
} from "lucide-react";
import { cn } from "#/lib/utils";
import { useEffect } from "react";

const adminNav = [
  { to: "/admin" as const, icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/questions" as const, icon: FileQuestion, label: "Preguntas" },
  { to: "/admin/categories" as const, icon: FolderTree, label: "Categorías" },
  { to: "/admin/users" as const, icon: Users, label: "Usuarios" },
  { to: "/admin/payments" as const, icon: CreditCard, label: "Pagos" },
];

export const Route = createFileRoute("/admin")({
  beforeLoad: () => {
    // Session check is handled in the component
  },
  errorComponent: ({ error }) => (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <p className="text-sm font-medium text-destructive">Error al cargar el panel</p>
        <p className="text-xs text-muted-foreground mt-1">
          {error?.message || "Error de conexión"}
        </p>
      </div>
    </div>
  ),
  component: AdminLayout,
});

function AdminLayout() {
  const navigate = useNavigate();
  const { data: user, isLoading, isError } = useSession();
  const matchRoute = useMatchRoute();

  useEffect(() => {
    if (isLoading) return;

    if (isError) {
      clearToken();
      navigate({ to: "/auth/login", replace: true });
      return;
    }

    if (!user) {
      navigate({ to: "/auth/login", replace: true });
    } else if (user.role !== 1) {
      navigate({ to: "/app", replace: true });
    }
  }, [isLoading, isError, user, navigate]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-sm text-muted-foreground">Verificando acceso...</p>
      </div>
    );
  }

  if (!user || user.role !== 1) {
    return null;
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar collapsible="icon" className="border-r border-sidebar-border/40">
        <SidebarHeader className="px-5 pt-8 pb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0A5C6A] text-white">
              <img src="/logo.png" alt="Caduceo" width={512} height={512} className="h-6 w-auto" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-sidebar-foreground">
                Admin
              </span>
              <p className="text-xs text-muted-foreground">Panel de control</p>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent className="px-3">
          <nav className="flex flex-col gap-1">
            {adminNav.map((item) => {
              const isActive = !!matchRoute({ to: item.to });
              return (
                <SidebarMenuItem key={item.to} className="list-none">
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={item.label}
                    className={cn(
                      "h-11 gap-3.5 px-4 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-[#0A5C6A] text-white hover:bg-[#0A5C6A] hover:text-white"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                    )}
                  >
                    <Link to={item.to}>
                      <item.icon
                        className={cn(
                          "h-[18px] w-[18px] shrink-0",
                          isActive ? "text-white" : "text-sidebar-foreground/50",
                        )}
                      />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </nav>

          <div className="mt-6 border-t border-sidebar-border/30 pt-4">
            <SidebarMenuItem className="list-none">
              <SidebarMenuButton
                asChild
                tooltip="Volver a la app"
                className="h-11 gap-3.5 px-4 text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              >
                <Link to="/app">
                  <ArrowLeftFromLine className="h-[18px] w-[18px] shrink-0 text-sidebar-foreground/50" />
                  <span>Volver a la app</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </div>
        </SidebarContent>

        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <main className="flex-1 p-6 md:p-10">{<Outlet />}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
