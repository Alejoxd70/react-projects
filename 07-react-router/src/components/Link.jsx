import { EVENTS } from '../const'

export const navigate = (href) => {
  window.history.pushState({}, '', href)
  const navigationEvent = new Event(EVENTS.PUSHSTATE)
  window.dispatchEvent(navigationEvent)
}

export const Link = ({ target, to, ...props }) => {
  const handleClick = event => {
    const isMainEvent = event.button === 0 // left mouse button
    const isModifiedEvent = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey
    const isManageableEvent = target === undefined || target === '_self'

    if (isMainEvent && isManageableEvent && !isModifiedEvent) {
      event.preventDefault()
      navigate(to) // SPA navigation
    }
  }

  return (
    <a
      href={to}
      target={target}
      onClick={handleClick}
      {...props}
    />
  )
}
