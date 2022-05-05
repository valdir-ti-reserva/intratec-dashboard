import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Dashboard,
    Logout,
    ExpandLess,
    ExpandMore,
} from '@mui/icons-material'
import { Collapse, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from '@material-ui/core'
import { useConfirm } from 'material-ui-confirm'

import { DarkModeContext } from '../../context/darkmode/darkModeContext'
import { AuthContext } from '../../context/authentication/authContext'

import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../../firebase'

import './styles.scss'
import { DinamicTag } from '../DinamicTag'

function Sidebar() {

    const { dispatch: DarkDispatch } = useContext(DarkModeContext);
    const { dispatch: AuthDispatch } = useContext(AuthContext);

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
    const [openList , setOpenList] = useState<any>({})

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
            }, (err) => {
                console.log('Error=', err)
            })
        return () => {
            unsub()
        }

    }, [])

    const handleClick = (el: React.MouseEvent<HTMLDivElement>) => {
        const target = el.currentTarget;
        const attribute = target.getAttribute("data-id")
        setOpenList((prev: { [x: string]: any }) => ({
            ...prev,
            [String(attribute)]: !prev[attribute || 0]
        }));
    }

    return (
        <div className="sidebar">
            <div className="top">
                <Link to="/" style={{textDecoration: 'none'}}>
                    <span className="logo">Intratec Tecnologia</span>
                </Link>
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
                    {menu.map((item, i) => (
                        <React.Fragment key={item.id}>
                            <ListItem data-id={item.id} button onClick={handleClick} className='item-title'>
                                <ListItemIcon>
                                    <DinamicTag icon={item.icon} classname='icon-title'/>
                                </ListItemIcon>
                                <ListItemText inset primary={item.title} className='text-title' />
                                {openList[item.id] ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={openList[item.id]} timeout="auto" unmountOnExit>
                                {item.items.map((menu: any) => (
                                    <List component="div" disablePadding key={menu.id}>
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
    )
}

export { Sidebar }
