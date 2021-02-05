import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles"
import { fade, Hidden, Typography } from '@material-ui/core'
import SearchBar from '../Search/SearchBar'
import Box from "@material-ui/core/Box";
import { grey } from '@material-ui/core/colors'

const useStyles = makeStyles(theme => ({
    root: {
        display: "grid",
        height: "80vh",
        gridTemplateRows: `repeat(4, 180px)`,
        alignItems: "center",
        backgroundClip: "content-box",
        backgroundColor: fade(grey[700], 0.1),
    },
    searchBarContainer: {
        margin: "2rem 2rem 0rem 2rem"
    },
    title: {
        fontSize: "3.5rem",
        textAlign: "center",
        fontWeight: "900",
        fontFamily: "Yusei Magic",
        padding: "1vh",
        lineHeight: "3.6rem",
    },

}))

const Header = () => {

    const classes = useStyles()

    return (
        <>
            <Box className={classes.root}>
                <Box className={classes.searchBarContainer}>
                    <SearchBar />
                </Box>
                    <Box>
                        <Typography className={classes.title} color="secondary">Turn a trip into an adventure</Typography>
                    </Box>
            </Box>
        </>
    )
}

export default withRouter(Header)