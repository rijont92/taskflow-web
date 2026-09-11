import axios from 'axios'
import { describe, expect, it } from 'vitest'

import { getApiErrorMessage } from '@/lib/errors'

describe('getApiErrorMessage', () => {
  it('maps FastAPI string details', () => {
    const error = new axios.AxiosError(
      'fail',
      'ERR',
      undefined,
      undefined,
      {
        status: 401,
        data: { detail: 'Invalid email or password' },
        statusText: 'Unauthorized',
        headers: {},
        config: { headers: new axios.AxiosHeaders() },
      },
    )

    expect(getApiErrorMessage(error)).toBe('Invalid email or password')
  })

  it('hides raw server failures', () => {
    const error = new axios.AxiosError(
      'fail',
      'ERR',
      undefined,
      undefined,
      {
        status: 500,
        data: { detail: 'Internal Server Error' },
        statusText: 'Error',
        headers: {},
        config: { headers: new axios.AxiosHeaders() },
      },
    )

    expect(getApiErrorMessage(error)).toBe(
      'Something went wrong. Please try again.',
    )
  })
})
