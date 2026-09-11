import { useMemo, useState } from 'react'

import { DeleteTaskDialog } from '@/components/tasks/DeleteTaskDialog'
import { TaskCard } from '@/components/tasks/TaskCard'
import { TaskFilters } from '@/components/tasks/TaskFilters'
import { TaskForm } from '@/components/tasks/TaskForm'
import { Alert } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { TaskListSkeleton } from '@/components/ui/Spinner'
import { useToast } from '@/components/ui/Toast'
import {
  useCreateTask,
  useDeleteTask,
  useTasks,
  useUpdateTask,
} from '@/features/tasks/hooks'
import type { Task, TaskCreate, TaskStatus } from '@/features/tasks/types'
import { getApiErrorMessage } from '@/lib/errors'

export function TasksPage() {
  const { notify } = useToast()
  const { data: tasks, isPending, isError, refetch } = useTasks()
  const createTask = useCreateTask()
  const updateTask = useUpdateTask()
  const deleteTask = useDeleteTask()

  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<TaskStatus | 'all'>('all')
  const [createOpen, setCreateOpen] = useState(false)
  const [editing, setEditing] = useState<Task | null>(null)
  const [deleting, setDeleting] = useState<Task | null>(null)
  const [formError, setFormError] = useState('')

  const filtered = useMemo(() => {
    return (tasks ?? []).filter((task) => {
      const matchesStatus = status === 'all' || task.status === status
      const matchesQuery = task.title
        .toLowerCase()
        .includes(query.trim().toLowerCase())
      return matchesStatus && matchesQuery
    })
  }, [tasks, status, query])

  async function handleCreate(payload: TaskCreate) {
    setFormError('')
    try {
      await createTask.mutateAsync(payload)
      notify('Task created.')
      setCreateOpen(false)
    } catch (error) {
      setFormError(getApiErrorMessage(error))
    }
  }

  async function handleUpdate(payload: TaskCreate) {
    if (!editing) {
      return
    }
    setFormError('')
    const next: { title?: string; description?: string | null; status?: TaskStatus } =
      {}
    if (payload.title !== editing.title) {
      next.title = payload.title
    }
    if ((payload.description ?? null) !== editing.description) {
      next.description = payload.description ?? null
    }
    if (payload.status !== editing.status) {
      next.status = payload.status
    }
    try {
      await updateTask.mutateAsync({
        taskId: editing.id,
        payload: Object.keys(next).length > 0 ? next : { title: payload.title },
      })
      notify('Task updated.')
      setEditing(null)
    } catch (error) {
      setFormError(getApiErrorMessage(error))
    }
  }

  async function handleDelete() {
    if (!deleting) {
      return
    }
    try {
      await deleteTask.mutateAsync(deleting.id)
      notify('Task deleted.')
      setDeleting(null)
    } catch (error) {
      notify(getApiErrorMessage(error), 'error')
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl">Tasks</h1>
          <p className="mt-1 text-sm text-muted">
            Only your tasks are listed. The server ignores any attempt to choose
            another owner.
          </p>
        </div>
        <Button type="button" onClick={() => setCreateOpen(true)}>
          Create task
        </Button>
      </div>

      <div className="mt-6">
        <TaskFilters
          query={query}
          status={status}
          onQueryChange={setQuery}
          onStatusChange={setStatus}
        />
      </div>

      <div className="mt-6">
        {isPending ? <TaskListSkeleton /> : null}
        {isError ? (
          <div className="flex flex-col items-start gap-3">
            <Alert>Unable to load tasks.</Alert>
            <Button variant="secondary" type="button" onClick={() => refetch()}>
              Try again
            </Button>
          </div>
        ) : null}
        {!isPending && !isError && filtered.length === 0 ? (
          <div className="rounded-lg border border-dashed border-line bg-surface px-6 py-12 text-center">
            <h2 className="font-display text-2xl">No tasks yet</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">
              Create your first task to get started. You can filter and search
              once you have a list.
            </p>
            <Button className="mt-5" type="button" onClick={() => setCreateOpen(true)}>
              Create task
            </Button>
          </div>
        ) : null}
        {!isPending && !isError && filtered.length > 0 ? (
          <div className="grid gap-3 md:grid-cols-2">
            {filtered.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={setEditing}
                onDelete={setDeleting}
              />
            ))}
          </div>
        ) : null}
      </div>

      {createOpen ? (
        <Modal title="Create task" onClose={() => setCreateOpen(false)}>
          <TaskForm
            submitLabel="Create task"
            pendingLabel="Creating task..."
            isSubmitting={createTask.isPending}
            error={formError}
            onSubmit={handleCreate}
          />
        </Modal>
      ) : null}

      {editing ? (
        <Modal title="Edit task" onClose={() => setEditing(null)}>
          <TaskForm
            key={editing.id}
            initialTask={editing}
            submitLabel="Save"
            pendingLabel="Saving..."
            isSubmitting={updateTask.isPending}
            error={formError}
            onSubmit={handleUpdate}
          />
        </Modal>
      ) : null}

      {deleting ? (
        <DeleteTaskDialog
          task={deleting}
          isDeleting={deleteTask.isPending}
          onCancel={() => setDeleting(null)}
          onConfirm={handleDelete}
        />
      ) : null}
    </div>
  )
}
