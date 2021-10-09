import React, { useEffect, useState } from 'react'
import moment from 'moment-jalaali'
import nextIcon from 'images/next.png'
import previous from 'images/pervius.png'
import close from 'images/close.png'
import styles from './styles.module.css'

export default function SchedulingPicker({
  startTime = { hour: 8, minute: 0 },
  endTime = { hour: 16, minute: 0 },
  visitMinutes = 20,
  exceptDay = [],
  exceptTime = [],
  onChange,
  show = true,
  setShow,
  holidays = [],
}) {
  moment.locale('fa')
  moment.loadPersian()
  const [now, setNow] = useState({ date: moment().locale('fa') })
  const [table, setTable] = useState([])
  const [tableTime, setTableTime] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedDateTime, setSelectedDateTime] = useState(null)
  const [showDatePicker, setShowDatePicker] = useState(true)
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [today] = useState(moment().locale('fa'))
  useEffect(() => {
    const monthDays = moment.jDaysInMonth(now.date.jYear(), now.date.jMonth())
    now.date.format('jYYYY-jMM-jDD')
    const date = now.date
    let weekCount = 0
    const weekArr = [[null, null, null, null, null, null]]
    for (let i = 1; i <= monthDays; i++) {
      weekArr[weekCount][date.jDate(i).weekday()] = i
      if (date.jDate(i).weekday() === 6 && i !== monthDays) {
        weekCount++
        weekArr.push([null, null, null, null, null, null])
      }
    }
    setTable(weekArr)
  }, [now])

  useEffect(() => {
    const start = moment()
    start.set({ hour: startTime.hour, minute: startTime.minute, second: 0 })
    const temp = []
    while (start.hours() < endTime.hour) {
      temp.push({ hour: start.hours(), minute: start.minute() })
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
  console.log(selectedDate?.jDate())
  console.log(now.date?.jDate(), 'now')

  function checkExceptTime(time) {
    return (
      exceptTime.filter(
        (item) => item.hour === time.hour && item.minute === time.minute
      ).length > 0
    )
  }

  return (
    <div
      className={`${styles.modal} ${show ? styles.block : styles.hide}`}
      dir='rtl'
    >
      <section className={styles.modalMain}>
        <div
          className={`${styles.page} ${showDatePicker ? styles.show : null}`}
        >
          <div className={styles.pageHeader}>
            <img
              onClick={() => {
                setNow({ ...now, date: now.date.subtract(1, 'jMonth') })
              }}
              src={`${nextIcon}`}
              className={styles.dateIcon}
              alt=''
            />
            <p className={styles.dateTitle}>
              {now.date.format('jMMMM')} {now.date.jYear()}
            </p>
            <img
              onClick={() => {
                setNow({ ...now, date: now.date.add(1, 'jMonth') })
              }}
              src={previous}
              className={styles.dateIcon}
              alt=''
            />
            <a
              className={`${styles.customLink} ${styles.cancel}`}
              onClick={() => {
                setShow(false)
                setShowDatePicker(true)
                setShowTimePicker(false)
              }}
            >
              <img src={close} className={styles.dateIcon} alt='' />
              انصراف
            </a>
          </div>
          <div>
            <table className={styles.dateTable}>
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
                {table.map((item, indexWeek) => {
                  return (
                    <tr key={'week' + indexWeek}>
                      {item.map((day, indexDay) => {
                        return (
                          <td key={'day' + indexDay}>
                            {day !== null && (
                              <button
                                onClick={() => {
                                  now.date.jDate(day)
                                  const m = moment().locale('fa')
                                  m.jYear(now.date.jYear())
                                  m.jMonth(now.date.jMonth())
                                  m.jDate(now.date.jDate())
                                  setSelectedDate(m)
                                }}
                                disabled={exceptDay.includes(day)}
                                className={`${styles.btn} ${styles.btnDate} ${
                                  indexDay === 6 || holidays.includes(day)
                                    ? styles.holiday
                                    : ''
                                } ${(now.date.jYear()+'-'+now.date.jMonth()+'-'+day) ===(today.jYear()+'-'+today.jMonth()+'-'+today.jDate()) ? styles.btnSuccess :''}`}
                              >
                                {day}
                              </button>
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className={styles.helpBox}>
            <div className={styles.helpText}>
              <div className={`${styles.circle} ${styles.circleExcept}`} />
              <p>نوبت‌دهی در روز مشخص شده به حد نصاب رسیده است</p>
            </div>
            <div className={styles.helpText}>
              <div className={`${styles.circle} ${styles.circleHoliday}`} />
              <p>تعطیل رسمی</p>
            </div>
          </div>
        </div>
        <div className={`${styles.page} ${showTimePicker ? styles.show : ''}`}>
          <div
            className={`${styles.page} ${styles.pageHeader} ${styles.justifyContentBetween}`}
          >
            <a
              className={styles.customLink}
              onClick={() => {
                setShowTimePicker(false)
                setShowDatePicker(true)
              }}
            >
              <img
                onClick={() => {}}
                src={nextIcon}
                className={styles.dateIcon}
                alt=''
              />
              بازگشت به انتخاب روز
            </a>

            <a
              className={`${styles.customLink} ${styles.cancel}`}
              onClick={() => {
                setShow(false)
                setShowDatePicker(true)
                setShowTimePicker(false)
              }}
            >
              <img src={close} className={styles.dateIcon} alt='' />
              انصراف
            </a>
          </div>
          <div>
            <div className={styles.timeDiv}>
              {tableTime.map((item, index) => {
                return (
                  <button
                    key={'btn' + index}
                    onClick={() => {
                      const temp = selectedDate
                      temp.set({
                        hour: item.hour,
                        minute: item.minute,
                        second: 0
                      })
                      if (!checkExceptTime(item)) {
                        onChange(temp)
                        setSelectedDate(null)
                        setSelectedDateTime(null)
                        setShow(false)
                        setShowDatePicker(true)
                        setShowTimePicker(false)
                      }
                    }}
                    disabled={checkExceptTime(item)}
                    className={`${styles.btn} ${styles.btnDate}`}
                  >
                    {item.hour + ':' + (item.minute === 0 ? '00' : item.minute)}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
        ;
      </section>
    </div>
  )
}