// import { Trash2, ShieldCheck, ShieldOff } from "lucide-react";
// import UserAvatar from "../UserAvatar";

// function UsersTable({ users, onToggleActive, onDelete, currentUserId }) {
//   if (users.length === 0) {
//     return <p className="text-secondary">No users yet.</p>;
//   }

//   return (
//     <>
//       {/* Table - md and up */}
//       <div className="table-responsive d-none d-md-block">
//         <table className="table admin-table-lg align-middle mb-0">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Role</th>
//               <th>Status</th>
//               <th className="text-end">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user._id}>
//                 <td>
//                   <div className="d-flex align-items-center gap-2">
//                     <UserAvatar name={user.name} size={32} />
//                     <span>{user.name}</span>
//                   </div>
//                 </td>
//                 <td>{user.email}</td>
//                 <td>
//                   <span
//                     className={`badge ${user.role === "admin" ? "text-bg-danger" : "text-bg-secondary"}`}
//                   >
//                     {user.role}
//                   </span>
//                 </td>
//                 <td>
//                   <span
//                     className={`badge ${user.isActive ? "text-bg-success" : "text-bg-secondary"}`}
//                   >
//                     {user.isActive ? "Active" : "Deactivated"}
//                   </span>
//                 </td>
//                 <td>
//                   <div className="d-flex justify-content-end gap-2">
//                     <button
//                       type="button"
//                       onClick={() => onToggleActive(user._id, !user.isActive)}
//                       className="admin-icon-btn-sm"
//                       aria-label={
//                         user.isActive ? "Deactivate user" : "Activate user"
//                       }
//                       title={user.isActive ? "Deactivate" : "Activate"}
//                     >
//                       {user.isActive ? (
//                         <ShieldOff size={14} />
//                       ) : (
//                         <ShieldCheck size={14} />
//                       )}
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => onDelete(user._id)}
//                       disabled={user._id === currentUserId}
//                       title={
//                         user._id === currentUserId
//                           ? "You cannot delete your own account"
//                           : "Delete"
//                       }
//                       className="admin-icon-btn-sm admin-icon-btn-danger"
//                       aria-label="Delete user"
//                     >
//                       <Trash2 size={14} />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Cards - below md */}
//       <div className="d-md-none d-flex flex-column gap-3">
//         {users.map((user) => (
//           <div className="admin-row-card" key={user._id}>
//             <div className="d-flex gap-3 align-items-center">
//               <UserAvatar name={user.name} size={44} />
//               <div className="flex-grow-1 min-w-0">
//                 <p className="fw-semibold mb-0 text-truncate">{user.name}</p>
//                 <p className="text-secondary small mb-0 text-truncate">
//                   {user.email}
//                 </p>
//               </div>
//             </div>

//             <div className="d-flex gap-2 mt-3">
//               <span
//                 className={`badge ${user.role === "admin" ? "text-bg-danger" : "text-bg-secondary"}`}
//               >
//                 {user.role}
//               </span>
//               <span
//                 className={`badge ${user.isActive ? "text-bg-success" : "text-bg-secondary"}`}
//               >
//                 {user.isActive ? "Active" : "Deactivated"}
//               </span>
//             </div>

//             <div className="d-flex justify-content-end gap-2 mt-3 pt-3 border-top admin-row-card-border">
//               <button
//                 type="button"
//                 onClick={() => onToggleActive(user._id, !user.isActive)}
//                 className="admin-icon-btn-sm"
//                 aria-label={user.isActive ? "Deactivate user" : "Activate user"}
//               >
//                 {user.isActive ? (
//                   <ShieldOff size={14} />
//                 ) : (
//                   <ShieldCheck size={14} />
//                 )}
//               </button>
//               <button
//                 type="button"
//                 onClick={() => onDelete(user._id)}
//                 disabled={user._id === currentUserId}
//                 className="admin-icon-btn-sm admin-icon-btn-danger"
//                 aria-label="Delete user"
//               >
//                 <Trash2 size={14} />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }

// export default UsersTable;

import { Link } from "react-router-dom";
import { Pencil, Trash2, ShieldCheck, ShieldOff } from "lucide-react";
import Avatar from "../Avatar";

function UsersTable({ users, onToggleActive, onDelete, currentUserId }) {
  if (users.length === 0) {
    return <p className="text-secondary">No users yet.</p>;
  }

  return (
    <>
      {/* Table - md and up */}
      <div className="table-responsive d-none d-md-block">
        <table className="table admin-table-lg align-middle mb-0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <Avatar src={user.avatar} name={user.name} size={32} />
                    <span>{user.name}</span>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  <span
                    className={`badge ${user.role === "admin" ? "text-bg-danger" : "text-bg-secondary"}`}
                  >
                    {user.role}
                  </span>
                </td>
                <td>
                  <span
                    className={`badge ${user.isActive ? "text-bg-success" : "text-bg-secondary"}`}
                  >
                    {user.isActive ? "Active" : "Deactivated"}
                  </span>
                </td>
                <td>
                  <div className="d-flex justify-content-end gap-2">
                    <Link
                      to={`/admin/users/edit/${user._id}`}
                      className="admin-icon-btn-sm"
                      aria-label="Edit user"
                    >
                      <Pencil size={14} />
                    </Link>
                    <button
                      type="button"
                      onClick={() => onToggleActive(user._id, !user.isActive)}
                      className="admin-icon-btn-sm"
                      aria-label={
                        user.isActive ? "Deactivate user" : "Activate user"
                      }
                      title={user.isActive ? "Deactivate" : "Activate"}
                    >
                      {user.isActive ? (
                        <ShieldOff size={14} />
                      ) : (
                        <ShieldCheck size={14} />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(user._id)}
                      disabled={user._id === currentUserId}
                      title={
                        user._id === currentUserId
                          ? "You cannot delete your own account"
                          : "Delete"
                      }
                      className="admin-icon-btn-sm admin-icon-btn-danger"
                      aria-label="Delete user"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards - below md */}
      <div className="d-md-none d-flex flex-column gap-3">
        {users.map((user) => (
          <div className="admin-row-card" key={user._id}>
            <div className="d-flex gap-3 align-items-center">
              <Avatar src={user.avatar} name={user.name} size={44} />
              <div className="flex-grow-1 min-w-0">
                <p className="fw-semibold mb-0 text-truncate">{user.name}</p>
                <p className="text-secondary small mb-0 text-truncate">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="d-flex gap-2 mt-3">
              <span
                className={`badge ${user.role === "admin" ? "text-bg-danger" : "text-bg-secondary"}`}
              >
                {user.role}
              </span>
              <span
                className={`badge ${user.isActive ? "text-bg-success" : "text-bg-secondary"}`}
              >
                {user.isActive ? "Active" : "Deactivated"}
              </span>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-3 pt-3 border-top admin-row-card-border">
              <Link
                to={`/admin/users/edit/${user._id}`}
                className="admin-icon-btn-sm"
                aria-label="Edit user"
              >
                <Pencil size={14} />
              </Link>
              <button
                type="button"
                onClick={() => onToggleActive(user._id, !user.isActive)}
                className="admin-icon-btn-sm"
                aria-label={user.isActive ? "Deactivate user" : "Activate user"}
              >
                {user.isActive ? (
                  <ShieldOff size={14} />
                ) : (
                  <ShieldCheck size={14} />
                )}
              </button>
              <button
                type="button"
                onClick={() => onDelete(user._id)}
                disabled={user._id === currentUserId}
                className="admin-icon-btn-sm admin-icon-btn-danger"
                aria-label="Delete user"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default UsersTable;
