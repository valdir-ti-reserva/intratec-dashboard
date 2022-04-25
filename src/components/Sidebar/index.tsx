import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Dashboard,
    PersonOutline,
    Store,
    CreditCard,
    LocalShipping,
    QueryStats,
    NotificationsNone,
    CloudCircle,
    Psychology,
    Settings,
    PermContactCalendar,
    Logout,
    ExpandLess,
    ExpandMore,
    ChildCare,
    AtmOutlined,
    SchoolOutlined,
    SettingsSuggestOutlined,
    QueryStatsOutlined,
    PlaylistAddOutlined,
    PersonOutlined,
    AccountBalance,
    AccountBalanceWallet
} from '@mui/icons-material'
import { useConfirm } from 'material-ui-confirm'

import { DarkModeContext } from '../../context/darkmode/darkModeContext'
import { AuthContext } from '../../context/authentication/authContext'

import './styles.scss'
import { Collapse, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from '@material-ui/core'

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

    const [openAtm , setOpenAtm] = useState(false)
    const [openPizza , setOpenPizza] = useState(false)
    const [openUser , setOpenUser] = useState(false)
    const [openUseful , setOpenUseful] = useState(false)
    const [openSettings , setOpenSettings] = useState(false)
    const [openList , setOpenList] = useState(false)

    const handleClick = (key: string) => {
        switch (key) {
            case 'list':
                setOpenList(!openList)
                break;
            case 'system':
                setOpenSettings(!openSettings)
                break;
            case 'useful':
                setOpenUseful(!openUseful)
                break;
            case 'user':
                setOpenUser(!openUser)
                break;
            case 'atm':
                setOpenAtm(!openAtm)
                break;
            case 'pizza':
                setOpenPizza(!openPizza)
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
                        <ListItemText inset primary='Dashboard' className='text-title' />
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
                    {/* LISTS */}
                    <ListItem button onClick={() => handleClick('list')} className='item-title'>
                        <ListItemIcon>
                            <PlaylistAddOutlined className='icon-title' />
                        </ListItemIcon>
                        <ListItemText inset primary='LISTS' className='text-title' />
                        {openList ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openList} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem component={props => <Link {...props} to="/users" />} button className='subitem'>
                                <ListItemIcon>
                                    <PersonOutlined className='icon-subitem'/>
                                </ListItemIcon>
                                <ListItemText inset primary='Users' className='text-subitem'/>
                            </ListItem>
                        </List>
                        <List component="div" disablePadding>
                            <ListItem component={props => <Link {...props} to="/products" />} button className='subitem'>
                                <ListItemIcon>
                                    <Store className='icon-subitem'/>
                                </ListItemIcon>
                                <ListItemText inset primary='Products' className='text-subitem'/>
                            </ListItem>
                        </List>
                        <List component="div" disablePadding>
                            <ListItem component={props => <Link {...props} to="/orders" />} button className='subitem'>
                                <ListItemIcon>
                                    <CreditCard className='icon-subitem'/>
                                </ListItemIcon>
                                <ListItemText inset primary='Orders' className='text-subitem'/>
                            </ListItem>
                        </List>
                        <List component="div" disablePadding>
                            <ListItem component={props => <Link {...props} to="/delivery" />} button className='subitem'>
                                <ListItemIcon>
                                    <LocalShipping className='icon-subitem'/>
                                </ListItemIcon>
                                <ListItemText inset primary='Delivery' className='text-subitem'/>
                            </ListItem>
                        </List>
                    </Collapse>

                    {/* USER ADMIN */}
                    <ListItem button onClick={() => handleClick('user')} className='item-title'>
                        <ListItemIcon>
                            <PersonOutline className='icon-title' />
                        </ListItemIcon>
                        <ListItemText inset primary='USER ADMIN' className='text-title' />
                        {openUser ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openUser} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem component={props => <Link {...props} to="/profile" />} button className='subitem'>
                                <ListItemIcon>
                                    <PermContactCalendar className='icon-subitem'/>
                                </ListItemIcon>
                                <ListItemText inset primary='Profile' className='text-subitem'/>
                            </ListItem>
                        </List>
                    </Collapse>

                    {/* USERFUL */}
                    <ListItem button onClick={() => handleClick('useful')} className='item-title'>
                        <ListItemIcon>
                            <QueryStatsOutlined className='icon-title' />
                        </ListItemIcon>
                        <ListItemText inset primary='USEFUL' className='text-title' />
                        {openUseful ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openUseful} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem component={props => <Link {...props} to="/stats" />} button className='subitem'>
                                <ListItemIcon>
                                    <QueryStats className='icon-subitem'/>
                                </ListItemIcon>
                                <ListItemText inset primary='Stats' className='text-subitem'/>
                            </ListItem>
                        </List>
                        <List component="div" disablePadding>
                            <ListItem button className='subitem' component={props => <Link {...props} to="/notifications" />}>
                                <ListItemIcon className='icon'>
                                    <NotificationsNone className='icon-subitem'/>
                                </ListItemIcon>
                                <ListItemText inset primary='Notifications'  className='text-subitem'/>
                            </ListItem>
                        </List>
                    </Collapse>

                    {/* SETTINGS */}
                    <ListItem button onClick={() => handleClick('system')} className='item-title'>
                        <ListItemIcon>
                            <SettingsSuggestOutlined className='icon-title' />
                        </ListItemIcon>
                        <ListItemText inset primary='SYSTEM' className='text-title' />
                        {openSettings ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openSettings} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem component={props => <Link {...props} to="/health" />} button className='subitem'>
                                <ListItemIcon>
                                    <CloudCircle className='icon-subitem'/>
                                </ListItemIcon>
                                <ListItemText inset primary='System Health' className='text-subitem'/>
                            </ListItem>
                        </List>
                        <List component="div" disablePadding>
                            <ListItem button className='subitem'  component={props => <Link {...props} to="/logs" />}>
                                <ListItemIcon className='icon'>
                                    <Psychology className='icon-subitem'/>
                                </ListItemIcon>
                                <ListItemText inset primary='Logs'  className='text-subitem'/>
                            </ListItem>
                        </List>
                        <List component="div" disablePadding>
                            <ListItem button className='subitem'  component={props => <Link {...props} to="/settings" />}>
                                <ListItemIcon className='icon'>
                                    <Settings className='icon-subitem'/>
                                </ListItemIcon>
                                <ListItemText inset primary='Settings'  className='text-subitem'/>
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
                            <ListItem component={props => <Link {...props} to="/banks" />} button className='subitem'>
                                <ListItemIcon>
                                    <AccountBalance className='icon-subitem'/>
                                </ListItemIcon>
                                <ListItemText inset primary='Banks' className='text-subitem'/>
                            </ListItem>
                        </List>
                        <List component="div" disablePadding>
                            <ListItem button className='subitem' component={props => <Link {...props} to="/account" />}>
                                <ListItemIcon className='icon'>
                                    <AccountBalanceWallet className='icon-subitem'/>
                                </ListItemIcon>
                                <ListItemText inset primary='Accounts'  className='text-subitem'/>
                            </ListItem>
                        </List>
                    </Collapse>

                    {/* PIZZA */}
                    <ListItem button onClick={() => handleClick('pizza')} className='item-title'>
                        <ListItemIcon>
                            <SchoolOutlined className='icon-title' />
                        </ListItemIcon>
                        <ListItemText inset primary='DEFAULT' className='text-title'/>
                        {openPizza ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openPizza} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className='subitem'>
                                <ListItemIcon>
                                    <ChildCare className='icon-subitem'/>
                                </ListItemIcon>
                                <ListItemText inset primary='users'  className='text-subitem'/>
                            </ListItem>
                        </List>
                        <List component="div" disablePadding>
                            <ListItem button className='subitem'>
                                <ListItemIcon>
                                    <Psychology className='icon-subitem'/>
                                </ListItemIcon>
                                <ListItemText inset primary='products'  className='text-subitem'/>
                            </ListItem>
                        </List>
                        <List component="div" disablePadding>
                            <ListItem button className='subitem'>
                                <ListItemIcon>
                                    <Settings className='icon-subitem'/>
                                </ListItemIcon>
                                <ListItemText inset primary='orders'  className='text-subitem'/>
                            </ListItem>
                        </List>
                        <List component="div" disablePadding>
                            <ListItem button className='subitem'>
                                <ListItemIcon>
                                    <Psychology className='icon-subitem'/>
                                </ListItemIcon>
                                <ListItemText inset primary='delivery'  className='text-subitem'/>
                            </ListItem>
                        </List>
                    </Collapse>

                    <ListItem button onClick={() => handleLogout()} className='item-title'>
                        <ListItemIcon>
                            <Logout className='icon-title' />
                        </ListItemIcon>
                        <ListItemText inset primary='Logout' className='text-title'/>
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
