import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThirdwebProvider } from '@thirdweb-dev/react'
import './index.css'
import App from './App.tsx'

// Thirdweb configuration
const activeChain = "ethereum"; // You can change this to any supported chain

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThirdwebProvider
      activeChain={activeChain}
      clientId={import.meta.env.VITE_THIRDWEB_CLIENT_ID || ""}
    >
      <App />
    </ThirdwebProvider>
  </StrictMode>,
)
