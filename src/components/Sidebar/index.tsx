import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Dashboard,
    PersonOutline,
    Logout,
    ExpandLess,
    ExpandMore,
    AtmOutlined,
    PlaylistAddOutlined,
    PersonOutlined,
    AccountBalance,
    AccountBalanceWallet,
    CurrencyExchange,
    ViewModuleSharp,
    FactorySharp,
    ListAlt
} from '@mui/icons-material'
import { Collapse, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from '@material-ui/core'
import { useConfirm } from 'material-ui-confirm'

import { DarkModeContext } from '../../context/darkmode/darkModeContext'
import { AuthContext } from '../../context/authentication/authContext'

import './styles.scss'

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

    const [openList , setOpenList] = useState(false)
    const [openAtm , setOpenAtm] = useState(false)
    const [openDefault , setOpenDefault] = useState(false)

    const handleClick = (key: string) => {
        switch (key) {
            case 'list':
                localStorage.setItem("menu-open", JSON.stringify(!openList ? key : ''))
                setOpenList(!openList)
                break;
            case 'atm':
                localStorage.setItem("menu-open", JSON.stringify(!openAtm ? key : ''))
                setOpenAtm(!openAtm)
                break;
            case 'default':
                localStorage.setItem("menu-open", JSON.stringify(!openDefault ? key : ''))
                setOpenDefault(!openDefault)
                break;
        }
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
                    {/* ADMIN */}
                    <ListItem button onClick={() => handleClick('list')} className='item-title'>
                        <ListItemIcon>
                            <PlaylistAddOutlined className='icon-title' />
                        </ListItemIcon>
                        <ListItemText inset primary='ADMIN' className='text-title' />
                        {openList ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openList} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem component={props => <Link {...props} to="/users" />} button className='subitem'>
                                <ListItemIcon>
                                    <PersonOutlined className='icon-subitem'/>
                                </ListItemIcon>
                                <ListItemText inset primary='Usuários' className='text-subitem'/>
                            </ListItem>
                        </List>
                        <List component="div" disablePadding>
                            <ListItem component={props => <Link {...props} to="/module" />} button className='subitem'>
                                <ListItemIcon>
                                    <ViewModuleSharp className='icon-subitem'/>
                                </ListItemIcon>
                                <ListItemText inset primary='Módulo' className='text-subitem'/>
                            </ListItem>
                        </List>
                        <List component="div" disablePadding>
                            <ListItem component={props => <Link {...props} to="/factory" />} button className='subitem'>
                                <ListItemIcon>
                                    <FactorySharp className='icon-subitem'/>
                                </ListItemIcon>
                                <ListItemText inset primary='Empresa' className='text-subitem'/>
                            </ListItem>
                        </List>
                        <List component="div" disablePadding>
                            <ListItem component={props => <Link {...props} to="/todo" />} button className='subitem'>
                                <ListItemIcon>
                                    <ListAlt className='icon-subitem'/>
                                </ListItemIcon>
                                <ListItemText inset primary='To do' className='text-subitem'/>
                            </ListItem>
                        </List>
                    </Collapse>

                    {/* ATM */}
                    <ListItem button onClick={() => handleClick('atm')} className='item-title'>
                        <ListItemIcon>
                            <AtmOutlined className='icon-title' />
                        </ListItemIcon>
                        <ListItemText inset primary='ATM' className='text-title' />
                        {openAtm ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openAtm} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem component={props => <Link {...props} to="/atm/banks" />} button className='subitem'>
                                <ListItemIcon>
                                    <AccountBalance className='icon-subitem'/>
                                </ListItemIcon>
                                <ListItemText inset primary='Agências' className='text-subitem'/>
                            </ListItem>
                        </List>
                        <List component="div" disablePadding>
                            <ListItem button className='subitem' component={props => <Link {...props} to="/atm/account" />}>
                                <ListItemIcon className='icon'>
                                    <AccountBalanceWallet className='icon-subitem'/>
                                </ListItemIcon>
                                <ListItemText inset primary='Contas'  className='text-subitem'/>
                            </ListItem>
                        </List>
                        <List component="div" disablePadding>
                            <ListItem button className='subitem' component={props => <Link {...props} to="/atm/users" />}>
                                <ListItemIcon className='icon'>
                                    <PersonOutline className='icon-subitem'/>
                                </ListItemIcon>
                                <ListItemText inset primary='Usuários'  className='text-subitem'/>
                            </ListItem>
                        </List>
                        <List component="div" disablePadding>
                            <ListItem button className='subitem' component={props => <Link {...props} to="/atm/attendance" />}>
                                <ListItemIcon className='icon'>
                                    <CurrencyExchange className='icon-subitem'/>
                                </ListItemIcon>
                                <ListItemText inset primary='Atendimento'  className='text-subitem'/>
                            </ListItem>
                        </List>
                    </Collapse>

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
