import React, { useEffect, useState } from 'react'
import ReactApexChart from "react-apexcharts";
import DateAndTimePicker from '../Dashboard/DateAndTimePicker';

const BarGraph = ({ children, title, data, xLegendName, yLegendName }) => {
  const options = {
    chart: {
      height: 350,
      type: 'bar'
    },
    plotOptions: {
      bar: {
        columnWidth: '60%'
      }
    },
    colors: ['#00E396'],
    dataLabels: {
      enabled: true
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      customLegendItems: [xLegendName, yLegendName],
      markers: {
        fillColors: ['#00E396', '#775DD0']
      }
    }
  };
  const [series, setSeries] = useState([
    {
      name: yLegendName,
      data: [{
        x: 0,
        y: 0,
        goals: [
          {
            name: yLegendName,
            value: 0,
            strokeHeight: 5,
            strokeColor: '#775DD0'
          }
        ]
      }]
    }
  ]);

  useEffect(() => {
    const seriesDataArray = {
      name: yLegendName,
      data: [],
    };
    const seriesDataObject = {
      x: null,
      y: null,
      goals: [
        {
          name: yLegendName,
          value: null,
          strokeHeight: 5,
          strokeColor: '#775DD0'
        }
      ]
    };
    data.data.forEach((record) => {
      seriesDataObject.x = record.spent_on;
      seriesDataObject.y = Number(record.amount);
      seriesDataObject.goals[0].value = Number(record.spend_limit);
      seriesDataArray.data.push({ ...seriesDataObject });
    });
    setSeries([seriesDataArray]);
  }, [data, xLegendName, yLegendName])

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
          options={options}
          series={series}
          type="bar"
          height="auto" />
      </div>
    </>
  )
}

export default BarGraph