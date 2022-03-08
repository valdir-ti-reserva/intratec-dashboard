import React from 'react';
import './styles.css'
import { NotificationsNone } from '@material-ui/icons';

function Topbar (){
    return (
        <div className='topbar'>
            <div className="topbarWrapper">
                <div className="topleft">
                    <span className='logo'>Intratec Tecnologia</span>
                </div>    
                <div className="topright">
                    <div className="topbarIconContainer">
                        <NotificationsNone />
                        <span className="topIconBadge">2</span>
                    </div>
                </div>    
            </div>
        </div>
    )
}

export {Topbar}