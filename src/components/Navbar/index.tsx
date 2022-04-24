import React, { useContext } from "react";
import { Avatar, Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { ChatBubbleOutlineOutlined, DarkModeOutlined, FullscreenExitOutlined, LanguageOutlined, ListOutlined, NotificationsNoneOutlined, SearchOutlined, LightMode, PersonAdd, Settings, Logout } from "@mui/icons-material"

import { DarkModeContext } from "../../context/darkmode/darkModeContext";
import { AuthContext } from "../../context/authentication/authContext";

import './styles.scss'

function Navbar() {

  const { darkMode, dispatch } = useContext(DarkModeContext);
  const { dispatch: AuthDispatch } = useContext(AuthContext);  

  const darkModeIcon = darkMode ? 
            <LightMode 
              className="icon" 
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
            :
            <DarkModeOutlined 
              className="icon" 
              onClick={() => dispatch({ type: "TOGGLE" })}
            />

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);  
  const open = Boolean(anchorEl);  
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
  )
}

export {Navbar}
