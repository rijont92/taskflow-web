import { useQuery } from '@tanstack/react-query'

import { getCurrentUser } from '@/features/auth/api'
import { getToken } from '@/lib/auth'

export const currentUserQueryKey = ['users', 'me'] as const

export function useCurrentUser(enabled = true) {
  return useQuery({
    queryKey: currentUserQueryKey,
    queryFn: getCurrentUser,
    enabled: enabled && Boolean(getToken()),
    retry: false,
  })
}
