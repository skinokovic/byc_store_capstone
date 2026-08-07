// import { useState } from "react";

// const emptyUser = { name: "", email: "", password: "", role: "user" };

// function UserForm({ onSubmit, submitLabel = "Create Account" }) {
//   const [form, setForm] = useState(emptyUser);

//   function handleChange(e) {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   }

//   function handleSubmit(e) {
//     e.preventDefault();
//     onSubmit(form);
//   }

//   return (
//     <form onSubmit={handleSubmit} className="admin-form">
//       <div className="row g-3">
//         <div className="col-12 col-md-6">
//           <label className="form-label small">Full Name</label>
//           <input
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             required
//             className="form-control admin-input"
//           />
//         </div>

//         <div className="col-12 col-md-6">
//           <label className="form-label small">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={form.email}
//             onChange={handleChange}
//             required
//             className="form-control admin-input"
//           />
//         </div>

//         <div className="col-12 col-md-6">
//           <label className="form-label small">Password</label>
//           <input
//             type="password"
//             name="password"
//             value={form.password}
//             onChange={handleChange}
//             minLength={6}
//             required
//             className="form-control admin-input"
//           />
//         </div>

//         <div className="col-12 col-md-6">
//           <label className="form-label small">Role</label>
//           <select
//             name="role"
//             value={form.role}
//             onChange={handleChange}
//             className="form-select admin-input"
//           >
//             <option value="user">User</option>
//             <option value="admin">Admin</option>
//           </select>
//         </div>
//       </div>

//       <button type="submit" className="btn btn-danger mt-4">
//         {submitLabel}
//       </button>
//     </form>
//   );
// }

// export default UserForm;

import { useEffect, useState } from "react";

const emptyUser = { name: "", email: "", password: "", role: "user" };

// isEditMode hides the password field entirely - editing an existing user's
// info here never touches their password (that's a separate concern, not
// something an admin should casually overwrite from a generic edit form).
function UserForm({
  initialValues,
  onSubmit,
  submitLabel = "Create Account",
  isEditMode = false,
}) {
  const [form, setForm] = useState({ ...emptyUser, ...initialValues });

  useEffect(() => {
    if (initialValues) {
      setForm((prev) => ({ ...prev, ...initialValues }));
    }
  }, [initialValues]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <div className="row g-3">
        <div className="col-12 col-md-6">
          <label className="form-label small">Full Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="form-control admin-input"
          />
        </div>

        <div className="col-12 col-md-6">
          <label className="form-label small">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="form-control admin-input"
          />
        </div>

        {!isEditMode && (
          <div className="col-12 col-md-6">
            <label className="form-label small">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              minLength={6}
              required
              className="form-control admin-input"
            />
          </div>
        )}

        <div className="col-12 col-md-6">
          <label className="form-label small">Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="form-select admin-input"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      <button type="submit" className="btn btn-danger mt-4">
        {submitLabel}
      </button>
    </form>
  );
}

export default UserForm;
