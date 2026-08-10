import { useTasks } from '../hooks/useTasks'
import { TaskItem } from './TaskItem'

export function TaskList() {
  const { data: tasks, isLoading, isError } = useTasks()

  if (isLoading) return <p className="text-center text-muted">Carregando...</p>
  if (isError) return <p className="text-center text-accent">Erro ao carregar tarefas.</p>
  if (!tasks || tasks.length === 0) {
    return <p className="text-center text-muted">Nenhuma tarefa ainda.</p>
  }

  return (
    <div className="flex flex-col gap-2">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  )
}