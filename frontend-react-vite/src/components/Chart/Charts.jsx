import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ChartComponent from './ChartComponent';
import ReadingTimeChart from './ReadingTimeChart';
import './Charts.css';

const Charts = () => {
  const [genreDistribution, setGenreDistribution] = useState([]);
  const [readingTimeDistribution, setReadingTimeDistribution] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDataForCharts();
  }, []);

  const fetchDataForCharts = async () => {
    try {
      const genreDistributionResponse = await axios.get('http://localhost:3000/books/genre-distribution');
      setGenreDistribution(genreDistributionResponse.data);

      const readingTimeDistributionResponse = await axios.get('http://localhost:3000/books/reading-time-distribution');
      setReadingTimeDistribution(readingTimeDistributionResponse.data);
    } catch (error) {
      console.error('Error fetching data for charts', error);
    }
  };

  const handleGenreClick = (genre) => {
    if (genre) {
      navigate(`/books?genre=${genre}`);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Charts</h2>

      <div className="chart-container">
        <ChartComponent
          chartType="doughnut"
          data={{
            labels: genreDistribution.map(entry => entry.genre),
            datasets: [
              {
                data: genreDistribution.map(entry => entry.count),
                backgroundColor:
                ['rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(153, 102, 255, 0.7)',
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(153, 102, 255, 0.7)',
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(153, 102, 255, 0.7)',
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(153, 102, 255, 0.7)',
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(153, 102, 255, 0.7)',
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(153, 102, 255, 0.7)',
                'rgba(255, 99, 132, 0.7)',],
                hoverBackgroundColor: 
                [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 99, 132, 1)',],
              },
            ],
          }}
          title="Genre Distribution"
          onSegmentClick={handleGenreClick}
        />
      </div>

      <div className="chart-container">
        <ReadingTimeChart
          data={{
            labels: readingTimeDistribution.map(entry => entry.duration),
            datasets: [
              {
                label: 'Number of Books',
                data: readingTimeDistribution.map(entry => entry.count),
                backgroundColor: 'rgba(75, 192, 192, 0.7)',
              },
            ],
          }}
          title="Reading Time Distribution"
        />
      </div>

    </div>
  );
};

export default Charts;


