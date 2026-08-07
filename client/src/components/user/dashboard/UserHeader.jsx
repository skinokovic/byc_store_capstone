import { useSelector } from "react-redux";
import Avatar from "../../admin/Avatar";

function UserHeader({ title, subtitle }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="d-flex justify-content-between align-items-center gap-3 mb-4">
      <div>
        <h3 className="fw-bold mb-0">{title}</h3>
        <p className="text-secondary small mb-0">{subtitle}</p>
      </div>
      <Avatar src={user?.avatar} name={user?.name} size={44} />
    </div>
  );
}

export default UserHeader;
