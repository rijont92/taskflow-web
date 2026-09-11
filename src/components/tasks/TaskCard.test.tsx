import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import { TaskCard } from '@/components/tasks/TaskCard'
import type { Task } from '@/features/tasks/types'

const task: Task = {
  id: 1,
  title: 'Learn FastAPI',
  description: 'Finish TaskFlow',
  status: 'pending',
  user_id: 1,
}

describe('TaskCard', () => {
  it('renders task details and actions', async () => {
    const user = userEvent.setup()
    const onEdit = vi.fn()
    const onDelete = vi.fn()

    render(
      <MemoryRouter>
        <TaskCard task={task} onEdit={onEdit} onDelete={onDelete} />
      </MemoryRouter>,
    )

    expect(screen.getByText('Learn FastAPI')).toBeInTheDocument()
    expect(screen.getByText('Finish TaskFlow')).toBeInTheDocument()
    expect(screen.getByText('To do')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'View' })).toHaveAttribute(
      'href',
      '/tasks/1',
    )

    await user.click(screen.getByRole('button', { name: 'Edit' }))
    await user.click(screen.getByRole('button', { name: 'Delete' }))

    expect(onEdit).toHaveBeenCalledWith(task)
    expect(onDelete).toHaveBeenCalledWith(task)
  })
})
