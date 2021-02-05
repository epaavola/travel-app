import React from 'react'
import NavigationBar from '../components/Home/NavigationBar'
import Header from '../components/Home/Header'
import ContinentsCategory from '../components/Home/ContinentsCategory'
import TypesCategory from '../components/Home/TypesCategory'
import Footer from '../components/Home/Footer'
import Contact from '../components/Home/Contact'
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles"
import Background from '../images/front-bg-1.jpg'
import "typeface-roboto"
import { fade } from '@material-ui/core/styles/colorManipulator'
import { Box } from '@material-ui/core'
import SkillsCategory from '../components/Home/SkillsCategory'


/**
 * Homepage of Adventure trips.
 * Homepage is build with Grid layout.
 * Each section is build in separate component.
 */

const useStyles = makeStyles(theme => ({
    root: {
        display: "grid",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "1fr",
        gridTemplateAreas: `
          "navigation"
          "header"
          "types"
          "continents"
          "skills"
          "contact"
          "footer"`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(${Background})`,
        height: "100vh",
        spacing: 3,
        overflow: "auto",
    },
    navigation: {
        gridArea: "navigation"
    },
    header: {
        gridArea: "header"
    },
    continents: {
        gridArea: "continents",
    },
    types: {
        gridArea: "types",
    },
    skills: {
        gridArea: "skills",
    },
    contact: {
        gridArea: "contact"
    },
    footer: {
        gridArea: "footer",
    },
    spacer: {
        padding: "5vh",

    },

}))

const Home = ({ store }) => {

    // STYLE
    const classes = useStyles()

    return (
        <Box className={classes.root}>
            <NavigationBar className={classes.navigation} />
            <Header className={classes.header} />
            <TypesCategory className={classes.types} />
            <ContinentsCategory className={classes.continents} />
            <SkillsCategory className={classes.skills} />
            <Contact className={classes.contact} />
            <Footer className={classes.footer} />
        </Box>
    )
}

export default withRouter(Home)