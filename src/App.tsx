import { useContext } from 'react'
import {
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'

import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

import { New } from './pages/New'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Single } from './pages/Single'
import { NotFound } from './components/NotFound'
import { List as ListComponent } from './pages/List'
import { userInputs, todoInputs } from './formSource'
import { todoColumns, userColumns } from './datatablesource'

import { AuthContext } from './context/authentication/authContext'
import { DarkModeContext } from './context/darkmode/darkModeContext'

import './App.scss'
import './style/dark.scss'

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  minHeight: '50px',
}));

export default function MiniDrawer() {

  const { currentUser } = useContext(AuthContext)
  const { darkMode } = useContext(DarkModeContext)

  const RequireAuth = ({children}: any) => {
    return currentUser ? (children) : <Navigate to='/login'/>
  }

  return (
    <Box>
      <Box component="main" sx={ currentUser && { flexGrow: 1, p: 3 }}>
        {currentUser && <DrawerHeader />}
        <div className={darkMode ? "app dark" : "app"}>
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
                      <ListComponent columns={userColumns}  title="Users" path="users"/>
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
                      <ListComponent columns={todoColumns}  title="Todos" path="todos" />
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
        </div>
      </Box>
    </Box>
  );
}