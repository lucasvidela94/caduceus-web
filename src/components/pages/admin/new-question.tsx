import { useNavigate } from "@tanstack/react-router";
import { useCreateAdminQuestion, useAdminCategories } from "#/queries/admin";
import { Button } from "#/components/ui/button";
import { Label } from "#/components/ui/label";
import { Input } from "#/components/ui/input";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useReducer } from "react";

type FormState = {
  body: string;
  options: { a: string; b: string; c: string; d: string };
  correctAnswer: string;
  categoryId: string;
  tier: number;
  explanation: string;
  year: string;
};

type FormAction =
  | { type: "SET_FIELD"; field: string; value: string | number }
  | { type: "SET_OPTION"; option: string; value: string }
  | { type: "RESET" };

const initialFormState: FormState = {
  body: "",
  options: { a: "", b: "", c: "", d: "" },
  correctAnswer: "a",
  categoryId: "",
  tier: 0,
  explanation: "",
  year: "",
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_OPTION":
      return { ...state, options: { ...state.options, [action.option]: action.value } };
    case "RESET":
      return initialFormState;
    default:
      return state;
  }
}

export function AdminNewQuestion() {
  const navigate = useNavigate();
  const create = useCreateAdminQuestion();
  const { data: categories } = useAdminCategories();
  const [form, dispatch] = useReducer(formReducer, initialFormState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    create.mutate(
      {
        categoryId: form.categoryId,
        body: form.body,
        options: form.options,
        correctAnswer: form.correctAnswer,
        tier: form.tier,
        explanation: form.explanation || null,
        year: form.year ? Number(form.year) : null,
      },
      { onSuccess: () => navigate({ to: "/admin/questions" }) },
    );
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate({ to: "/admin/questions" })}
          className="h-8 w-8"
          aria-label="Volver"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Nueva pregunta</h1>
          <p className="text-sm text-muted-foreground">Agregá una pregunta al banco.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="body">Enunciado</Label>
          <textarea
            id="body"
            value={form.body}
            onChange={(e) => dispatch({ type: "SET_FIELD", field: "body", value: e.target.value })}
            required
            rows={3}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A5C6A]/30"
            placeholder="¿Cuánto es 2 + 2?"
            aria-label="Enunciado"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {(["a", "b", "c", "d"] as const).map((opt) => (
            <div key={opt} className="space-y-2">
              <Label htmlFor={opt}>Opción {opt.toUpperCase()}</Label>
              <Input
                id={opt}
                value={form.options[opt]}
                onChange={(e) =>
                  dispatch({ type: "SET_OPTION", option: opt, value: e.target.value })
                }
                required
                placeholder={`Respuesta ${opt}`}
              />
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <Label htmlFor="correctAnswer">Respuesta correcta</Label>
          <select
            id="correctAnswer"
            value={form.correctAnswer}
            onChange={(e) =>
              dispatch({ type: "SET_FIELD", field: "correctAnswer", value: e.target.value })
            }
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A5C6A]/30"
          >
            {(["a", "b", "c", "d"] as const).map((opt) => (
              <option key={opt} value={opt}>
                {opt.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="categoryId">Categoría</Label>
          <select
            id="categoryId"
            value={form.categoryId}
            onChange={(e) =>
              dispatch({ type: "SET_FIELD", field: "categoryId", value: e.target.value })
            }
            required
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A5C6A]/30"
          >
            <option value="">Seleccionar categoría...</option>
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.tier === 1}
              onChange={(e) =>
                dispatch({ type: "SET_FIELD", field: "tier", value: e.target.checked ? 1 : 0 })
              }
              className="h-4 w-4 rounded border-gray-300 text-[#0A5C6A] focus:ring-[#0A5C6A]/30"
            />
            Pregunta Plus (solo para usuarios suscriptos)
          </label>
        </div>

        <div className="space-y-2">
          <Label htmlFor="year">Año (opcional)</Label>
          <Input
            id="year"
            type="number"
            value={form.year}
            onChange={(e) => dispatch({ type: "SET_FIELD", field: "year", value: e.target.value })}
            placeholder="2024"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="explanation">Explicación (opcional)</Label>
          <textarea
            id="explanation"
            value={form.explanation}
            onChange={(e) =>
              dispatch({ type: "SET_FIELD", field: "explanation", value: e.target.value })
            }
            rows={3}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A5C6A]/30"
            placeholder="Explicación de la respuesta correcta..."
            aria-label="Explicación"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit" disabled={create.isPending} className="gap-2">
            {create.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {create.isPending ? "Guardando..." : "Crear pregunta"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate({ to: "/admin/questions" })}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
