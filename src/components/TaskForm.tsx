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
          placeholder="Título da tarefa"
          className="w-full rounded border px-3 py-2"
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div>
        <textarea
          {...register('description')}
          placeholder="Descrição (opcional)"
          className="w-full rounded border px-3 py-2"
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <select {...register('priority')} className="rounded border px-3 py-2">
        <option value="LOW">Baixa</option>
        <option value="MEDIUM">Média</option>
        <option value="HIGH">Alta</option>
      </select>

      <button
        type="submit"
        disabled={isPending}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? 'Adicionando...' : 'Adicionar tarefa'}
      </button>
    </form>
  )
}