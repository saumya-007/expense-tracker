import React, { useEffect, useState } from 'react';
import moment from 'moment';
import DateAndTimePicker from '../Dashboard/DateAndTimePicker';
import BarGraph from './BarGraph';
import PieChart from './PieChart';
import MultipleLineChart from './MultipleLineChart';
import RadarChart from './RadarChart';
import Dropdown from '../../components/Dropdown';
import { MONTHS_ARRAY, WEEK_ARRAY } from '../../utils/constants';
import { EXPENSE_SERVICE_API_CALLS } from '../../utils/api-calls/expense-service';
const { getExpensesByDate, getExpensesByMonth, getExpensesByMonthAndCategory } = EXPENSE_SERVICE_API_CALLS;

const Graphs = () => {
  const [barChartFilters, setBarChartFilters] = useState({
    startDate: null,
    endDate: null
  })
  const [pieChartFilters, setPieChartFilters] = useState({
    startDate: null,
    endDate: null
  })
  const [multiLineChartFilters, setMultiLineChartFilters] = useState({
    month: moment().format('M') - 1,
    year: moment().format('YYYY'),
  })
  const [radarChartFilters, setRadarChartFilters] = useState({
    month: moment().format('M') - 1,
    year: moment().format('YYYY'),
  })

  const [expenseDataForBarChart, setExpenseDataForBarChart] = useState({ data: [], count: 0 })
  const [expenseDataForPieChart, setExpenseDataForPieChart] = useState({ data: [], count: 0 })
  const [expenseDataForMultiLineChart, setExpenseDataForMultiLineChart] = useState({ data: [] })
  const [expenseDataForRadarChart, setExpenseDataForRadarChart] = useState({ data: null })

  const updateDatesForBarChart = (startDate, endDate) => {
    setBarChartFilters({ startDate, endDate })
  }
  const updateDatesForPieChart = (startDate, endDate) => {
    setPieChartFilters({ startDate, endDate })
  }
  const updateYearForMultiLineChart = (option) => {
    setMultiLineChartFilters((prev) => {
      return { ...prev, year: option }
    })
  }
  const updateMonthForMultiLineChart = (option) => {
    setMultiLineChartFilters((prev) => {
      return { ...prev, month: MONTHS_ARRAY.findIndex((month) => month === option) }
    })
  }
  const updateYearForRadarChart = (option) => {
    setRadarChartFilters((prev) => {
      return { ...prev, year: option }
    })
  }
  const updateMonthForRadarChart = (option) => {
    console.log({ option });
    setRadarChartFilters((prev) => {
      return { ...prev, month: MONTHS_ARRAY.findIndex((month) => month === option) }
    })
  }

  const setResponseForBarChart = ({ api_response }) => {
    setExpenseDataForBarChart({
      data: api_response,
      count: api_response.length,
    })
  }
  const setResponseForPieChart = ({ api_response }) => {
    setExpenseDataForPieChart({
      data: api_response,
      count: api_response.length,
    })
  }
  const setResponseForMultiLineChart = ({ api_response }) => {
    setExpenseDataForMultiLineChart({
      data: api_response,
    })
  }
  const setResponseForRadarChart = ({ api_response }) => {
    setExpenseDataForRadarChart({
      data: api_response,
    })
  }

  useEffect(() => {
    getExpensesByDate({
      apiParameters: barChartFilters,
      setResponse: setResponseForBarChart,
    })
  }, [barChartFilters])
  useEffect(() => {
    getExpensesByDate({
      apiParameters: pieChartFilters,
      setResponse: setResponseForPieChart,
    })
  }, [pieChartFilters])
  useEffect(() => {
    getExpensesByMonth({
      apiParameters: multiLineChartFilters,
      setResponse: setResponseForMultiLineChart,
    })
  }, [multiLineChartFilters])
  useEffect(() => {
    getExpensesByMonthAndCategory({
      apiParameters: radarChartFilters,
      setResponse: setResponseForRadarChart,
    })
  }, [radarChartFilters])

  // HELPERS
  const prepareExpenseDataForPie = ({ data }) => {
    const obj = {};
    data.data.forEach((item) => {
      let catName = item.category_name;
      if (!obj[catName]) {
        obj[catName] = 0;
      }
      obj[catName] += item.amount;
    });
    return {
      labels: Object.keys(obj),
      series: Object.values(obj),
    }
  }
  const prepareExpenseDataForMiltiLineChart = ({ data }) => {
    const arr = [];
    Object.keys(data.data).forEach(item => {
      arr.push({
        name: item,
        data: data.data[item].data,
      })
    })
    return {
      series: arr,
      categories: WEEK_ARRAY,
    }
  }
  return (
    <>
      <div className='graph-grid'>
        <div className='graphs-container'>
          <div className='graph-container'>
            <BarGraph
              title={'Date comparision with spent limit'}
              data={expenseDataForBarChart}
              xLegendName={'Spend Limit'}
              yLegendName={'Amount Spent'}
            >
              <DateAndTimePicker updateDates={updateDatesForBarChart} />
            </BarGraph>
          </div>
          <div className='graph-container'>
            <PieChart
              title={'Pie chart based on activity'}
              data={prepareExpenseDataForPie({ data: expenseDataForPieChart })}
            >
              <DateAndTimePicker updateDates={updateDatesForPieChart} />
            </PieChart>
          </div>
        </div>
      </div>
      <div className='graphs-container-full-width'>
        <MultipleLineChart
          title={'Weekly expense distribution'}
          data={prepareExpenseDataForMiltiLineChart({ data: expenseDataForMultiLineChart })}
        >
          <Dropdown dropDownItems={MONTHS_ARRAY} handleDropDownItemClick={updateMonthForMultiLineChart} dropdownLable={'Select Month'} />
          <span className='space' />
          <Dropdown dropDownItems={['2020', '2021', '2022', '2023']} handleDropDownItemClick={updateYearForMultiLineChart} dropdownLable={'Select Year'} />
        </ MultipleLineChart>
      </div>
      <div className='graphs-container-full-width'>
        <RadarChart
          title={'Expenses based on month'}
          data={expenseDataForRadarChart}
          monthName={MONTHS_ARRAY[radarChartFilters.month + 1]}
        >
          <Dropdown dropDownItems={MONTHS_ARRAY} handleDropDownItemClick={updateMonthForRadarChart} dropdownLable={'Select Month'} />
          <span className='space' />
          <Dropdown dropDownItems={['2020', '2021', '2022', '2023']} handleDropDownItemClick={updateYearForRadarChart} dropdownLable={'Select Year'} />
          {/* in user details give creation date, pass it in context and then using that date and current year get expense report */}
        </ RadarChart>
      </div>
    </>
  )
}

export default Graphs