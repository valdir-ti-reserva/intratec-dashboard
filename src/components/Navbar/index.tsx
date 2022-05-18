import { useContext } from "react"

import { Menu } from "@material-ui/icons"
import { styled } from '@mui/material/styles'
import { IconButton, Toolbar, Typography } from "@mui/material"
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'

import { DrawerContext } from '../../context/drawer/drawerContext'

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

    const { isOpen, dispatch } = useContext(DrawerContext)

    const handleDrawerOpen = () => {
        dispatch({ type: "DRAWER_TOGGLE" })
    };

    return (
        <AppBar position="fixed" open={isOpen}>
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                    marginRight: 5,
                    ...(isOpen && { display: 'none' }),
                }}
            >
                <Menu />
            </IconButton>
            <Typography variant="h6" component="div">
                Mini variant drawer
            </Typography>
            </Toolbar>
        </AppBar>
    )
}

export { Navbar }