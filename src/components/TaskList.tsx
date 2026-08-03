import { useTaskStore } from '../store/taskStore'
import { TaskItem } from './TaskItem'

export function TaskList() {
  const tasks = useTaskStore((state) => state.tasks)

  if (tasks.length === 0) {
    return <p className="text-center text-gray-400">Nenhuma tarefa ainda.</p>
  }

  return (
    <div className="flex flex-col gap-2">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  )
}