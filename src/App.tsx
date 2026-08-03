import { TaskForm } from './components/TaskForm'
import { TaskList } from './components/TaskList'

function App() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">To-Do List</h1>
      <TaskForm />
      <div className="mt-6">
        <TaskList />
      </div>
    </div>
  )
}

export default App