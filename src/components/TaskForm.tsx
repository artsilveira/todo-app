import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { taskFormSchema, type TaskFormData } from '../lib/schemas'
import { useTaskStore } from '../store/taskStore'

export function TaskForm() {
  const addTask = useTaskStore((state) => state.addTask)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: { priority: 'medium' },
  })

  const onSubmit = (data: TaskFormData) => {
    addTask(data.title, data.description, data.priority)
    reset()
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
        <option value="low">Baixa</option>
        <option value="medium">Média</option>
        <option value="high">Alta</option>
      </select>

      <button
        type="submit"
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Adicionar tarefa
      </button>
    </form>
  )
}