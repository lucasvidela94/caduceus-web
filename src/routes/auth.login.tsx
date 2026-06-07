import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { Eye, EyeOff, GraduationCap } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { PublicLayout } from "#/components/layout/public-layout";
import { Button } from "#/components/ui/button";
import { Card, CardContent } from "#/components/ui/card";
import { GoogleButton } from "#/components/ui/google-button";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { Separator } from "#/components/ui/separator";
import { useLogin, useLoginWithGoogle } from "#/queries/auth";

const schema = z.object({
	email: z.email("Email inválido"),
	password: z.string().min(1, "La contraseña es requerida"),
});

export const Route = createFileRoute("/auth/login")({
	component: LoginPage,
});

function LoginPage() {
	const router = useRouter();
	const login = useLogin();
	const googleLogin = useLoginWithGoogle();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState<Record<string, string>>({});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setErrors({});

		const result = schema.safeParse({ email, password });
		if (!result.success) {
			const fieldErrors: Record<string, string> = {};
			for (const issue of result.error.issues) {
				fieldErrors[issue.path[0] as string] = issue.message;
			}
			setErrors(fieldErrors);
			return;
		}

		login.mutate(
			{ email, password },
			{ onSuccess: () => router.navigate({ to: "/app" }) },
		);
	};

	return (
		<PublicLayout>
			<div className="relative flex min-h-[calc(100vh-3.5rem)] items-center justify-center overflow-hidden px-4 py-10 md:py-16">
				{/* Background decoration */}
				<div className="pointer-events-none absolute inset-0 -z-10">
					<div className="absolute -top-40 right-1/4 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
					<div className="absolute -bottom-40 left-1/4 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
				</div>

				<Card className="w-full max-w-md border-border/50 shadow-xl shadow-primary/5">
					{/* Decorative top bar */}
					<div className="h-1.5 w-full rounded-t-xl bg-gradient-to-r from-primary/30 via-primary to-primary/30" />

					<CardContent className="px-7 pt-8 pb-6">
						<div className="mb-7 text-center">
							<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 ring-1 ring-primary/10">
								<GraduationCap className="h-6 w-6 text-primary" />
							</div>
							<h1 className="text-xl font-bold tracking-tight">
								Ingresá a Caduceo
							</h1>
							<p className="mt-1.5 text-sm text-muted-foreground">
								Entrá con tu email y contraseña
							</p>
						</div>

						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="space-y-1.5">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="medico@email.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className={`h-10 ${errors.email ? "border-destructive ring-destructive/20" : ""}`}
								/>
								{errors.email && (
									<p className="text-xs text-destructive">{errors.email}</p>
								)}
							</div>

							<div className="space-y-1.5">
								<Label htmlFor="password">Contraseña</Label>
								<div className="relative">
									<Input
										id="password"
										type={showPassword ? "text" : "password"}
										placeholder="••••••"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className={`h-10 pr-10 ${errors.password ? "border-destructive ring-destructive/20" : ""}`}
									/>
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
										tabIndex={-1}
									>
										{showPassword ? (
											<EyeOff className="h-4 w-4" />
										) : (
											<Eye className="h-4 w-4" />
										)}
									</button>
								</div>
								{errors.password && (
									<p className="text-xs text-destructive">{errors.password}</p>
								)}
							</div>

							{login.error && (
								<p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
									{login.error.message}
								</p>
							)}

							<Button
								type="submit"
								className="w-full h-10"
								disabled={login.isPending}
							>
								{login.isPending ? "Ingresando..." : "Ingresar"}
							</Button>
						</form>

						<div className="relative my-7">
							<div className="absolute inset-0 flex items-center">
								<Separator />
							</div>
							<div className="relative flex justify-center text-xs uppercase">
								<span className="bg-card px-3 text-muted-foreground/60">o</span>
							</div>
						</div>

						<div className="space-y-3">
							<GoogleButton
								onSuccess={(credential) =>
									googleLogin.mutate(
										{ id_token: credential },
										{ onSuccess: () => router.navigate({ to: "/app" }) },
									)
								}
								isPending={googleLogin.isPending}
							/>
						</div>

						{googleLogin.error && (
							<p className="mt-2 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive text-center">
								{googleLogin.error.message}
							</p>
						)}
					</CardContent>

					<div className="border-t border-border/40 px-7 py-4 text-center">
						<p className="text-sm text-muted-foreground">
							¿No tenés cuenta?{" "}
							<Link
								to="/auth/register"
								className="font-medium text-primary hover:underline"
							>
								Registrate
							</Link>
						</p>
					</div>
				</Card>
			</div>
		</PublicLayout>
	);
}
