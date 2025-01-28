import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SalesGraph = () => {
  const currentTheme = useSelector((state) => state.theme.theme); 

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Sales",
        data: [10, 15, 20, 13, 25, 30, 22, 26, 30, 35, 33, 37],
        borderColor: currentTheme === "dark" ? "rgba(75, 192, 192, 1)" : "rgba(54, 162, 235, 1)", // Line color
        backgroundColor: currentTheme === "dark" ? "rgba(75, 192, 192, 0.2)" : "rgba(54, 162, 235, 0.2)", // Area fill color
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: currentTheme === "dark" ? "rgba(75, 192, 192, 1)" : "rgba(54, 162, 235, 1)", // Point color
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        labels: {
          color: currentTheme === "dark" ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)", // Legend text color
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        ticks: {
          color: currentTheme === "dark" ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)", 
        },
        grid: {
          color: currentTheme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)", 
        },
      },
      y: {
        ticks: {
          color: currentTheme === "dark" ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)", 
          callback: function (value) {
            return `${value}K`;
          },
        },
        grid: {
          color: currentTheme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)", 
        },
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default SalesGraph;
