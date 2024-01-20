import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const ChartComponent=({chartType, data, title, onSegmentClick}) => {
  const options = {
    onClick: (event, elements)=>
    elements.length > 0 ? onSegmentClick(data.labels[elements[0].index]) : null
  }

  return (
    <div>
      <h3>{title}</h3>
      {chartType === 'doughnut' && <Doughnut data={data} options={options} />}
    </div>
  );
}


export default ChartComponent;

