import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Box, Button, Input, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { fade } from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles(theme => ({
    root : {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: fade(grey[900], 0.9),
        height: "60vh",
        padding: "2rem",
        justifyContent: "center",
    },
    inputContainer: {
        display: "flex",
        width: "100%",
        margin: "2rem",
        maxWidth: "400px",
        height: "60px",
        backgroundColor: "#fff",
        borderRadius: "50px",     
        justifyContent: "flex-start"
    },
    section: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "left",
        height: "100%",
        width: "70%",
        borderRadius: "50px",
        '&:hover': {
            backgroundColor: grey[100]
        },
        '&:active': {
            backgroundColor: grey[100]
        },
        padding: "0px 20px 0px 50px",
        textDecoration: "none",
        color: grey[600]
    },
    submit: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "30%",
        borderRadius: "50px",
        '&:hover': {
            backgroundColor: grey[100]
        },
        '&:active': {
            backgroundColor: grey[100]
        },
        padding: "0px 50px 0px 50px",
        textDecoration: "none",
        color: grey[800]
    },
    title: {
        fontSize: "4.5vh"
    }
}))

const Contact = () => {

const classes = useStyles()
    
    return(
        <Box className={classes.root}>
            <Typography className={classes.title} variant="h2" color="secondary">Get the best deals first</Typography>
            <Box className={classes.inputContainer}>
                    <Box className={classes.section}>
                        <Input variant="subtitle2" placeholder="Email" disableUnderline={true} />
                    </Box>
                    <Button className={classes.submit} to="/haku">
                        <Typography variant="subtitle2">Send</Typography>
                    </Button>
                </Box>
        </Box>
    )
}

export default withRouter(Contact)