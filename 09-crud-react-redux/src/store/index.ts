import { configureStore, type Middleware } from '@reduxjs/toolkit'
import usersReducer, { rollbackUser } from './users/slice'
import { toast } from 'sonner'

// Middleware to persist the Redux state to localStorage after each action
const persistanceLocalStorageMiddleware: Middleware = function (store) {
  return function (next) {
    return function (action) {
      next(action)
      // Save the current state to localStorage after every action
      window.localStorage.setItem('reduxState', JSON.stringify(store.getState()))
    }
  }
}

// Middleware to sinchronize with database
const syncWithDatabaseMiddleware: Middleware = store => next => (action) => {
  const { type, payload } = action
  const previousState = store.getState()

  next(action)

  if (type === 'users/deleteUser') {
    const userToRemove = previousState.users.find(user => user.id === payload)

    fetch(`https://jsonplaceholder.typicode.comm/users/${payload}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) {
          toast.error('Error deleting user from database')
          return
        }
        toast.success('User deleted successfully from database')
      })
      .catch((err) => {
        // If the user was not deleted from the database, rollback the state
        if (userToRemove) store.dispatch(rollbackUser(userToRemove))
        toast.error(`Error deleting user ${payload} from database, rolling back state`)
        console.error('Error: ', err)
      })
  }
}

// Create and configure the global Redux store for the application
export const store = configureStore({
  reducer: {
    // Register the reducers to handle the slice of state
    users: usersReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(persistanceLocalStorageMiddleware).concat(syncWithDatabaseMiddleware),
})

// This represents the shape of the complete Redux state
export type RootState = ReturnType<typeof store.getState>

// Used for dispatching actions with proper TypeScript support
export type AppDispatch = typeof store.dispatch
