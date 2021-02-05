import React, { useRef, useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles"
import { Typography, Card, Box, Fab } from '@material-ui/core'
import * as Continents from '../../constants/Continents'
import { grey } from '@material-ui/core/colors'
import 'date-fns'
import Hidden from '@material-ui/core/Hidden'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import { useRecoilState } from 'recoil'
import { continentState, missioTypeState } from '../../recoil/searchParamAtoms'

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.secondary.main,
        height: "500px",
        overflow: "hidden",
        padding: "4rem calc(50% - 680px)",
    },
    categoryHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "0rem 2rem 2rem 2rem",
    },
    continents: {
        display: "grid",
        alignItems: "center",
        gridGap: "10px",
        gridTemplateColumns: "10px repeat(6, minmax(200px, 300px)) 10px",
        gridTemplateRows: "minmax(230px, 1fr)",
        overflowX: "scroll",
        overflowY: "hidden",
        scrollSnapType: "x proximity",
        '&::-webkit-scrollbar': {
            display: "none"
        },
        scrollbarWidth: "none",
        scrollBehavior: "smooth",
        padding: "0px 20px",
        '&::before': {
            content: '""',
            width: "2px",
            height: "200px"
        },
        '&::after': {
            content: '""',
            width: "10px",
            height: "200px"
        },

    },
    continent: {
        display: "flex",
        flexDirection: "column-reverse",
        alignItems: "center",
        width: "200px",
        height: "200px",
        '&:last-child': {
            marginRight: "200px"
        },
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    },
    categoryTitle: {
        fontSize: "4.5vh",
    },
    navButton: {
        backgroundColor: grey[200],
        '&:hover': {
            backgroundColor: grey[100]
        },
        margin: "10px",
        boxShadow: "none"
    },
    navButtonContainer: {
        marginRight: "1rem"
    },
    cardTitle: {
        fontSize: "1.3rem",
        width: "200px",
        textAlign: "center",
        padding: "0.5rem",
    },
    cardLink: {
        textDecoration: "none",
        paddingTop: "5px",
        color: "#403d39",
        '&:hover': {
            transition: `all .2s ease-in-out`,
            transform: "scale(1.02)"
        }
    }
}))

const ContinentsCategory = () => {

    // STYLE
    const classes = useStyles()

    //VARIABLES
    const [continent, setContinent] = useRecoilState(continentState)
    const navRef = useRef()

    const handleScrollNavigation = (direction) => {
        if (direction === 'left') {
            navRef.current.scrollLeft -= 500
        } else
            navRef.current.scrollLeft += 500
    }
    const handleLinkClick = (name) => {
        setContinent(name)
    }

    return (
        <Box className={classes.root}>
            <Box className={classes.categoryHeader}>
                <Typography variant="h2" color="primary" className={classes.categoryTitle}>
                    Start your tour in...
                    </Typography>
                <Hidden xsDown lgUp>
                    <Box className={classes.navButtonContainer}>
                        <Fab onClick={() => handleScrollNavigation('left')} aria-label="Left" className={classes.navButton} size="small" disableRipple="true">
                            <NavigateBeforeIcon />
                        </Fab>
                        <Fab onClick={() => handleScrollNavigation('right')} aria-label="Right" className={classes.navButton} size="small" disableRipple="true">
                            <NavigateNextIcon />
                        </Fab>
                    </Box>
                </Hidden>
            </Box>
            <Box ref={navRef} className={classes.continents}>
                {Continents.ContinentsArray.map(continent => (
                    <Link to={continent.link} className={classes.cardLink} onClick={() => {handleLinkClick(continent.name)}}>
                        <Card key={continent.name} className={classes.continent} style={{ backgroundImage: `url(${continent.img})` }} />
                        <Typography variant="h3" className={classes.cardTitle}>
                            {continent.name}
                        </Typography>
                    </Link>
                ))}
            </Box>
        </Box >
    )
}

export default withRouter(ContinentsCategory)