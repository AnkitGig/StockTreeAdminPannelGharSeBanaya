"use client"

import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import { getAllBanners, createBanner } from "../api/banners"
import { showSuccessAlert, showErrorAlert, showLoadingAlert, closeAlert } from "../utils/sweetAlert"

const BannerPage = () => {
  const [banners, setBanners] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    link: "",
    image: null,
    status: "active"
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchBanners()
  }, [])

  const fetchBanners = async () => {
    setLoading(true)
    const res = await getAllBanners()
    if (res.status && Array.isArray(res.data)) {
      setBanners(res.data)
    } else {
      setBanners([])
      showErrorAlert("Error", res.error || "Failed to fetch banners")
    }
    setLoading(false)
  }

  const handleInputChange = (e) => {
    const { name, value, files } = e.target
    if (name === "image") {
      setForm((prev) => ({ ...prev, image: files[0] }))
    } else {
      setForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    showLoadingAlert("Creating banner...")
    const formData = new FormData()
    formData.append("title", form.title)
    formData.append("subtitle", form.subtitle)
    formData.append("link", form.link)
    formData.append("status", form.status)
    if (form.image) formData.append("image", form.image)
    const res = await createBanner(formData)
    closeAlert()
    if (res.status) {
      showSuccessAlert("Success", "Banner created successfully!")
      setForm({ title: "", subtitle: "", link: "", image: null, status: "active" })
      fetchBanners()
    } else {
      showErrorAlert("Error", res.error || res.message || "Failed to create banner")
    }
    setSubmitting(false)
  }

  return (
    <Layout activeMenu="banners">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
        <h4 className="mb-0 fw-bold">Banners ({banners.length})</h4>
      </div>
      <div className="wg-box mb-4 p-4">
        <h5 className="mb-3">Create New Banner</h5>
        <form className="row g-3" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="col-md-4">
            <input type="text" className="form-control" name="title" placeholder="Title" value={form.title} onChange={handleInputChange} required />
          </div>
          <div className="col-md-4">
            <input type="text" className="form-control" name="subtitle" placeholder="Subtitle" value={form.subtitle} onChange={handleInputChange} required />
          </div>
          <div className="col-md-4">
            <input type="text" className="form-control" name="link" placeholder="Link" value={form.link} onChange={handleInputChange} required />
          </div>
          <div className="col-md-4">
            <input type="file" className="form-control" name="image" accept="image/*" onChange={handleInputChange} required />
          </div>
          <div className="col-md-4">
            <select className="form-control" name="status" value={form.status} onChange={handleInputChange} required>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="col-md-4 d-flex align-items-end">
            <button className="btn btn-primary w-100" type="submit" disabled={submitting}>{submitting ? "Creating..." : "Create Banner"}</button>
          </div>
        </form>
      </div>
      <div className="wg-box p-0" style={{ overflowX: "auto" }}>
        <table className="table align-middle table-hover mb-0">
          <thead className="table-light">
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Subtitle</th>
              <th>Status</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="text-center text-muted">Loading...</td></tr>
            ) : banners.length === 0 ? (
              <tr><td colSpan={5} className="text-center text-muted">No banners found.</td></tr>
            ) : (
              banners.map((banner) => (
                <tr key={banner._id}>
                  <td>
                    <img src={banner.image} alt={banner.title} style={{ width: 80, height: 40, objectFit: "cover", borderRadius: 4 }} />
                  </td>
                  <td>{banner.title}</td>
                  <td>{banner.subtitle}</td>
                  <td><span className={`badge ${banner.status === 'active' ? 'bg-success' : 'bg-secondary'}`}>{banner.status}</span></td>
                  <td>{new Date(banner.createdAt).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}

export default BannerPage
