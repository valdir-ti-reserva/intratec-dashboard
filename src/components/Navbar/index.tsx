import { useContext, useState } from "react"

import {
    ChatBubbleOutlineOutlined,
    DarkModeOutlined,
    FullscreenExitOutlined,
    LanguageOutlined,
    ListOutlined,
    NotificationsNoneOutlined,
    SearchOutlined,
    LightMode,
    PersonAdd,
    Settings,
    Logout
} from "@mui/icons-material"
import { styled } from '@mui/material/styles'
import { ChevronLeft, ChevronRight } from "@material-ui/icons"
import { IconButton, Toolbar, Typography } from "@mui/material"
import { Avatar, Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'

import { useConfirm } from 'material-ui-confirm'

import { DrawerContext } from '../../context/drawer/drawerContext'
import { AuthContext } from "../../context/authentication/authContext";
import { DarkModeContext } from "../../context/darkmode/darkModeContext";

import './styles.scss'

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    width: `calc(100% - 64px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
}));

const Navbar = () => {

    const { isOpen, dispatch: DrawerDispatch } = useContext(DrawerContext)
    const { darkMode, dispatch: DarkModeDispatch } = useContext(DarkModeContext);

    const { dispatch: AuthDispatch } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const darkModeIcon = darkMode ?
        <LightMode
            className="icon"
            onClick={() => DarkModeDispatch({ type: "TOGGLE" })}
        />
        :
        <DarkModeOutlined
            className="icon"
            onClick={() => DarkModeDispatch({ type: "TOGGLE" })}
        />

    const handleDrawerOpen = (e: any) => {
        e.preventDefault()
        DrawerDispatch({ type: "DRAWER_TOGGLE" })
    };

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget)
      }

      const handleClose = () => {
        setAnchorEl(null)
      }

      const handleLogout = () => {
            AuthDispatch({type:"LOGOUT"})
    }

    return (
        <AppBar position="fixed" open={isOpen}>
            <Toolbar className="toolbar">
                <IconButton
                    className="edge-button"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{
                        marginRight: 5,
                        ...(isOpen && { display: 'none' }),
                    }}
                >
                    {!isOpen ? <ChevronRight /> : <ChevronLeft />}
                </IconButton>
                <Typography variant="h6" component="div">
                    <div className="navbar">
                        <div className="wrapper">
                            <div className="search">
                                <input type="text" placeholder="Search..." />
                                <SearchOutlined className="search-icon" />
                            </div>
                            <div className="items">
                            <div className="item">
                                <LanguageOutlined className="icon" />
                                English
                            </div>
                            <div className="item">
                                {darkModeIcon}
                            </div>
                            <div className="item">
                                <FullscreenExitOutlined className="icon" />
                            </div>
                            <div className="item">
                                <NotificationsNoneOutlined className="icon" />
                                <div className="counter">1</div>
                            </div>
                            <div className="item">
                                <ChatBubbleOutlineOutlined className="icon" />
                                <div className="counter">2</div>
                            </div>
                            <div className="item">
                                <ListOutlined className="icon" />
                            </div>
                            <div className="item">
                                <img
                                    src="https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198"
                                    alt="User-avatar"
                                    className="avatar"
                                    onClick={(e) => handleClick(e)}
                                />
                                <Menu
                                    anchorEl={anchorEl}
                                    id="account-menu"
                                    open={open}
                                    onClose={handleClose}
                                    onClick={handleClose}
                                    PaperProps={{
                                        elevation: 0,
                                        sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&:before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                        },
                                    }}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                <MenuItem>
                                    <Avatar /> Profile
                                </MenuItem>
                                <MenuItem>
                                    <Avatar /> My account
                                </MenuItem>
                                <Divider />
                                <MenuItem>
                                    <ListItemIcon>
                                    <PersonAdd fontSize="small" />
                                    </ListItemIcon>
                                    Add another account
                                </MenuItem>
                                <MenuItem>
                                    <ListItemIcon>
                                    <Settings fontSize="small" />
                                    </ListItemIcon>
                                    Settings
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    <ListItemIcon>
                                    <Logout fontSize="small" />
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                                </Menu>
                            </div>
                            </div>
                        </div>
                    </div>
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export { Navbar }