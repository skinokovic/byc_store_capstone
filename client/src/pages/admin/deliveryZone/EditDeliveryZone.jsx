import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeliveryZones } from "../../../redux/slice/deliveryZoneSlice"; // 🔧 adjust path
import DeliveryZoneForm from "../../../components/admin/forms/deliveryZone/DeliveryZoneForm"; // 🔧 adjust path

// Route: /admin/delivery-zones/edit/:id
// NOTE: the backend only exposes GET /api/delivery-zones (all zones) — there's
// no GET /api/delivery-zones/:id. So this page finds the zone inside the list
// already in Redux state, fetching that list first if it isn't loaded yet
// (e.g. on a hard refresh landing directly on this route).
const EditDeliveryZone = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((s) => s.deliveryZones); // 🔧 adjust slice key if different

  useEffect(() => {
    if (!list || list.length === 0) {
      dispatch(fetchDeliveryZones());
    }
  }, [dispatch, list]);

  const zone = list?.find((z) => z._id === id);

  return (
    <div className="container-fluid py-4 px-3 px-md-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Edit Delivery Zone</h4>
        <Link to="/admin/zones" className="btn btn-sm btn-outline-secondary">
          ← Back to Zones
        </Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading && !zone ? (
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : !zone ? (
        <div className="alert alert-warning">
          Couldn't find a delivery zone with that id. It may have been deleted.{" "}
          <Link to="/admin/zones">Back to zones</Link>
        </div>
      ) : (
        <div className="row">
          <div className="col-12 col-lg-6 col-xl-5">
            <DeliveryZoneForm
              editingZone={zone}
              onDone={() => navigate("/admin/zones")}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EditDeliveryZone;
