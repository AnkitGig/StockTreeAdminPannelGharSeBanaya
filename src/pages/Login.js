"use client"

import { useState } from "react"
import { loginAdmin } from "../api/login"

const Login = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    const res = await loginAdmin(formData.username, formData.password)
    setLoading(false)
    if (res.status === "true" || res.status === true) {
      localStorage.setItem("adminToken", res.token)
      localStorage.setItem("adminId", res.adminId)
      setIsAuthenticated && setIsAuthenticated(true)
      // Optionally redirect here
    } else {
      setError(res.message || "Login failed")
    }
  }

  return (
    <div id="wrapper">
      <div id="page">
        <div className="wrap-login-page">
          <div className="flex-grow flex flex-column justify-center gap30">
            <div className="login-box">
              <center>
                <img className="" alt="" src="/assets/images/logo/logo.png" style={{ width: "200px" }} />
              </center>
              <div className="text-center">
                <h3>Login to account</h3>
                <div className="body-text">Enter your username & password to login</div>
              </div>
              <form className="form-login flex flex-column gap24" onSubmit={handleSubmit}>
                <fieldset className="email">
                  <div className="body-title mb-10">
                    Username <span className="tf-color-1">*</span>
                  </div>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter your username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </fieldset>
                <fieldset className="password">
                  <div className="body-title mb-10">
                    Password <span className="tf-color-1">*</span>
                  </div>
                  <input
                    className="form-control"
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </fieldset>
                {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
                <button className="btn-primary btn w-full" style={{ height: "50px" }} type="submit" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
