export const MainLayout = ({ children }) => {
  return (
    <>
      <div className='dark:text-white max-w-6xl bg-gray-800 mx-auto p-6'>
        {children}
      </div>
    </>
  )
}
