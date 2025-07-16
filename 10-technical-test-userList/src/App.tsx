import { useState, useMemo } from 'react'
import { type User, SortBy } from './types.ts'
import { UserList } from './components/UserList'
import { useUsers } from './hooks/useUsers.ts'

const App = () => {
  const { isLoading, isError, users, refetch, fetchNextPage, hasNextPage, deleteUser, resetDeletedUsers } = useUsers()
  console.log('users', users)

  const [showColors, setShowColors] = useState<boolean>(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [searchQuery, setSearchQuery] = useState<string | null>(null)

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const resetSort = () => {
    setSorting(SortBy.NONE)
  }

  const filteredUsers = useMemo(() => {
    console.log('fiteredUsers calculated')
    return searchQuery
      ? users.filter(user => user.location.country.toLowerCase().includes(searchQuery.toLowerCase()))
      : users
  }, [users, searchQuery])

  const sortedUsers = useMemo(() => {
    console.log('sortUsers calculated')
    if (sorting === SortBy.NONE) return filteredUsers

    const sortProperties: Record<string, (user: User) => string> = {
      [SortBy.COUNTRY]: user => user.location.country,
      [SortBy.NAME]: user => user.name.first,
      [SortBy.LAST]: user => user.name.last,
    }
    return filteredUsers.toSorted((a, b) => {
      const extractSortProperty = sortProperties[sorting]

      return extractSortProperty(a).localeCompare(extractSortProperty(b))
    })
  }, [filteredUsers, sorting])

  const handleDeleteUser = (uuid: string) => {
    deleteUser(uuid)
  }

  const handleResetUsers = async () => {
    resetDeletedUsers()
    await refetch()
  }

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value
    setSearchQuery(query)
  }

  const handleChangeSort = (sortBy: SortBy) => {
    setSorting(sortBy)
  }

  return (
    <>
      <h1
        className="text-center text-3xl  font-bold"
      >
        Takina and chisato
      </h1>
      <header className="flex justify-center items-center mt-4 gap-2">
        <button
          onClick={toggleColors}
          className={`${showColors ? 'bg-accent/70' : 'bg-primary'} p-2`}
        >
          Show Colors
        </button>
        <button
          onClick={resetSort}
          className="bg-primary p-2"
        >
          Reset Sort
        </button>
        <button
          onClick={handleResetUsers}
          className="bg-primary p-2"
        >
          Resets All Users
        </button>

        <div className="flex items-center border border-border-main rounded-xl p-2 gap-2">
          <label htmlFor="search"><svg width="20" height="20" className="DocSearch-Search-Icon " viewBox="0 0 20 20" aria-hidden="true"><path d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z" stroke="currentColor" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round"></path></svg></label>
          <input
            type="text"
            id="search"
            placeholder="Search by country"
            className="border-none outline-none"
            onChange={handleOnChange}
          />
        </div>

      </header>

      <main>
        {users.length > 0 && <UserList users={sortedUsers} showColors={showColors} handleDelete={handleDeleteUser} changeSorting={handleChangeSort} sorting={sorting} />}

        {users.length === 0 && !isLoading && !isError && <p className="text-center my-5 font-bold">No users found</p>}

        {isLoading && !isError && <p className="text-center my-5 font-bold">Loading users...</p>}

        {!isLoading && isError && users.length === 0 && <p className="text-center text-red-500 mt-5 font-bold">Unexpecting error loading the users</p>}

        {!isLoading && !isError && hasNextPage === false && (
          <p className="text-center my-5 font-bold">No more users to load</p>
        )}

        {!isLoading && !isError && hasNextPage && users.length > 0 && (
          <div>
            <button onClick={() => fetchNextPage()} className="bg-primary p-2 my-5 mx-auto block">
              Load More
            </button>
          </div>
        )}

      </main>

    </>
  )
}

export default App
