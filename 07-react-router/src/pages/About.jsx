import { Link } from '../components/Link'
const AboutUs = () => {
  console.log('AboutUs component rendered')
  return (
    <div>
      <h2>About Us</h2>
      <p>We are passionate about anime and love creating content around it.</p>
      <Link to='/' className='text-blue-500 hover:underline'>
        Home Page
      </Link>
    </div>
  )
}
export default AboutUs
