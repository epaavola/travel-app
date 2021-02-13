import React, { useState, useEffect } from 'react'
import 'typeface-roboto'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Paper, StepButton, Switch } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import BusinessIcon from '@material-ui/icons/Business'
import TodayIcon from '@material-ui/icons/Today'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import CardMedia from '@material-ui/core/CardMedia'
import { Card, CardContent } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import TextField from '@material-ui/core/TextField'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { useField } from '../../hooks/useFields'
import Toolbar from '@material-ui/core/Toolbar'
import 'date-fns';
import { createMissio, deleteMissioByID, editMissio } from '../../services/MissioDataService'
import * as Passions from '../../constants/Passions'
import * as Skills from '../../constants/Skills'
import * as Types from '../../constants/Types'
import * as Organizations from '../../constants/Organizations'
import { config } from '../../constants/Constants'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Chip from '@material-ui/core/Chip'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker, } from '@material-ui/pickers';
import fiLocale from "date-fns/locale/fi"
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import { purple, green } from '@material-ui/core/colors'
import { uploadFile } from '../../services/UploadFileService'
import { parseISO } from 'date-fns'
import ConfirmDialog from './ConfirmDialog'
import { useKeycloak } from '@react-keycloak/web'

const useStyles = makeStyles(theme => ({
    content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: '1em'
    },
    appBar: {
        backgroundColor: "#051e34"
    },
    TextField: {
        margin: '1em',
        width: "100%"
    },
    headerField: {
        margin: "1em 1em 0em 1em"
    },
    CalendarField: {
        margin: "1em"
    },
    dialog: {
        width: "90vh",
        margin: "auto",
        padding: "1em",
    },
    gridContainer: {
        padding: "0em 3em 2em 3em",
        overflow: "auto"
    },
    dialogTitle: {
        fontSize: "1vh"
    },
    appBarButtons: {
        marginLeft: "auto"
    },
    formControl: {
        margin: '1em',
        width: "100%"
    },
    chip: {
        margin: 2,
    },

    buttonContainer: {
        display: "flex",
        justifyContent: "flex-end"
    },
    button: {
        marginRight: "1em"
    },
    infoText: {
        margin: "0em 1em 0em 1em"
    },
    missioContainer: {
        display: "flex",
        flexWrap: "wrap",
    },
    missioCard: {
        marginTop: "3vh",
        marginRight: "3vh",
        height: "30vh"
    },
    media: {
        height: "30vh"
    },
    missioGrid: {
        display: "flex",
    },
    missioInfoName: {
        height: "4vh",
        padding: "1vh 1vh 0vh 2vh"
    },
    missioInfoChips: {
        height: "7vh",
        padding: "1vh 1vh 0vh 1vh"
    },
    missioInfoDescription: {
        height: "13vh",
        padding: "1vh 1vh 0vh 2vh"
    },
    missioInfoPassion: {
        padding: "1vh 1vh 0vh 2vh",
        display: "flex",
        flexDirection: "row",
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
    missioImg: {
        padding: "0px",
        '&:last-child': {
            padding: "0px"
        },
        position: "relative"
    },
    missioButton1: {
        margin: "0.5vh"
    },
    chips: {
        '& > *': {
            margin: theme.spacing(0.5),
        },
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip1: {
        backgroundColor: purple[400],
        color: "#fff"
    },
    chip2: {
        backgroundColor: "none",
    },
    readMoreButton: {
        position: "absolute",
        bottom: "2vh",
        right: "2vh",
        backgroundColor: purple[400],
        color: "#fff",
        '&:hover': {
            backgroundColor: purple[500],
        },
    },
}))


const EditMissioDialog = (props) => {

    //Variables
    const missioID = useField(0)
    const missioName = useField('')
    const [passions, setPassions] = useState([])
    const [skills, setSkills] = useState([])
    const organization = useField('')
    const active = useField(false)
    const type = useField('')
    const trainingLocation = useField('')
    const outreachLocation = useField('')
    const startDate = useField(new Date)
    const endDate = useField(new Date)
    const length = useField(0)
    const price = useField('')
    const applyDateStart = useField(new Date)
    const applyDateEnd = useField(new Date)
    const description = useField('')
    const longDescription = useField(description.value)
    const website = useField('')
    const imageURL = useField('')
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    const [confirmOpen, setConfirmOpen] = useState(false)

    // File upload
    const [fileSelected, setFileSelected] = useState(false)
    const [currentFile, setCurrentFile] = useState(null)
    const uploadError = useField(false)
    const message = useField('')
    const errorMessage = useField('')
    const fileName = useField('')

    // Dialog Steps variables
    const [activeStep, setActiveStep] = useState(0)
    const [completed, setCompleted] = useState({})
    const steps = getSteps()

    // Access token
    const { keycloak } = useKeycloak()
    const accessToken = keycloak.token

    // Style
    const classes = useStyles()

    // Set values from selected Missio
    useEffect(() => {
        missioID.setValue(props.missio.id)
        missioName.setValue(props.missio.name)
        listPassions()
        listSkills()
        organization.setValue(props.missio.organization)
        active.setValue(props.missio.active)
        type.setValue(props.missio.type)
        trainingLocation.setValue(props.missio.trainingLocation)
        outreachLocation.setValue(props.missio.outreachLocation)
        startDate.setDate(parseISO(props.missio.startDate))
        endDate.setDate(parseISO(props.missio.endDate))
        length.setValue(props.missio.length)
        price.setValue(props.missio.price)
        applyDateStart.setDate(parseISO(props.missio.applyDateStart))
        applyDateEnd.setDate(parseISO(props.missio.applyDateEnd))
        description.setValue(props.missio.description)
        longDescription.setValue(props.missio.longDescription)
        website.setValue(props.missio.website)
        imageURL.setValue(props.missio.imageURL)
    }, [props.missio])

    const listPassions = () => {
        if (props.missio.passions) {
            props.missio.passions.forEach(passion => passions.push(passion.name))
        }
    }
    const listSkills = () => {
        if (props.missio.skills) {
            props.missio.skills.forEach(skill => skills.push(skill.name))
        }
    }
    const handleSkillsOnChange = (e) => {
        setSkills(e.target.value)
    }
    const handlePassionsOnChange = (e) => {
        setPassions(e.target.value)
    }
    const handleDelteMissio = async () => {
        await deleteMissioByID(accessToken, missioID.value)
        props.handleClose()
    }

    const handleClose = () => {
        props.handleClose()
        setPassions([])
        setSkills([])
    }

    // Define steps for dialog
    function getSteps() {
        return ['Tour details', 'Additional information', 'Apply details', 'Publish']
    }

    // Set content for each step
    function getStepContent(step) {
        switch (step) {
            case 0:
                return FirstStep()
            case 1:
                return SecondStep()
            case 2:
                return ThirdStep()
            case 3:
                return FourthStep()
            default:
                return 'Default'
        }
    }

    const totalSteps = () => {
        return steps.length;
    }

    const completedSteps = () => {
        return Object.keys(completed).length
    }

    const isLastStep = () => {
        return activeStep === totalSteps() - 1
    }

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps()
    }

    // Handle next button activity in dialog
    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted() ?
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1
        setActiveStep(newActiveStep)
    }

    // Handle back button activity in dialog
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    // Handle step button activity in dialog
    const handleStep = (step) => () => {
        setActiveStep(step)
    }

    const handleActiveMissioChange = (e) => {
        active.setValue(e.target.checked)
    }

    // Select file
    const selectFile = (event) => {
        let newFileName = Date.now().toString() + "_" + event.target.files[0].name
        fileName.setValue(newFileName)
        setCurrentFile(event.target.files[0])
        setFileSelected(true)
    }

    // Upload file
    const handleUploadFile = (e) => {
        e.preventDefault()
        uploadFile(accessToken, currentFile, fileName.value)
            .then((res) => {
                message.setValue('Lataus onnistui!')
                imageURL.setValue(config.url.FILE_API_URL + fileName.value)
                uploadError.setValue(false)
                setFileSelected(false)
            })
            .catch((e) => {
                errorMessage.setValue(e.response.data.message)
                uploadError.setValue(true)
                message.setValue('')
            })
    }

    // Update missio lenght on date change
    useEffect(() => {
        length.setValue(differenceInCalendarDays(endDate.date, startDate.date))
    }, [startDate.date, endDate.date])

    //Save edited Missio to the database
    const onSubmit = async (event) => {
        if (!null) {
            event.preventDefault()
            await editMissio(accessToken, missioID.value, missioName.value, passions, skills,
                organization.value, active.value, type.value, trainingLocation.value,
                outreachLocation.value, startDate.date, endDate.date, length.value,
                price.value, applyDateStart.date, applyDateEnd.date, description.value,
                longDescription.value, website.value, imageURL.value
            )
        }
        props.handleClose()
        setPassions([])
        setSkills([])
    }

    const FirstStep = () => {

        return (
            <>
                <Grid item xs={12}>
                    <div>
                        <DialogContentText className={classes.infoText}>
                            Fill the details of the new tour and after finished click save.
                            You may even save the tour unfinished and continue later.
                        </DialogContentText>
                        <TextField
                            className={classes.TextField}
                            variant="standard"
                            label="Tour name"
                            type="text"
                            fullWidth
                            value={missioName.value}
                            onChange={missioName.onChange}
                        />
                        <FormControl className={classes.formControl}>
                            <InputLabel >Organization</InputLabel>
                            <Select
                                value={organization.value}
                                onChange={organization.onChange}
                            >
                                {Organizations.organizationsArray.map((name) => (
                                    <MenuItem key={name} value={name} >
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                            <Typography variant="caption">Company operating the tour.</Typography>
                        </FormControl>
                        <div className={classes.TextField}>
                            <TextField
                                variant="standard"
                                label="Destination"
                                type="text"
                                fullWidth
                                value={outreachLocation.value}
                                onChange={outreachLocation.onChange}
                            />
                            <Typography variant="caption">Tour destination.</Typography>
                        </div>
                        <FormControl className={classes.formControl}>
                            <InputLabel >Tour type</InputLabel>
                            <Select
                                value={type.value}
                                onChange={type.onChange}
                            >
                                {Types.typesArray.map((name) => (
                                    <MenuItem key={name} value={name} >
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={fiLocale}>
                            <KeyboardDatePicker
                                className={classes.CalendarField}
                                disableToolbar
                                variant="inline"
                                format="dd/MM/yyyy"
                                label="Start date"
                                value={startDate.date}
                                onChange={startDate.onDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <KeyboardDatePicker
                                className={classes.CalendarField}
                                disableToolbar
                                variant="inline"
                                format="dd/MM/yyyy"
                                label="End date"
                                value={endDate.date}
                                onChange={endDate.onDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                        <TextField
                            className={classes.TextField}
                            disabled
                            variant="standard"
                            label="Tour duration"
                            type="number"
                            fullWidth
                            value={length.value}
                        />
                        <div className={classes.TextField}>
                            <TextField
                                variant="standard"
                                label="Description"
                                type="text"
                                fullWidth
                                multiline
                                rows={3}
                                value={description.value}
                                onChange={description.onChange}
                                inputProps={{ maxLength: 150 }}
                            />
                            <Typography variant="caption">Short description. Max 200 characters.</Typography>
                        </div>
                    </div>
                </Grid>
            </>
        )
    }

    const SecondStep = () => {

        return (
            <>
                <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Focus</InputLabel>
                        <Select
                            multiple
                            value={passions}
                            onChange={handlePassionsOnChange}
                            renderValue={(selected) => (
                                <div className={classes.chips}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} className={classes.chip} />
                                    ))}
                                </div>
                            )}
                        >
                            {Passions.passionsArray.map((name) => (
                                <MenuItem key={name} value={name} >
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                        <Typography variant="caption">Choose some keywords to descripe the tour.</Typography>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Skill level</InputLabel>
                        <Select
                            multiple
                            value={skills}
                            onChange={handleSkillsOnChange}
                            renderValue={(selected) => (
                                <div className={classes.chips}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} className={classes.chip} />
                                    ))}
                                </div>
                            )}
                        >
                            {Skills.skillsArray.map((name) => (
                                <MenuItem key={name} value={name} >
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                        <Typography variant="caption">Choose the skill level for the tour.</Typography>
                    </FormControl>
                    <div className={classes.TextField}>
                        <div role="alert">
                            {uploadError.value ? <p style={{ color: "#f00" }}>{errorMessage.value}</p> : message.value}
                        </div>
                        <div>
                            <label >
                                <Input type="file" onChange={selectFile} />
                            </label>
                            <Button
                                variant="contained"
                                size="small"
                                style={{ marginLeft: "1em" }}
                                disabled={!fileSelected}
                                onClick={e => handleUploadFile(e)}
                            >
                                Upload
                            </Button>
                        </div>
                        <Typography variant="caption">Upload picture from computer. Max size 2mb.</Typography>
                    </div>
                    <div className={classes.TextField}>
                        <TextField
                            variant="standard"
                            label="Additional location"
                            type="text"
                            fullWidth
                            value={trainingLocation.value}
                            onChange={trainingLocation.onChange}
                        />
                        <Typography variant="caption">Add additional location</Typography>
                    </div>
                    <div className={classes.TextField}>
                        <TextField
                            variant="standard"
                            label="Price (€)"
                            type="number"
                            fullWidth
                            value={price.value}
                            onChange={price.onChange}
                        />
                        <Typography variant="caption">Tour price.</Typography>
                    </div>
                    <div className={classes.TextField}>
                        <TextField
                            variant="standard"
                            label="Long description"
                            type="text"
                            fullWidth
                            multiline
                            rows={6}
                            value={longDescription.value}
                            onChange={longDescription.onChange}
                        />
                        <Typography variant="caption">Long description.</Typography>
                    </div>
                </Grid>
            </>
        )
    }

    const ThirdStep = () => {

        return (
            <>
                <Grid item xs={12}>
                    <DialogContentText className={classes.infoText}>
                        Define the apply timeframe and paste the link to the booking site.
                    </DialogContentText>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={fiLocale}>
                        <KeyboardDatePicker
                            className={classes.CalendarField}
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            label="Apply date start"
                            value={applyDateStart.date}
                            onChange={applyDateStart.onDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <KeyboardDatePicker
                            className={classes.CalendarField}
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            label="Apply date end"
                            value={applyDateEnd.date}
                            onChange={applyDateEnd.onDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                    <div className={classes.TextField}>
                        <TextField
                            variant="standard"
                            label="Booking link"
                            type="url"
                            fullWidth
                            value={website.value}
                            onChange={website.onChange}
                        />
                        <Typography variant="caption">Link to the booking site.</Typography>
                    </div>
                </Grid>
            </>
        )
    }

    const FourthStep = () => {

        return (
            <>
                <Grid item xs={12}>
                    <div className={classes.headerField}>
                        <Typography variant="h6">Set tour publicly visble</Typography>
                    </div>
                    <Grid component="label" container alignItems="center" className={classes.formControl}>
                        <Grid item>No</Grid>
                        <Grid item>
                            <Switch
                                checked={active.value}
                                onChange={e => handleActiveMissioChange(e)}
                                color="primary"
                            />
                        </Grid>
                        <Grid item>Yes</Grid>
                    </Grid>
                    <div className={classes.headerField}>
                        <Typography variant="h6">Preview</Typography>
                    </div>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={classes.missioContainer}>
                        <Grid item xs={12}>
                            <Card elevation={2} className={classes.missioCard}>
                                <Grid container className={classes.missioGrid}>
                                    <Grid item xs={12} sm={8} md={7}>
                                        <CardContent className={classes.missioInfoName}>
                                            <Typography variant="h6" color="primary">{missioName.value}</Typography>
                                        </CardContent>
                                        <CardContent className={classes.missioInfoChips}>
                                            <div className={classes.chips}>
                                                <Chip size="small" label={organization.value} icon={<BusinessIcon />} variant="outlined" />
                                                <Chip size="small" label={outreachLocation.value} icon={<LocationOnIcon />} color="secondary" className={classes.chip1} />
                                                <Chip size="small" label={new Date(startDate.value).toLocaleDateString('fi-FI', options)} icon={<TodayIcon />} variant="outlined" />
                                                <Chip size="small" label={"Duration: " + length.value + " days"} variant="outlined" />
                                            </div>
                                        </CardContent>
                                        <CardContent className={classes.missioInfoDescription}>
                                            <Typography variant="body1" color="primary">
                                                {description.value}
                                            </Typography>
                                        </CardContent>
                                        <CardContent className={classes.missioInfoPassion}>
                                            <Typography>Focus: </Typography>
                                            {passions.slice(0, 3).map(passion => (
                                                <div key={passion}>
                                                    <Chip size="small" label={passion} className={classes.chip2} />
                                                </div>
                                            ))}
                                        </CardContent>
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={5}>
                                        <CardContent className={classes.missioImg}>
                                            <CardMedia
                                                className={classes.media}
                                                image={imageURL.value}
                                                title="title"
                                            />
                                            <Button variant="contained" className={classes.readMoreButton}>
                                                Read More
                                                <KeyboardArrowRightIcon />
                                            </Button>
                                        </CardContent>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </>
        )
    }


    return (
        <Dialog className={classes.dialog} fullScreen={true} open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
            <AppBar className={classes.appBar} position="static">
                <Toolbar>
                    <DialogTitle>{missioName.value}</DialogTitle>
                    <div className={classes.appBarButtons}>
                        <Button onClick={() => setConfirmOpen(true)} color="secondary">Delete Tour</Button>
                        <Button onClick={handleClose} color="secondary">Cancel</Button>
                        <Button onClick={onSubmit} color="secondary">Save</Button>
                    </div>
                </Toolbar>
            </AppBar>
            <div className={classes.gridContainer}>
                <Stepper nonLinear activeStep={activeStep}>
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepButton onClick={handleStep(index)} completed={completed[index]}>
                                {label}
                            </StepButton>
                        </Step>
                    ))}
                </Stepper>
                <Grid container spacing={2}>
                    {getStepContent(activeStep)}
                    <Grid item xs={12} className={classes.buttonContainer}>
                        <div>
                            <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                Back
                            </Button>
                            {activeStep === steps.length - 1 ? '' : (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                    className={classes.button}
                                >
                                    Next
                                </Button>
                            )}
                        </div>
                    </Grid>
                </Grid>
            </div>
            <div>
                <ConfirmDialog
                    title="Delete tour?"
                    open={confirmOpen}
                    setOpen={setConfirmOpen}
                    onConfirm={handleDelteMissio}
                >
                    Are you sure you want to delete tour: {missioName.value} ?
                </ConfirmDialog>
            </div>
        </Dialog >

    )
}


export default EditMissioDialog