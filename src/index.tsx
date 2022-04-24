import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'

import { AuthContextProvider } from './context/authentication/authContext'
import { DarkModeContextProvider } from './context/darkmode/darkModeContext'
import { ConfirmProvider } from "material-ui-confirm";

ReactDOM.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <AuthContextProvider>
        <ConfirmProvider>
          <App />
        </ConfirmProvider>
      </AuthContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

