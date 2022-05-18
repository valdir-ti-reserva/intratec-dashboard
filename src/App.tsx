import { useContext } from 'react'
import {
  Route,
  Routes,
  Navigate,
  useNavigate,
} from 'react-router-dom'

import {
  List,
  Divider,
  ListItem,
  IconButton,
  CssBaseline,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Drawer as MuiDrawer,
  Box
} from '@mui/material'
import {
  Theme,
  styled,
  useTheme,
  CSSObject,
} from '@mui/material/styles'
import {
  Mail,
  Inbox,
  ChevronLeft,
  ChevronRight,
} from '@material-ui/icons'

import { New } from './pages/New'
import { Home } from './pages/Home'
import { List as ListComponent } from './pages/List'
import { Login } from './pages/Login'
import { Single } from './pages/Single'
import { NotFound } from './components/NotFound'
import { userInputs, todoInputs } from './formSource'
import { todoColumns, userColumns } from './datatablesource'

import { DrawerContext } from './context/drawer/drawerContext'
import { AuthContext } from './context/authentication/authContext'
import { DarkModeContext } from './context/darkmode/darkModeContext'

import './style/dark.scss'

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  minHeight: '64px',
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {

  const theme = useTheme()
  const navigate = useNavigate()

  const { currentUser } = useContext(AuthContext)
  const { darkMode } = useContext(DarkModeContext)
  const { isOpen, dispatch } = useContext(DrawerContext)

  const RequireAuth = ({children}: any) => {
    return currentUser ? (children) : <Navigate to='/login'/>
  }

  const handleDrawerClose = (e: any) => {
    e.preventDefault()
    dispatch({ type: "DRAWER_TOGGLE" })
  };

  const handleNavigateDashboard = () => {
    navigate('/')
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer variant="permanent" open={isOpen}>
        <DrawerHeader>
          {isOpen ?
            <>
              <h3 onClick={handleNavigateDashboard} style={{cursor: 'pointer'}}>Intratec Tecnologia</h3>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
              </IconButton>
            </>
            :
            <h5 onClick={handleNavigateDashboard} style={{cursor: 'pointer'}}>Intratec</h5>
          }
        </DrawerHeader>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: isOpen ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: isOpen ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <Inbox /> : <Mail />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: isOpen ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: isOpen ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: isOpen ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <Inbox /> : <Mail />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: isOpen ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
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