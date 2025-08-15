"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import DataTable from "../components/DataTable"
import Layout from "../components/Layout"
import { getPlans } from "../api/api"

const Plans = () => {
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch plans on component mount
  useEffect(() => {
    fetchPlans()
  }, [])

  const fetchPlans = async () => {
    try {
      setLoading(true)
      const response = await getPlans()
      if (response.data) {
        setPlans(response.data)
      } else {
        setPlans([])
      }
    } catch (error) {
      setPlans([])
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = () => {
    fetchPlans()
  }

  if (loading) {
    return (
      <Layout activeMenu="plans">
        <div className="d-flex justify-content-center align-items-center" style={{ height: "400px" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout activeMenu="plans">
      <div className="d-flex justify-content-between align-items-center mb-20">
        <div>
          <h4 className="mb-0">Plans</h4>
          <small className="text-muted">Total: {plans.length} plans</small>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary" onClick={handleRefresh} disabled={loading}>
            <i className="icon-rotate-cw"></i> Refresh
          </button>
          <Link to="/add-plan" className="btn btn-primary">
            + Add New Plan
          </Link>
        </div>
      </div>
      <div className="wg-box">
        <DataTable id="plansTable" className="table align-middle table-hover">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Plan Name</th>
              <th>Price</th>
              <th>Duration</th>
              <th>Plan Type</th>
              <th>Status</th>
              <th>Popular</th>
              <th>Users</th>
              <th>Features</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {plans && plans.length > 0 ? (
              plans.map((plan, idx) => (
                <tr key={plan._id}>
                  <td>{idx + 1}</td>
                  <td>{plan.name}</td>
                  <td>${plan.price}</td>
                  <td>
                    {plan.duration} {plan.durationType}
                  </td>
                  <td>{plan.planType}</td>
                  <td>
                    <span className={`badge ${plan.isActive ? "bg-success" : "bg-secondary"}`}>
                      {plan.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${plan.isPopular ? "bg-warning text-dark" : "bg-light text-dark"}`}>
                      {plan.isPopular ? "Popular" : "Regular"}
                    </span>
                  </td>
                  <td>{plan.currentUsers}</td>
                  <td>{Array.isArray(plan.features) ? plan.features.join(", ") : plan.features}</td>
                  <td>{new Date(plan.createdAt).toLocaleDateString("en-GB")}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center text-muted">
                  No plans found.
                </td>
              </tr>
            )}
          </tbody>
        </DataTable>
      </div>
    </Layout>
  )
}

export default Plans
