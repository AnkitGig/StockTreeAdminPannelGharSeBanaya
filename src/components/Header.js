import { Link } from "react-router-dom"

const Header = ({ onLogout }) => {
  // const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear()
    if (onLogout) onLogout()
    window.location.href = "/"
  }

  return (
    <div className="header-dashboard">
      <div className="wrap">
        <div className="header-left">
          <Link to="/dashboard">
            <img
              className=""
              id="logo_header_mobile"
              alt=""
              src="/assets/images/logo/logo.png"
              style={{ width: "150px" }}
            />
          </Link>
          <div className="button-show-hide">
            <i className="icon-menu-left"></i>
          </div>
        </div>
        <div className="header-grid">
          <div className="popup-wrap user type-header">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton3"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="header-user wg-user">
                  <span className="image">
                    <img src="/assets/images/avatar/user-1.png" alt="" />
                  </span>
                  <span className="flex flex-column">
                    <span className="body-title mb-2">Kristin Watson</span>
                    <span className="text-tiny">Admin</span>
                  </span>
                </span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end has-content" aria-labelledby="dropdownMenuButton3">
                <li>
                  <Link to="/profile" className="user-item" style={{ display: 'flex', alignItems: 'center', width: '100%', textDecoration: 'none', color: 'inherit' }}>
                    <div className="icon">
                      <i className="icon-user"></i>
                    </div>
                    <div className="body-title-2">Profile</div>
                  </Link>
                </li>
                <li>
                  <button className="user-item" onClick={handleLogout} style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left' }}>
                    <div className="icon">
                      <i className="icon-log-out"></i>
                    </div>
                    <div className="body-title-2">Log out</div>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
