import { Box, withWidth } from '@material-ui/core'
import React from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import { useParams, withRouter } from 'react-router-dom'
import NavigationBar from '../components/Home/NavigationBar'
import SearchResults from '../components/Search/SearchResult'
import SearchFilters from '../components/Search/SearchFilters'
import Footer from '../components/Home/Footer'
import PropTypes from 'prop-types';

/**
 * Search page of Missiohakukone.
 * Search page is build with Grid layout.
 * Each section is build in separate component.
 */

const useStyles = makeStyles(theme => ({
    root: {
        display: "grid",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "1fr",
        gridTemplateAreas: `
          "navigation"
          "filters"
          "results"
          "footer"`,
        overflow: "auto",
    },
    navigation: {
        gridArea: "navigation"
    },
    filters: {
        gridArea: "filters"
    },
    results: {
        gridArea: "results"
    },
    footer: {
        gridArea: "footer"
    }

}))


const Search = () => {

    //STYLE
    const classes = useStyles()
    const searchParams = {
        continent: useParams().continent,
        missioType: useParams().type,
        organization: useParams().organization,
    }

    return (
        <Box className={classes.root}>
            <NavigationBar className={classes.navigation} />
            <SearchFilters className={classes.filters} searchParams={searchParams} />
            <SearchResults className={classes.results} />
            <Footer className={classes.footer} />
        </Box>
    )
}


export default withRouter(Search)