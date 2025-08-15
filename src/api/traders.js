import { API_ENDPOINTS } from "./config"

// Get all traders
export const getAllTraders = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.TRADERS.GET_ALL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching traders:", error)
    throw error
  }
}

// Create new trader
export const createTrader = async (traderData) => {
  try {
    const payload = {
      username: traderData.username,
      email: traderData.email,
      password: traderData.password
    }
    const response = await fetch(API_ENDPOINTS.TRADERS.CREATE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error creating trader:", error)
    throw error
  }
}

// Delete trader
export const deleteTrader = async (traderId) => {
  try {
    const response = await fetch(API_ENDPOINTS.TRADERS.DELETE(traderId), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error deleting trader:", error)
    throw error
  }
}

// Update trader
export const updateTrader = async (traderId, traderData) => {
  try {
    const formData = new FormData()

    // Append text fields
    Object.keys(traderData).forEach((key) => {
      if (key !== "portfolio") {
        formData.append(key, traderData[key])
      }
    })

    // Append portfolio files if they exist
    if (traderData.portfolio && traderData.portfolio.length > 0) {
      traderData.portfolio.forEach((file) => {
        formData.append("portfolio", file)
      })
    }

    const response = await fetch(API_ENDPOINTS.TRADERS.UPDATE(traderId), {
      method: "PUT",
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error updating trader:", error)
    throw error
  }
}
