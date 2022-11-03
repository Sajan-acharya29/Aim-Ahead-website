import React from 'react'
import {Chart as ChartJS} from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
function LineChart({chartdata}) {
  return (
    <Line data={chartdata}/>
  )
}

export default LineChart