import React, { useEffect, useState } from "react";

import  SchedulingPicker  from 'react-jalali-scheduling-picker'
import 'react-jalali-scheduling-picker/dist/index.css'

const App = () => {
  const [show,setShow] = useState(false)
  const [value,setValue] = useState(null)
  useEffect(()=>{
    console.log(value?.jDate(),'ddd');
  },[value])
  return <div dir={'rtl'}>
    <button onClick={()=>setShow(true)}>انتخاب تاریخ</button>
    {
      value && <> <p>
        تاریخ شمسی:
        <span>{value.jYear()+'/'+value.jMonth()+'/'+value.jDate()}</span>
      </p>
      </>
    }

    <SchedulingPicker show={show}
                      setShow={setShow}
                      onChange={(v)=>setValue(v)}
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
}

export default App
