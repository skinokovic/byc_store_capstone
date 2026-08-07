import { Mail, Phone, MessageCircle } from "lucide-react";
import AdminHeader from "../../components/admin/AdminHeader";

function AdminSupport() {
  return (
    <div>
      <AdminHeader
        title="Support"
        subtitle="Get help or contact the platform team"
      />

      <div className="row g-3">
        <div className="col-12 col-md-4">
          <div className="admin-card h-100">
            <Mail size={20} className="text-danger mb-2" />
            <h6 className="fw-bold mb-1">Email Support</h6>
            <p className="text-secondary small mb-0">support@bycafrica.com</p>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="admin-card h-100">
            <Phone size={20} className="text-danger mb-2" />
            <h6 className="fw-bold mb-1">Phone Support</h6>
            <p className="text-secondary small mb-0">+234 810 137 5376</p>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="admin-card h-100">
            <MessageCircle size={20} className="text-danger mb-2" />
            <h6 className="fw-bold mb-1">Live Chat</h6>
            <p className="text-secondary small mb-0">
              Available Mon–Fri, 9am–5pm
            </p>
          </div>
        </div>
      </div>

      <div className="admin-card mt-3">
        <h6 className="fw-bold mb-3">Send a message</h6>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-3">
            <label className="form-label small">Subject</label>
            <input className="form-control admin-input" required />
          </div>
          <div className="mb-3">
            <label className="form-label small">Message</label>
            <textarea className="form-control admin-input" rows={4} required />
          </div>
          <button type="submit" className="btn btn-danger">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminSupport;
