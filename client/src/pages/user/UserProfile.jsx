import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Camera } from "lucide-react";
import UserHeader from "../../components/user/dashboard/UserHeader";
import Avatar from "../../components/admin/Avatar";
import { updateProfile, uploadAvatar } from "../../redux/slice/authSlice";

function UserProfile() {
  const { user, loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({ name: "", email: "" });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({ name: user.name, email: user.email });
    }
  }, [user?.name, user?.email]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setSaved(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const result = await dispatch(updateProfile(form));
    if (updateProfile.fulfilled.match(result)) setSaved(true);
  }

  function handleAvatarClick() {
    fileInputRef.current?.click();
  }

  function handleAvatarChange(e) {
    const file = e.target.files?.[0];
    if (file) dispatch(uploadAvatar(file));
    e.target.value = "";
  }

  return (
    <div>
      <UserHeader title="Profile" subtitle="Manage your personal information" />

      <div className="ud-card" style={{ maxWidth: 480 }}>
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
        {saved && <p className="text-success small mb-3">Profile updated.</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label small">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="form-control ud-input"
            />
          </div>
          <div className="mb-3">
            <label className="form-label small">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="form-control ud-input"
            />
          </div>
          <button type="submit" disabled={loading} className="btn btn-danger">
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserProfile;
