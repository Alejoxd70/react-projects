import { cleanup, render, screen } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { Router } from './components/Router'
import { Route } from './components/Route'
import { Link } from './components/Link'
import { getCurrentPath } from './utils'

vi.mock('./utils', () => ({
  getCurrentPath: vi.fn()
}))

describe('Router', () => {
  beforeEach(() => {
    cleanup()
    vi.clearAllMocks()
  })
  it('should work without problems', () => {
    render(<Router routes={[]} />)
    expect(true).toBeTruthy()
  })

  it('should render a default component when no route matches', () => {
    render(<Router routes={[]} defaultComponent={() => <h1>404</h1>} />)
    expect(screen.getByText('404')).toBeTruthy()
  })

  it('should render the component of the first matching route', () => {
    getCurrentPath.mockReturnValue('/about')
    const routes = [
      {
        path: '/',
        component: () => <h1>Home</h1>
      },
      {
        path: '/about',
        component: () => <h1>About</h1>
      }
    ]

    render(<Router routes={routes} />)
    expect(screen.getByText('About')).toBeTruthy()
  })

  it('should navigate using Links', async () => {
    getCurrentPath.mockReturnValueOnce('/')
    render(
      <Router>
        <Route
          path='/' component={() => {
            return (
              <>
                <h1>Home</h1>
                <Link to='/about'>Go to about</Link>
              </>
            )
          }}
        />
        <Route path='/about' component={() => <h1>About</h1>} />
      </Router>
    )

    // Simulate a click on the Link
    screen.getByText(/Go to about/).click()

    const aboutTitle = await screen.findByText('About')

    // Check if the current path has changed
    expect(aboutTitle).toBeTruthy()
  })
})
