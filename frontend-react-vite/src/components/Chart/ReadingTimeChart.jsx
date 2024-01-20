import React from 'react';
import { Bar } from 'react-chartjs-2';

const ReadingTimeChart = ({ data, title }) => {
  return (
    <div>
      <h3>{title}</h3>
      {data && <Bar data={data} />}
    </div>
  );
};

export default ReadingTimeChart;
