import React, { useRef, useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles"
import { Typography, Card, Box, Fab } from '@material-ui/core'
import * as Skills from '../../constants/Skills'
import { grey } from '@material-ui/core/colors'
import 'date-fns'
import { useRecoilState } from 'recoil'
import { missioTypeState } from '../../recoil/searchParamAtoms'

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.primary.secondary,
        height: "400px",
        overflow: "hidden",
        padding: "4rem calc(50% - 680px)",
    },
    categoryHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "0rem 2rem 2rem 2rem",
    },
    typesContainer: {
        display: "grid",
        alignItems: "center",
        gridGap: "10px",
        gridTemplateColumns: "10px repeat(3, minmax(180px, 280px)) 10px",
        gridTemplateRows: "64px",
        overflowX: "scroll",
        overflowY: "hidden",
        scrollSnapType: "x proximity",
        '&::-webkit-scrollbar': {
            display: "none"
        },
        scrollbarWidth: "none",
        scrollBehavior: "smooth",
        padding: "1rem 20px",
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
    typeImg: {
        width: "64px",
        height: "64px",
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
        fontSize: "1rem",
        fontWeight: "500",
        color: theme.palette.text.main,
        textAlign: "left",
        paddingTop: "0.5rem",
        paddingLeft: "0.5rem",
    },
    cardSubTitle: {
        textAlign: "left",
        paddingLeft: "0.5rem",
    },
    type: {
        display: "flex",
        textDecoration: "none",
        color: "#403d39",
        '&:hover': {
            transition: `all .2s ease-in-out`,
            transform: "scale(1.02)"
        }
    }
}))

const SkillsCategory = () => {

    // STYLE
    const classes = useStyles()

    //VARIABLES
    const [missioType, setMissioType] = useRecoilState(missioTypeState)
    const navRef = useRef()

    const handleScrollNavigation = (direction) => {
        if (direction === 'left') {
            navRef.current.scrollLeft -= 500
        } else
            navRef.current.scrollLeft += 500
    }

    const handleLinkClick = (type) => {
        setMissioType(type)
    }

    const SkillTypeCard = ({ skill }) => {
        return (
            <Link to={skill.link} className={classes.type} onClick={() => handleLinkClick(skill.name)}>
                <Card key={skill.name} className={classes.typeImg} style={{ backgroundImage: `url(${skill.img})` }} />
                <Box>
                    <Typography variant="h3" className={classes.cardTitle}>
                        {skill.name}
                    </Typography>
                    <Typography variant="caption" className={classes.cardSubTitle} >
                        21 tours.
                </Typography>
                </Box>
            </Link>
        )
    }
    return (
        <Box className={classes.root}>
            <Box className={classes.categoryHeader}>
                <Typography variant="h2" color="primary" className={classes.categoryTitle}>
                What level of activity are you looking for?    
                </Typography>
            </Box>
            <Box ref={navRef} className={classes.typesContainer}>
                {Skills.skillsData.slice(0, 3).map(skill => (
                    <SkillTypeCard skill={skill} />
                ))}
            </Box>
        </Box >
    )
}

export default withRouter(SkillsCategory)