import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import type { Task } from '@/features/tasks/types'

type DeleteTaskDialogProps = {
  task: Task
  isDeleting: boolean
  onCancel: () => void
  onConfirm: () => void
}

export function DeleteTaskDialog({
  task,
  isDeleting,
  onCancel,
  onConfirm,
}: DeleteTaskDialogProps) {
  return (
    <Modal title="Delete task?" onClose={onCancel}>
      <p className="text-sm text-muted">
        “{task.title}” will be permanently removed. This action cannot be undone.
      </p>
      <div className="mt-6 flex justify-end gap-2">
        <Button variant="secondary" type="button" onClick={onCancel} disabled={isDeleting}>
          Cancel
        </Button>
        <Button
          variant="danger"
          type="button"
          onClick={onConfirm}
          disabled={isDeleting}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
      </div>
    </Modal>
  )
}
