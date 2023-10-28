import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip
);

type LineChartProps = {
  labels: Array<string>;
  dataElement: Array<any>;
}

const LineCharts: React.FC<LineChartProps> = ({ labels, dataElement }) => {
  const data = {
    labels,
    datasets: [{
      label: "Label Count",
      data: dataElement,
      backgroundColor: 'rgba(20, 184, 166, 0.2)', // Color of the area under the line
      borderColor: '#14b8a6',
      pointBorderColor: '#14b8a6',
      pointBackgroundColor: '#ffffff',
      pointBorderWidth: 3,
      tension: .5,
      fill: true, // Fill the area under the line
    }]
  };


  const options = {
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        enabled: true
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
          showLine: false // Set x-axis grid border color to transparent
        },
        ticks: {
          color: '#2a3547', // Color of the x-axis tick labels
          font: {
            size: 15 // Font size of the x-axis tick labels
          },
        },
      },
      y: {
        ticks: {
          stepSize: 2,
          color: '#2a3547', // Color of the y-axis tick labels
          font: {
            size: 12 // Font size of the y-axis tick labels
          }
        },
        grid: {
          display: true,
          color: '#e8f7ff',
          backgroundColor: '#e8f7ff'
        }
      }
    }
  };

  return (
    <figure className='w-full h-auto'>
      <Line data={data} options={options} />
    </figure>
  );
}

export default LineCharts;
