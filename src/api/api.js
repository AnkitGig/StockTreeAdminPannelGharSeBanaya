import Swal from "sweetalert2"

import API_BASE_URL from "./config"
const STATIC_CREATED_BY = "6826ebc6f0163a4c3c9d4f3c"

export const createSignal = async (formData) => {
  try {
    // Show loading alert
    Swal.fire({
      title: "Creating Signal...",
      text: "Please wait while we create your signal",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      },
    })

    // Build payload to match exactly what works in Postman
    const apiData = {
      segment: formData.segment,
      instrument: formData.instrument,
      script: formData.script,
      strike: formData.strike ? Number(formData.strike) : undefined,
      expiry: formData.expiry,
      positionStatus: formData.positionStatus,
      callType: formData.callType,
      entryRangeFrom: formData.entryRangeFrom ? Number(formData.entryRangeFrom) : undefined,
      entryRangeTo: formData.entryRangeTo ? Number(formData.entryRangeTo) : undefined,
      stopLossFrom: formData.stopLossFrom ? Number(formData.stopLossFrom) : undefined,
      stopLossTo: formData.stopLossTo ? Number(formData.stopLossTo) : undefined,
      target1: formData.target1 ? Number(formData.target1) : undefined,
      target2: formData.target2 ? Number(formData.target2) : undefined,
      target3: formData.target3 ? Number(formData.target3) : undefined,
      subscriptionType: formData.subscriptionType || "all",
      createdBy: formData.createdBy || STATIC_CREATED_BY,
      customTitle: formData.customTitle,
      customMessage: formData.customMessage,
    }
    // Remove undefined, null, or empty string fields
    Object.keys(apiData).forEach(key => {
      if (
        apiData[key] === undefined ||
        apiData[key] === null ||
        apiData[key] === ""
      ) {
        delete apiData[key]
      }
    })

    // Debug: log payload to compare with Postman
    console.log("Payload sent to API:", apiData)

    const token = localStorage.getItem("adminToken")
    const response = await fetch(`${API_BASE_URL}/signals/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { "x-api-key": token } : {}),
      },
      body: JSON.stringify(apiData),
    })

    const result = await response.json()
    if (!response.ok || result.success === false) {
      // Show backend error message if available
      throw new Error(result.message || `HTTP error! status: ${response.status}`)
    }

    // Show success alert
    await Swal.fire({
      icon: "success",
      title: "Signal Created Successfully!",
      html: `
        <div style="text-align: left;">
          <p><strong>Signal ID:</strong> ${result.signalId || "-"}</p>
          <p><strong>Success Count:</strong> ${result.successCount || "-"}</p>
          <p><strong>Total Users:</strong> ${result.totalUsers || "-"}</p>
          <p><strong>Message:</strong> ${result.message || "-"}</p>
        </div>
      `,
      confirmButtonText: "Continue",
    })

    return result
  } catch (error) {
    // Show the payload and error in the console for debugging
    console.error("Error creating signal:", error)
    await Swal.fire({
      icon: "error",
      title: "Error Creating Signal",
      text: error.message || "Failed to create signal",
      confirmButtonText: "Try Again",
    })
    throw error
  }
}






export const getSignals = async (page = 1, limit = 100) => {
  try {
    const response = await fetch(`${API_BASE_URL}/signals?page=${page}&limit=${limit}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    return result
  } catch (error) {
    console.error("Error fetching signals:", error)
    await Swal.fire({
      icon: "error",
      title: "Error Fetching Signals",
      text: error.message || "Failed to fetch signals",
      confirmButtonText: "OK",
    })
    throw error
  }
}

export const deleteSignal = async (signalId) => {
  try {
    // Show confirmation dialog
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    })

    if (!result.isConfirmed) {
      return false
    }

    // Show loading
    Swal.fire({
      title: "Deleting...",
      text: "Please wait while we delete the signal",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      },
    })

    const response = await fetch(`${API_BASE_URL}/signals/${signalId}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // Show success message
    await Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: "Signal has been deleted successfully.",
      timer: 2000,
      showConfirmButton: false,
    })

    return true
  } catch (error) {
    console.error("Error deleting signal:", error)
    await Swal.fire({
      icon: "error",
      title: "Error Deleting Signal",
      text: error.message || "Failed to delete signal",
      confirmButtonText: "OK",
    })
    throw error
  }
}


// export const createPlan = async (formData) => {
//   try {
//     // Show loading alert
//     Swal.fire({
//       title: "Creating Plan...",
//       text: "Please wait while we create your plan",
//       allowOutsideClick: false,
//       didOpen: () => {
//         Swal.showLoading()
//       },
//     })

//     // Convert features string to array
//     const featuresArray = formData.features
//       .split("\n")
//       .map((feature) => feature.trim())
//       .filter((feature) => feature.length > 0)

//     // Map form data to API structure
//     const apiData = {
//       name: formData.name,
//       price: Number.parseInt(formData.price),
//       duration: Number.parseInt(formData.duration),
//       durationType: formData.durationType,
//       planType: formData.planType,
//       features: featuresArray,
//       description: formData.description,
//       isPopular: formData.isPopular,
//     }

//     const response = await fetch(`${API_BASE_URL}/plans`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(apiData),
//     })

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`)
//     }

//     const result = await response.json()

//     // Show success alert
//     await Swal.fire({
//       icon: "success",
//       title: "Plan Created Successfully!",
//       html: `
//         <div style="text-align: left;">
//           <p><strong>Plan Name:</strong> ${result.plan?.name || formData.name}</p>
//           <p><strong>Price:</strong> $${formData.price}</p>
//           <p><strong>Duration:</strong> ${formData.duration} ${formData.durationType}</p>
//           <p><strong>Type:</strong> ${formData.planType}</p>
//         </div>
//       `,
//       confirmButtonText: "Continue",
//     })

//     return result
//   } catch (error) {
//     console.error("Error creating plan:", error)

//     // Show error alert
//     await Swal.fire({
//       icon: "error",
//       title: "Error Creating Plan",
//       text: error.message || "Failed to create plan",
//       confirmButtonText: "Try Again",
//     })

//     throw error
//   }
// }


const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODViODk2ZmJkZjI2NzhkNjI5MjAxMzIiLCJpYXQiOjE3NTA4Mjk0NjAsImV4cCI6MTc4MjM2NTQ2MH0.7BWcKNorFq4yMngEb-FySzP0Vw3BZslqvLVFFfKm1fw"

export const getPlans = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/plans`, {
      method: "GET",
      headers: {
        "x-api-key": API_KEY,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    return result
  } catch (error) {
    console.error("Error fetching plans:", error)
    await Swal.fire({
      icon: "error",
      title: "Error Fetching Plans",
      text: error.message || "Failed to fetch plans",
      confirmButtonText: "OK",
    })
    throw error
  }
}

export const createPlan = async (formData) => {
  try {
    // Show loading alert
    Swal.fire({
      title: "Creating Plan...",
      text: "Please wait while we create your plan",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      },
    })

    // Convert features string to array
    const featuresArray = formData.features
      .split("\n")
      .map((feature) => feature.trim())
      .filter((feature) => feature.length > 0)

    // Map form data to API structure
    const apiData = {
      name: formData.name,
      price: Number.parseInt(formData.price),
      duration: Number.parseInt(formData.duration),
      durationType: formData.durationType,
      planType: formData.planType,
      features: featuresArray,
      description: formData.description,
      isPopular: formData.isPopular,
    }

    const response = await fetch(`${API_BASE_URL}/plans`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiData),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()

    // Show success alert
    await Swal.fire({
      icon: "success",
      title: "Plan Created Successfully!",
      html: `
        <div style="text-align: left;">
          <p><strong>Plan Name:</strong> ${formData.name}</p>
          <p><strong>Price:</strong> $${formData.price}</p>
          <p><strong>Duration:</strong> ${formData.duration} ${formData.durationType}</p>
          <p><strong>Type:</strong> ${formData.planType}</p>
        </div>
      `,
      confirmButtonText: "Continue",
    })

    return result
  } catch (error) {
    console.error("Error creating plan:", error)

    // Show error alert
    await Swal.fire({
      icon: "error",
      title: "Error Creating Plan",
      text: error.message || "Failed to create plan",
      confirmButtonText: "Try Again",
    })

    throw error
  }
}