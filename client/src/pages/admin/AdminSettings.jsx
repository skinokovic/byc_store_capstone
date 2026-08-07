// import { useState } from "react";
// import { useSelector } from "react-redux";
// import AdminHeader from "../../components/admin/AdminHeader";

// function AdminSettings() {
//   const { user } = useSelector((state) => state.auth);

//   const [profileForm, setProfileForm] = useState({
//     name: user?.name || "",
//     email: user?.email || "",
//   });
//   const [storeForm, setStoreForm] = useState({
//     storeName: "BYC Africa",
//     supportEmail: "support@bycafrica.com",
//   });

//   function handleProfileChange(e) {
//     const { name, value } = e.target;
//     setProfileForm((prev) => ({ ...prev, [name]: value }));
//   }

//   function handleStoreChange(e) {
//     const { name, value } = e.target;
//     setStoreForm((prev) => ({ ...prev, [name]: value }));
//   }

//   return (
//     <div>
//       <AdminHeader
//         title="Settings"
//         subtitle="Manage your account and store preferences"
//       />

//       <div className="row g-3">
//         <div className="col-12 col-lg-6">
//           <div className="admin-card">
//             <h6 className="fw-bold mb-3">Admin Profile</h6>
//             <form onSubmit={(e) => e.preventDefault()}>
//               <div className="mb-3">
//                 <label className="form-label small">Name</label>
//                 <input
//                   name="name"
//                   value={profileForm.name}
//                   onChange={handleProfileChange}
//                   className="form-control admin-input"
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label small">Email</label>
//                 <input
//                   name="email"
//                   type="email"
//                   value={profileForm.email}
//                   onChange={handleProfileChange}
//                   className="form-control admin-input"
//                 />
//               </div>
//               <button type="submit" className="btn btn-danger">
//                 Update Profile
//               </button>
//             </form>
//           </div>
//         </div>

//         <div className="col-12 col-lg-6">
//           <div className="admin-card">
//             <h6 className="fw-bold mb-3">Store Settings</h6>
//             <form onSubmit={(e) => e.preventDefault()}>
//               <div className="mb-3">
//                 <label className="form-label small">Store Name</label>
//                 <input
//                   name="storeName"
//                   value={storeForm.storeName}
//                   onChange={handleStoreChange}
//                   className="form-control admin-input"
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label small">Support Email</label>
//                 <input
//                   name="supportEmail"
//                   type="email"
//                   value={storeForm.supportEmail}
//                   onChange={handleStoreChange}
//                   className="form-control admin-input"
//                 />
//               </div>
//               <button type="submit" className="btn btn-danger">
//                 Save Settings
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminSettings;

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Camera } from "lucide-react";
import AdminHeader from "../../components/admin/AdminHeader";
import Avatar from "../../components/admin/Avatar";
import { updateProfile, uploadAvatar } from "../../redux/slice/authSlice";

function AdminSettings() {
  const { user, loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [profileSaved, setProfileSaved] = useState(false);

  const [storeForm, setStoreForm] = useState({
    storeName: "BYC Africa",
    supportEmail: "support@bycafrica.com",
  });

  // Keep the form in sync if `user` changes elsewhere (e.g. avatar upload
  // updating state.auth.user triggers this, but name/email fields
  // shouldn't reset on that - only sync on first load / actual user change)
  useEffect(() => {
    if (user) {
      setProfileForm({ name: user.name, email: user.email });
    }
  }, [user?.name, user?.email]);

  function handleProfileChange(e) {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
    setProfileSaved(false);
  }

  function handleStoreChange(e) {
    const { name, value } = e.target;
    setStoreForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleProfileSubmit(e) {
    e.preventDefault();
    const result = await dispatch(updateProfile(profileForm));
    if (updateProfile.fulfilled.match(result)) {
      setProfileSaved(true);
    }
  }

  function handleAvatarClick() {
    fileInputRef.current?.click();
  }

  function handleAvatarChange(e) {
    const file = e.target.files?.[0];
    console.log("PICTURE", file);

    if (file) {
      dispatch(uploadAvatar(file));
    }
    e.target.value = "";
  }

  return (
    <div>
      <AdminHeader
        title="Settings"
        subtitle="Manage your account and store preferences"
      />

      <div className="row g-3">
        <div className="col-12 col-lg-6">
          <div className="admin-card">
            <h6 className="fw-bold mb-3">Admin Profile</h6>

            {/* Avatar upload */}
            <div className="d-flex align-items-center gap-3 mb-4">
              <div className="position-relative">
                <Avatar src={user?.avatar} name={user?.name} size={72} />
                <button
                  type="button"
                  onClick={handleAvatarClick}
                  className="btn btn-danger btn-sm rounded-circle position-absolute bottom-0 end-0 d-flex align-items-center justify-content-center"
                  style={{ width: 26, height: 26 }}
                  aria-label="Change profile picture"
                  disabled={loading}
                >
                  <Camera size={12} />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleAvatarChange}
                  className="d-none"
                />
              </div>
              <div>
                <p className="fw-semibold mb-0">{user?.name}</p>
                <p className="text-secondary small mb-0">
                  {loading
                    ? "Uploading..."
                    : "Click the camera icon to change your picture"}
                </p>
              </div>
            </div>

            {error && <p className="text-danger small mb-3">{error}</p>}
            {profileSaved && (
              <p className="text-success small mb-3">Profile updated.</p>
            )}

            <form onSubmit={handleProfileSubmit}>
              <div className="mb-3">
                <label className="form-label small">Name</label>
                <input
                  name="name"
                  value={profileForm.name}
                  onChange={handleProfileChange}
                  className="form-control admin-input"
                />
              </div>
              <div className="mb-3">
                <label className="form-label small">Email</label>
                <input
                  name="email"
                  type="email"
                  value={profileForm.email}
                  onChange={handleProfileChange}
                  className="form-control admin-input"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-danger"
              >
                {loading ? "Saving..." : "Update Profile"}
              </button>
            </form>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="admin-card">
            <h6 className="fw-bold mb-3">Store Settings</h6>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-3">
                <label className="form-label small">Store Name</label>
                <input
                  name="storeName"
                  value={storeForm.storeName}
                  onChange={handleStoreChange}
                  className="form-control admin-input"
                />
              </div>
              <div className="mb-3">
                <label className="form-label small">Support Email</label>
                <input
                  name="supportEmail"
                  type="email"
                  value={storeForm.supportEmail}
                  onChange={handleStoreChange}
                  className="form-control admin-input"
                />
              </div>
              <button type="submit" className="btn btn-danger">
                Save Settings
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSettings;
