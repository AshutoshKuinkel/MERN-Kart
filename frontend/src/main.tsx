import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ReactQueryClientProvider from './providers/query-client.provider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactQueryClientProvider>
      <App />
    </ReactQueryClientProvider>
  </StrictMode>,
)
