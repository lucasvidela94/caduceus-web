import { createFileRoute, redirect, Outlet } from '@tanstack/react-router'
import { AppShell } from '#/components/layout/app-shell'
import { isAuthenticated } from '#/lib/api'

export const Route = createFileRoute('/app')({
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({ to: '/auth/login' })
    }
  },
  component: AppLayout,
})

function AppLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  )
}
