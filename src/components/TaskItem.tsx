import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Task, TaskStatus } from '../types/task'
import { useUpdateTaskStatus, useDeleteTask, useUpdateTask } from '../hooks/useTasks'
import { taskFormSchema, type TaskFormData } from '../lib/schemas'

const statusLabels: Record<TaskStatus, string> = {
  PENDING: 'Pendente',
  IN_PROGRESS: 'Em progresso',
  COMPLETED: 'Concluída',
}

const priorityColors: Record<Task['priority'], string> = {
  LOW: 'bg-surface-2 text-muted',
  MEDIUM: 'bg-accent-2/20 text-accent-2',
  HIGH: 'bg-accent/20 text-accent',
}

interface TaskItemProps {
  task: Task
}

export function TaskItem({ task }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const { mutate: updateStatus } = useUpdateTaskStatus()
  const { mutate: removeTask } = useDeleteTask()
  const { mutate: updateTask, isPending } = useUpdateTask()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
      priority: task.priority,
    },
  })

  const onSubmit = (data: TaskFormData) => {
    updateTask(
      { id: task.id, data },
      { onSuccess: () => setIsEditing(false) }
    )
  }

  if (isEditing) {
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 rounded border p-3"
      >
        <div>
          <input
            {...register('title')}
            className="w-full rounded border border-border bg-surface text-text focus:border-accent focus:outline-none px-2 py-1"
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        <textarea
          {...register('description')}
          className="w-full rounded border px-2 py-1"
        />

        <select {...register('priority')} className="rounded border px-2 py-1">
          <option value="LOW">Baixa</option>
          <option value="MEDIUM">Média</option>
          <option value="HIGH">Alta</option>
        </select>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isPending}
            className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isPending ? 'Salvando...' : 'Salvar'}
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="rounded px-3 py-1 text-sm hover:bg-gray-100"
          >
            Cancelar
          </button>
        </div>
      </form>
    )
  }

  return (
  <div className="flex items-center justify-between rounded border border-border bg-surface-2 p-3">
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <h3
          className={
            task.status === 'COMPLETED'
              ? 'font-display text-muted line-through'
              : 'font-display text-text'
          }
        >
          {task.title}
        </h3>
        <span className={`rounded px-2 py-0.5 text-xs uppercase tracking-wide ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>
      {task.description && (
        <p className="text-sm text-muted">{task.description}</p>
      )}
    </div>

    <div className="flex items-center gap-3">
      <select
        value={task.status}
        onChange={(e) => updateStatus({ id: task.id, status: e.target.value as TaskStatus })}
        className="rounded border border-border bg-surface px-2 py-1 text-sm text-text focus:border-accent focus:outline-none"
      >
        {Object.entries(statusLabels).map(([value, label]) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>

      <button onClick={() => setIsEditing(true)} className="text-sm text-accent-2 hover:underline">
        Editar
      </button>

      <button onClick={() => removeTask(task.id)} className="text-sm text-accent hover:underline">
        Excluir
      </button>
    </div>
  </div>
)
}