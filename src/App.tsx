import { TaskForm } from './components/TaskForm'
import { TaskList } from './components/TaskList'
import { DayProgress } from './components/DayProgress'

function App() {
  return (
    <div className="min-h-screen bg-bg">
      <div className="mx-auto max-w-2xl px-4 py-12">
        <header className="mb-10 text-center">
          <h1 className="font-display text-4xl tracking-wide text-accent">
            Ashen Ledger
          </h1>
          <p className="mt-1 text-sm tracking-widest text-muted uppercase">
            Daily Task Ledger
          </p>
        </header>

        <div className="rounded-lg border border-border bg-surface p-6 shadow-[0_8px_30px_var(--color-shadow)]">
          <TaskForm />
          <div className="mt-6 border-t border-border pt-6">
            <DayProgress />
            <TaskList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App