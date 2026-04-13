import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App_prev.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
