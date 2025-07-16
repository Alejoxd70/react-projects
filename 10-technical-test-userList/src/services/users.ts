export const fetchUsers = async ({ pageParam }: { pageParam: number }) => {
  const response = await fetch(`https://randomuser.me/api/?results=10&page=${pageParam}&seed=chisataki`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const res = await response.json()

  const currentPage = res.info.page
  return {
    users: res.results,
    nextCursor: currentPage > 3 ? undefined : currentPage + 1,
  }
}
