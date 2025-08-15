import Swal from "sweetalert2"

import API_BASE_URL from "./config"

export const sendNotification = async (payload) => {
  try {
    Swal.fire({
      title: "Sending Notification...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    })
    const token = localStorage.getItem("adminToken")
    const response = await fetch(`${API_BASE_URL}/notifications/send-notification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { "x-api-key": token } : {}),
      },
      body: JSON.stringify(payload),
    })
    const result = await response.json()
    if (!response.ok || result.success === false) {
      throw new Error(result.message || `HTTP error! status: ${response.status}`)
    }
    // Do not show any SweetAlert here, let the page handle it
    return result
  } catch (error) {
    console.error("Error sending notification:", error)
    await Swal.fire({
      icon: "error",
      title: "Error Sending Notification",
      text: error.message || "Failed to send notification",
      confirmButtonText: "Try Again",
    })
    throw error
  }
}

export const getAllNotifications = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/notifications/notifications`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const result = await response.json()
    return result.notifications || []
  } catch (error) {
    console.error("Error fetching notifications:", error)
    await Swal.fire({
      icon: "error",
      title: "Error Fetching Notifications",
      text: error.message || "Failed to fetch notifications",
      confirmButtonText: "OK",
    })
    throw error
  }
}

export const getNotificationById = async (notificationId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/notifications/notifications/${notificationId}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const result = await response.json()
    return result.notification
  } catch (error) {
    console.error("Error fetching notification by ID:", error)
    await Swal.fire({
      icon: "error",
      title: "Error Fetching Notification",
      text: error.message || "Failed to fetch notification",
      confirmButtonText: "OK",
    })
    throw error
  }
}
