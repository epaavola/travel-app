import { Box, Input, makeStyles, MenuItem, Select, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { green, purple, grey } from '@material-ui/core/colors'
import { fade } from '@material-ui/core/styles/colorManipulator'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker, } from '@material-ui/pickers'
import { useField } from '../../hooks/useFields'
import SearchIcon from '@material-ui/icons/Search'
import { Link } from 'react-router-dom'
import Hidden from '@material-ui/core/Hidden'
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        width: "100%",
        maxWidth: "600px",
        height: "60px",
        backgroundColor: "#fff",
        borderRadius: "50px",
        margin: "auto",
        padding: "0px",
        alignItems: "center",
        justifyContent: "space-between"
    },
    section: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "left",
        height: "100%",
        width: "42%",
        borderRadius: "50px",
        '&:hover': {
            backgroundColor: grey[100]
        },
        '&:active': {
            backgroundColor: grey[100]
        },
        padding: "0px 10px 0px 20px",
        textDecoration: "none",
        color: grey[600]
    },
    section__m: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "35%",
        borderRadius: "50px",
        '&:hover': {
            backgroundColor: grey[100]
        },
        '&:active': {
            backgroundColor: grey[100]
        },
        '&:first-child': {
            width: "42%",
            paddingLeft: "25px"
        },
        padding: "0px 5px 0px 5px",
        textDecoration: "none",
        color: grey[800]
    },
    search: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "17%",
        borderRadius: "50px",
        '&:hover': {
            backgroundColor: grey[100]
        },
        '&:active': {
            backgroundColor: grey[100]
        },
        padding: "0px 20px 0px 10px",
        textDecoration: "none",
        color: grey[800]
    },
    divider: {
        height: "23px",
        borderRight: "solid 0.01rem",
        borderRightColor: grey[300]
    }
}))


const SearchBar = () => {

    // STYLE
    const classes = useStyles()

    const selectedDate = useField(new Date());
    const destination = useField('')


    return (
        <>
            {/* Desktop */}
            <Hidden smDown>
                <Box className={classes.root}>
                    <Box className={classes.section}>
                        <Typography variant="subtitle2" className={classes.title}>Destination</Typography>
                        <Typography variant="caption">Where would you like to go?</Typography>
                    </Box>
                    <Box className={classes.divider} />
                    <Box className={classes.section}>
                        <Typography variant="subtitle2" className={classes.title}>Type</Typography>
                        <Typography variant="caption">What would you like to do?</Typography>
                    </Box>
                    <Box className={classes.divider} />
                    <Link className={classes.search} to="/search">
                        <SearchIcon />
                        <Typography variant="subtitle2">Search</Typography>
                    </Link>
                </Box>
            </Hidden>
            {/* Mobile */}
            <Hidden mdUp>
            <Box className={classes.root}>
                    <Box className={classes.section__m}>
                        <Typography variant="subtitle2" className={classes.title}>Destination</Typography>
                    </Box>
                    <Box className={classes.divider} />
                    <Box className={classes.section__m}>
                        <Typography variant="subtitle2" className={classes.title}>Type</Typography>
                    </Box>
                    <Box className={classes.divider} />
                    <Link className={classes.search} to="/search">
                        <SearchIcon />
                    </Link>
                </Box>
            </Hidden>
        </>
    )
}


export default withRouter(SearchBar)