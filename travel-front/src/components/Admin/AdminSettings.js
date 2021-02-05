import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Typography } from '@material-ui/core';
import "typeface-roboto"

const useStyles = makeStyles(theme => ({

    container : {
        padding: "5vh",
        
    },

}))

const AdminSettings = () => {

const classes = useStyles()
    
    return(
        <div className={classes.container}>    
            <Typography variant="h2" color="primary">Asetukset</Typography>
        </div>
    )
}

export default withRouter(AdminSettings)