import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "#/components/layout/public-layout";
import { ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/privacidad")({
	component: PrivacidadPage,
});

function PrivacidadPage() {
	return (
		<PublicLayout>
			<article className="mx-auto max-w-3xl px-4 py-16 md:py-24">
				<div className="mb-10">
					<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
						<ShieldCheck className="h-6 w-6" />
					</div>
					<h1 className="text-3xl font-bold tracking-tight md:text-4xl text-center">
						Política de Privacidad
					</h1>
					<p className="mt-3 text-center text-muted-foreground">
						Última actualización: junio 2026
					</p>
				</div>

				<div className="prose prose-sm max-w-none space-y-6 text-muted-foreground">
					<section>
						<h2 className="text-lg font-semibold text-foreground">
							1. Información que recopilamos
						</h2>
						<p>
							En Caduceo recopilamos únicamente la información necesaria para
							brindar el servicio:
						</p>
						<ul className="list-disc pl-5 space-y-1">
							<li>
								<strong>Datos de registro:</strong> nombre, dirección de correo
								electrónico y contraseña (almacenada de forma segura mediante
								hash bcrypt).
							</li>
							<li>
								<strong>Datos de Google:</strong> si usás "Continuar con
								Google", recibimos tu nombre, correo electrónico y foto de
								perfil de tu cuenta de Google.
							</li>
							<li>
								<strong>Datos de uso:</strong> respuestas a preguntas, progreso,
								estadísticas de aciertos y categorías practicadas.
							</li>
							<li>
								<strong>Datos de pago:</strong> cuando comprás Caduceo Plus,
								procesamos el pago a través de Mercado Pago. No almacenamos
								números de tarjeta ni información bancaria.
							</li>
						</ul>
					</section>

					<section>
						<h2 className="text-lg font-semibold text-foreground">
							2. Cómo usamos tu información
						</h2>
						<ul className="list-disc pl-5 space-y-1">
							<li>Crear y mantener tu cuenta.</li>
							<li>Mostrar tu progreso y estadísticas de práctica.</li>
							<li>Procesar pagos y activar funciones de Caduceo Plus.</li>
							<li>
								Mejorar la plataforma basándonos en patrones de uso agregados.
							</li>
							<li>
								Comunicarnos con vos ante cambios importantes del servicio.
							</li>
						</ul>
					</section>

					<section>
						<h2 className="text-lg font-semibold text-foreground">
							3. Almacenamiento y seguridad
						</h2>
						<p>
							Tus datos se almacenan en servidores de Cloudflare (D1) con sede
							en Estados Unidos y la Unión Europea. Implementamos medidas de
							seguridad estándar de la industria, incluyendo cifrado en tránsito
							(HTTPS), hash de contraseñas (bcrypt) y tokens JWT con rotación
							periódica.
						</p>
					</section>

					<section>
						<h2 className="text-lg font-semibold text-foreground">
							4. Compartición de datos
						</h2>
						<p>
							No vendemos tu información personal a terceros. Compartimos datos
							únicamente con:
						</p>
						<ul className="list-disc pl-5 space-y-1">
							<li>
								<strong>Mercado Pago:</strong> para procesar pagos de Caduceo
								Plus.
							</li>
							<li>
								<strong>Google:</strong> para autenticación OAuth (si elegiste
								ese método de inicio de sesión).
							</li>
							<li>
								<strong>Cloudflare:</strong> para el alojamiento y la
								infraestructura del servicio.
							</li>
						</ul>
					</section>

					<section>
						<h2 className="text-lg font-semibold text-foreground">
							5. Tus derechos
						</h2>
						<p>
							De acuerdo con la Ley de Protección de Datos Personales de
							Argentina (Ley 25.326), tenés derecho a:
						</p>
						<ul className="list-disc pl-5 space-y-1">
							<li>Acceder a la información que tenemos sobre vos.</li>
							<li>Solicitar la corrección de datos inexactos.</li>
							<li>Solicitar la eliminación de tu cuenta y datos asociados.</li>
							<li>
								Oponerte al tratamiento de tus datos para fines específicos.
							</li>
						</ul>
						<p className="mt-2">
							Para ejercer estos derechos, escribinos a{" "}
							<a
								href="mailto:lucasan.videla@gmail.com"
								className="text-primary hover:underline"
							>
								lucasan.videla@gmail.com
							</a>
							.
						</p>
					</section>

					<section>
						<h2 className="text-lg font-semibold text-foreground">
							6. Cookies
						</h2>
						<p>
							Caduceo utiliza cookies técnicas necesarias para el funcionamiento
							del servicio (token de autenticación almacenado en localStorage).
							No utilizamos cookies de rastreo, publicitarias ni de terceros.
						</p>
					</section>

					<section>
						<h2 className="text-lg font-semibold text-foreground">
							7. Cambios a esta política
						</h2>
						<p>
							Podemos actualizar esta política periódicamente. Los cambios
							significativos se comunicarán a través del correo electrónico
							asociado a tu cuenta o mediante un aviso en la plataforma.
						</p>
					</section>

					<section>
						<h2 className="text-lg font-semibold text-foreground">
							8. Contacto
						</h2>
						<p>
							Si tenés preguntas sobre esta política de privacidad, escribinos a{" "}
							<a
								href="mailto:lucasan.videla@gmail.com"
								className="text-primary hover:underline"
							>
								lucasan.videla@gmail.com
							</a>
							.
						</p>
					</section>
				</div>

				<div className="mt-10 text-center">
					<Link to="/" className="text-sm text-primary hover:underline">
						Volver al inicio
					</Link>
				</div>
			</article>
		</PublicLayout>
	);
}
