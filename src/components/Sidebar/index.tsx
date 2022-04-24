import { useContext } from 'react'
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
    Logout
} from '@mui/icons-material'
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

    return (
        <div className="sidebar">
            <div className="top">
                <Link to="/" style={{textDecoration: 'none'}}>
                    <span className="logo">Intratec Tecnologia</span>
                </Link>
            </div>
            <hr />
            <div className="center">
                <ul>
                    <p className="title">MAIN</p>
                    <Link to="/" style={{textDecoration: 'none'}}>
                        <li>
                            <Dashboard className='icon' />
                            <span>Dashboard</span>
                        </li>
                    </Link>
                    <hr />
                    <p className="title">LISTS</p>
                    <Link to="/users" style={{textDecoration: 'none'}}>
                        <li>
                            <PersonOutline className='icon' />
                            <span>Users</span>
                        </li>
                    </Link>
                    <Link to="/products" style={{textDecoration: 'none'}}>
                        <li>
                            <Store className='icon' />
                            <span>Products</span>
                        </li>
                    </Link>
                    <li>
                        <CreditCard className='icon' />
                        <span>Orders</span>
                    </li>
                    <li>
                        <LocalShipping className='icon' />
                        <span>Delivery</span>
                    </li>
                    <hr />
                    <p className="title">USEFUL</p>
                    <li>
                        <QueryStats className='icon' />
                        <span>Stats</span>
                    </li>
                    <li>
                        <NotificationsNone className='icon' />
                        <span>Notifications</span>
                    </li>
                    <hr />
                    <p className="title">SERVICE</p>
                    <li>
                        <CloudCircle className='icon' />
                        <span>System Health</span>
                    </li>
                    <li>
                        <Psychology className='icon' />
                        <span>Logs</span>
                    </li>
                    <li>
                        <Settings className='icon' />
                        <span>Settings</span>
                    </li>
                    <hr />
                    <p className="title">USER</p>
                    <li>
                        <PermContactCalendar className='icon' />
                        <span> Profile</span>
                    </li>
                    <li onClick={handleLogout}>
                        <Logout className='icon' />
                        <span>Logout</span>
                    </li>
                </ul>
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
