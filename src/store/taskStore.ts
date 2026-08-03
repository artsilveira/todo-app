import { create } from 'zustand'
import type { Task, TaskStatus, TaskPriority } from '../types/task'

interface TaskStore {
  tasks: Task[]
  addTask: (title: string, description?: string, priority?: TaskPriority) => void
  updateStatus: (id: string, status: TaskStatus) => void
  deleteTask: (id: string) => void
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],

  addTask: (title, description, priority = 'medium') =>
    set((state) => ({
      tasks: [
        {
          id: crypto.randomUUID(),
          title,
          description,
          status: 'pending',
          priority,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        ...state.tasks,
      ],
    })),

  updateStatus: (id, status) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? { ...task, status, updatedAt: new Date().toISOString() }
          : task
      ),
    })),

  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
}))