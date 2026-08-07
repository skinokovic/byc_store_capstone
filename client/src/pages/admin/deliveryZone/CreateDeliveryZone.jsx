import { useNavigate, Link } from "react-router-dom";
import DeliveryZoneForm from "../../../components/admin/forms/deliveryZone/DeliveryZoneForm"; // 🔧 adjust path

// Route: /admin/delivery-zones/create
const CreateDeliveryZone = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid py-4 px-3 px-md-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">New Delivery Zone</h4>
        <Link to="/admin/zones" className="btn btn-sm btn-outline-secondary">
          ← Back to Zones
        </Link>
      </div>

      <div className="row">
        <div className="col-12 col-lg-6 col-xl-5">
          <DeliveryZoneForm onDone={() => navigate("/admin/delivery-zones")} />
        </div>
      </div>
    </div>
  );
};

export default CreateDeliveryZone;
