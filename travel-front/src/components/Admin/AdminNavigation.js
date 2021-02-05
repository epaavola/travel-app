import React, { useEffect, useState } from 'react'
import { withRouter, Link, Redirect, useHistory } from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from '@material-ui/core';
import "typeface-roboto"
import BackgroundShapes from '../../images/bg-vectors-01.png'
import { useKeycloak } from '@react-keycloak/web'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: "100vh",
        backgroundImage: `url(${BackgroundShapes})`,
    },
    logoContainer: {
        paddingTop: "5vh",
        paddingBottom: "5vh",
    },
    linksContainer: {
        flexGrow: "1"
    },
    menuItem: {
        fontSize: "1.2rem",
        paddingBottom: "1vh",
    },
    siteLogoText: {
        fontSize: "2rem",
    },
    link: {
        display: "flex",
        justifyContent: "center",
        textDecoration: "none",
        cursor: "pointer",
        '&:hover': { transition: "all .2s ease-in-out" },
        '&:hover': { transform: "scale(1.1)" }
    },
    siteLogoLink: {
        textDecoration: "none",
        cursor: "pointer",
    },
    footer: {
        display: "flex",
        justifyContent: "center",
        padding: "2vh",
    },
    accountIcon: {
        marginRight: "5px",
    },
    openInNewIcon: {
        padding: "0.2em 0em 0em 0.3em",
    },
    accountUsername: {
        padding: "3px"
    }
}))

const AdminNavigation = () => {

    const classes = useStyles()

    const { keycloak } = useKeycloak()
    const [username, setUsername] = useState(keycloak.idTokenParsed.name)


    return (
        <div className={classes.root}>
            <div className={classes.logoContainer}>
                <Link className={classes.siteLogoLink} to="/admin/">
                    <Typography className={classes.siteLogoText} variant="h1" color="secondary">Adventure Tours</Typography>
                </Link>
                <Typography variant="body2" color="secondary">Admin</Typography>
            </div>
            <div className={classes.linksContainer}>
                <Link className={classes.link} to="/admin/"><Typography className={classes.menuItem} variant="h5" color="secondary">Dashboard</Typography></Link>
                <Link className={classes.link} to="/admin/missiot"><Typography className={classes.menuItem} variant="h5" color="secondary">Tours</Typography></Link>
                <Link className={classes.link} to="/admin/settings"><Typography className={classes.menuItem} variant="h5" color="secondary">Settings</Typography></Link>
                <Link className={classes.link} to="/" target="_blank">
                    <Typography className={classes.menuItem} variant="h5" color="secondary">
                        View Site      
                    </Typography>
                    <OpenInNewIcon color="secondary" className={classes.openInNewIcon} />
                </Link>
                <a className={classes.link} onClick={keycloak.logout}><Typography className={classes.menuItem} variant="h5" color="secondary">Sign out</Typography></a>
            </div>
            <div className={classes.footer}>
                <AccountCircleIcon color="secondary" className={classes.accountIcon} />
                <Typography variant="body2" color="secondary" className={classes.accountUsername}>{username}</Typography>
            </div>
        </div>
    )
}

export default withRouter(AdminNavigation)