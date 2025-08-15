import Sidebar from "./Sidebar"
import Header from "./Header"
import Footer from "./Footer"
// import Preloader from "./Preloader"

const Layout = ({ children, activeMenu, onLogout }) => {
  return (
    <div id="wrapper">
      <div id="page">
        <div className="layout-wrap">
          {/* <Preloader /> */}
          <Sidebar activeMenu={activeMenu} />
          <div className="section-content-right">
            <Header onLogout={onLogout} />
            <div className="main-content">
              <div className="main-content-inner">
                <div className="main-content-wrap">{children}</div>
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
