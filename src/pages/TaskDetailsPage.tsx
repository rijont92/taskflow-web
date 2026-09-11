import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { DeleteTaskDialog } from '@/components/tasks/DeleteTaskDialog'
import { TaskForm } from '@/components/tasks/TaskForm'
import { Alert } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { PageSpinner } from '@/components/ui/Spinner'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { useToast } from '@/components/ui/Toast'
import { useDeleteTask, useTask, useUpdateTask } from '@/features/tasks/hooks'
import type { TaskCreate } from '@/features/tasks/types'
import { getApiErrorMessage } from '@/lib/errors'

export function TaskDetailsPage() {
  const { taskId } = useParams()
  const id = Number(taskId)
  const navigate = useNavigate()
  const { notify } = useToast()
  const { data: task, isPending, isError, error } = useTask(id)
  const updateTask = useUpdateTask()
  const deleteTask = useDeleteTask()
  const [editing, setEditing] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [formError, setFormError] = useState('')

  async function handleUpdate(payload: TaskCreate) {
    if (!task) {
      return
    }
    setFormError('')
    try {
      await updateTask.mutateAsync({
        taskId: task.id,
        payload: {
          title: payload.title,
          description: payload.description ?? null,
          status: payload.status,
        },
      })
      notify('Task updated.')
      setEditing(false)
    } catch (updateError) {
      setFormError(getApiErrorMessage(updateError))
    }
  }

  async function handleDelete() {
    if (!task) {
      return
    }
    try {
      await deleteTask.mutateAsync(task.id)
      notify('Task deleted.')
      navigate('/tasks', { replace: true })
    } catch (deleteError) {
      notify(getApiErrorMessage(deleteError), 'error')
    }
  }

  if (!Number.isFinite(id)) {
    return <Alert>Task not found.</Alert>
  }

  if (isPending) {
    return <PageSpinner label="Loading task..." />
  }

  if (isError || !task) {
    return (
      <div>
        <Alert>
          {getApiErrorMessage(error) === 'The requested resource was not found.'
            ? 'Task not found.'
            : getApiErrorMessage(error) || 'Unable to load this task.'}
        </Alert>
        <Link to="/tasks" className="mt-4 inline-block text-sm text-pine hover:underline">
          Back to tasks
        </Link>
      </div>
    )
  }

  return (
    <div>
      <Link to="/tasks" className="text-sm text-pine hover:underline">
        Back to tasks
      </Link>
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="font-display text-3xl break-words">{task.title}</h1>
          <div className="mt-3">
            <StatusBadge status={task.status} />
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" type="button" onClick={() => setEditing(true)}>
            Edit
          </Button>
          <Button variant="danger" type="button" onClick={() => setDeleting(true)}>
            Delete
          </Button>
        </div>
      </div>
      <p className="mt-6 whitespace-pre-wrap text-sm leading-6 text-muted">
        {task.description || 'No description'}
      </p>

      {editing ? (
        <Modal title="Edit task" onClose={() => setEditing(false)}>
          <TaskForm
            initialTask={task}
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
          task={task}
          isDeleting={deleteTask.isPending}
          onCancel={() => setDeleting(false)}
          onConfirm={handleDelete}
        />
      ) : null}
    </div>
  )
}
