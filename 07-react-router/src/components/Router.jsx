import { useState, useEffect, Children } from 'react'
import { EVENTS } from '../const'
import { match } from 'path-to-regexp'
import { getCurrentPath } from '../utils'

export const Router = ({ children, routes = [], defaultComponent: DefaultComponent = () => <h1>404</h1> }) => {
  const [currentPage, setCurrentPage] = useState(getCurrentPath())
  useEffect(() => {
    const handleNavigation = () => {
      setCurrentPage(getCurrentPath())
    }
    window.addEventListener(EVENTS.PUSHSTATE, handleNavigation)
    window.addEventListener(EVENTS.POPSTATE, handleNavigation)

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, handleNavigation)
      window.removeEventListener(EVENTS.POPSTATE, handleNavigation)
    }
  }, [])

  // Add the routes from children if they are provided
  const routesFromChildren = Children.map(children, ({ props, type }) => {
    const { name } = type
    const isRoute = name === 'Route'

    return isRoute ? props : null
  })

  const routesTouse = routes.concat(routesFromChildren).filter(Boolean)

  let routeParams = {}

  const Page = routesTouse.find(route => {
    if (route.path === currentPage) return true

    // Use path-to-regexp to match the current path against the route's path
    const matcherUrl = match(route.path, { decode: decodeURIComponent })
    const matched = matcherUrl(currentPage)
    if (!matched) return false

    // If matched, set the routeParams to the matched parameters
    routeParams = matched.params
    return true
  })?.component
  return Page ? <Page routeParams={routeParams} /> : <DefaultComponent routeParams={routeParams} />
}
