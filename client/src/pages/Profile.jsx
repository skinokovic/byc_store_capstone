import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Camera } from "lucide-react";
import Avatar from "../components/admin/Avatar";
import { updateProfile, uploadAvatar } from "../redux/slice/authSlice";
import { toast } from "react-toastify";

function Profile() {
  const { user, loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({ name: "", email: "" });
  const [saved, setSaved] = useState(false);

  // Redirect to /login if there's no logged-in user. Runs on mount and
  // whenever `user` changes (e.g. after a logout triggered from elsewhere).
  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user) {
      setForm({ name: user.name, email: user.email });
    }
  }, [user]);

  // Nothing to render while the redirect above is taking effect
  if (!user) return null;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setSaved(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const result = await dispatch(updateProfile(form));
    if (updateProfile.fulfilled.match(result)) {
      setSaved(true);
    }
  }

  function handleAvatarClick() {
    fileInputRef.current?.click();
  }

  function handleAvatarChange(e) {
    const file = e.target.files?.[0];
    if (file) {
      dispatch(uploadAvatar(file));
    }
    e.target.value = ""; // allows re-selecting the same file later if needed
  }

  return (
    <div className="container py-5" style={{ maxWidth: 560 }}>
      <h4 className="fw-bold mb-4">My Profile</h4>

      {/* Avatar upload */}
      <div className="d-flex flex-column align-items-center mb-4">
        <div className="position-relative">
          <Avatar src={user.avatar} name={user.name} size={96} />
          <button
            type="button"
            onClick={handleAvatarClick}
            className="btn btn-danger btn-sm rounded-circle position-absolute bottom-0 end-0 d-flex align-items-center justify-content-center"
            style={{ width: 32, height: 32 }}
            aria-label="Change profile picture"
            disabled={loading}
          >
            <Camera size={14} />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleAvatarChange}
            className="d-none"
          />
        </div>
        {loading && (
          <p className="text-secondary small mt-2 mb-0">Uploading...</p>
        )}
      </div>

      {error && <p className="text-danger small text-center mb-3">{error}</p>}
      {saved && (
        <p className="text-success small text-center mb-3">Profile updated.</p>
      )}

      {/* Editable profile info */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label small">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="form-control border-danger-subtle"
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
            className="form-control border-danger-subtle"
          />
        </div>

        <div className="mb-4">
          <label className="form-label small">Role</label>
          <input value={user.role} disabled className="form-control" />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-danger w-100"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

export default Profile;
