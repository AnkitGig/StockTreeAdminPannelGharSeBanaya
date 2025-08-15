"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Layout from "../components/Layout"
import { createTrader } from "../api/traders"
import { showSuccessAlert, showErrorAlert, showLoadingAlert, closeAlert } from "../utils/sweetAlert"

const AddTraders = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleFileChange = (e) => {
    // Removed file upload logic
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (isSubmitting) return

    try {
      setIsSubmitting(true)
      showLoadingAlert("Creating trader...")
      const traderData = {
        username: formData.username,
        email: formData.email,
        password: formData.password
      }
      const response = await createTrader(traderData)
      closeAlert()
      if (response.status === "success") {
        showSuccessAlert("Success!", "Trader created successfully!")
        setTimeout(() => {
          navigate("/traders")
        }, 1500)
      } else {
        showErrorAlert("Error", response.message || "Failed to create trader")
      }
    } catch (error) {
      closeAlert()
      showErrorAlert("Error", "Failed to create trader. Please try again.")
      console.error("Error creating trader:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    navigate("/traders")
  }

  return (
    <Layout activeMenu="traders">
      <div className="flex items-center flex-wrap justify-between gap20 mb-27">
        <h3>Add New Trader</h3>
      </div>
      <div className="wg-box">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6 mb-20">
              <label htmlFor="username" className="form-label">
                Username <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-control"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Enter username"
              />
            </div>
            <div className="col-lg-6 mb-20">
              <label htmlFor="email" className="form-label">
                Email <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter email"
              />
            </div>
            <div className="col-lg-6 mb-20">
              <label htmlFor="password" className="form-label">
                Password <span className="text-danger">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter password"
              />
            </div>
            <div className="col-lg-12 mb-20">
              <button type="submit" className="btn btn-primary me-2" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Creating...
                  </>
                ) : (
                  "Create Trader"
                )}
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default AddTraders
