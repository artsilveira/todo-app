import type { Task, TaskStatus } from '../types/task'

const API_URL = 'http://localhost:8080/api/tasks'

export async function fetchTasks(): Promise<Task[]> {
  const response = await fetch(API_URL)
  if (!response.ok) throw new Error('Erro ao buscar tarefas')
  return response.json()
}

export async function createTask(data: {
  title: string
  description?: string
  priority: Task['priority']
}): Promise<Task> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error('Erro ao criar tarefa')
  return response.json()
}

export async function updateTask(
  id: string,
  data: { title: string; description?: string; priority: Task['priority'] }
): Promise<Task> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error('Erro ao editar tarefa')
  return response.json()
}

export async function updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
  const response = await fetch(`${API_URL}/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(status),
  })
  if (!response.ok) throw new Error('Erro ao atualizar status')
  return response.json()
}

export async function deleteTask(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
  if (!response.ok) throw new Error('Erro ao excluir tarefa')
}