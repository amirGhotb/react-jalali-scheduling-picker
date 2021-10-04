import './App.scss';
import React, {useEffect, useState} from "react";
import moment from "moment-jalaali";
import nextIcon from "./images/next.png";
import previous from "./images/pervius.png";
import close from "./images/close.png";

export default function ({
                                             startTime = {hour: 8, minute: 0},
                                             endTime = {hour: 16, minute: 0},
                                             visitMinutes = 20,
                                             exceptDay = [],
                                             exceptTime = [],
                                             changeValue,
                                             show,
                                             setShow
                                         }) {
    moment.locale('fa')
    moment.loadPersian();
    const [now, setNow] = useState({date: moment().locale('fa')})
    const [table, setTable] = useState([])
    const [tableTime, setTableTime] = useState([])
    const [selectedDate, setSelectedDate] = useState(null)
    const [selectedDateTime, setSelectedDateTime] = useState(null)
    const [showDatePicker, setShowDatePicker] = useState(true)
    const [showTimePicker, setShowTimePicker] = useState(false)

    useEffect(() => {
        let monthDays = moment.jDaysInMonth(now.date.jYear(), now.date.jMonth())
        now.date.format('jYYYY-jMM-jDD')
        let date = now.date;
        let weekCount = 0;
        let weekArr = [[null, null, null, null, null, null]]
        for (let i = 1; i <= monthDays; i++) {
            weekArr[weekCount][date.jDate(i).weekday()] = i
            if (date.jDate(i).weekday() === 6 && i !== monthDays) {
                weekCount++;
                weekArr.push([null, null, null, null, null, null])
            }
        }
        setTable(weekArr)
    }, [now])

    useEffect(() => {
        let start = moment()
        start.set({hour: startTime.hour, minute: startTime.minute, second: 0})
        let temp = [];
        while (start.hours() < endTime.hour) {
            temp.push({hour: start.hours(), minute: start.minute()})
            start.add(visitMinutes, 'm')
        }
        setTableTime(temp)
    }, [selectedDate])

    useEffect(() => {
        if (selectedDate !== null) {
            setShowDatePicker(false)
            setShowTimePicker(true)
        }
    }, [selectedDate])

    function checkExceptTime(time) {
        return exceptTime.filter(item => (item.hour === time.hour && item.minute === time.minute)).length > 0
    }

    return (
        <div className={show ? "modal display-block" : "modal display-none"} dir={'rtl'}>
            <section className="modal-main">
                <div className={`page ${showDatePicker ? 'show' : ''}`}>
                    <div className={'page-header'}>
                        <img onClick={() => {
                            setNow({...now, date: now.date.subtract(1, 'jMonth')})
                        }} src={nextIcon} className={'date-icon'}
                             alt=""/>
                        <p className={'date-title'}>{now.date.format('jMMMM')} {now.date.jYear()}</p>
                        <img onClick={() => {
                            setNow({...now, date: now.date.add(1, 'jMonth')})
                        }} src={previous}
                             className={'date-icon'} alt=""/>
                        <a className={'custom-link cancel'} onClick={() => {
                            setShow(false)
                            setShowDatePicker(true)
                            setShowTimePicker(false)
                        }}>
                            <img src={close} className={'date-icon'}
                                 alt=""/>
                            انصراف
                        </a>
                    </div>
                    <div>
                        <table className={'date-table'}>
                            <thead>
                            <tr>
                                <th>شنبه</th>
                                <th>یکشنبه</th>
                                <th>دوشنبه</th>
                                <th>سه‌شنبه</th>
                                <th>چهارشنبه</th>
                                <th>پنچشنبه</th>
                                <th>جمعه</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                table.map((item, indexWeek) => {
                                    return <tr key={'week' + indexWeek}>
                                        {
                                            item.map((day, indexDay) => {
                                                return <td key={'day' + indexDay}>
                                                    {day !== null && !exceptDay.includes(day) &&
                                                    <button onClick={() => {
                                                        let m = moment().locale('fa')
                                                        m.jYear(now.date.jYear())
                                                        m.jMonth(now.date.jMonth())
                                                        m.jDate(now.date.jDate())
                                                        setSelectedDate(m)
                                                        console.log(m);
                                                    }}
                                                            className={`btn btn-date ${selectedDate?.jDate() === day ? 'selected' : ''}`}>{day}</button>}
                                                </td>
                                            })
                                        }
                                    </tr>
                                })
                            }

                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={`page ${showTimePicker ? 'show' : ''}`}>
                    <div className={'page-header justify-content-between'}>
                        <a className={'custom-link'} onClick={() => {
                            setShowTimePicker(false)
                            setShowDatePicker(true)
                        }}>
                            <img onClick={() => {

                            }} src={nextIcon} className={'date-icon'}
                                 alt=""/>
                            بازگشت به انتخاب روز
                        </a>

                        <a className={'custom-link cancel'} onClick={() => {
                            setShow(false)
                            setShowDatePicker(true)
                            setShowTimePicker(false)
                        }}>
                            <img src={close} className={'date-icon'}
                                 alt=""/>
                            انصراف
                        </a>
                    </div>
                    <div>
                        <div className={'time-div'}>
                            {
                                tableTime.map((item, index) => {
                                    return <button onClick={() => {
                                        let temp = selectedDate
                                        temp.set({
                                            hour: item.hour,
                                            minute: item.minute,
                                            second: 0
                                        })
                                        if (!checkExceptTime(item)) {
                                            changeValue(temp)
                                            setSelectedDate(null)
                                            setSelectedDateTime(null)
                                            setShow(false)
                                            setShowDatePicker(true)
                                            setShowTimePicker(false)
                                        }
                                    }}
                                                   disabled={checkExceptTime(item)}
                                                   className={`btn btn-date`}>{item.hour + ':' + (item.minute === 0 ? '00' : item.minute)}</button>
                                })
                            }
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
