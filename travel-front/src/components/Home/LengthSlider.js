import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import { purple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root : {
        paddingTop: "2vh",
        paddingBottom: "2vh",
    },
    h4 : {
        textAlign: "left",
        fontSize: "2vh"
    }
}))

const lengthMarks = [
    {
        value: 2,
        label: '2 tai alle',
    },
    {
        value: 4,
        label: '4'
    },
    {
      value: 6,
      label: '6'
    },
    {
        value: 8,
        label: '8'
    },
    {
      value: 10,
      label: '10'
    },
    {
        value: 12,
        label: 'yli 12 viikkoa'
    }
]

const PrettoSlider = withStyles({
    root: {
      color: purple[500],
      height: 7,
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid',
      borderColor: purple[500],
      marginTop: -8,
      marginLeft: -12,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      height: 10,
      borderRadius: 4,
    },
    rail: {
      height: 10,
      borderRadius: 4,
    },
    mark: {
        opacity: 0,
      },
      
  })(Slider);

export default function LengthSlider() {

    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Typography className={classes.h4} variant="h4" color="primary">Kesto (viikkoa)</Typography>
            <PrettoSlider defaultValue={30} 
                getAriaValueText={lengthMarks.value} 
                step={2} 
                valueLabelDisplay="auto" 
                marks={lengthMarks}
                min={2}
                max={12} 
            />  
        </div>
    )
}
