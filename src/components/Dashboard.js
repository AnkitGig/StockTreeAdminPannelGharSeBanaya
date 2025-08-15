"use client"

import Layout from "../components/Layout"
import Chart from "../components/Chart"
import DataTable from "../components/DataTable"

const Dashboard = () => {
  const marketChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Profit",
        data: [10000, 12000, 13000, 12500, 14000, 14500, 16000, 15500, 17000, 17500, 18000, 19000],
        backgroundColor: "#3A962F",
      },
      {
        label: "Loss",
        data: [8000, 9500, 10500, 11000, 12000, 13000, 13500, 13800, 14200, 15000, 15200, 15800],
        backgroundColor: "#dc3545",
      },
    ],
  }

  const pieChartData = {
    labels: ["AAPL", "TSLA", "AMZN", "MSFT"],
    datasets: [
      {
        data: [25, 30, 35, 10],
        backgroundColor: ["#0d6efd", "#dc3545", "#198754", "#ffc107"],
      },
    ],
  }

  const marketChartOptions = {
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  }

  const pieChartOptions = {
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  }

  return (
    <Layout activeMenu="dashboard">
      {/* Stats Cards */}
      <div className="row g-3 mb-20">
        <div className="col-md-3">
          <div className="bg-white shadow-sm rounded p-3 card-stat">
            <div className="card-title">Total Value</div>
            <div className="card-value">$120,540</div>
            <div className="small-change">↑ 12% from last week</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="bg-white shadow-sm rounded p-3 card-stat">
            <div className="card-title">Today Gain</div>
            <div className="card-value">$10,540</div>
            <div className="small-change">↑ 5% from last week</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="bg-white shadow-sm rounded p-3 card-stat">
            <div className="card-title">Active Traders</div>
            <div className="card-value">200</div>
            <div className="small-change down">↓ 20% from yesterday</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="bg-white shadow-sm rounded p-3 card-stat">
            <div className="card-title">Agent Activity</div>
            <div className="card-value">92%</div>
            <div className="small-change">Automated Response Rate</div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-8">
          <div className="card shadow-sm p-3">
            <h5 className="card-title">Market Overview</h5>
            <Chart type="bar" data={marketChartData} options={marketChartOptions} height="300" />
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm p-3">
            <h5 className="card-title">Top Performing Stocks</h5>
            <Chart type="pie" data={pieChartData} options={pieChartOptions} height="200" />
          </div>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="p-3 mb-4 bg-white rounded shadow-sm">
        <h6 className="mb-3">Recent traders</h6>
        <DataTable id="dashboardTable" className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Shares</th>
              <th>Date of Buy</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Emily Carter</td>
              <td>emily@example.com</td>
              <td>250</td>
              <td>2025-05-20</td>
              <td>
                <span className="status-badge status-active">Active</span>
              </td>
            </tr>
            <tr>
              <td>John Doe</td>
              <td>john@example.com</td>
              <td>120</td>
              <td>2025-05-21</td>
              <td>
                <span className="status-badge status-pending">Pending</span>
              </td>
            </tr>
            <tr>
              <td>Sophia Lee</td>
              <td>sophia@example.com</td>
              <td>300</td>
              <td>2025-05-22</td>
              <td>
                <span className="status-badge status-cancelled">Cancelled</span>
              </td>
            </tr>
          </tbody>
        </DataTable>
      </div>
    </Layout>
  )
}

export default Dashboard
