import type { Task, TaskStatus } from '../types/task'
import { useUpdateTaskStatus, useDeleteTask } from '../hooks/useTasks'

const statusLabels: Record<TaskStatus, string> = {
  PENDING: 'Pendente',
  IN_PROGRESS: 'Em progresso',
  COMPLETED: 'Concluída',
}

const priorityColors: Record<Task['priority'], string> = {
  LOW: 'bg-gray-200 text-gray-700',
  MEDIUM: 'bg-yellow-200 text-yellow-800',
  HIGH: 'bg-red-200 text-red-800',
}

interface TaskItemProps {
  task: Task
}

export function TaskItem({ task }: TaskItemProps) {
  const { mutate: updateStatus } = useUpdateTaskStatus()
  const { mutate: removeTask } = useDeleteTask()

  return (
    <div className="flex items-center justify-between rounded border p-3">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <h3
            className={
              task.status === 'COMPLETED'
                ? 'font-medium line-through text-gray-400'
                : 'font-medium'
            }
          >
            {task.title}
          </h3>
          <span
            className={`rounded px-2 py-0.5 text-xs ${priorityColors[task.priority]}`}
          >
            {task.priority}
          </span>
        </div>
        {task.description && (
          <p className="text-sm text-gray-500">{task.description}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <select
          value={task.status}
          onChange={(e) =>
            updateStatus({ id: task.id, status: e.target.value as TaskStatus })
          }
          className="rounded border px-2 py-1 text-sm"
        >
          {Object.entries(statusLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        <button
          onClick={() => removeTask(task.id)}
          className="rounded px-2 py-1 text-sm text-red-600 hover:bg-red-50"
        >
          Excluir
        </button>
      </div>
    </div>
  )
}