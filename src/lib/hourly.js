import React, { useEffect, useState, Fragment } from 'react'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/styles'

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
    },
    endTimeSelect: {
        marginLeft: '10px'
    }
}))

const Hourly = (props) => {
    const [value, setValue] = useState(props.value)

    useEffect(() => {
        setValue(props.value)
    }, [props.value])

    const onHourChange = (e) => {
        if (((e.target.value > 0 && e.target.value < 24) || e.target.value === '')) {
            let val = ['0', '0', '*', '*', '*', '?', '*'];
            if (e.target.value === '') {
                val[2] = '';
            } else {
                val[2] = `0/${e.target.value}`;
            }
            val[3] = '1/1';
            props.onChange(val)
        }
    }

    const classes = useStyles()
    return (
        <Paper className={classes.root}>
            <Fragment>
                <TextField
                    id="outlined-number"
                    label="Every hour(s)"
                    value={value[2].split('/')[1] ? value[2].split('/')[1] : ''}
                    onChange={onHourChange}
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                    variant="outlined"
                />
            </Fragment>
        </Paper>
    )
}

export default Hourly
