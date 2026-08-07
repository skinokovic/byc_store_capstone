// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import AdminHeader from "../../components/admin/AdminHeader";
// import UserForm from "../../components/admin/forms/UserForm";
// import { registerApi } from "../../services/authApi";
// import { updateUserApi } from "../../services/userApi";
// import { fetchUsers } from "../../redux/slice/userSlice";

// // Deliberately calls userApi functions directly instead of dispatching
// // authSlice's register thunk. authSlice.register sets state.auth.user to
// // whoever was just registered - if used here, creating a new user would
// // overwrite the currently logged-in ADMIN's own session with the new
// // user's session, silently logging the admin out. Calling the API
// // functions directly avoids touching auth state at all.
// //
// // Two-step flow: the backend's /register endpoint never accepts a role
// // (security decision - prevents self-registration as admin). So creating
// // an admin here means: 1) register normally (always becomes 'user'),
// // then 2) immediately promote via the admin-only updateUser endpoint if
// // "Admin" was selected.
// function CreateUser() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [error, setError] = useState(null);
//   const [submitting, setSubmitting] = useState(false);

//   async function handleSubmit({ name, email, password, role }) {
//     setSubmitting(true);
//     setError(null);

//     try {
//       const newUser = await registerApi({ name, email, password });

//       if (role === "admin") {
//         await updateUserApi(newUser._id, { role: "admin" });
//       }

//       dispatch(fetchUsers()); // refresh the admin user list with the new account
//       navigate("/admin/users");
//     } catch (err) {
//       setError(err.response?.data?.message || err.message);
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   return (
//     <div>
//       <AdminHeader
//         title="Create User"
//         subtitle="Add a new user or admin account"
//       />

//       <div className="admin-card">
//         {error && <p className="text-danger small mb-3">{error}</p>}

//         <UserForm
//           onSubmit={handleSubmit}
//           submitLabel={submitting ? "Creating..." : "Create Account"}
//         />
//       </div>
//     </div>
//   );
// }

// export default CreateUser;

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AdminHeader from "../../components/admin/AdminHeader";
import UserForm from "../../components/admin/forms/UserForm";
import { registerApi } from "../../services/authApi";
import { updateUserApi } from "../../services/userApi";
import {
  fetchUsers,
  fetchUserById,
  updateUser,
  clearSelectedUser,
} from "../../redux/slice/userSlice";

// Doubles as the edit page when the URL has an :id, same pattern as
// CreateProduct.jsx/CreateCategory.jsx.
function CreateUser() {
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedUser } = useSelector((state) => state.users);

  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      dispatch(fetchUserById(id));
    }
    return () => dispatch(clearSelectedUser());
  }, [id, isEditMode, dispatch]);

  // CREATE: calls authApi/userApi directly rather than dispatching
  // authSlice.register - that thunk sets state.auth.user, which would
  // overwrite the logged-in ADMIN's own session with the new user's
  // session. See the longer note on this from when CreateUser was first
  // built.
  //
  // EDIT: safe to use userSlice's updateUser thunk directly - PUT /users/:id
  // is a completely separate admin-only endpoint from anything touching
  // auth.user, so there's no clobbering risk here.
  async function handleSubmit(formData) {
    setSubmitting(true);
    setError(null);

    try {
      if (isEditMode) {
        const result = await dispatch(
          updateUser({
            id,
            updates: {
              name: formData.name,
              email: formData.email,
              role: formData.role,
            },
          }),
        );
        if (result.error)
          throw new Error(result.payload || "Failed to update user");
      } else {
        const newUser = await registerApi({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });

        if (formData.role === "admin") {
          await updateUserApi(newUser._id, { role: "admin" });
        }

        dispatch(fetchUsers());
      }

      navigate("/admin/users");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (isEditMode && !selectedUser) {
    return (
      <div>
        <AdminHeader title="Edit User" subtitle="Loading user..." />
      </div>
    );
  }

  return (
    <div>
      <AdminHeader
        title={isEditMode ? "Edit User" : "Create User"}
        subtitle={
          isEditMode
            ? "Update this user's info"
            : "Add a new user or admin account"
        }
      />

      <div className="admin-card">
        {error && <p className="text-danger small mb-3">{error}</p>}

        <UserForm
          initialValues={isEditMode ? selectedUser : undefined}
          onSubmit={handleSubmit}
          isEditMode={isEditMode}
          submitLabel={
            submitting
              ? "Saving..."
              : isEditMode
                ? "Update User"
                : "Create Account"
          }
        />
      </div>
    </div>
  );
}

export default CreateUser;
