import React, { useState } from 'react'
import AdminSettings from '../components/Admin/AdminSettings'
import AdminNavigation from '../components/Admin/AdminNavigation'
import AdminMissio from '../components/Admin/AdminMissio'
import AdminDashboard from '../components/Admin/AdminDashboard'
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import Background from '../images/login-bg.jpg'
import "typeface-roboto"



const useStyles = makeStyles(theme => ({
    root: {
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(${Background})`,
        height: "100vh",
        spacing: 3,
        overflow: "hidden",
    },
    navigation: {
        backgroundColor: '#051e34',
        height: "100vh",
        padding: "0vh",
        backgroundClip: "content-box",
        textAlign: "center",
    },
    content: {
        backgroundColor: '#f6f7f9',
        height: "100vh",
        padding: "0vh",
        backgroundClip: "content-box",
    },
    spacer: {
        padding: "5vh",

    },

}))


const Admin = ({ store, props }) => {

    const classes = useStyles()

    return (
        <>
            <div className={classes.root}>
                <Grid container className={classes.container}>
                    <Grid item xs={12} sm={4} md={3} lg={2} className={classes.navigation}>
                        <AdminNavigation />
                    </Grid>
                    <Grid item xs={12} sm={8} md={9} lg={10} className={classes.content}>
                        <Route exact path="/admin" component={AdminDashboard} />
                        <Route path="/admin/settings" component={AdminSettings} />
                        <Route path="/admin/missiot" component={AdminMissio} />
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default withRouter(Admin)