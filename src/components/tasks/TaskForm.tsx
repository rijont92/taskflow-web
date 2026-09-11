import { useState, type FormEvent } from 'react'

import { Button } from '@/components/ui/Button'
import { Input, TextArea } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import type { Task, TaskCreate, TaskStatus } from '@/features/tasks/types'

type TaskFormProps = {
  initialTask?: Task
  submitLabel: string
  pendingLabel: string
  isSubmitting: boolean
  error?: string
  onSubmit: (payload: TaskCreate) => Promise<void>
}

const statuses: TaskStatus[] = ['pending', 'in_progress', 'completed']

export function TaskForm({
  initialTask,
  submitLabel,
  pendingLabel,
  isSubmitting,
  error,
  onSubmit,
}: TaskFormProps) {
  const [title, setTitle] = useState(initialTask?.title ?? '')
  const [description, setDescription] = useState(initialTask?.description ?? '')
  const [status, setStatus] = useState<TaskStatus>(
    initialTask?.status ?? 'pending',
  )
  const [fieldError, setFieldError] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmedTitle = title.trim()
    if (!trimmedTitle) {
      setFieldError('Title is required.')
      return
    }
    setFieldError('')
    await onSubmit({
      title: trimmedTitle,
      description: description.trim() ? description.trim() : null,
      status,
    })
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
      <Input
        label="Title"
        name="title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        error={fieldError}
        maxLength={255}
        required
      />
      <TextArea
        label="Description"
        name="description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        maxLength={1000}
      />
      <Select
        label="Status"
        name="status"
        value={status}
        onChange={(event) => setStatus(event.target.value as TaskStatus)}
      >
        {statuses.map((value) => (
          <option key={value} value={value}>
            {value.replaceAll('_', ' ')}
          </option>
        ))}
      </Select>
      {error ? <p className="text-sm text-clay">{error}</p> : null}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? pendingLabel : submitLabel}
      </Button>
    </form>
  )
}
