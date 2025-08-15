"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createPlan } from "../api/api"
import Swal from "sweetalert2"
import Layout from "../components/Layout"

const AddPlan = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    duration: "1",
    durationType: "months",
    planType: "Basic",
    features: "",
    description: "",
    isPopular: false,
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createPlan(formData)
      navigate("/plans")
    } catch (err) {
      // Error handled in API
    }
  }

  const handleReset = () => {
    setFormData({
      name: "",
      price: "",
      duration: "1",
      durationType: "months",
      planType: "Basic",
      features: "",
      description: "",
      isPopular: false,
    })
  }

  return (
    <Layout activeMenu="plans">
      <div className="flex items-center flex-wrap justify-between gap20 mb-27">
        <h3>Add Plan</h3>
      </div>
      <div className="wg-box">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="form-group mb-20 col-md-6">
              <label htmlFor="name">
                Plan Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Enter plan name (e.g., Gold Plan)"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group mb-20 col-md-6">
              <label htmlFor="price">
                Price ($) <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                placeholder="Enter price (e.g., 1599)"
                value={formData.price}
                onChange={handleInputChange}
                min="0"
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group mb-20 col-md-6">
              <label htmlFor="duration">
                Duration <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                className="form-control"
                id="duration"
                name="duration"
                placeholder="Enter duration (e.g., 1, 3, 12)"
                value={formData.duration}
                onChange={handleInputChange}
                min="1"
                required
              />
            </div>
            <div className="form-group mb-20 col-md-6">
              <label htmlFor="durationType">
                Duration Type <span className="text-danger">*</span>
              </label>
              <select
                className="form-control"
                id="durationType"
                name="durationType"
                value={formData.durationType}
                onChange={handleInputChange}
                required
              >
                <option value="months">Months</option>
                <option value="years">Years</option>
                <option value="days">Days</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="form-group mb-20 col-md-6">
              <label htmlFor="planType">
                Plan Type <span className="text-danger">*</span>
              </label>
              <select
                className="form-control"
                id="planType"
                name="planType"
                value={formData.planType}
                onChange={handleInputChange}
                required
              >
                <option value="Basic">Basic</option>
                <option value="Premium">Premium</option>
                <option value="VIP">VIP</option>
              </select>
            </div>
            <div className="form-group mb-20 col-md-6">
              <label className="form-label">Popular Plan</label>
              <div className="form-check" style={{ marginTop: "8px" }}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="isPopular"
                  name="isPopular"
                  checked={formData.isPopular}
                  onChange={handleInputChange}
                />
                <label className="form-check-label" htmlFor="isPopular">
                  Mark this plan as popular
                </label>
              </div>
            </div>
          </div>
          <div className="form-group mb-20">
            <label htmlFor="features">
              Plan Features <span className="text-danger">*</span>
            </label>
            <textarea
              className="form-control"
              id="features"
              name="features"
              rows="5"
              placeholder="Enter each feature on a new line..."
              value={formData.features}
              onChange={handleInputChange}
              required
            ></textarea>
            <small className="form-text text-muted">
              Enter each feature on a separate line
            </small>
          </div>
          <div className="form-group mb-20">
            <label htmlFor="description">
              Description <span className="text-danger">*</span>
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows="3"
              placeholder="Enter plan description (e.g., Best for power users)"
              value={formData.description}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <div className="form-group mb-20">
            <button type="submit" className="btn btn-primary">
              Add Plan
            </button>
            <button
              type="button"
              className="btn btn-secondary ml-2"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default AddPlan
