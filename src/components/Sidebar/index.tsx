import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import StoreIcon from '@mui/icons-material/Store';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SettingsIcon from '@mui/icons-material/Settings';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import LogoutIcon from '@mui/icons-material/Logout';

import './styles.scss'

function Sidebar() {
  return (
    <div className="sidebar">
        <div className="top">
            <span className="logo">Intratec Tecnologia</span>
        </div>
        <hr />
        <div className="center">
            <ul>
                <p className="title">MAIN</p>
                <li>
                    <DashboardIcon className='icon' />
                    <span>Dashboard</span>
                </li>
                <hr />
                <p className="title">LISTS</p>
                <li>
                    <PersonOutlineIcon className='icon' />
                    <span>Users</span>
                </li>
                <li>
                    <StoreIcon className='icon' />
                    <span>Products</span>
                </li>
                <li>
                    <CreditCardIcon className='icon' />
                    <span>Orders</span>
                </li>
                <li>
                    <LocalShippingIcon className='icon' />
                    <span>Delivery</span>
                </li>
                <hr />
                <p className="title">USEFUL</p>
                <li>
                    <QueryStatsIcon className='icon' />
                    <span>Stats</span>
                </li>
                <li>
                    <NotificationsNoneIcon className='icon' />
                    <span>Notifications</span>
                </li>
                <hr />
                <p className="title">SERVICE</p>
                <li>
                    <CloudCircleIcon className='icon' />
                    <span>System Health</span>
                </li>
                <li>
                    <PsychologyIcon className='icon' />
                    <span>Logs</span>
                </li>
                <li>
                    <SettingsIcon className='icon' />
                    <span>Settings</span>
                </li>
                <hr />
                <p className="title">USER</p>
                <li>
                    <PermContactCalendarIcon className='icon' />
                    <span> Profile</span>
                </li>
                <li>
                    <LogoutIcon className='icon' />
                    <span>Logout</span>
                </li>
            </ul>
        </div>
        <hr />
        <div className="bottom">
            <div className="colorOption">
                
            </div>
            <div className="colorOption">

            </div>
            <div className="colorOption">

            </div>
        </div>
    </div>
  )
}

export {Sidebar}
