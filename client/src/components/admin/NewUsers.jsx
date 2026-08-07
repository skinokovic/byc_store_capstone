import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowRight, Calendar, Mail, ShoppingBag } from "lucide-react";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../../redux/slice/userSlice";
import { fetchAllOrders } from "../../redux/slice/orderSlice";

function NewUsers() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list: users = [] } = useSelector((state) => state.users);
  const { allOrders: orders = [] } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchUsers);
    dispatch(fetchAllOrders);
  }, [dispatch]);

  const orderCounts = useMemo(() => {
    const counts = {};

    orders.forEach((order) => {
      const userId =
        typeof order.user === "object" ? order.user._id : order.user;

      counts[userId] = (counts[userId] || 0) + 1;
    });

    return counts;
  }, [orders]);
  const newestUsers = useMemo(() => {
    return [...users]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 6);
  }, [users]);

  return (
    <div className="admin-card h-100">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h5 className="fw-bold mb-0">Newly Registered Users</h5>

          <small className="text-secondary">
            Latest customer registrations
          </small>
        </div>

        <button
          className="btn btn-sm btn-outline-danger"
          onClick={() => navigate("/admin/users")}
        >
          View All
        </button>
      </div>

      {newestUsers.length === 0 ? (
        <div className="text-center py-5 text-secondary">
          No registered users
        </div>
      ) : (
        <div className="row g-3">
          {newestUsers.map((user) => (
            <div className="col-12 col-md-6" key={user._id}>
              {/* <div className="col-12 col-sm-6 col-xl-4" key={user._id}> */}

              <div
                className="border rounded-4 bg-white shadow-sm p-3 h-100"
                style={{
                  transition: ".25s",
                }}
              >
                {/* Top */}

                <div className="d-flex justify-content-between align-items-start">
                  <div className="d-flex align-items-center gap-3">
                    {user.avatar?.url ? (
                      <img
                        src={user.avatar.url}
                        alt={user.name}
                        width={52}
                        height={52}
                        className="rounded-circle"
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <div
                        className="rounded-circle bg-danger text-white d-flex align-items-center justify-content-center fw-bold"
                        style={{
                          width: 40,
                          height: 40,
                          fontSize: 16,
                        }}
                      >
                        {(user.name || "U").charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <span
                    className={`badge ${
                      user.isActive ? "bg-success" : "bg-secondary"
                    }`}
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                <hr className="my-3" />

                <div className="d-flex justify-content-between mb-2">
                  <span className="text-secondary small"> Name</span>

                  <p
                    className="fw-light "
                    style={{
                      color: "#212529",
                      fontSize: "1rem",
                      lineHeight: 1.2,
                    }}
                  >
                    {user.name || "--"}
                  </p>
                </div>

                <div className="small text-secondary d-flex align-items-center gap-2">
                  <Mail size={14} />
                  <span>{user.email}</span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span className="text-secondary small d-flex align-items-center gap-1">
                    <ShoppingBag size={14} />
                    Orders
                  </span>

                  <span className="badge bg-danger">
                    {orderCounts[user._id] || 0}
                  </span>
                </div>

                <div className="d-flex justify-content-between">
                  <span className="text-secondary small">Role</span>

                  <span
                    className={`badge ${
                      user.role === "admin" ? "bg-primary" : "bg-dark"
                    }`}
                  >
                    {user.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {newestUsers.length > 0 && (
        <div className="text-center mt-4">
          <button
            className="btn btn-danger"
            onClick={() => navigate("/admin/users")}
          >
            View All Users
            <ArrowRight size={18} className="ms-2" />
          </button>
        </div>
      )}
    </div>
  );
}

export default NewUsers;
