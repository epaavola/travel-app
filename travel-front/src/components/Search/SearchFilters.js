import { Box, Button, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { grey, purple } from '@material-ui/core/colors'
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import { useRecoilState } from 'recoil'
import { organizationState, missioTypeState, continentState } from '../../recoil/searchParamAtoms'

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        padding: "2rem calc(50% - 680px)",
        margin: "0rem 2rem"
    },
    infoText: {
        color: grey[500],
        fontSize: "0.9rem",
    },
    header: {
        fontSize: "2.5rem",
        fontWeight: "600",
        padding: "1rem 0rem",
        color: theme.palette.primary.main
    },
    filters: {
        display: "flex",
        flexWrap: "wrap",
        padding: "0.5rem 0rem",
        justifyContent: "flex-start"
    },
    filterButton: {
        textTransform: "capitalize",
        fontWeight: "400",
        padding: "0.2rem 1rem",
        marginBottom: "0.5rem",
        marginRight: "1rem",
        borderRadius: "25px",
        border: "solid 1px",
        borderColor: grey[400],
    }
}))

const SearchFilters = (props) => {

    //STYLE
    const classes = useStyles()

    //VARIABLES
    const [continent, setContinent] = useRecoilState(continentState)
    const [missioType, setMissioType] = useRecoilState(missioTypeState);
    const [organization, setOrganization] = useRecoilState(organizationState);


    return (
        <>
            <Box className={classes.root}>
                <Typography className={classes.header} variant="h2">Tours</Typography>
                <Typography className={classes.infoText} variant="subtitle1" color="primary">Search filters </Typography>
                <Box className={classes.filters}>
                    <Button className={classes.filterButton} color="secondary" variant="contained" disableElevation>Date</Button>
                    <Button className={classes.filterButton} color="secondary" variant="contained" disableElevation>Destination</Button>
                    <Button className={classes.filterButton} color="secondary" variant="contained" disableElevation>Type</Button>
                    <Button className={classes.filterButton} color="secondary" variant="contained" disableElevation>Duration</Button>
                    <Button className={classes.filterButton} color="secondary" variant="contained" disableElevation>Organization</Button>
                    <Button className={classes.filterButton} color="secondary" variant="contained" disableElevation>Focus</Button>
                    <Button className={classes.filterButton} color="secondary" variant="contained" disableElevation>Skills</Button>
                </Box>
            </Box>
        </>
    )
}

export default SearchFilters