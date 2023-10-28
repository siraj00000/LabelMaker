import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';

ChartJS.register(ArcElement, Tooltip);

type DoughtnutProps = {
    labels: Array<string>;
    dataElement: Array<any>;
};

const predefinedColors = [
    'rgb(255, 99, 132)',
    'rgb(54, 162, 235)',
    'rgb(255, 205, 86)',
    // Add more predefined colors as needed
];

const DoughnutComponent = ({ labels, dataElement }: DoughtnutProps) => {
    const backgroundColors = labels.map((_, index) => {
        const colorIndex = index % predefinedColors.length;
        return predefinedColors[colorIndex];
    });

      const data = {
        labels: labels,
        datasets: [{
          label: 'Label Count',
          data: dataElement,
          backgroundColor: backgroundColors,
          hoverOffset: 4
        }]
      };

    return (
        <figure className='w-32 h-32 mx-auto'>
            <Doughnut data={data} options={{}} />
        </figure>
    );
};

export default DoughnutComponent;
