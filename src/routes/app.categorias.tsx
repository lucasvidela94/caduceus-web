import { createFileRoute, Link } from '@tanstack/react-router'
import { useCategories } from '#/queries/categories'
import { Card } from '#/components/ui/card'
import { FolderOpen, ChevronRight } from 'lucide-react'

export const Route = createFileRoute('/app/categorias')({
  component: CategoriesPage,
})

function CategoriesPage() {
  const { data: categories } = useCategories()

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Especialidades</h1>
        <p className="mt-1 text-muted-foreground">
          Elegí una especialidad para practicar preguntas específicas.
        </p>
      </div>

      {!categories || categories.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">No hay especialidades cargadas todavía.</p>
        </Card>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Link key={cat.id} to="/app/quiz" className="group block">
              <Card className="flex items-center gap-3 p-4 transition-colors hover:bg-muted/50">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#0A5C6A]/10">
                  <FolderOpen className="h-4 w-4 text-[#0A5C6A]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium truncate">{cat.name}</h3>
                  <p className="text-xs text-muted-foreground">{cat.question_count} preguntas</p>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/40 transition-colors group-hover:text-muted-foreground/70" />
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
