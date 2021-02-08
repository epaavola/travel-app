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
import { createMissio } from '../../services/MissioDataService'
import * as Passions from '../../constants/Passions'
import * as Skills from '../../constants/Skills'
import * as Types from '../../constants/Types'
import * as Organizations from '../../constants/Organizations'
import * as Countries from '../../constants/Countries'
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
import { useKeycloak } from '@react-keycloak/web'
import { Autocomplete } from '@material-ui/lab'

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
        width: "80vh",
        margin: "auto",
        padding: "1em",
    },
    gridContainer: {
        padding: "0em 3em 2em 3em",
        overflow: "auto"
    },
    appBarButtons: {
        marginLeft: "auto"
    },
    formControl: {
        margin: '1em',
        width: "100%"
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
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


const AddMissioDialog = (props) => {

    //Variables
    const missioName = useField('')
    const passions = useField([])
    const skills = useField([])
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
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    //File upload
    const [fileSelected, setFileSelected] = useState(false)
    const [currentFile, setCurrentFile] = useState(null)
    const uploadError = useField(false)
    const message = useField('')
    const errorMessage = useField('')
    const fileName = useField('')

    // Setp variables
    const [activeStep, setActiveStep] = useState(0)
    const [completed, setCompleted] = useState({})
    const steps = getSteps()

    // Access token
    const { keycloak } = useKeycloak()
    const accessToken = keycloak.token

    // Style
    const classes = useStyles()

    // Define steps for dialog
    function getSteps() {
        return ['Mission tiedot', 'Lisätiedot', 'Haun tiedot', 'Julkaisu']
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
                message.setValue('Successfully uploaded the image!')
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

    // Update tour duration on date change
    useEffect(() => {
        length.setValue(differenceInCalendarDays(endDate.date, startDate.date))
    }, [startDate.date, endDate.date])

    //Handle add new tour to database
    const onSubmit = async (event) => {
        if (!null) {
            event.preventDefault()
            await createMissio(accessToken, missioName.value, passions.value, skills.value,
                organization.value, active.value, type.value, trainingLocation.value,
                outreachLocation.value, startDate.date, endDate.date, length.value,
                price.value, applyDateStart.date, applyDateEnd.date, description.value,
                longDescription.value, website.value, imageURL.value
            )
        }
        props.handleClose()
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
                            <Autocomplete
                                style={{ width: 300 }}
                                options={Countries.data}
                                autoHighlight
                                InputValue={outreachLocation.value}
                                onInputChange={outreachLocation.onChange}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Choose a country"
                                        variant="outlined"
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'new-password', // disable autocomplete and autofill
                                        }}
                                    />
                                )}
                            />
                            <TextField
                                variant="standard"
                                label="Mission kohde"
                                type="text"
                                fullWidth
                                value={outreachLocation.value}
                                onChange={outreachLocation.onChange}
                            />
                            <Typography variant="caption">Tour destination.</Typography>
                        </div>
                        <FormControl className={classes.formControl}>
                            <InputLabel >Mission Luonne</InputLabel>
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
                                label="Alkamispäivä"
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
                                label="Päättymispäivä"
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
                            label="Mission Kesto"
                            type="number"
                            fullWidth
                            value={length.value}
                        />
                        <div className={classes.TextField}>
                            <TextField
                                variant="standard"
                                label="Kuvaus"
                                type="text"
                                fullWidth
                                multiline
                                rows={3}
                                value={description.value}
                                onChange={description.onChange}
                                inputProps={{ maxLength: 200 }}
                            />
                            <Typography variant="caption">Lyhyt kuvaus missiosta (näkyy hakutuloksissa). Max 200 merkkiä.</Typography>
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
                        <InputLabel>Fokus</InputLabel>
                        <Select
                            multiple
                            value={passions.value}
                            onChange={passions.onChange}
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
                        <Typography variant="caption">Valitse listalta sopivia avainsanoja kuvaamaan mission fokusta. Voit valita useita.</Typography>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Taidot</InputLabel>
                        <Select
                            multiple
                            value={skills.value}
                            onChange={skills.onChange}
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
                        <Typography variant="caption">Valitse listalta sopivia avainsanoja kuvaamaan mission osaamisprofiilia. Voit valita useita.</Typography>
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
                                Lataa
                            </Button>
                        </div>
                        <Typography variant="caption">Lataa valokuva tietokoneelta. Max koko 2mb.</Typography>
                    </div>
                    <div className={classes.TextField}>
                        <TextField
                            variant="standard"
                            label="Koulutuksen sijainti"
                            type="text"
                            fullWidth
                            value={trainingLocation.value}
                            onChange={trainingLocation.onChange}
                        />
                        <Typography variant="caption">Lisää koulutuksen sijainti (esim. Tampere, Suomi)</Typography>
                    </div>
                    <div className={classes.TextField}>
                        <TextField
                            variant="standard"
                            label="Hinta (€)"
                            type="number"
                            fullWidth
                            value={price.value}
                            onChange={price.onChange}
                        />
                        <Typography variant="caption">Arvio mission kustannuksista hakijalle.</Typography>
                    </div>
                    <div className={classes.TextField}>
                        <TextField
                            variant="standard"
                            label="Pidempi kuvaus"
                            type="text"
                            fullWidth
                            multiline
                            rows={6}
                            value={longDescription.value}
                            onChange={longDescription.onChange}
                        />
                        <Typography variant="caption">Pidempi kuvaus missiosta (näkyy 'lue lisää' -sivulla).</Typography>
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
                        Määritä missiolle hakuaika ja liitä linkki hakemukseen.
                    </DialogContentText>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={fiLocale}>
                        <KeyboardDatePicker
                            className={classes.CalendarField}
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            label="Haun Alkamispäivä"
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
                            label="Haun Päättymispäivä"
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
                            label="Linkki hakemukseen"
                            type="url"
                            fullWidth
                            value={website.value}
                            onChange={website.onChange}
                        />
                        <Typography variant="caption">Liitä tähän linkki järjestön sivulla olevaan hakusivuun / hakulomakeeseen.</Typography>
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
                        <Typography variant="h6">Aseta missio julkiseksi</Typography>
                    </div>
                    <Grid component="label" container alignItems="center" className={classes.formControl}>
                        <Grid item>Ei</Grid>
                        <Grid item>
                            <Switch
                                checked={active.value}
                                onChange={e => handleActiveMissioChange(e)}
                                color="primary"
                            />
                        </Grid>
                        <Grid item>Kyllä</Grid>
                    </Grid>
                    <div className={classes.headerField}>
                        <Typography variant="h6">Esikatselu</Typography>
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
                                                <Chip size="small" label={"Kesto: " + length.value + " päivää"} variant="outlined" />
                                            </div>
                                        </CardContent>
                                        <CardContent className={classes.missioInfoDescription}>
                                            <Typography variant="body1" color="primary">
                                                {description.value}
                                            </Typography>
                                        </CardContent>
                                        <CardContent className={classes.missioInfoPassion}>
                                            <Typography>Fokus: </Typography>
                                            {passions.value.slice(0, 3).map(passion => (
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
                                                Lue lisää
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
                    <DialogTitle>Luo uusi Missio</DialogTitle>
                    <div className={classes.appBarButtons}>
                        <Button onClick={props.handleClose} color="secondary">Peruuta</Button>
                        <Button onClick={onSubmit} color="secondary">Tallenna</Button>
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
                                Takaisin
                            </Button>
                            {activeStep === steps.length - 1 ? '' : (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                    className={classes.button}
                                >
                                    Seuraava
                                </Button>
                            )}
                        </div>
                    </Grid>
                </Grid>
            </div>
        </Dialog >
    )
}


export default AddMissioDialog