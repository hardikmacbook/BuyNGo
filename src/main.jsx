import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-200 to-cyan-50">
      <App/>
    </div>
  </StrictMode>,
)
