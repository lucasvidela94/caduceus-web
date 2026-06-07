import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { Eye, EyeOff, GraduationCap } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { PublicLayout } from "#/components/layout/public-layout";
import { Button } from "#/components/ui/button";
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

    login.mutate({ email, password }, { onSuccess: () => router.navigate({ to: "/app" }) });
  };

  return (
    <PublicLayout>
      <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <GraduationCap className="mx-auto mb-4 h-10 w-10 text-primary" />
            <h1 className="text-2xl font-bold">Ingresá a Caduceo</h1>
            <p className="mt-2 text-sm text-muted-foreground">Entrá con tu email y contraseña</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="medico@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`pr-10 ${errors.password ? "border-destructive" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
            </div>

            {login.error && <p className="text-sm text-destructive">{login.error.message}</p>}

            <Button type="submit" className="w-full" disabled={login.isPending}>
              {login.isPending ? "Ingresando..." : "Ingresar"}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">o</span>
            </div>
          </div>

          <GoogleButton
            onSuccess={(credential) =>
              googleLogin.mutate(
                { id_token: credential },
                { onSuccess: () => router.navigate({ to: "/app" }) },
              )
            }
            isPending={googleLogin.isPending}
          />

          {googleLogin.error && (
            <p className="mt-2 text-sm text-destructive text-center">{googleLogin.error.message}</p>
          )}

          <p className="mt-6 text-center text-sm text-muted-foreground">
            ¿No tenés cuenta?{" "}
            <Link to="/auth/register" className="font-medium text-primary hover:underline">
              Registrate
            </Link>
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}
