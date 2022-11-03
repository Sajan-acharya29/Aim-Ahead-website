import React from 'react'
import {Chart as ChartJS} from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
function BarChart(props) {
  return (
    <Bar data={props.chartdata} />
  )
}

export default BarChart