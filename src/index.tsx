import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { AuthContextProvider } from './context/authentication/authContext'
import { DarkModeContextProvider } from './context/darkmode/darkModeContext'

ReactDOM.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

