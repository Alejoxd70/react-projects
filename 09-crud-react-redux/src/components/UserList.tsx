import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useAppSelector } from '../hooks/store'
import { useUsersActions } from '../hooks/useUsers'

export const UserList = () => {
  const users = useAppSelector(state => state.users)
  const { removeUser } = useUsersActions()

  return (
    <>
      <main className="max-w-3xl mx-auto">
        <h1 className="my-2 font-bold text-xl">
          Users
          <span className="ml-2 bg-primary px-2 rounded-full text-accent font-bold">
            {users.length}
          </span>
        </h1>
        <div className="relative rounded-lg overflow-x-auto shadow border border-border-main ">
          <table className="w-full text-left">
            <thead className="bg-primary/70  font-semibold text-sm">
              <tr className="">
                <td className="px-6 py-4">User</td>
                <td className="px-6 py-4">Email</td>
                <td className="px-6 py-4">Github</td>
                <td className="px-6 py-4">Role</td>
                <td className="px-6 py-4">Actions</td>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 && (
                <tr className="">
                  <td colSpan={5} className="p-4 text-sm text-accent font-bold">
                    No users found!
                  </td>
                </tr>
              )}
              {users.map(user => (
                <tr
                  key={user.id}
                  className=" border-b border-primary/90 hover:bg-primary/90 last:border-b-0 text-xs"
                >
                  <td className="text-sm font-semibold text-accent whitespace-nowrap">
                    <div className="flex gap-2 items-center p-2 px-6 py-4">
                      <img
                        src={`https://unavatar.io/github/${user.github}`}
                        alt="Github Avatar"
                        className="size-8 rounded-full"
                      />
                      {user.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    <a
                      href={`https://github.com/${user.github}`}
                      target="_blank"
                      className="hover:text-accent/80 hover:underline font-semibold"
                    >
                      {user.github}
                    </a>
                  </td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="text-accent px-6 py-4">
                    <div className="flex">
                      <button
                        type="button"
                        className="cursor-pointer hover:text-accent/80 mr-2"
                      >
                        <PencilSquareIcon className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        className="cursor-pointer hover:text-accent/80 mr-2"
                        onClick={() => removeUser(user.id)}
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  )
}
