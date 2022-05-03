import { useContext } from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

import { New } from './pages/New'
import { Home } from './pages/Home'
import { List } from './pages/List'
import { Login } from './pages/Login'
import { Single } from './pages/Single'
import { NotFound } from './components/NotFound'
import { userInputs, todoInputs } from './formSource'
import { todoColumns, userColumns } from './datatablesource'

import { DarkModeContext } from './context/darkmode/darkModeContext'
import { AuthContext } from './context/authentication/authContext'

import './style/dark.scss'

function App() {

  const { darkMode } = useContext(DarkModeContext)
  const { currentUser } = useContext(AuthContext)

  const RequireAuth = ({children}: any) => {
    return currentUser ? (children) : <Navigate to='/login'/>
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              path="login"
              element={
                <Login />
              }
            />
            <Route
              index
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route path="users">
              <Route
                index
                element={
                  <RequireAuth>
                    <List columns={userColumns}  title="Users" path="users"/>
                  </RequireAuth>
                }
              />
              <Route
                path=':userId'
                element={
                  <RequireAuth>
                    <Single />
                  </RequireAuth>
                }
              />
              <Route
                path='new'
                element={
                  <RequireAuth>
                    <New title="Add new User" inputs={userInputs} path="users"/>
                  </RequireAuth>
                }
              />
            </Route>

            <Route path="todos">
              <Route
                index
                element={
                  <RequireAuth>
                    <List columns={todoColumns}  title="Todo" path="todos" />
                  </RequireAuth>
                }
              />
              <Route
                path=':todoId'
                element={
                  <RequireAuth>
                    <Single />
                  </RequireAuth>
                }
              />
              <Route
                path='new'
                element={
                  <RequireAuth>
                    <New title="Add new Todo" inputs={todoInputs} path="todos" />
                  </RequireAuth>
                }
              />
            </Route>

          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
