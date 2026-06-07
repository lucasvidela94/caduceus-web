import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "#/components/layout/public-layout";
import { Scale } from "lucide-react";

export const Route = createFileRoute("/terminos")({
  component: TerminosPage,
});

function TerminosPage() {
  return (
    <PublicLayout>
      <article className="mx-auto max-w-3xl px-4 py-16 md:py-24">
        <div className="mb-10">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Scale className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl text-center">
            Términos del Servicio
          </h1>
          <p className="mt-3 text-center text-muted-foreground">Última actualización: junio 2026</p>
        </div>

        <div className="prose prose-sm max-w-none space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-lg font-semibold text-foreground">1. Aceptación de los términos</h2>
            <p>
              Al registrarte y utilizar Caduceo, aceptás estos términos del servicio. Si no estás de
              acuerdo, no podés usar la plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">2. Descripción del servicio</h2>
            <p>
              Caduceo es una plataforma web de preparación para el examen de residencia médica.
              Ofrece:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Preguntas de práctica de exámenes reales de residencias médicas.</li>
              <li>Estadísticas de progreso y rendimiento.</li>
              <li>Modo práctica por especialidad.</li>
              <li>
                Plan gratuito con acceso limitado y plan Caduceo Plus (único pago) con acceso
                completo.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">3. Creación de cuenta</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Debés ser mayor de 18 años o tener autorización de un tutor.</li>
              <li>La información de registro debe ser precisa y verdadera.</li>
              <li>No podés compartir tu cuenta con otras personas.</li>
              <li>
                Un solo usuario por cuenta. No están permitidas cuentas compartidas o de uso grupal.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              4. Plan gratuito y Caduceo Plus
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>El plan gratuito permite acceder a una selección limitada de preguntas.</li>
              <li>
                Caduceo Plus es un único pago que otorga acceso permanente al banco completo de
                preguntas y todas las funcionalidades de la plataforma.
              </li>
              <li>
                El pago se procesa a través de Mercado Pago. No almacenamos información de pago.
              </li>
              <li>
                Una vez activado, Caduceo Plus no tiene reembolsos, excepto en casos de fallas
                técnicas comprobadas que impidan el uso del servicio.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">5. Contenido del servicio</h2>
            <p>
              Las preguntas y materiales disponibles en Caduceo provienen de exámenes reales de
              residencias médicas y materiales de estudio. Si bien nos esforzamos por garantizar la
              precisión del contenido, Caduceo no garantiza que todas las respuestas sean correctas
              ni que el material cubra la totalidad de los temas del examen de residencia.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">6. Conducta del usuario</h2>
            <p className="mb-2">No está permitido:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Extraer, copiar o reproducir el contenido de la plataforma sin autorización.</li>
              <li>
                Intentar vulnerar la seguridad del sistema o acceder a datos de otros usuarios.
              </li>
              <li>Usar la plataforma para fines ilegales o no autorizados.</li>
              <li>Crear múltiples cuentas para evadir los límites del plan gratuito.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              7. Limitación de responsabilidad
            </h2>
            <p>
              Caduceo se proporciona "tal cual", sin garantías de ningún tipo. No nos hacemos
              responsables por resultados en exámenes de residencia, decisiones médicas, ni por
              daños directos o indirectos derivados del uso de la plataforma. Caduceo es una
              herramienta de estudio complementaria y no reemplaza la formación médica formal ni los
              programas de preparación oficiales.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">8. Cancelación y baja</h2>
            <p>
              Podés eliminar tu cuenta en cualquier momento desde la sección de Ajustes. Al eliminar
              tu cuenta, se borrarán tus datos personales y de progreso. La compra de Caduceo Plus
              no es reembolsable después de la activación.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              9. Modificaciones del servicio
            </h2>
            <p>
              Nos reservamos el derecho de modificar, suspender o discontinuar el servicio (o
              cualquier parte del mismo) en cualquier momento. Te notificaremos con antelación sobre
              cambios significativos que afecten tus derechos u obligaciones.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">10. Legislación aplicable</h2>
            <p>
              Estos términos se rigen por las leyes de la República Argentina. Cualquier
              controversia se resolverá ante los tribunales de la Ciudad Autónoma de Buenos Aires.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">11. Contacto</h2>
            <p>
              Para consultas sobre estos términos, escribinos a{" "}
              <a href="mailto:lucasan.videla@gmail.com" className="text-primary hover:underline">
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
