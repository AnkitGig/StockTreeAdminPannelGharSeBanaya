import Layout from "../components/Layout"

const Settings = () => {
  return (
    <Layout activeMenu="settings">
      <div className="flex items-center flex-wrap justify-between gap20 mb-27">
        <h3>Settings</h3>
      </div>

      <div className="wg-box">
        <div className="p-4">
          <h5>Settings Page</h5>
          <p>Settings functionality will be implemented here.</p>
        </div>
      </div>
    </Layout>
  )
}

export default Settings
