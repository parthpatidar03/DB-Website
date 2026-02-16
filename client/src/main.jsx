import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './assets/main.css'

/**
 * Main Entry Point for DataByte Frontend
 * 
 * Renders the React application into the DOM
 * Includes global CSS with Tailwind directives
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
