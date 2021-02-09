import React, { useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles"
import { Box, Typography } from '@material-ui/core'
import "typeface-roboto"
import Hidden from '@material-ui/core/Hidden'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { purple } from '@material-ui/core/colors'
import { fade } from '@material-ui/core/styles/colorManipulator'
import Drawer from '@material-ui/core/Drawer'

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        backgroundColor: fade(purple[500], 0.8),
        height: "85px",
        padding: "0vh calc(50% - 680px)",
    },
    mobileRoot: {
        width: "100%",
    },
    menu: {
        display: "flex",
        marginRight: "2rem",
        alignItems: "center"
    },
    logo: {
        display: "flex",
        marginLeft: "2rem",
        justifyContent: "center",
        flexDirection: "column",
    },
    logo_m: {
        display: "flex",
        marginLeft: "0.25rem",
        justifyContent: "center",
        flexDirection: "column",
    },
    link: {
        textDecoration: "none",
        paddingRight: "20px",
    },
    menuText: {
        fontSize: "1rem",
        textTransform: "lowercase"
    },
    linkMobile: {
        textDecoration: "none",
        fontSize: "2rem",
        color: "#FFF",
        padding: "1rem 2rem",
        width: "100%"
    },
    siteTitle: {
        fontSize: "2rem"
    },
    mobileNav: {
        backgroundColor: fade(purple[500], 0.8),
        height: "85px",
        display: "flex",
        justifyContent: "center",
        alignItems: "left"
    },
    menuButton: {
        paddingLeft: "1rem",
    },
    drawer: {
        width: "100%",
        flexShrink: 0,
        background: "none",
        overflow: "hidden"
    },
    drawerPaper: {
        width: "100%",
        marginTop: "85px",
        background: "none",
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',

    },
    MobileMenu: {
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        alignItems: 'center',
        background: fade(purple[500], 0.8),
    }
}))

const NavigationBar = () => {

    const classes = useStyles()
    const [open, setOpen] = useState(false)

    const handleMenuClick = (e) => {
        e.preventDefault()
        if (open) setOpen(false)
        else setOpen(true)
    }


    return (
        <>
            {/* Mobile Menu */}
            <Hidden mdUp>
                <Box className={classes.mobileRoot}>
                    <AppBar position="static" className={classes.mobileNav}>
                        <Toolbar>
                            <IconButton onClick={e => handleMenuClick(e)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                <MenuIcon fontSize="large" />
                            </IconButton>
                            <Box className={classes.logo_m}>
                                <Link className={classes.link} to="/"><Typography className={classes.siteTitle} variant="h1" color="secondary">Adventure Tours</Typography></Link>
                                <Link className={classes.link} to="/"><Typography variant="subtitle" color="secondary">Turn a trip into an adventure</Typography></Link>
                            </Box>
                        </Toolbar>
                    </AppBar>
                    <Drawer className={classes.drawer} variant="persistent" anchor="top" open={open} classes={{ paper: classes.drawerPaper, }} >
                        <Box className={classes.MobileMenu}>
                            <Link className={classes.linkMobile} to="/">home</Link>
                            <Link className={classes.linkMobile} to="/search">tours</Link>  
                            <Link className={classes.linkMobile} to="/">FAQ</Link>
                            <Link className={classes.linkMobile} to="/admin">login</Link>
                        </Box>
                    </Drawer>
                </Box>
            </Hidden>
            {/* Desktop Menu */}
            <Hidden smDown>
                <Box className={classes.root}>
                    <Box className={classes.logo}>
                        <Link className={classes.link} to="/"><Typography className={classes.siteTitle} variant="h1" color="secondary">Adventure Tours</Typography></Link>
                        <Link className={classes.link} to="/"><Typography variant="subtitle" color="secondary">Turn a trip into an adventure</Typography></Link>
                    </Box>
                    <Box className={classes.menu}>
                        <Link className={classes.link} to="/"><Typography className={classes.menuText} variant="h6" color="secondary">Home</Typography></Link>
                        <Link className={classes.link} to="/search"><Typography className={classes.menuText} variant="h6" color="secondary">Tours</Typography></Link>
                        <Link className={classes.link} to="/"><Typography className={classes.menuText} variant="h6" color="secondary">FAQ</Typography></Link>
                        <Link className={classes.link} to="/admin"><Typography className={classes.menuText} variant="h6" color="secondary">Login</Typography></Link>
                    </Box>
                </Box>
            </Hidden>
        </>
    )
}

export default withRouter(NavigationBar)