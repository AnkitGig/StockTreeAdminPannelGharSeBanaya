"use client"

import { useState } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Traders from "./pages/Traders"
import AddTraders from "./pages/AddTraders"
import Plans from "./pages/Plans"
import AddPlan from "./pages/AddPlan"
import Notifications from "./pages/Notifications"
import Settings from "./pages/Settings"
import Calls from "./pages/Calls"
import User from "./pages/User"
import BannerPage from "./pages/Banners"
import AddCall from "./pages/AddCall"
import AiNotification from "./pages/AiNotification"
import Profile from "./pages/profile"


function App() {
  // Initialize isAuthenticated from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem("adminToken"));

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="/traders" element={isAuthenticated ? <Traders /> : <Navigate to="/" />} />
          <Route path="/user" element={isAuthenticated ? <User /> : <Navigate to="/" />} />
          <Route path="/add-traders" element={isAuthenticated ? <AddTraders /> : <Navigate to="/" />} />
          <Route path="/create-banner" element={isAuthenticated ? <BannerPage /> : <Navigate to="/" />} />
          <Route path="/plans" element={isAuthenticated ? <Plans /> : <Navigate to="/" />} />
          <Route path="/add-plan" element={isAuthenticated ? <AddPlan /> : <Navigate to="/" />} />
          <Route path="/notifications" element={isAuthenticated ? <Notifications /> : <Navigate to="/" />} />
          <Route path="/ainotifications" element={isAuthenticated ? <AiNotification /> : <Navigate to="/" />} />
          <Route path="/settings" element={isAuthenticated ? <Settings /> : <Navigate to="/" />} />
          <Route path="/calls" element={isAuthenticated ? <Calls /> : <Navigate to="/" />} />
          <Route path="/add-calls" element={<AddCall />} />
          <Route path="/profile" element={<Profile />} />

        </Routes>
      </div>
    </Router>
  )
}

export default App
