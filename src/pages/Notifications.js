import { useState, useEffect } from "react"
import Layout from "../components/Layout"
import { sendNotification as sendNotificationApi, getAllNotifications, getNotificationById } from "../api/notification"
import Swal from "sweetalert2"

const Notifications = () => {
  const [form, setForm] = useState({ type: "normal", title: "", body: "" })
  const [loading, setLoading] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    setLoading(true)
    try {
      const data = await getAllNotifications()
      setNotifications(data.filter(n => n.type === "normal"))
    } catch {}
    setLoading(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSend = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      // Call API but do NOT show any SweetAlert here
      await sendNotificationApi(form)
      setForm({ type: "normal", title: "", body: "" })
      // Only show one custom notification
      Swal.fire({
        icon: "success",
        title: "Notification Sent!",
        text: "Notification sent successfully.",
        confirmButtonText: "OK",
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: true,
        timer: 1800,
        timerProgressBar: true,
        didOpen: () => {
          const swalContainer = document.querySelector('.swal2-container')
          if (swalContainer) swalContainer.style.zIndex = 20000
        }
      })
      fetchNotifications()
    } catch {}
    setLoading(false)
  }

  const handleSelect = async (id) => {
    setLoading(true)
    try {
      const detail = await getNotificationById(id)
      setSelected(detail)
      Swal.fire({
        title: detail.title,
        html: `<div><b>Type:</b> ${detail.type}<br/><b>Body:</b> ${detail.body}<br/><b>Sent At:</b> ${new Date(detail.sentAt).toLocaleString()}</div>`,
        confirmButtonText: "Close",
      })
    } catch {}
    setLoading(false)
  }

  return (
    <Layout activeMenu="notifications">
      <div className="flex items-center flex-wrap justify-between gap20 mb-27">
        <h3>Notifications</h3>
      </div>
      <div className="wg-box mb-4">
        <form onSubmit={handleSend} className="row g-3">
          {/* <div className="col-md-2">
            <select name="type" className="form-control" value={form.type} onChange={handleChange}>
              <option value="normal">Normal</option>
              <option value="ai">AI</option>
            </select>
          </div> */}
          <div className="col-md-4">
            <input name="title" className="form-control" placeholder="Title" value={form.title} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <input name="body" className="form-control" placeholder="Body" value={form.body} onChange={handleChange} required />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>Send</button>
          </div>
        </form>
      </div>
      <div className="wg-box">
        {loading ? <div>Loading...</div> : null}
        <div className="notification-list">
          {notifications.length === 0 && !loading ? <div>No notifications found.</div> : null}
          {notifications.map((n) => (
            <div key={n._id} className="notification-box" style={{ cursor: "pointer" }} onClick={() => handleSelect(n._id)}>
              <i className={`icon icon-bell`}></i>
              <div className="notification-content">
                <p className="notification-title">{n.title}</p>
                <div className="notification-time">{new Date(n.sentAt).toLocaleString()}</div>
                <div className="notification-type"><span className={`badge bg-primary`}>{n.type}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Notifications
