export type User = {
  id: number
  email: string
}

export type TaskStatus = 'pending' | 'in_progress' | 'completed'

export type Task = {
  id: number
  title: string
  description: string | null
  status: TaskStatus
  user_id: number
}

export type TokenResponse = {
  access_token: string
  token_type: string
}

export type LoginRequest = {
  email: string
  password: string
}

export type RegisterRequest = {
  email: string
  password: string
}

export type TaskCreate = {
  title: string
  description?: string | null
  status?: TaskStatus
}

export type TaskUpdate = {
  title?: string
  description?: string | null
  status?: TaskStatus
}
