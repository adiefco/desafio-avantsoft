import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend
} from 'chart.js';
import './SalesChart.scss';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function SalesChart({ series }: { series: Array<{ data: string; total: number }> }) {
  const labels = series.map(s => s.data);
  const data = {
    labels,
    datasets: [
      {
        label: 'Vendas (R$) por dia',
        data: series.map(s => s.total),
        fill: false,
        borderColor: '#4e73df',
        backgroundColor: '#4e73df',
        tension: 0.2,
        pointRadius: 4,
        pointHoverRadius: 6,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
      title: {
        display: false,
      }
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Data',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Total (R$)',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="sales-chart-container">
      <Line data={data} options={options} />
    </div>
  );
}
