import { createRootRoute, Outlet, HeadContent, Scripts } from '@tanstack/react-router'
import { TooltipProvider } from '#/components/ui/tooltip'
import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Caduceo — Practicá para tu residencia médica' },
      {
        name: 'description',
        content:
          'Caduceo es la plataforma para estudiantes de medicina que se preparan para el examen de residencia. Preguntas reales, estadísticas y más.',
      },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    ],
  }),
  component: RootLayout,
})

function RootLayout() {
  return (
    <TooltipProvider>
      <HeadContent />
      <Outlet />
      <Scripts />
    </TooltipProvider>
  )
}
