import { Link } from '../components/Link'

export const HomePage = () => {
  return (
    <div>
      <h2>Home Page</h2>
      <p>Welcome to our anime fan site!</p>
      <Link to='/about' className='text-blue-500 hover:underline'>
        Learn more about us
      </Link>
    </div>
  )
}
