import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { ConfirmProvider } from "material-ui-confirm"

import { DrawerContextProvider } from './context/drawer/drawerContext'
import { AuthContextProvider } from './context/authentication/authContext'
import { DarkModeContextProvider } from './context/darkmode/darkModeContext'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <DrawerContextProvider>
        <DarkModeContextProvider>
          <AuthContextProvider>
            <ConfirmProvider>
              <App />
            </ConfirmProvider>
          </AuthContextProvider>
        </DarkModeContextProvider>
      </DrawerContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

