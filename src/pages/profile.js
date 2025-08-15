import { useState } from "react"
import Layout from "../components/Layout"
// import { updateProfile } from "../api/profile" // API function for future use

const mockProfile = {
  name: "Vinod Kumar",
  email: "vinod.kumar@stocktree.com",
  role: "Super Admin",
  phone: "+91-9876543210",
  avatar: "/assets/images/avatar/user-1.png",
  joined: "2024-01-15",
  status: "Active",
}

const Profile = () => {
  const [profile, setProfile] = useState({ ...mockProfile })
  const [editing, setEditing] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState(profile.avatar)

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile({ ...profile, [name]: value })
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result)
        setProfile({ ...profile, avatar: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleEdit = () => setEditing(true)
  const handleCancel = () => {
    setEditing(false)
    setProfile({ ...mockProfile })
    setAvatarPreview(mockProfile.avatar)
  }
  const handleSave = async () => {
    setEditing(false)
    // await updateProfile(profile) // API call for future
  }

  return (
    <Layout activeMenu="profile">
      <div className="profile-page wg-box">
        <div className="row align-items-center mb-4">
          <div className="col-md-2 text-center">
            <img src={avatarPreview} alt="Avatar" className="rounded-circle" style={{ width: 100, height: 100, objectFit: "cover" }} />
            {editing && (
              <input type="file" accept="image/*" className="form-control mt-2" onChange={handleAvatarChange} />
            )}
          </div>
          <div className="col-md-10">
            {editing ? (
              <>
                <input name="name" className="form-control mb-2" value={profile.name} onChange={handleChange} />
                <input name="email" className="form-control mb-2" value={profile.email} onChange={handleChange} />
                <input name="role" className="form-control mb-2" value={profile.role} onChange={handleChange} />
                <input name="phone" className="form-control mb-2" value={profile.phone} onChange={handleChange} />
                <span className="badge bg-success">{profile.status}</span>
                <div className="mt-2">Joined: <b>{profile.joined}</b></div>
              </>
            ) : (
              <>
                <h3>{profile.name}</h3>
                <span className="badge bg-success">{profile.status}</span>
                <div className="mt-2">Role: <b>{profile.role}</b></div>
                <div>Email: <b>{profile.email}</b></div>
                <div>Phone: <b>{profile.phone}</b></div>
                <div>Joined: <b>{profile.joined}</b></div>
              </>
            )}
            <div className="mt-3">
              {editing ? (
                <>
                  <button className="btn btn-primary mr-2" onClick={handleSave}>Save</button>
                  <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                </>
              ) : (
                <button className="btn btn-outline-primary" onClick={handleEdit}>Edit Profile</button>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h5>About</h5>
            {editing ? (
              <textarea name="about" className="form-control" value={profile.about || "Vinod is the super admin of StockTree, responsible for managing users, traders, plans, and notifications. He has full access to all admin features and oversees platform operations."} onChange={handleChange} />
            ) : (
              <p>{profile.about || "Vinod is the super admin of StockTree, responsible for managing users, traders, plans, and notifications. He has full access to all admin features and oversees platform operations."}</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile
