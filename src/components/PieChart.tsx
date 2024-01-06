import React from "react";
import Chart from "react-apexcharts";
import "./PieChart.css";

const PieChart: React.FC<{ amount: number; interest: number }> = (props) => {
  const chartOptions = {
    labels: ["Total Amount (₹)", "Interest (₹)"],
    colors: ["#1d86ff", "#9EC3EB"],
    // colors: ["#1d86ff", "rgb(124, 152, 217)"],
  };

  const series = [Math.floor(props.amount), Math.floor(props.interest)];

  return (
    <div className="pie-chart-container">
      <div className="chart-wrapper">
        <Chart options={chartOptions} series={series} type="pie" width="100%" />
      </div>
    </div>
  );
};

export default PieChart;
