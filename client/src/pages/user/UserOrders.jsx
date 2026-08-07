import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RefreshCw } from "lucide-react";
import { toast } from "react-toastify";
import UserHeader from "../../components/user/dashboard/UserHeader";
import UserOrdersTable from "../../components/user/dashboard/tables/UserOrdersTable";
import { fetchMyOrders, cancelOrder } from "../../redux/slice/orderSlice";
import Pagination from "../../components/common/Pagination";
import usePagination from "../../components/hooks/usePagination";

function UserOrders() {
  const dispatch = useDispatch();
  const { myOrders, loading } = useSelector((state) => state.orders);

  const {
    paginatedItems: paginatedOrders,
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    goToPage,
  } = usePagination(myOrders, 5);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  function handleRefresh() {
    dispatch(fetchMyOrders());
  }

  async function handleCancel(orderId) {
    if (!window.confirm("Cancel this order? This cannot be undone.")) return;

    const result = await dispatch(cancelOrder(orderId));

    if (cancelOrder.fulfilled.match(result)) {
      toast.success("Order cancelled");
    } else {
      toast.error(result.payload || "Failed to cancel order");
    }
  }

  return (
    <div>
      <UserHeader title="My Orders" subtitle="Track your order history" />
      <div className="ud-card">
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
          <p className="text-secondary small mb-0">
            {myOrders.length} order{myOrders.length !== 1 ? "s" : ""}
          </p>

          <button
            type="button"
            className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center gap-2"
            onClick={handleRefresh}
            disabled={loading}
          >
            <RefreshCw size={14} className={loading ? "spin" : ""} />
            Refresh
          </button>
        </div>

        <UserOrdersTable orders={paginatedOrders} onCancel={handleCancel} />
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

export default UserOrders;
