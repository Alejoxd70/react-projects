import { useAppDispatch } from '../hooks/store'
import { type UserId, deleteUser, addUser } from '../store/users/slice'

export const useUsersActions = () => {
  const dispatch = useAppDispatch()

  const removeUser = (id: UserId) => {
    dispatch(deleteUser(id))
  }

  const addNewUser = (name: string, email: string, github: string, role: string) => {
    dispatch(addUser({ name, email, github, role }))
  }

  return {
    removeUser,
    addNewUser,
  }
}
