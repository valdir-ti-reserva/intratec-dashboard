import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    Dashboard,
    Logout,
    ExpandLess,
    ExpandMore
} from '@mui/icons-material'
import {
    Box,
    Collapse,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader
} from '@material-ui/core'
import {
    Theme,
    styled,
    useTheme,
    CSSObject,
  } from '@mui/material/styles'
import {
    Drawer as MuiDrawer
} from '@mui/material'
import { useConfirm } from 'material-ui-confirm'
import CircularProgress from '@mui/material/CircularProgress';

import { DinamicTag } from '../DinamicTag'

import { DrawerContext } from '../../context/drawer/drawerContext'
import { AuthContext } from '../../context/authentication/authContext'
import { DarkModeContext } from '../../context/darkmode/darkModeContext'

import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../../firebase'

import './styles.scss'

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

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    minHeight: '50px',
  }));

function Sidebar() {

    const { dispatch: DarkDispatch } = useContext(DarkModeContext);
    const { dispatch: AuthDispatch } = useContext(AuthContext);
    const { isOpen, dispatch } = useContext(DrawerContext)

    const navigate = useNavigate()
    // const theme = useTheme()

    const confirm = useConfirm()

    const handleLogout = () => {
        confirm({
            title: 'Atenção',
            description: 'Deseja realmente sair?',
            confirmationText: 'Sim',
            cancellationText: 'Não',
            cancellationButtonProps: {
                style: {
                  background: '#ff000091',
                  color: 'white',
                  fontWeight: 'bold'
                }
              },
              confirmationButtonProps: {
                style: {
                  background: '#008000cc',
                  color: 'white',
                  fontWeight: 'bold'
                }
              }
        }).then(async () => {
            AuthDispatch({type:"LOGOUT"})
        }).catch(() => console.log("Operação cancelada pelo usuário."))
    }

    const [menu, setMenu] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [openList , setOpenList] = useState<any>({})

    const handleClick = (el: React.MouseEvent<HTMLDivElement>) => {
        const target = el.currentTarget;
        const attribute = target.getAttribute("data-id")
        setOpenList((prev: { [x: string]: any }) => ({
            ...prev,
            [String(attribute)]: !prev[attribute || 0]
        }));
    }

    useEffect(() => {

        //Listen (REALTIME)
        const unsub = onSnapshot(
            collection(db, 'sidebar-menu'),
            (snapshot) => {
                let list: any = []
                snapshot.docs.forEach(doc => {
                    list.push({ id: doc.id, ...doc.data() })
                })
                setMenu(list)
                setLoading(false)
            }, (err) => {
                console.log('Error=', err)
            })
        return () => {
            unsub()
        }

    }, [])

    // const handleDrawerClose = (e: any) => {
    //     e.preventDefault()
    //     dispatch({ type: "DRAWER_TOGGLE" })
    //   };

    const handleNavigateDashboard = () => {
    navigate('/')
    }

    return (
        <Drawer variant="permanent" open={isOpen}>
            <div className="sidebar">
                <div className="top">
                    <DrawerHeader>
                        {isOpen ?
                            <>
                            <h3 onClick={handleNavigateDashboard} className="logo">Intratec Tecnologia</h3>
                            {/* <IconButton onClick={handleDrawerClose}>
                                {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
                            </IconButton> */}
                            </>
                            :
                            <h5 onClick={handleNavigateDashboard} className="logo-closed">Intratec</h5>
                        }
                    </DrawerHeader>
                </div>
                <hr />
                <div className="center">
                    <List
                        className='nav'
                        component="nav"
                        subheader={
                            <ListSubheader component="div" className='title'>MAIN</ListSubheader>
                        }
                    >
                    <ListItem button component={props => <Link {...props} to="/" />} className='item-title'>
                            <ListItemIcon>
                                <Dashboard className='icon-title' />
                            </ListItemIcon>
                            <ListItemText inset primary='DASHBOARD' className='text-title' />
                        </ListItem>
                    </List>
                    <hr />
                    <List
                        className='nav'
                        component="nav"
                        subheader={
                            <ListSubheader component="div" className='title'>PROJECTS</ListSubheader>
                        }
                    >
                        {/* DINAMIC MENU */}
                        {loading ?  <Box className='loading-box'>
                                        <CircularProgress size={28} className='loading-icon'/>
                                    </Box> :
                            menu.map((item) => (
                                <React.Fragment key={item.id}>
                                    <ListItem data-id={item.id} button onClick={handleClick} className='item-title'>
                                        <ListItemIcon>
                                            <DinamicTag icon={item.icon} classname='icon-title'/>
                                        </ListItemIcon>
                                        <ListItemText inset primary={item.title} className='text-title' />
                                        {openList[item.id] ? <ExpandLess /> : <ExpandMore />}
                                    </ListItem>
                                    <Collapse in={openList[item.id]} timeout="auto" unmountOnExit>
                                        {item.items.map((menu: any, i: number) => (
                                            <List component="div" disablePadding key={item.items[i]}>
                                                <ListItem component={props => <Link {...props} to={`/${menu.url}`} />} button className='subitem'>
                                                    <ListItemIcon>
                                                        <DinamicTag icon={menu.icon} classname='icon-subitem' />
                                                    </ListItemIcon>
                                                    <ListItemText inset primary={menu.title} className='text-subitem'/>
                                                </ListItem>
                                            </List>
                                        ))}
                                    </Collapse>
                                </React.Fragment>
                        ))}

                        <ListItem button onClick={() => handleLogout()} className='item-title'>
                            <ListItemIcon>
                                <Logout className='icon-title' />
                            </ListItemIcon>
                            <ListItemText inset primary='LOGOUT' className='text-title'/>
                        </ListItem>

                    </List>
                </div>
                <hr />
                <div className="bottom">
                    <div className="colorOption" onClick={() => DarkDispatch({type: "LIGHT"})}></div>
                    <div className="colorOption" onClick={() => DarkDispatch({type: "DARK"})}></div>
                </div>
            </div>
        </Drawer>
    )
}

export { Sidebar }
