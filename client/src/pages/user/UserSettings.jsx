import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserHeader from "../../components/user/dashboard/UserHeader";
import { updateProfile } from "../../redux/slice/authSlice";

function UserSettings() {
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [localError, setLocalError] = useState(null);
  const [saved, setSaved] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setLocalError(null);
    setSaved(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    // updateProfileApi/updateUserProfile already accepts an optional
    // password field and re-hashes it via the User model's pre('save') hook
    const result = await dispatch(updateProfile({ password: form.password }));
    if (updateProfile.fulfilled.match(result)) {
      setSaved(true);
      setForm({ password: "", confirmPassword: "" });
    }
  }

  return (
    <div>
      <UserHeader title="Settings" subtitle="Manage your account security" />

      <div className="ud-card" style={{ maxWidth: 480 }}>
        <h6 className="fw-bold mb-3">Change Password</h6>

        {(error || localError) && (
          <p className="text-danger small mb-3">{localError || error}</p>
        )}
        {saved && <p className="text-success small mb-3">Password updated.</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label small">New Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              minLength={6}
              required
              className="form-control ud-input"
            />
          </div>
          <div className="mb-3">
            <label className="form-label small">Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              minLength={6}
              required
              className="form-control ud-input"
            />
          </div>
          <button type="submit" disabled={loading} className="btn btn-danger">
            {loading ? "Saving..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserSettings;
