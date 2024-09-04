import React from 'react';
import { Chart } from 'react-google-charts';

const BarChart = ({data}:any) => {
  // Define chart options
  const options = {
    title: 'Employees Mood',
    chartArea: { width: '100%' },
    hAxis: {
      title: 'Total Sales',
      minValue: 0,
    },
    vAxis: {
      title: 'Year',
    },
  };

  return (
    <div>
      <h2>Employees Mood</h2>
      <Chart
        width={'600px'}
        height={'400px'}
        chartType="Bar"
        data={data}
        options={options}
      />
    </div>
  );
};

export default BarChart;

