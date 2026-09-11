import { apiClient } from '@/lib/apiClient'
import type { Task, TaskCreate, TaskUpdate } from '@/types/api'

export async function getTasks(): Promise<Task[]> {
  const response = await apiClient.get<Task[]>('/tasks')
  return response.data
}

export async function getTask(taskId: number): Promise<Task> {
  const response = await apiClient.get<Task>(`/tasks/${taskId}`)
  return response.data
}

export async function createTask(payload: TaskCreate): Promise<Task> {
  const response = await apiClient.post<Task>('/tasks', payload)
  return response.data
}

export async function updateTask(
  taskId: number,
  payload: TaskUpdate,
): Promise<Task> {
  const response = await apiClient.patch<Task>(`/tasks/${taskId}`, payload)
  return response.data
}

export async function deleteTask(taskId: number): Promise<void> {
  await apiClient.delete(`/tasks/${taskId}`)
}
