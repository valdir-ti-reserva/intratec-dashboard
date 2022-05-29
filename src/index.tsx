import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { DrawerContextProvider } from './context/drawer/drawerContext'
import { AuthContextProvider } from './context/authentication/authContext'
import { DarkModeContextProvider } from './context/darkmode/darkModeContext'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <DrawerContextProvider>
        <DarkModeContextProvider>
          <AuthContextProvider>
              <App />
          </AuthContextProvider>
        </DarkModeContextProvider>
      </DrawerContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

