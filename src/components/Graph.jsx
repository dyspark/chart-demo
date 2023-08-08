import React, { useEffect, useState } from 'react'

import { Chart } from "chart.js";
import StreamingPlugin from "chartjs-plugin-streaming";
import { Line } from "react-chartjs-2";

Chart.register(StreamingPlugin);

const graphData = {
  datasets: [
    {
      backgroundColor: "white",
      borderColor: "#D54447",
      borderWidth: 1,
      pointRadius: 0,
      color: 'white'
    }
  ]
};

const Graph = ({ data, type, onRemove, id }) => {
  let xAxisTitle = 'Seconds';
  let yAxisTitle = null;
  let title = null;
  switch (type) {
    case 'motorSpeed':
      title = 'Motor Speed';
      yAxisTitle = 'erad';
      break;
    case 'motorVoltage':
      title = 'Motor Voltage';
      yAxisTitle = 'amps (A)';
      break;
    case 'batteryVoltage':
      title = 'Battery Voltage';
      yAxisTitle = 'volts (V)';
      break;
    case 'batteryCurrent':
      title = 'Battery Current';
      yAxisTitle = 'amps (A)';
      break;
    default:
      break;
  }

  const options = {
    plugins: {
      legend: {
        display: false,
      }
    },
    scales: {
      y: {
        ticks: { color: 'white' },
        title: {
          display: true,
          text: yAxisTitle,
          color: 'white'
        },
      },
      x: {
        ticks: { color: 'white' },
        title: {
          display: true,
          text: xAxisTitle,
          color: 'white'
        },
        labels: 'yo',
        type: "realtime",
        realtime: {
          duration: 20000,
          delay: 1000,
          refresh: 50,
          onRefresh: chart => {
            chart.data.datasets[0].data.push({
              x: Date.now(),
              y: data[data.length - 1]
            })
          }
        }
      }
    }
  };

  return (
    <div
      className='card'
    >
      <div className='exit' onClick={ () => onRemove(id) }>
        { title }
        <span>x</span>
      </div>
      <Line
        data={ graphData }
        options={ options }
      />
    </div>
  )
}

export default Graph