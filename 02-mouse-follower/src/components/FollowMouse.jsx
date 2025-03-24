import { useEffect, useState } from 'react'
const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  // Pointer move
  useEffect(() => {
    console.log('useEffect called')
    const handleMove = (e) => {
      const { clientX, clientY } = e
      console.log(clientX, clientY)
      setPosition({ x: clientX, y: clientY })
    }
    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }

    // cleanup
    // When the component is unmounted, the cleanup function is called.
    return () => {
      console.log('cleanup called')
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled])

  // Change body classname
  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled)

    return () => {
      document.body.classList.remove('no-cursor')
    }
  }, [enabled])

  return (
    <>
      <h1>Bang! dream It's my go!!!!!</h1>
      <div
        className='ball'
        style={{
          // position: 'absolute',
          // backgroundColor: '#09f',
          // borderRadius: '50%',
          // opacity: '0.8',
          // pointerEvents: 'none',
          // left: -20,
          // top: -20,
          // height: 40,
          // width: 40,
          transform: `translate(${position.x}px, ${position.y}px)`
        }}
      />
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Disable' : 'Enabled'}
      </button>
    </>
  )
}

export { FollowMouse }
