import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { App } from './App.jsx'
import { FiltersProvider } from './context/FiltersProvider.jsx'

createRoot(document.getElementById('app')).render(
  <StrictMode>
    <FiltersProvider>
      <App />
    </FiltersProvider>
  </StrictMode>
)
