import { useUsersActions } from '../hooks/useUsers'
import { useState } from 'react'

export const CreateNewUser = () => {
  const { addNewUser } = useUsersActions()
  const [result, setResult] = useState<'success' | 'error' | null>(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setResult(null) // Reset result state on form submission

    const form = event.currentTarget

    const formData = new FormData(form)

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const github = formData.get('github') as string
    const role = formData.get('role') as string

    if (!name || !email || !github || !role) {
      return setResult('error')
    }

    addNewUser(name, email, github, role)
    setResult('success')
    form.reset()
  }
  return (
    <>
      <main className="">
        <div className="max-w-md mx-auto p-5">
          <h1 className="text-center text-xl font-bold bg-gradient-to-r from-accent  to-secondary  text-transparent bg-clip-text">
            Create a new User
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block mb-2  font-semibold text-accent"
              >
                Your Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Enter your name"
                className="bg-primary/70  p-2 rounded-md w-full focus:ring-2 focus:ring-accent/80 outline-none"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2  font-semibold text-accent"
              >
                Your Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your Email"
                required
                className="bg-primary/70  p-2 rounded-md w-full focus:ring-2 focus:ring-accent/80 outline-none"
              />
            </div>

            <div className="mb-4 grid grid-cols-2 gap-2">
              <div>
                <label
                  htmlFor="github"
                  className="block mb-2  font-semibold text-accent"
                >
                  Your Github Username
                </label>
                <input
                  id="github"
                  name="github"
                  type="text"
                  placeholder="Enter your Github"
                  required
                  className="bg-primary/70  p-2 rounded-md w-full focus:ring-2 focus:ring-accent/80 outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="role"
                  className="block mb-2  font-semibold text-accent"
                >
                  Your Role
                </label>
                <input
                  id="role"
                  name="role"
                  type="text"
                  required
                  placeholder="Enter your Role"
                  className="bg-primary/70  p-2 rounded-md w-full focus:ring-2 focus:ring-accent/80 outline-none"
                />
              </div>
            </div>

            <div className="">
              <button
                type="submit"
                className="w-full cursor-pointer bg-accent/80 hover:bg-accent/90 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300"
              >
                Create User
              </button>
              <p className="text-secondary text-center mt-2">
                {
                  result === 'success'
                    ? 'User created successfully!'
                    : result === 'error'
                      ? 'Please fill in all fields.'
                      : ''
                }
              </p>
            </div>

          </form>
        </div>
      </main>
    </>
  )
}
