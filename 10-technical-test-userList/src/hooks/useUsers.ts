import { useInfiniteQuery } from '@tanstack/react-query'
import { useState, useMemo } from 'react'
import { fetchUsers } from '../services/users'

export const useUsers = () => {
  const [deletedUserIds, setDeletedUserIds] = useState<Set<string>>(new Set())

  const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['users'],
    queryFn: ({ pageParam }) => fetchUsers({ pageParam }),
    getNextPageParam: lastPage => lastPage.nextCursor,
    initialPageParam: 1,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })

  const users = useMemo(() => {
    const allUsers = data?.pages?.flatMap(page => page.users) ?? []
    return allUsers.filter(user => !deletedUserIds.has(user.login.uuid))
  }, [data, deletedUserIds])

  const deleteUser = (uuid: string) => {
    setDeletedUserIds(prev => new Set([...prev, uuid]))
  }

  const resetDeletedUsers = () => {
    setDeletedUserIds(new Set())
  }

  return {
    isLoading,
    isError,
    users,
    hasNextPage,
    refetch,
    fetchNextPage,
    deleteUser,
    resetDeletedUsers,
  }
}
