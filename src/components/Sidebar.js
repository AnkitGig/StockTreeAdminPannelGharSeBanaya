"use client"
import { Link } from "react-router-dom"

const Sidebar = ({ activeMenu }) => {
  // const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear()
    window.location.href = "/"
  }

  const menuItems = [
    { path: "/dashboard", icon: "icon-grid", text: "Dashboard", key: "dashboard" },
    { path: "/traders", icon: "icon-users", text: "Traders", key: "traders" },
    { path: "/user", icon: "icon-users", text: "User", key: "user" },
    { path: "/calls", icon: "icon-trending-up", text: "Calls", key: "calls" },
    { path: "/plans", icon: "icon-credit-card", text: "Plans", key: "plans" },
    { path: "/create-banner", icon: "icon-image", text: "Banners", key: "banner" },
    { path: "/notifications", icon: "icon-bell", text: "Notifications", key: "notifications" },
    { path: "/ainotifications", icon: "icon-bell", text: "Ai Notifications", key: "ainotifications" },
    // { path: "/settings", icon: "icon-settings", text: "Settings", key: "settings" },
  ]

  return (
    <div className="section-menu-left">
      <div className="box-logo">
        <Link to="/dashboard" id="site-logo-inner">
          <img className="" id="logo_header" alt="" src="/assets/images/logo/logo.png" style={{ width: "150px" }} />
        </Link>
        <div className="button-show-hide">
          <i className="icon-menu-left"></i>
        </div>
      </div>
      <div className="center">
        <div className="center-item">
          <ul className="menu-list">
            {menuItems.map((item) => (
              <li key={item.key} className={`menu-item ${activeMenu === item.key ? "active" : ""}`}>
                <Link to={item.path} className="menu-item-button">
                  <div className="icon">
                    <i className={item.icon}></i>
                  </div>
                  <div className="text">{item.text}</div>
                </Link>
              </li>
            ))}
            <li className="menu-item">
              <button
                onClick={handleLogout}
                className="menu-item-button"
                style={{ background: "none", border: "none", width: "100%", textAlign: "left" }}
              >
                <div className="icon">
                  <i className="icon-log-out"></i>
                </div>
                <div className="text">Logout</div>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
