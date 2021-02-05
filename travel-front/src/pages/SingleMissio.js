import { Box } from '@material-ui/core'
import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { useParams, withRouter } from 'react-router-dom'
import NavigationBar from '../components/Home/NavigationBar'
import TourContent from '../components/SingleTour/TourContent'
import Footer from '../components/Home/Footer'

/**
 * Search page of Adventure tours.
 * Search page is build with Grid layout.
 * Each section is build in separate component.
 */

const useStyles = makeStyles(theme => ({
    root: {
        display: "grid",
        width: "100%",
        justifyItems: "center",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "1fr",
        gridTemplateAreas: `
          "navigation"
          "tour"
          "footer"`,
    },
    navigation: {
        gridArea: "navigation"
    },
    tour: {
        gridArea: "tour"
    },
    footer: {
        gridArea: "footer"
    }

}))


const SingleMissio = () => {

    //STYLE
    const classes = useStyles()
    const id = useParams().id

    return (
        <>
            <Box className={classes.root}>

                    <NavigationBar className={classes.navigation} />
                    <TourContent className={classes.tour} tourId={id} />
                    <Footer className={classes.footer} />

            </Box>

        </>
    )
}


export default withRouter(SingleMissio)