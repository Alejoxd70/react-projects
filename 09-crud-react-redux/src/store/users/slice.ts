import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const DEFAULT_STATE = [
  {
    id: '1',
    name: 'Alejo',
    email: 'alejo@alejo.com',
    github: 'Alejoxd70',
    role: 'Admin',
  },
  {
    id: '2',
    name: 'John',
    email: 'john@john.com',
    github: 'john123',
    role: 'User',
  },
  {
    id: '3',
    name: 'Jane',
    email: 'jane@jane.com',
    github: 'jane_doe',
    role: 'User',
  },
]

// Base interface defining the structure of a user object
export interface User {
  name: string
  email: string
  github: string
  role: string
}

export type UserId = string

// Extended interface that includes an ID for users stored in state
export interface UserState extends User {
  id: UserId
}

const initialState: UserState[] = (() => {
  // Try to load the initial state from localStorage
  const storedState = window.localStorage.getItem('reduxState')
  if (storedState) {
    return JSON.parse(storedState).users
  }
  return DEFAULT_STATE
})()

// Create the users slice with Redux Toolkit
export const userSlice = createSlice({
  name: 'users', // The name of this slice in the store
  initialState, // Starting state
  // Action creators and reducers
  reducers: {
    deleteUser: (state, action: PayloadAction<UserId>) => {
      const id = action.payload
      return state.filter(user => user.id !== id)
    },
    addUser: (state, action: PayloadAction<User>) => {
      const id = crypto.randomUUID()
      return [...state, { id, ...action.payload }]
    },
    rollbackUser: (state, action: PayloadAction<UserState>) => {
      const isUserExists = state.some(user => user.id === action.payload.id)
      if (!isUserExists) {
        return [...state, action.payload]
      }
    },
  },
})

// Export the reducer to be used in the store configuration
export default userSlice.reducer
export const { deleteUser, addUser, rollbackUser } = userSlice.actions
