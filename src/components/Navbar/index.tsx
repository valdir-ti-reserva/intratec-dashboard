import { useContext } from "react";
import { ChatBubbleOutlineOutlined, DarkModeOutlined, FullscreenExitOutlined, LanguageOutlined, ListOutlined, NotificationsNoneOutlined, SearchOutlined, LightMode } from "@mui/icons-material"
import { DarkModeContext } from "../../context/darkModeContext";

import './styles.scss'

function Navbar() {

  const { darkMode, dispatch } = useContext(DarkModeContext);

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
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export {Navbar}
