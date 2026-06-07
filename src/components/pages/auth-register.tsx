import { Link, useRouter } from "@tanstack/react-router";
import { CaduceusIcon } from "#/components/ui/caduceus-icon";
import { Eye, EyeOff } from "lucide-react";
import { useReducer, useState } from "react";
import { z } from "zod";
import { PublicLayout } from "#/components/layout/public-layout";
import { Button } from "#/components/ui/button";
import { Card, CardContent } from "#/components/ui/card";
import { GoogleButton } from "#/components/ui/google-button";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { Separator } from "#/components/ui/separator";
import { useRegister, useLoginWithGoogle } from "#/queries/auth";

const schema = z.object({
	name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
	email: z.email("Email inválido"),
	password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type FormState = { name: string; email: string; password: string };
type FormAction =
	| { type: "SET_FIELD"; field: string; value: string }
	| { type: "RESET" };

const initialForm: FormState = { name: "", email: "", password: "" };

function formReducer(state: FormState, action: FormAction): FormState {
	switch (action.type) {
		case "SET_FIELD":
			return { ...state, [action.field]: action.value };
		case "RESET":
			return initialForm;
		default:
			return state;
	}
}

export function RegisterPage() {
	const router = useRouter();
	const register = useRegister();
	const googleLogin = useLoginWithGoogle();
	const [form, dispatch] = useReducer(formReducer, initialForm);
	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState<Record<string, string>>({});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setErrors({});

		const result = schema.safeParse(form);
		if (!result.success) {
			const fieldErrors: Record<string, string> = {};
			for (const issue of result.error.issues) {
				fieldErrors[issue.path[0] as string] = issue.message;
			}
			setErrors(fieldErrors);
			return;
		}

		register.mutate(
			{ ...form, password_confirmation: form.password },
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
								<CaduceusIcon size={24} className="text-primary" />
							</div>
							<h1 className="text-xl font-bold tracking-tight">
								Creá tu cuenta
							</h1>
							<p className="mt-1.5 text-sm text-muted-foreground">
								Empezá a practicar gratis
							</p>
						</div>

						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="space-y-1.5">
								<Label htmlFor="name">Nombre</Label>
								<Input
									id="name"
									placeholder="Tu nombre"
									value={form.name}
									onChange={(e) =>
										dispatch({
											type: "SET_FIELD",
											field: "name",
											value: e.target.value,
										})
									}
									className={`h-10 ${errors.name ? "border-destructive ring-destructive/20" : ""}`}
								/>
								{errors.name && (
									<p className="text-xs text-destructive">{errors.name}</p>
								)}
							</div>

							<div className="space-y-1.5">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="medico@email.com"
									value={form.email}
									onChange={(e) =>
										dispatch({
											type: "SET_FIELD",
											field: "email",
											value: e.target.value,
										})
									}
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
										placeholder="Mínimo 6 caracteres"
										value={form.password}
										onChange={(e) =>
											dispatch({
												type: "SET_FIELD",
												field: "password",
												value: e.target.value,
											})
										}
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

							{register.error && (
								<p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
									{register.error.message}
								</p>
							)}

							<Button
								type="submit"
								className="w-full h-10"
								disabled={register.isPending}
							>
								{register.isPending ? "Creando cuenta..." : "Crear cuenta"}
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
							¿Ya tenés cuenta?{" "}
							<Link
								to="/auth/login"
								className="font-medium text-primary hover:underline"
							>
								Ingresá
							</Link>
						</p>
					</div>
				</Card>
			</div>
		</PublicLayout>
	);
}
