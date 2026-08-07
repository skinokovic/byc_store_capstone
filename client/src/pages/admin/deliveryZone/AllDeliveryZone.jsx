import DeliveryZoneTable from "../../../components/admin/tables/deliveryZone/DeliveryZoneTable"; // 🔧 adjust path

// Route: /admin/delivery-zones (or /admin/zones — whatever you land on)
const AllDeliveryZones = () => {
  return (
    <div className="container-fluid py-4 px-3 px-md-4">
      <DeliveryZoneTable />
    </div>
  );
};

export default AllDeliveryZones;
