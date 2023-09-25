import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import moment from 'moment';

function DateAndTimePicker({updateDates}) {
  const currentDate = moment().format('YYYY-MM-DD')
  const defaultStartDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(currentDate);

  const handleStartDateChange = (e) => {
    const startDate = e.target.value;
    if (moment(startDate).isAfter(currentDate)) {
      toast.error('Selected start date can not be in future');
      setStartDate(defaultStartDate);
      return;
    }
    setStartDate(startDate);
    updateDates(startDate, endDate);
  }

  const handleEndDateChange = (e) => {
    const endDate = e.target.value;
    if (!endDate) {
      toast.error('Please select a start date first');
      setEndDate(currentDate);
      return;
    }
    if (moment(endDate).isAfter(currentDate)) {
      toast.error('Selected start date can not be in future');
      setEndDate(currentDate);
      return;
    }
    if (moment(endDate).isBefore(startDate)) {
      toast.error('Selected end date is greater then start date');
      setEndDate(currentDate);
      return;
    }
    setEndDate(endDate);
    updateDates(startDate, endDate);
  }

  useEffect(() => {
    updateDates(startDate, endDate);
  }, [startDate, endDate])

  return (
    <div className='date-time-picker'>
      <input type='date' defaultValue={startDate} onChange={handleStartDateChange} className='left-date'></input>
      <span className="filler">-</span>
      <input type='date' defaultValue={endDate} onChange={handleEndDateChange} className='right-date'></input>
    </div>
  )
}

export default DateAndTimePicker;