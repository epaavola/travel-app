import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Typography } from '@material-ui/core';
import "typeface-roboto"
import MissionsTable from './MissionsTable'

const useStyles = makeStyles(theme => ({

    container : {
        padding: "5vh",
    },

}))

const AdminMissio = () => {

const classes = useStyles()
    
    return(
        <div className={classes.container}>    
            <Typography variant="h2" color="primary">Tours</Typography>
            <MissionsTable />
        </div>
    )
}

export default withRouter(AdminMissio)