
# react-jalali-scheduling-picker

> jalali scheduling picker for react js


<img src="https://github.com/amirGhotb/react-jalali-scheduling-picker/blob/main/screenShots/1.PNG?raw=true"  height="300" />
<img src="https://github.com/amirGhotb/react-jalali-scheduling-picker/blob/main/screenShots/2.PNG?raw=true"  height="200" />

[![NPM](https://img.shields.io/npm/v/react-jalali-scheduling-picker.svg)](https://www.npmjs.com/package/react-jalali-scheduling-picker) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-jalali-scheduling-picker
yarn add react-jalali-scheduling-picker
```

## Usage

```jsx
import React,{useState} from "react";
import SchedulingPicker from "react-jalali-scheduling-picker";
import  'react-jalali-scheduling-picker/dist/index.css';
function App() {
  const [show,setShow] = useState(true)
  return (
    <div className="App">
      <SchedulingPicker show={show}
                        setShow={setShow}
                        onChange={(v)=> {
                          console.log(v)
                        }}
                        exceptDays={[3,4,5]}
                        visitMinutes={15}
                        holidays={[13]}
                        exceptTimes={[{hour:8,minute:20}]}
                        startTime={{hour:9,minute:30}}
                        endTime={{hour:16,minute:30}}
                        onChangeMonth={(month)=>{
                          console.log(month)
                        }}
      />
    </div>
  );
}

export default App;
```
## Props

 - **show** : boolean

   show modal state
 - **setShow** : function

    set show state for close modal in component

 - **startTime** : object {hour:?,minute:?}

    start time in select time section

 - **endTime** : object {hour:?,minute:?}

    end time in select time section

 - **visitMinutes** : int

    The interval between times in select time section

 - **holidays** : array

    holidays	 in month

 - **exceptDay** : array

    days that are not allowed to choose

 - **exceptTime** : array

    times that are not allowed to choose

 - **redHelp** : text

   help text for holiday

 - **grayHelp** : text

   help text for excepted days

 - **greenHelp** : text

   help text for today

 - **onChange** : function (v)

    selected date and time

    v type is [moment-jalaali](https://github.com/jalaali/moment-jalaali)

 - **onChangeMonth** : function (month)

    when month change in date picker section (for change holiday props)

    month type is integer

## License

MIT © [amirGhotb](https://github.com/amirGhotb)
