import { useTasks } from '../hooks/useTasks'
import { TaskItem } from './TaskItem'
import { Accordion } from './Accordion'

export function TaskList() {
  const { data: tasks, isLoading, isError } = useTasks()

  if (isLoading) return <p className="text-center text-muted">Carregando...</p>
  if (isError) return <p className="text-center text-accent">Erro ao carregar tarefas.</p>
  if (!tasks || tasks.length === 0) {
    return <p className="text-center text-muted">Nenhuma tarefa ainda.</p>
  }

  const pendingTasks = tasks.filter((t) => t.status !== 'COMPLETED')
  const completedTasks = tasks.filter((t) => t.status === 'COMPLETED')

  return (
    <div>
      <Accordion title="Tarefas pendentes" count={pendingTasks.length}>
        {pendingTasks.length === 0 ? (
          <p className="text-sm text-muted">Nenhuma tarefa pendente.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {pendingTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        )}
      </Accordion>

      <Accordion title="Tarefas concluídas" count={completedTasks.length} defaultOpen={false}>
        {completedTasks.length === 0 ? (
          <p className="text-sm text-muted">Nenhuma tarefa concluída.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {completedTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        )}
      </Accordion>
    </div>
  )
}