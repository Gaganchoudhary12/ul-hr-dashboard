// src/PieChartComponent.js

import React from 'react';
import { Chart } from 'react-google-charts';

// Sample data for the pie chart
const data = [
  ['Category', 'Value'],
  ['😍',  12],
  ['😊',  2],
  ['🙂', 6],
  ['😟', 3],
  ['😡', 1],
];

// Options for customizing the pie chart
const options = {
  title: 'Employees mood',
  pieHole: 0.4, // Make it a donut chart (optional)
  legend: { position: 'right' },
};

function PieChart() {
  return (
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width="100%"
        height="400px"
        legendToggle
      />
  );
}

export default PieChart;
