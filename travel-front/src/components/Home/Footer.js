import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Box, Typography } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator'
import { purple, grey } from '@material-ui/core/colors'
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';

const useStyles = makeStyles(theme => ({
    root: {
        display: "grid",
        width: "100%",
        gridRowGap: "20px",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gridTemplateRows: "auto",
        padding: "8vh calc(45% - 680px)",
        backgroundColor: grey[300],
        justifyContent: "space-around",
    },
    section: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

    },
    link: {
        textDecoration: "none",
        textAlign: "center"
    },
    icon: {
        position: "relative",
        top: "7px",
        paddingRight: "3px",
        color: "black"
    }

}))

const Footer = () => {

    const classes = useStyles()

    return (
        <Box className={classes.root}>
            <Box className={classes.section}>
                <Typography variant="h6" color="primary">Adventure Tours</Typography>
                <Typography variant="caption" color="primary">Turn a trip into an adventure</Typography>
            </Box>
            <Box className={classes.section}>
                <Typography variant="h6" color="primary">Sitemap</Typography>
                <Link className={classes.link} to="/"><Typography variant="caption" color="primary">home</Typography></Link>
                <Link className={classes.link} to="/search"><Typography variant="caption" color="primary">tours</Typography></Link>
                <Link className={classes.link} to="/"><Typography variant="caption" color="primary">contact us</Typography></Link>
                <Link className={classes.link} to="/"><Typography variant="caption" color="primary">FAQ</Typography></Link>
                <Link className={classes.link} to="/admin"><Typography variant="caption" color="primary">login</Typography></Link>
            </Box>
            <Box className={classes.section}>
                <Typography variant="h6" color="primary">Social Media</Typography>
                <Link className={classes.link} to="/">
                    <InstagramIcon className={classes.icon} />
                    <Typography variant="caption" color="primary">@adveturetours</Typography>
                </Link>
                <Link className={classes.link} to="/">
                    <FacebookIcon className={classes.icon} />                
                    <Typography variant="caption" color="primary">@adveturetours</Typography>
                </Link>
            </Box>
            <Box className={classes.section}>
                <Typography variant="h6" color="primary">Contact Us</Typography>
                <Typography variant="caption" color="primary">info@adveture.tours</Typography>
            </Box>
        </Box>
    )
}

export default withRouter(Footer)