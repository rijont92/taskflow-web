import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from '@/features/tasks/api'
import type { TaskUpdate } from '@/features/tasks/types'

export const tasksQueryKey = ['tasks'] as const

export function taskQueryKey(taskId: number) {
  return ['tasks', taskId] as const
}

export function useTasks() {
  return useQuery({
    queryKey: tasksQueryKey,
    queryFn: getTasks,
  })
}

export function useTask(taskId: number) {
  return useQuery({
    queryKey: taskQueryKey(taskId),
    queryFn: () => getTask(taskId),
    enabled: Number.isFinite(taskId) && taskId > 0,
  })
}

export function useCreateTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createTask,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: tasksQueryKey })
    },
  })
}

export function useUpdateTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ taskId, payload }: { taskId: number; payload: TaskUpdate }) =>
      updateTask(taskId, payload),
    onSuccess: async (task) => {
      await queryClient.invalidateQueries({ queryKey: tasksQueryKey })
      queryClient.setQueryData(taskQueryKey(task.id), task)
    },
  })
}

export function useDeleteTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: async (_data, taskId) => {
      await queryClient.invalidateQueries({ queryKey: tasksQueryKey })
      queryClient.removeQueries({ queryKey: taskQueryKey(taskId) })
    },
  })
}
