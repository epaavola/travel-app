import { Box, Button, CardContent, CardMedia, Chip, List, ListItem, ListItemText, makeStyles, Paper, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { getMissioByID } from '../../services/MissioDataService'
import TodayIcon from '@material-ui/icons/Today'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import 'date-fns'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ExploreIcon from '@material-ui/icons/Explore'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import ApartmentIcon from '@material-ui/icons/Apartment'
import PinDropIcon from '@material-ui/icons/PinDrop'
import { Link } from 'react-router-dom'
import LoadingBackdrop from '../Misc/LoadingBackdrop'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        flexWrap: "wrap",
        margin: "auto",
        padding: "2rem calc(62% - 700px)",
        paddingBottom: "8rem"
    },
    returnLink: {
        display: "flex",
        paddingBottom: "2.5rem",
        textDecoration: "none",
        width: "min-content",
        whiteSpace: "nowrap"
    },
    returnText: {
        fontSize: "0.9rem",
        color: theme.palette.text.grey500,
    },
    returnIcon: {
        fontSize: "1.3rem",
        color: theme.palette.text.grey500,
    },
    tourHeader: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        padding: "0rem 1rem 1rem 1rem",
    },
    tourTitle: {
        fontWeight: "600",
        fontSize: "2rem",
        color: theme.palette.primary.main
    },
    locationChip: {
        fontSize: "1rem",
        color: theme.palette.primary.main,
        marginLeft: "-5px"
    },
    apply: {
        display: "flex",
        alignItems: "flex-end"
    },
    mediaContainer: {
        padding: "0rem 1rem"
    },
    media: {
        width: "100%",
        height: "400px",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        borderRadius: "5px",
    },
    infoChips: {
        width: "100%",
        padding: "1rem 1rem 1rem 1rem",
        margin: "0rem",
    },
    chip: {
        margin: "1vh 1vh 0vh 0vh"
    },
    skillsPassionsContainer: {
        display: "flex",
        flexWrap: "wrap",
        padding: "0rem 1rem 0rem 1rem",
    },
    skillsPassions: {
        width: "30vh",
        margin: "2rem 0rem"
    },
    tourDescription: {
        padding: "2rem 1rem 0rem 1rem",
    },
    textDescription: {
        overflowWrap: "break-word",
        width: "100%",
    },
    divider: {
        margin: "2rem 1rem",
    }
}))

const TourContent = (props) => {

    // STYLE
    const classes = useStyles()
    const [tour, setTour] = useState({})
    const [isLoaded, setIsLoaded] = useState(false)
    const dateOptionsShort = { month: 'numeric', day: 'numeric' }
    const dateOptionsLong = { year: 'numeric', month: 'numeric', day: 'numeric' }

    // GET tour
    useEffect(() => {
        getMissioByID(props.tourId)
            .then(res => {
                setTour(res.data)
                setIsLoaded(true)
            })
            .catch(e => console.error(e))
    }, [])

    return (
        <>
            {isLoaded ? (
                <Box className={classes.root}>
                    <Box className={classes.tourHeader}>
                        <Box>
                            <Link to="/search" className={classes.returnLink}>
                                <ArrowBackIosIcon className={classes.returnIcon} />
                                <Typography variant="body1" className={classes.returnText}>
                                    back to search
                                </Typography>
                            </Link>
                            <Typography variant="h2" className={classes.tourTitle}>
                                {tour.name}
                            </Typography>
                            <Chip size="medium" label={tour.outreachLocation} icon={<LocationOnIcon />} color="secondary" className={classes.locationChip} />
                        </Box>
                        <Box className={classes.apply}>
                            <Button variant="contained" href={tour.website} target="blank" >Book now</Button>
                        </Box>
                    </Box>
                    <Box className={classes.mediaContainer}>
                        <Box className={classes.media} style={{ backgroundImage: `url(${tour.imageURL})` }} />
                    </Box> 
                    <Box className={classes.infoChips}>
                        <Chip
                            size="medium"
                            label={new Date(tour.startDate).toLocaleDateString('fi-FI', dateOptionsShort)
                                + "–" + new Date(tour.endDate).toLocaleDateString('fi-FI', dateOptionsLong)
                                + " | Duration: " + tour.length + " days"}
                            icon={<TodayIcon />} className={classes.chip} />
                        <Chip size="medium" label={"Organization: " + tour.organization} className={classes.chip} icon={<ApartmentIcon />} />
                        <Chip size="medium" label={"Price: " + tour.price + " €"} className={classes.chip} icon={<MonetizationOnIcon />} />
                        <Chip size="medium" label={"Type: " + tour.type} className={classes.chip} />
                        <Chip size="medium" label={"Skill level: " + tour.skills.map(skill => (skill.name))} className={classes.chip} />
                    </Box>
                    <Box className={classes.tourDescription}>
                        <Typography variant="body1" className={classes.textDescription}>
                            {tour.longDescription}
                        </Typography>
                    </Box>
                    <Box className={classes.skillsPassionsContainer}>
                        <Box className={classes.skillsPassions}>
                            <Typography variant="h6" color="primary">Tour Focus</Typography>
                            {tour.passions.map(passion => (
                                <Chip size="small" label={passion.name} className={classes.chip} variant="outlined" />
                            ))}
                        </Box>
                    </Box>
                </Box>
            ) : <LoadingBackdrop />}
        </>
    )
}

export default TourContent