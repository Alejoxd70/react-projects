import { SortBy, type User } from '../types.ts'

interface UserListProps {
  users: User[]
  showColors?: boolean
  handleDelete: (uuid: string) => void
  changeSorting: (sortBy: SortBy) => void
  sorting?: SortBy
}

export const UserList = ({ users, showColors, handleDelete, changeSorting, sorting }: UserListProps) => {
  return (
    <>
      <div className="overflow-x-auto max-w-4xl mx-auto mt-5 rounded-2xl border border-border-main">
        <table className="w-full text-center ">
          <thead>
            <tr className="bg-secondary/50">
              <th className="p-5">Photo</th>
              <th className={`${sorting === SortBy.NAME ? 'bg-secondary/40' : ''} p-5 cursor-pointer hover:bg-secondary/40`} onClick={() => changeSorting(SortBy.NAME)}>Name</th>
              <th className={`${sorting === SortBy.LAST ? 'bg-secondary/40' : ''} p-5 cursor-pointer hover:bg-secondary/40`} onClick={() => changeSorting(SortBy.LAST)}>Last Name</th>
              <th className={`${sorting === SortBy.COUNTRY ? 'bg-secondary/40' : ''} p-5 cursor-pointer hover:bg-secondary/40`} onClick={() => changeSorting(SortBy.COUNTRY)}>Country</th>
              <th className="p-5">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr
                key={user.login.uuid}
                className={`${showColors ? 'odd:bg-primary/30' : ''}`}
              >
                <td className="px-5 py-2 flex justify-center items-center">
                  <img
                    src={user.picture.thumbnail}
                    alt="User Image"
                    className="rounded-full size-12 object-cover"
                  />

                </td>
                <td className="px-5 py-2">{user.name.first}</td>
                <td className="px-5 py-2">{user.name.last}</td>
                <td className="px-5 py-2">{user.location.country}</td>
                <td className="px-5 py-2">
                  <button
                    className="bg-accent/70 p-2"
                    onClick={() => handleDelete?.(user.login.uuid)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {/* <nav aria-label="Page navigation" className="mt-5">
        <ul className="flex items-center justify-center -space-x-px h-8 text-sm">
          <li>
            <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight bg-white border border-e-0 border-primary rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-primary/50 dark:border-primary dark:text-accent dark:hover:bg-primary dark:hover:text-white">
              <span className="sr-only">Previous</span>
              <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
              </svg>
            </a>
          </li>

          {Array.from({ length: 5 }, (_, i) => (
            <li key={i + 1}>
              <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight bg-white border border-primary hover:bg-gray-100 hover:text-gray-700 dark:bg-primary/50 dark:border-primary dark:text-accent dark:hover:bg-primary dark:hover:text-white">
                {i + 1}
              </a>
            </li>
          ))}

          <li>
            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight bg-white border border-primary rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-primary/50 dark:border-primary dark:text-accent dark:hover:bg-primary dark:hover:text-white">
              <span className="sr-only">Next</span>
              <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
              </svg>
            </a>
          </li>

        </ul>
      </nav> */}
    </>
  )
}
