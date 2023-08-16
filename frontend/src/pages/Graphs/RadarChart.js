import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'

function RadarChart({ children, title, data, monthName }) {
  console.log({data: data.data})
  const [graphOption, setGraphOptions] = useState({
    options: {
      chart: {
        dropShadow: {
          enabled: true,
          blur: 1,
          left: 1,
          top: 1
        }
      },
      colors: ["#bf8e35", "#292318"],
      labels: ['No data'],
      stroke: {
        width: 1
      },
      fill: {
        opacity: 0
      },
      markers: {
        size: 2
      }
    },
    series: [
      {
        name: 'Month name',
        data: [0]
      }
    ]
  });

  useEffect(() => {
    setGraphOptions({
      options: {
        chart: {
          dropShadow: {
            enabled: true,
            blur: 1,
            left: 1,
            top: 1
          }
        },
        colors: ["#bf8e35", "#292318"],
        labels: data?.data ? data.data.categories : [],
        stroke: {
          width: 1
        },
        fill: {
          opacity: 0
        },
        markers: {
          size: 2
        }
      },
      series: [
        {
          name: monthName,
          data: data?.data ? data?.data.data : []
        }
      ]
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
          type="radar"
          height="auto"
        />
      </div>
    </>
  )
}

export default RadarChart