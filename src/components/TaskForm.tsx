import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { taskFormSchema, type TaskFormData } from '../lib/schemas'
import { useCreateTask } from '../hooks/useTasks'

export function TaskForm() {
  const { mutate: createTask, isPending } = useCreateTask()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: { priority: 'MEDIUM' },
  })

  const onSubmit = (data: TaskFormData) => {
    createTask(data, { onSuccess: () => reset() })
  }

  return (
  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
    <div>
      <input
        {...register('title')}
        placeholder="Digite sua task..."
        className="w-full rounded border border-border bg-surface-2 px-3 py-2 text-text placeholder:text-muted focus:border-accent focus:outline-none"
      />
      {errors.title && (
        <p className="mt-1 text-sm text-red-400">{errors.title.message}</p>
      )}
    </div>

    <div>
      <textarea
        {...register('description')}
        placeholder="Descrição (opcional)"
        className="w-full rounded border border-border bg-surface-2 px-3 py-2 text-text placeholder:text-muted focus:border-accent focus:outline-none"
      />
      {errors.description && (
        <p className="mt-1 text-sm text-red-400">{errors.description.message}</p>
      )}
    </div>

    <select
      {...register('priority')}
      className="rounded border border-border bg-surface-2 px-3 py-2 text-text focus:border-accent focus:outline-none"
    >
      <option value="LOW">Baixa</option>
      <option value="MEDIUM">Média</option>
      <option value="HIGH">Alta</option>
    </select>

    <button
      type="submit"
      disabled={isPending}
      className="rounded bg-accent px-4 py-2 font-display tracking-wide text-bg hover:opacity-90 disabled:opacity-50"
    >
      {isPending ? 'Enviando...' : 'Enviar'}
    </button>
  </form>
)
}