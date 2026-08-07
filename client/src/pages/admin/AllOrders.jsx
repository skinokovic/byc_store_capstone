import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RefreshCw } from "lucide-react";
import AdminHeader from "../../components/admin/AdminHeader";
import OrdersTable from "../../components/admin/tables/OrdersTable";
import Pagination from "../../components/common/Pagination";
import usePagination from "../../components/hooks/usePagination";
import {
  fetchAllOrders,
  updateOrderStatus,
} from "../../redux/slice/orderSlice";

function AllOrders() {
  const dispatch = useDispatch();
  const { allOrders, loading } = useSelector((state) => state.orders);

  const {
    paginatedItems: paginatedOrders,
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    goToPage,
  } = usePagination(allOrders, 5);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  function handleRefresh() {
    dispatch(fetchAllOrders());
  }

  async function handleStatusChange(orderId, payload) {
    const result = await dispatch(updateOrderStatus({ id: orderId, payload }));

    if (updateOrderStatus.fulfilled.match(result)) {
      toast.success("Order updated");
    } else {
      toast.error(result.payload || "Failed to update order");
    }
  }

  return (
    <div>
      <AdminHeader
        title="All Orders"
        subtitle="Track and manage customer orders"
      />

      <div className="admin-card">
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
          <p className="text-secondary small mb-0">
            {allOrders.length} order{allOrders.length !== 1 ? "s" : ""}
          </p>

          <button
            type="button"
            className="btn btn-sm btn-outline-danger d-inline-flex align-items-center gap-2"
            onClick={handleRefresh}
            disabled={loading}
          >
            <RefreshCw size={14} className={loading ? "spin" : ""} />
            Refresh
          </button>
        </div>

        <OrdersTable
          orders={paginatedOrders}
          onStatusChange={handleStatusChange}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          totalItems={totalItems}
          pageSize={pageSize}
        />
      </div>
    </div>
  );
}

export default AllOrders;
