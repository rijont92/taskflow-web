import axios, { type AxiosError } from 'axios'

type FastApiValidationError = {
  loc?: Array<string | number>
  msg?: string
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

export function getApiErrorMessage(error: unknown): string {
  if (!axios.isAxiosError(error)) {
    return 'Something went wrong. Please try again.'
  }

  const axiosError = error as AxiosError<unknown>

  if (!axiosError.response) {
    return 'Unable to reach the server. Check that the API is running.'
  }

  const status = axiosError.response.status
  const data = axiosError.response.data

  if (status >= 500) {
    return 'Something went wrong. Please try again.'
  }

  if (isRecord(data) && typeof data.detail === 'string') {
    return data.detail
  }

  if (isRecord(data) && Array.isArray(data.detail)) {
    const messages = data.detail
      .map((item) => {
        if (isRecord(item) && typeof item.msg === 'string') {
          const field = Array.isArray(item.loc)
            ? String((item as FastApiValidationError).loc?.at(-1) ?? '')
            : ''
          return field ? `${field}: ${item.msg}` : item.msg
        }
        return null
      })
      .filter((message): message is string => Boolean(message))

    if (messages.length > 0) {
      return messages.join('. ')
    }
  }

  if (status === 401) {
    return 'You are not authorized to perform this action.'
  }
  if (status === 403) {
    return 'You are not authorized to perform this action.'
  }
  if (status === 404) {
    return 'The requested resource was not found.'
  }
  if (status === 409) {
    return 'Email already registered.'
  }
  if (status === 422) {
    return 'Please check the form and try again.'
  }
  if (status >= 500) {
    return 'Something went wrong. Please try again.'
  }

  return 'Something went wrong. Please try again.'
}
