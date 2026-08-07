import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Plus } from "lucide-react";
import AdminHeader from "../../components/admin/AdminHeader";
import UsersTable from "../../components/admin/tables/UsersTable";
import {
  fetchUsers,
  updateUser,
  deleteUser,
} from "../../redux/slice/userSlice";

function AllUsers() {
  const dispatch = useDispatch();
  const { list: users, loading, error } = useSelector((state) => state.users);
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  function handleToggleActive(id, isActive) {
    dispatch(updateUser({ id, updates: { isActive } }));
  }

  function handleDelete(id) {
    if (window.confirm("Delete this user? This cannot be undone.")) {
      dispatch(deleteUser(id));
    }
  }

  return (
    <div>
      <AdminHeader
        title="All Users"
        subtitle="Manage customer and admin accounts"
      />

      <div className="admin-card">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <p className="text-secondary small mb-0">
            {users.length} user{users.length !== 1 ? "s" : ""}
          </p>
          <Link
            to="/admin/users/create"
            className="btn btn-danger btn-sm d-flex align-items-center gap-1"
          >
            <Plus size={14} />
            Create User
          </Link>
        </div>

        {loading && <p className="text-secondary">Loading users...</p>}
        {error && <p className="text-danger">{error}</p>}
        {!loading && !error && (
          <UsersTable
            users={users}
            onToggleActive={handleToggleActive}
            onDelete={handleDelete}
            currentUserId={currentUser?._id}
          />
        )}
      </div>
    </div>
  );
}

export default AllUsers;
