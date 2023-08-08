import { useEffect, useState } from 'react'

import './App.css'

import Graph from './components/Graph'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import StreamingPlugin from "chartjs-plugin-streaming";
import "chartjs-adapter-luxon";
ChartJS.register(StreamingPlugin);

function App() {
  const [graphs, setGraphs] = useState([]);
  const [isGeneratingData, setIsGeneratingData] = useState(false);
  const [data, setData] = useState({
    motorSpeed: [0],
    motorVoltage: [0],
    batteryVoltage: [0],
    batteryCurrent: [0]
  });

  useEffect(() => {
    let interval;

    if (isGeneratingData) {
      interval = setInterval(() => {
        generateRandomData();
      }, 50);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    }
  }, [isGeneratingData]);

  const generateRandomData = () => {
    setData(prevData => {
      const newData = {};

      for (const type in prevData) {
        const arr = prevData[type];
        const prev = arr.length ? arr[arr.length - 1] : 0;
        const newDataPoint = prev + (5 - Math.random() * 10);

        newData[type] = [...arr, newDataPoint];
      }

      return newData;
    })
  };

  const handleAddGraph = (type) => {
    const id = Date.now().toString();
    const newGraph = {
      id,
      type,
      data: [...data[type]]
    };
    setGraphs((prev) => [...prev, newGraph]);
  };

  const handleRemoveGraph = (id) => {
    const updatedGraphs = graphs.filter((graph) => graph.id !== id);
    setGraphs(updatedGraphs);
  };

  const handleStartStop = () => {
    setIsGeneratingData((prev) => !prev);
  };

  const handleReset = () => {
    setData({
      motorSpeed: [0],
      motorVoltage: [0],
      batteryVoltage: [0],
      batteryCurrent: [0]
    });
  };

  return (
    <main className='bg-main'>
      <div className='bg-header px-10 py-4'>
        <button onClick={ handleStartStop } className='mr-4'>
          { isGeneratingData ? 'Stop' : 'Start' }
        </button>
        <button onClick={ handleReset }>
          Reset
        </button>
      </div>

      <div className='flex p-6 flex-wrap'>
        { graphs.map((graph, index) => (
          <div key={ index }>
            <Graph
              id={ graph.id }
              data={ data[graph.type] }
              onRemove={ handleRemoveGraph }
              type={ graph.type }
            />
          </div>
        )) }

        <div className='card control'>
          <button onClick={ () => handleAddGraph('motorSpeed') }>Motor Speed</button>
          <button onClick={ () => handleAddGraph('motorVoltage') }>Motor Voltage</button>
          <button onClick={ () => handleAddGraph('batteryVoltage') }>Battery Voltage</button>
          <button onClick={ () => handleAddGraph('batteryCurrent') }>Battery Current</button>
        </div>
      </div>
    </main>
  )
}

export default App
