import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { SpeechProvider } from "@speechly/react-client";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SpeechProvider appId='02e38408-c4d6-48a5-85ba-5de38ba02641'>
      <App />
    </SpeechProvider>
  </React.StrictMode>
)
