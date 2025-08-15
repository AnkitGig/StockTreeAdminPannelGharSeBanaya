"use client"

import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import { getAllUsers } from "../api/user"
import { searchUser } from "../api/userSearch"
import { showErrorAlert, showLoadingAlert, closeAlert } from "../utils/sweetAlert"

const defaultAvatar = "/assets/images/avatar/default-avatar.png"

const User = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [searching, setSearching] = useState(false)
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" })

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    if (!search.trim()) {
      fetchUsers()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  const fetchUsers = async () => {
    try {
      showLoadingAlert("Loading users...")
      setLoading(true)
      const res = await getAllUsers()
      closeAlert()
      if (res && res.data && Array.isArray(res.data)) {
        setUsers(res.data)
      } else {
        setUsers([])
        showErrorAlert("Error", res.error || "Failed to fetch users data")
      }
    } catch (error) {
      closeAlert()
      setUsers([])
      showErrorAlert("Error", "Failed to fetch users data")
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!search.trim()) return
    setSearching(true)
    showLoadingAlert("Searching user...")
    const res = await searchUser(search.trim())
    closeAlert()
    if (res && res.data && Array.isArray(res.data)) {
      setUsers(res.data)
    } else {
      setUsers([])
      showErrorAlert("Error", res.error || "No user found")
    }
    setSearching(false)
  }

  const handleSort = (key) => {
    let direction = "asc"
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  const sortedUsers = [...users].sort((a, b) => {
    if (!sortConfig.key) return 0
    let valA = a[sortConfig.key]
    let valB = b[sortConfig.key]
    if (typeof valA === "string") valA = valA.toLowerCase()
    if (typeof valB === "string") valB = valB.toLowerCase()
    if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1
    if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1
    return 0
  })

  const getKycBadge = (kyc) => (
    <span className={`badge ${kyc ? "bg-success" : "bg-danger"}`}>
      {kyc ? "Verified" : "Not Verified"}
    </span>
  )

  return (
    <Layout activeMenu="users">
      <div className="d-flex justify-content-between align-items-center mb-20">
        <h4 className="mb-0">Users List ({users.length})</h4>
        <form className="d-flex" onSubmit={handleSearch} style={{ gap: 8 }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search by phone, email, or name"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ minWidth: 220 }}
            disabled={searching}
          />
          <button className="btn btn-primary" type="submit" disabled={searching || !search.trim()}>
            {searching ? "Searching..." : "Search"}
          </button>
        </form>
      </div>
      <div className="wg-box">
        <table id="usersTable" className="table align-middle table-hover">
          <thead>
            <tr>
              <th>Image</th>
              <th className="sortable" onClick={() => handleSort("fullName")}>{sortConfig.key === "fullName" ? (sortConfig.direction === "asc" ? <span style={{color:'#007bff'}}>▲</span> : <span style={{color:'#007bff'}}>▼</span>) : <span style={{opacity:0.3,marginRight:4}}>⇅</span>} Full Name</th>
              <th className="sortable" onClick={() => handleSort("email")}>{sortConfig.key === "email" ? (sortConfig.direction === "asc" ? <span style={{color:'#007bff'}}>▲</span> : <span style={{color:'#007bff'}}>▼</span>) : <span style={{opacity:0.3,marginRight:4}}>⇅</span>} Email</th>
              <th className="sortable" onClick={() => handleSort("kycStatus")}>{sortConfig.key === "kycStatus" ? (sortConfig.direction === "asc" ? <span style={{color:'#007bff'}}>▲</span> : <span style={{color:'#007bff'}}>▼</span>) : <span style={{opacity:0.3,marginRight:4}}>⇅</span>} KYC Status</th>
              <th className="sortable" onClick={() => handleSort("membershipTier")}>{sortConfig.key === "membershipTier" ? (sortConfig.direction === "asc" ? <span style={{color:'#007bff'}}>▲</span> : <span style={{color:'#007bff'}}>▼</span>) : <span style={{opacity:0.3,marginRight:4}}>⇅</span>} Plan</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center text-muted">
                  Loading...
                </td>
              </tr>
            ) : sortedUsers.length > 0 ? (
              sortedUsers.map((user) => {
                // Fix for missing fields and relative image paths
                const imgSrc = user.profileImage && user.profileImage.trim() !== ''
                  ? (user.profileImage.startsWith('http') ? user.profileImage : `${window.location.origin}/${user.profileImage.replace(/\\/g, '/')}`)
                  : defaultAvatar
                return (
                  <tr key={user._id}>
                    <td>
                      <img
                        src={imgSrc}
                        alt={user.fullName || user.username || 'User'}
                        className="rounded-circle"
                        style={{ width: "40px", height: "40px", objectFit: "cover" }}
                        onError={(e) => {
                          if (e.target.src !== window.location.origin + defaultAvatar) {
                            e.target.onerror = null
                            e.target.src = defaultAvatar
                          }
                        }}
                      />
                    </td>
                    <td className="fw-bold">{user.fullName || user.username || '-'}</td>
                    <td>{user.email || user.phone || '-'}</td>
                    <td>{getKycBadge(user.kycStatus)}</td>
                    <td>
                      <span className="badge bg-info text-dark">{user.membershipTier || '-'}</span>
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan={5} className="text-center text-muted">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}

export default User