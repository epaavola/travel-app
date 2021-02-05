import React, { useState, useEffect } from 'react'
import 'typeface-roboto'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import 'date-fns'
import { getMissions, createMissio, getMissioByID } from '../../services/MissioDataService'
import * as Organizations from '../../constants/Organizations'
import DeleteIcon from '@material-ui/icons/Delete'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CloseIcon from '@material-ui/icons/Close'
import { green } from '@material-ui/core/colors'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import AppBar from '@material-ui/core/AppBar'
import AddMissioDialog from './AddMissioDialog'
import EditMissioDialog from './EditMissioDialog'
import { Pagination } from '@material-ui/lab'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { useField } from '../../hooks/useFields'

const useStyles = makeStyles(theme => ({
    content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: '1em'
    },
    TextField: {
        margin: '1em'
    },
    newMissioButton: {
        marginLeft: '1em',
        marginTop: '2em',
        marginBottom: '1em',
    },
    dialog: {
        margin: "4em 6em 4em 6em",
        padding: "1em",
    },
    gridContainer: {
        padding: "4em",
        overflow: "auto"
    },
    appBarButtons: {
        marginLeft: "auto"
    },
    pagination: {
        padding: "1em 0em 1em 0em",
    },
    formControl: {
        margin: '1em 1em 1em 3em',
        width: "25vh"
    },

}))


const MissionsTable = (props) => {

    //Variables

    // Style
    const classes = useStyles()

    //States
    const [missions, setMissions] = useState([])
    const [missio, setMissio] = useState({})
    const [openAddMissio, setOpenAddMissio] = useState(false)
    const [openEditMissio, setOpenEditMissio] = useState(false)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [size, setSize] = useState(5)
    const organization = useField('All')
    const [refreshData, setRefreshData] = useState(false)

    //Get customers data from database through API
    useEffect(() => {
        loadMissions()
    }, [page, organization.value, refreshData]);

    function loadMissions() {
        getMissions(organization.value, page - 1, size).then(res => {
            setMissions(res.data.missions)
            setTotalPages(res.data.totalPages)
        }).catch(e => console.log("error: " + e))
    }
    const openAddMissioDialog = () => {
        setOpenAddMissio(true)
    }
    const openEditMissioDialog = (missio) => {
        setMissio(missio)
        setOpenEditMissio(true)
    }
    const handleClose = () => {
        setOpenAddMissio(false)
        setOpenEditMissio(false)
        setRefreshData(!refreshData)
    }

    const handlePageChange = (event, value) => {
        setPage(value)
    }

    return (
        <div>
            <div>
                <Button className={classes.newMissioButton} variant="contained" color="primary" onClick={openAddMissioDialog}>Add new tour</Button>
                <FormControl className={classes.formControl}>
                    <InputLabel >Organizations</InputLabel>
                    <Select
                        value={organization.value}
                        onChange={organization.onChange}
                    >
                        <MenuItem value="All">All Organizations</MenuItem>
                        {Organizations.organizationsArray.map((name) => (
                            <MenuItem key={name} value={name} >
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <div className={classes.content}>
                <TableContainer component={Paper}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Published</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Organization</TableCell>
                                <TableCell align="center">Focus</TableCell>
                                <TableCell align="center">Destination</TableCell>
                                <TableCell align="center">Start date</TableCell>
                                <TableCell align="center">Duration (days)</TableCell>
                                <TableCell align="center">Price</TableCell>
                            </TableRow>
                        </TableHead>
                        {missions ?
                            <TableBody>
                                {missions.map(missio => (
                                    <TableRow key={missio.id}>
                                        <TableCell align="center">{missio.active ? <CheckCircleIcon style={{ color: green[500] }} /> : <CloseIcon />}</TableCell>
                                        <TableCell align="center">{missio.name}</TableCell>
                                        <TableCell align="center">{missio.organization}</TableCell>
                                        <TableCell align="center">{missio.passions.map(passion => (<li key={passion.id} style={{ listStyleType: "none" }}>{passion.name}</li>))}</TableCell>
                                        <TableCell align="center">{missio.outreachLocation}</TableCell>
                                        <TableCell align="center">{missio.startDate}</TableCell>
                                        <TableCell align="center">{missio.length}</TableCell>
                                        <TableCell align="center">{missio.price}</TableCell>
                                        
                                        <TableCell ><Button variant="contained" color="secondary"
                                            onClick={(e) => { e.preventDefault(); openEditMissioDialog(missio) }}>Edit</Button></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            : ""}
                    </Table>
                </TableContainer>
                <Pagination count={totalPages} page={page} onChange={handlePageChange} className={classes.pagination} />
            </div>
            <AddMissioDialog open={openAddMissio} handleClose={handleClose} />
            <EditMissioDialog open={openEditMissio} handleClose={handleClose} missio={missio} />
        </div>
    )
}


export default MissionsTable