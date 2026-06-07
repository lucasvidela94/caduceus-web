import { Link, useMatchRoute, useRouter } from "@tanstack/react-router";
import { useSession, useLogout } from "#/queries/auth";
import {
	LayoutDashboard,
	Brain,
	BarChart3,
	FolderOpen,
	Crown,
	Settings,
	LogOut,
	GraduationCap,
	Shield,
} from "lucide-react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarInset,
	SidebarRail,
	SidebarTrigger,
	SidebarSeparator,
} from "#/components/ui/sidebar";
import { cn } from "#/lib/utils";

const navItems = [
	{ to: "/app" as const, icon: LayoutDashboard, label: "Panel" },
	{ to: "/app/quiz" as const, icon: Brain, label: "Practicar" },
	{ to: "/app/progreso" as const, icon: BarChart3, label: "Progreso" },
	{ to: "/app/categorias" as const, icon: FolderOpen, label: "Categorías" },
];

const secondaryNavItems = [
	{ to: "/app/plus" as const, icon: Crown, label: "Plus" },
	{ to: "/app/ajustes" as const, icon: Settings, label: "Ajustes" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
	const { data: user, isLoading } = useSession();
	const logout = useLogout();
	const router = useRouter();
	const matchRoute = useMatchRoute();

	return (
		<SidebarProvider defaultOpen={true}>
			<Sidebar collapsible="icon" className="border-r border-sidebar-border/40">
				{/* Header */}
				<SidebarHeader className="px-5 pt-8 pb-6">
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0A5C6A] text-white">
							<GraduationCap className="h-5 w-5" />
						</div>
						<span className="text-xl font-bold tracking-tight text-sidebar-foreground">
							Caduceo
						</span>
					</div>
				</SidebarHeader>

				<SidebarContent className="px-3">
					{/* Principal */}
					<nav className="flex flex-col gap-1">
						{navItems.map((item) => {
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
													isActive
														? "text-white"
														: "text-sidebar-foreground/50",
												)}
											/>
											<span>{item.label}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							);
						})}
					</nav>

					<SidebarSeparator className="my-5 bg-sidebar-border/30" />

					{/* Admin */}
					{user?.role === 1 && (
						<nav className="flex flex-col gap-1">
							<SidebarMenuItem className="list-none">
								<SidebarMenuButton
									asChild
									tooltip="Admin"
									className="h-11 gap-3.5 px-4 text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
								>
									<Link to="/admin">
										<Shield className="h-[18px] w-[18px] shrink-0 text-sidebar-foreground/50" />
										<span>Admin</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarSeparator className="my-3 bg-sidebar-border/30" />
						</nav>
					)}

					{/* Cuenta */}
					<nav className="flex flex-col gap-1">
						{secondaryNavItems.map((item) => {
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
													isActive
														? "text-white"
														: "text-sidebar-foreground/50",
												)}
											/>
											<span>{item.label}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							);
						})}
					</nav>
				</SidebarContent>

				{/* Footer minimalista */}
				<SidebarFooter className="mt-auto px-4 pb-6 pt-4">
					<SidebarSeparator className="mb-4 bg-sidebar-border/30" />

					{isLoading ? (
						<div className="flex items-center gap-3 px-2">
							<div className="h-8 w-8 animate-pulse rounded-full bg-sidebar-accent" />
							<div className="h-3 w-20 animate-pulse rounded bg-sidebar-accent" />
						</div>
					) : (
						<div className="flex items-center justify-between px-2">
							<div className="flex items-center gap-3 min-w-0">
								<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sidebar-accent text-xs font-semibold text-sidebar-foreground">
									{user?.name?.charAt(0).toUpperCase() || "U"}
								</div>
								<p className="truncate text-sm font-medium text-sidebar-foreground">
									{user?.name || "Usuario"}
								</p>
							</div>

							<button
								type="button"
								onClick={() =>
									logout.mutate(undefined, {
										onSuccess: () => router.navigate({ to: "/auth/login" }),
									})
								}
								className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sidebar-foreground/40 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground/80"
								title="Cerrar sesión"
							>
								<LogOut className="h-4 w-4" />
							</button>
						</div>
					)}
				</SidebarFooter>

				<SidebarRail />
			</Sidebar>

			<div className="fixed bottom-2 left-3 z-50 hidden md:block">
				<a
					href="https://www.nevex-labs.com"
					target="_blank"
					rel="noopener noreferrer"
					className="text-[10px] text-sidebar-foreground/30 hover:text-sidebar-foreground/60 transition-colors"
				>
					Nevex Labs
				</a>
			</div>

			<SidebarInset>
				<header className="flex h-14 items-center gap-3 border-b border-border/40 bg-background/80 px-5 backdrop-blur-sm md:hidden">
					<SidebarTrigger />
					<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0A5C6A] text-white">
						<GraduationCap className="h-4 w-4" />
					</div>
					<span className="font-semibold tracking-tight">Caduceo</span>
				</header>
				<main className="flex-1 p-5 md:p-10">{children}</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
