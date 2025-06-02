import { MainLayout } from './layout/MainLayout'
import { HomePage } from './pages/Home'
import { Router } from './components/Router'
import { Route } from './components/Route'
import { lazy, Suspense } from 'react'

const AboutUs = lazy(() => import('./pages/About.jsx'))
const routes = [
  {
    path: '/about/:name',
    component: () => <h1>About Lycoris Recoil</h1>
  }
]

export const App = () => {
  return (
    <>
      <Suspense fallback={null}>

        <MainLayout>
          <main className='flex flex-col items-center justify-center'>
            <h1>Takina and Chisato</h1>
            <p>Welcome to the world of Lycoris Recoil!</p>

            <Router routes={routes}>
              <Route path='/' component={HomePage} />
              <Route path='/about' component={AboutUs} />
            </Router>

          </main>
        </MainLayout>

      </Suspense>
    </>
  )
}
