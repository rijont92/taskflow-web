import { describe, expect, it } from 'vitest'

import { getToken, isAuthenticated, removeToken, setToken } from '@/lib/auth'

describe('auth token helpers', () => {
  it('stores, reads, and clears the access token', () => {
    removeToken()
    expect(isAuthenticated()).toBe(false)

    setToken('abc.def.ghi')
    expect(getToken()).toBe('abc.def.ghi')
    expect(isAuthenticated()).toBe(true)

    removeToken()
    expect(getToken()).toBeNull()
    expect(isAuthenticated()).toBe(false)
  })
})
