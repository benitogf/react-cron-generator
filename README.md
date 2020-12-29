# react-cron-generator

Simple react component to generate cron expression (Material-UI)

## Getting Started

Package helps to build linux scheduler cron expression.
This project uses material-ui

```
data = '* * * * * * *'
```
```
npm i --save @dealmeddevs/react-cron-generator

```
## demo
[Live demo](https://dealmeddevs.github.io/react-cron-generator/)

![alt text](https://raw.githubusercontent.com/dealmeddevs/react-cron-generator/master/public/images/rcg_daily.JPG)

![alt text](https://raw.githubusercontent.com/dealmeddevs/react-cron-generator/master/public/images/rcg_weekly.JPG)


```
import React, { useState } from 'react'
import Cron from 'react-cron-generator'

const App = (props) => {
    const [value, setValue] = useState()

    return (
      <div>
        <Cron
          onChange={(e)=> {setValue(e)); console.log(e)}}
          value={value}
          showResultText={true}
          showResultCron={true}
        />
      </div>
    )

}

export default App

```

# TODO

- every # of weeks (??)
- every # of months
```
0 0 0 1 1/3 ? *
At 00:00 on 1st of the month every 3rd month
```
-	monthly how do i put 2nd Fri of every month? or 3rd Mon of every month? [#](https://chromium.googlesource.com/external/github.com/gorhill/cronexpr/+/d520615e531a6bf3fb69406b9eba718261285ec8/README.md#hash)
  ```
  0 15 10 ? * 6#3 *
  Fire at 10:15 AM on the third Friday of every month
  ```
-	seconds tab
- yearly tab

## props

| Prop | Description | Default
| --- | --- | -- |
| value | cron expression  |  |
| onChange |  |  |
| showResultText | show in readable text format | false |
| showResultCron | show cron expression | false |
