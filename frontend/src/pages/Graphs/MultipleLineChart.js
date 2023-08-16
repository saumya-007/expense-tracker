import React, { useState, useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'

function MultipleLineChart({ children, title, data, shiftChildrenLeft }) {
  const [graphOption, setGraphOptions] = useState({
    series: [
      {
        name: "No data",
        data: [0]
      }
    ],
    options: {
      xaxis: {
        categories: 'No data'
      }
    },
  });
  useEffect(() => {
    setGraphOptions({
      series: data.series,
      options: {
        xaxis: {
          categories: data.categories
        }
      },
    });
  }, [title, data])
  return (
    <>
      <div className='graph-title'>
        {title}
      </div>
      <div className='graph-item'>
        {children}
      </div>
      <div>
        <ReactApexChart
          options={graphOption.options}
          series={graphOption.series}
          type="line"
          height="auto"
        />
      </div>
    </>
  )
}

export default MultipleLineChart