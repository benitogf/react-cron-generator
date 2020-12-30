import React, { useState, useEffect, Fragment } from 'react'
import cronstrue from 'cronstrue'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles'
import Minutes from './minutes'
import Daily from './daily'
import Hourly from './hourly'
import Weekly from './weekly'
import Monthly from './monthly'
import Yearly from './yearly'
import DisplayCard from './displayCard'
const tabs = ['Minutes', 'Hourly', 'Daily', 'Weekly', 'Monthly'] //,'Yearly'

const useStyles = makeStyles(theme => ({
    displayCard: {
        marginTop: '20px'
    },
}))


const Cron = (props) => {
    const defaultValue = ['0', '0/1', '*', '*', '*', '?', '*']
    const [value, setValue] = useState(props.value && props.value.split(' ').length !== 7 ?
        props.value.replace(/,/g, '!').split(' ') :
        defaultValue)
    const [selectedTab, setSelectedTab] = useState('Minutes')
    const [selectedTabValue, setSelectedTabValue] = useState(0)
    // console.log("tab", selectedTab, value)

    const parentChange = (val) => {
        let newVal = ''
        newVal = val.toString().replace(/,/g, ' ')
        newVal = newVal.replace(/!/g, ',')
        // console.log('newVal', newVal);
        props.onChange(newVal)
    }

    // set the tab based on the value effect
    useEffect(() => {
        // handle the default value?
        // if (!props.value || props.value.split(' ').length !== 7) {
        //     setValue(['0', '0/1', '*', '*', '*', '?', '*'])
        //     setSelectedTab(tabs[0])
        //     setSelectedTabValue(0)
        //     parentChange(value)
        // } else {
        //     setValue(props.value.replace(/,/g, '!').split(' '))
        // }
        // console.log("value", value)
        if (value.join() === defaultValue.join()) {
            // console.log("no change")
            return
        }
        if ((value[1].search('/') !== -1) && (value[2] === '*') && (value[3] === '1/1')) {
            setSelectedTab(tabs[0])
            setSelectedTabValue(0)
        } else if ((value[3] === '1/1') && (value[2].search('/') !== -1)) {
            setSelectedTab(tabs[1])
            setSelectedTabValue(1)
        } else if ((value[3].search('/') !== -1) || (value[5] === 'MON-FRI')) {
            setSelectedTab(tabs[2])
            setSelectedTabValue(2)
        } else if (value[3] === '?') {
            setSelectedTab(tabs[3])
            setSelectedTabValue(3)
        } else if (value[3].startsWith('L') || value[4] === '1/1') {
            setSelectedTab(tabs[4])
            setSelectedTabValue(4)
        } else {
            setSelectedTab(tabs[0])
            setSelectedTabValue(0)
        }
    }, [value, defaultValue])

    const getDefaultValue = (tab) => {
        switch (tab) {
            case tabs[0]:
                return ['0', '0/1', '*', '*', '*', '?', '*']
            case tabs[1]:
                return ['0', '0', '0/1', '1/1', '*', '?', '*']
            case tabs[2]:
                return ['0', '0', '00', '1/1', '*', '?', '*']
            case tabs[3]:
                return ['0', '0', '00', '?', '*', '*', '*']
            case tabs[4]:
                return ['0', '0', '00', '1', '1/1', '?', '*']
            case tabs[5]:
                return ['0', '0', '00', '1', '1/1', '?', '*']
            default:
                return
        }
    }

    const tabChanged = ({ tab, index }) => {
        setSelectedTab(tab)
        setSelectedTabValue(index)
        setValue(getDefaultValue(tab))
        parentChange(getDefaultValue(tab))
    }

    const getHeaders = () => {
        const a11yProps = (index) => {
            return {
                id: `crongen-tab-${index}`,
                'aria-controls': `crongen-tabpanel-${index}`,
            }
        }

        return (<AppBar position="static">
            <Tabs value={selectedTabValue} aria-label="crongen tabs">
                {tabs.map((tab, index) =>
                    <Tab key={index} label={tab} {...a11yProps(index)} onClick={() => tabChanged({ tab, index })} />
                )}
            </Tabs>
        </AppBar>)
    }

    const onValueChange = (val) => {
        if (val && val.length) {
            setValue(val)
        } else {
            setValue(defaultValue)
            val = defaultValue
        }
        parentChange(val)
    }

    const getVal = () => {
        let val = '-'
        try {
            val = cronstrue.toString(value.toString().replace(/,/g, ' ').replace(/!/g, ','))
            if (val.search('undefined') === -1) {
                return val;
            }
        } finally {
            return val
        }
    }

    const getComponent = (tab) => {
        switch (tab) {
            case tabs[0]:
                return <Minutes value={value} onChange={onValueChange} />
            case tabs[1]:
                return <Hourly value={value} onChange={onValueChange} />
            case tabs[2]:
                return <Daily value={value} onChange={onValueChange} />
            case tabs[3]:
                return <Weekly value={value} onChange={onValueChange} />
            case tabs[4]:
                return <Monthly value={value} onChange={onValueChange} />
            case tabs[5]:
                return <Yearly value={value} onChange={onValueChange} />
            default:
                return
        }
    }
    const classes = useStyles()
    return (
        <Fragment>
            <Grid container>
                <Grid item xs={12}>
                    <div>
                        {getHeaders()}
                    </div>
                    <div className="">{getComponent(selectedTab)}</div>
                </Grid>
            </Grid>
            {(props.showResultText || props.showResultCron) &&
                <Grid container justify="center" className={classes.displayCard}>
                    <Grid item xs={8} sm={7} lg={4}>
                        <DisplayCard
                            textResult={props.showResultText && getVal()}
                            cronResult={props.showResultCron && value.toString().replace(/,/g, ' ').replace(/!/g, ',')}
                        />
                    </Grid>
                </Grid>
            }
        </Fragment>
    )
}

export default Cron
