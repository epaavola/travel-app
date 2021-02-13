import React, { useEffect, useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import { Typography, Card, CardContent, Box } from '@material-ui/core'
import CardMedia from '@material-ui/core/CardMedia'
import CardActions from '@material-ui/core/CardActions'
import Background from '../../images/front-bg-1.jpg'
import Button from '@material-ui/core/Button'
import { purple, green, grey } from '@material-ui/core/colors'
import { getMissions } from '../../services/MissioDataService'
import Chip from '@material-ui/core/Chip'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import BusinessIcon from '@material-ui/icons/Business'
import TodayIcon from '@material-ui/icons/Today'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import 'date-fns'
import { Pagination } from '@material-ui/lab'
import { useField } from '../../hooks/useFields'

const useStyles = makeStyles(theme => ({
    root: {
        display: "grid",
        gridTemplateColumns: "repeat(1, minmax(200px, 1fr))",
        gridTemplateRows: "minmax(200px, 1fr)",
        backgroundColor: "#FFF",
        padding: "0rem calc(50% - 680px)",
        marginBottom: "5rem"
    },
    rootMissions: {
        display: "grid",
        gridGap: "20px",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gridTemplateRows: "auto",
        margin: "0rem 2rem"
    },
    missio: {
        overflow: "hidden",
        maxWidth: "300px",
    },
    missioCard: {
        height: "30vh"
    },
    media: {
        height: "30vh"
    },
    missioGrid: {
        display: "flex",
    },
    missioInfoName: {
        fontWeight: "500",
        color: theme.palette.primary.main
    },
    missioInfoChips: {
        height: "7vh",
        padding: "1vh 1vh 0vh 1vh"
    },
    missioInfoDescription: {
        height: "13vh",
        padding: "1vh 1vh 0vh 2vh"
    },
    missioInfoPassions: {
        display: "flex",
        flexDirection: "row",
        padding: "2px 0px 0px 0px",
        whiteSpace: "nowrap",
        overflowX: "scroll",
        scrollSnapType: "x proximity",
        '&::-webkit-scrollbar': {
            display: "none"
        },
        scrollbarWidth: "none",
    },
    passionText: {
        fontWeight: "400",
        fontSize: "0.9rem",
        color: grey[600]
    },
    missioImg: {
        padding: "0px",
        '&:last-child': {
            padding: "0px"
        },
        position: "relative"
    },
    link: {
        textDecoration: "none"
    },
    chips: {
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
    locationChip: {
        position: "absolute",
        top: "3rem",
        left: "1rem",
        backgroundColor: grey[100],
        color: "#000"
    },
    dateChip: {
        position: "absolute",
        top: "1rem",
        left: "1rem",
        backgroundColor: grey[100],
        color: "#000",
    },
    durationChip: {
        position: "absolute",
        top: "5rem",
        left: "1rem",
        backgroundColor: grey[100],
        color: "#000",
    },
    pagination: {
        padding: "3rem 1rem",
    }
}))

const SearchResult = () => {

    // VARIABLES
    const classes = useStyles()
    const [missions, setMissions] = useState([])
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [size, setSize] = useState(6)
    const organization = useField('All')


    const handleChange = (event, value) => {
        setPage(value);
    }

    // GET MISSIONS
    useEffect(() => {
        getMissions(organization.value, page - 1, size)
            .then(res => {
                setMissions(res.data.missions)
                setTotalPages(res.data.totalPages)
            })
            .catch(e => console.error(e))
    }, [page])

    const MissioCards = () => {
        return (
            <Box className={classes.rootMissions}>
                {missions ?
                    missions.map(missio => (
                        missio.active ?
                            <Box className={classes.missio}>
                                <Card key={missio.id} elevation={2} className={classes.missioCard}>
                                    <Link to={`/tours/${missio.id}`} className={classes.link}>
                                        <CardContent className={classes.missioImg}>
                                            <CardMedia className={classes.media} image={missio.imageURL} />
                                            <Chip size="small" label={new Date(missio.startDate).toLocaleDateString('en-GB', options)} icon={<TodayIcon />} className={classes.dateChip} />
                                            {/* <Chip  size="small" label={"Kesto: " + missio.length + " päivää"} className={classes.durationChip} /> */}
                                            <Chip size="small" label={missio.outreachLocation} icon={<LocationOnIcon />} color="secondary" className={classes.locationChip} />
                                        </CardContent>
                                    </Link>
                                </Card>
                                <Box className={classes.missioInfoPassions}>
                                    <Typography className={classes.passionText}>
                                        Fokus:&nbsp;
                                    </Typography>
                                    {missio.passions.slice(0, 2).map(passion => (
                                        <Typography key={passion.id} className={classes.passionText}>
                                            {passion.name},&nbsp;
                                        </Typography>
                                    ))}
                                    {missio.passions.slice(2, 3).map(passion => (
                                        <Typography key={passion.id} className={classes.passionText}>
                                            {passion.name}
                                        </Typography>
                                    ))}
                                </Box>
                                <Link to={`/missions/${missio.id}`} className={classes.link}>
                                    <Typography className={classes.missioInfoName}>{missio.name}</Typography>
                                </Link>
                            </Box>
                            : ""))
                    : ""}
            </Box>
        )
    }


    return (
        <Box className={classes.root}>
            <MissioCards />
            <Pagination count={totalPages} page={page} onChange={handleChange} className={classes.pagination} />

        </Box>
    )
}

export default withRouter(SearchResult)