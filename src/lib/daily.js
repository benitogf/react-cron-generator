import React, { useState, useEffect, Fragment } from 'react'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import { makeStyles } from '@material-ui/styles'
import StartTime from './chooseTime'
import Card from './card'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme && theme.spacing ? theme.spacing(3, 2) : '10px',
    },
    secondaryPaper: {
        padding: theme && theme.spacing ? theme.spacing(3, 2) : '10px',
        marginTop: '20px'
    },
    radioBtn: {
        marginTop: '20px'
    }
}))

const Daily = (props) => {
    const [every, setEvery] = useState()
    const [value, setValue] = useState(props.value)

    useEffect(() => {
        setValue(props.value)
    }, [props.value])

    useEffect(() => {
        setEvery(props.value[3] !== '?')
    }, [props.value])

    const onDayChange = (e) => {
        if (e.target.value > 0 || e.target.value === '') {
            let val = ['0', value[1] === '*' ? '0' : value[1], value[2] === '*' ? '0' : value[2], '*', '*', '?', '*'];
            if (e.target.value === '') {
                val[3] = '1/1';
            } else {
                val[3] = `1/${e.target.value}`;
            }
            props.onChange(val)
        }

    }
    const onAtHourChange = (e) => {
        let val = value;
        val[2] = `${e.target.value}`;
        props.onChange(val)
    }
    const onAtMinuteChange = (e) => {
        let val = value;
        val[1] = `${e.target.value}`;
        props.onChange(val)
    }

    const classes = useStyles()
    return (<Fragment>
        <Paper className={classes.root}>
            <Radio
                className={classes.radioBtn}
                checked={every ? true : false}
                onClick={(e) => { setEvery(true); props.onChange() }}
                value="1"
                name="DailyRadio"
                inputProps={{ 'aria-label': 'DailyRadio' }}
            />
            <TextField
                id="outlined-number"
                label="Every day(s)"
                value={value[3].split('/')[1] ? value[3].split('/')[1] : '1'}
                onChange={onDayChange}
                type="number"
                InputLabelProps={{
                    disabled: every ? false : true,
                    shrink: true,
                }}
                margin="normal"
                variant="outlined"
            />
        </Paper>
        <Paper className={classes.secondaryPaper}>
            <FormControlLabel
                value="top"
                control={<Radio
                    onClick={(e) => { setEvery(false); props.onChange(['0', value[1], value[2], '?', '*', 'MON-FRI', '*']) }}
                    value="2"
                    name="DailyRadio"
                    checked={every ? false : true}
                    inputProps={{ 'aria-label': 'DailyRadio' }}
                />}
                label="Every week day"
                labelPlacement="start"
            />

        </Paper>

        <Card label="HH/MM (24h)">
            <StartTime hour={value[2]} minute={value[1]} onAtMinuteChange={onAtMinuteChange} onAtHourChange={onAtHourChange} />
        </Card>
    </Fragment>)
}

export default Daily
