import React, { useState, useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'

function PieChart({ children, title, data}) {
  const [graphOption, setGraphOptions] = useState({
    options: {
      labels: ['No Data']
    },
    series: [0]
  });

  useEffect(() => {
    setGraphOptions({
      options: {
        labels: data.labels
      },
      series: data.series
    });
  }, [data])

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
          type="donut"
          height="auto"
        />
      </div>
    </>
  )
}

export default PieChart;