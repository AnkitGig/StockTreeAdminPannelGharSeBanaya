"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Layout from "../components/Layout"
import DataTable from "../components/DataTable"
import { getAllTraders, deleteTrader } from "../api/traders"
import { showSuccessAlert, showErrorAlert, showConfirmAlert, showLoadingAlert, closeAlert } from "../utils/sweetAlert"

const Traders = () => {
  const [traders, setTraders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTraders()
  }, [])

  const fetchTraders = async () => {
    try {
      setLoading(true)
      const response = await getAllTraders()
      if (response.status === "success") {
        // Only keep username and email
        setTraders(response.data.map(trader => ({
          _id: trader._id,
          username: trader.username,
          email: trader.email
        })))
      }
    } catch (error) {
      showErrorAlert("Error", "Failed to fetch traders data")
      console.error("Error fetching traders:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteTrader = async (traderId, traderName) => {
    try {
      const result = await showConfirmAlert(
        "Are you sure?",
        `You want to delete trader "${traderName}"? This action cannot be undone!`,
        "Yes, delete it!",
      )

      if (result.isConfirmed) {
        showLoadingAlert("Deleting trader...")
        const response = await deleteTrader(traderId)
        closeAlert()
        if (response.status === "success") {
          showSuccessAlert("Deleted!", "Trader has been deleted successfully.")
          fetchTraders()
        } else {
          showErrorAlert("Error", "Failed to delete trader")
        }
      }
    } catch (error) {
      closeAlert()
      showErrorAlert("Error", "Failed to delete trader")
      console.error("Error deleting trader:", error)
    }
  }

  // ...existing code...

  if (loading) {
    return (
      <Layout activeMenu="traders">
        <div className="d-flex justify-content-center align-items-center" style={{ height: "400px" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout activeMenu="traders">
      <div className="d-flex justify-content-between align-items-center mb-20">
        <div>
          <h4 className="mb-0">Traders List ({traders.length})</h4>
        </div>
        <Link to="/add-traders" className="btn btn-primary">
          + Add New Trader
        </Link>
      </div>
      <div className="wg-box">
        <DataTable id="tradersTable" className="table align-middle table-hover">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {traders && traders.length > 0 ? (
              traders.map((trader) => (
                <tr key={trader._id}>
                  <td>{trader.username}</td>
                  <td>{trader.email}</td>
                  <td>
                    <div className="btn-group" role="group">
                      <button className="btn btn-sm btn-outline-primary" title="Edit">
                        <i className="icon-edit"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        title="Delete"
                        onClick={() => handleDeleteTrader(trader._id, trader.username)}
                      >
                        <i className="icon-trash-2"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center text-muted">
                  No traders found.
                </td>
              </tr>
            )}
          </tbody>
        </DataTable>
      </div>
    </Layout>
  )
}

export default Traders
