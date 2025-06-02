import { App } from './App'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import './index.css'

createRoot(document.getElementById('app')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
