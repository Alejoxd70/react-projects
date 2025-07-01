import './index.css'
import { UserList } from './components/UserList'
import { CreateNewUser } from './components/CreateNewUser'
import { Toaster } from 'sonner'

const App = () => {
  return (
    <div>
      <h1 className="text-3xl font-black text-center my-4">
        Redux project practice
      </h1>
      <UserList />
      <CreateNewUser />
      <Toaster richColors />
    </div>
  )
}

export default App
