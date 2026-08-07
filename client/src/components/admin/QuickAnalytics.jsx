import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
  Package,
  CheckCircle,
} from "lucide-react";

const currency = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
});

function QuickAnalytics() {
  const { allOrders: orders = [] } = useSelector((state) => state.orders);
  const { list: users = [] } = useSelector((state) => state.users);
  const { list: products = [] } = useSelector((state) => state.products);

  const analytics = useMemo(() => {
    const paidOrders = orders.filter((order) => order.paymentStatus === "paid");

    const totalRevenue = paidOrders.reduce(
      (sum, order) => sum + order.total,
      0,
    );

    const averageOrderValue = paidOrders.length
      ? totalRevenue / paidOrders.length
      : 0;

    const totalUnitsSold = paidOrders.reduce((sum, order) => {
      return sum + order.items.reduce((qty, item) => qty + item.quantity, 0);
    }, 0);

    const lowStockProducts = products.filter(
      (product) => product.stock > 0 && product.stock <= 10,
    ).length;

    const outOfStockProducts = products.filter(
      (product) => product.stock === 0,
    ).length;

    const activeCustomers = new Set(paidOrders.map((order) => order.user?._id))
      .size;

    return {
      totalRevenue,
      averageOrderValue,
      totalUnitsSold,
      activeCustomers,
      totalCustomers: users.length,
      totalProducts: products.length,
      lowStockProducts,
      outOfStockProducts,
    };
  }, [orders, users, products]);

  const cards = [
    {
      title: "Revenue",
      value: currency.format(analytics.totalRevenue),
      icon: DollarSign,
      color: "success",
    },
    {
      title: "Average Order",
      value: currency.format(analytics.averageOrderValue),
      icon: TrendingUp,
      color: "primary",
    },
    {
      title: "Units Sold",
      value: analytics.totalUnitsSold.toLocaleString(),
      icon: ShoppingCart,
      color: "info",
    },
    {
      title: "Active Customers",
      value: analytics.activeCustomers.toLocaleString(),
      icon: Users,
      color: "secondary",
    },
    {
      title: "Products",
      value: analytics.totalProducts.toLocaleString(),
      icon: Package,
      color: "dark",
    },
    {
      title: "Low Stock",
      value: analytics.lowStockProducts.toLocaleString(),
      icon: CheckCircle,
      color: analytics.lowStockProducts > 0 ? "warning" : "success",
    },
  ];

  return (
    <div className="admin-card h-100">
      <div className="mb-4">
        <h5 className="fw-bold mb-1">Quick Analytics</h5>

        <small className="text-secondary">Business overview at a glance</small>
      </div>

      <div className="row g-3">
        {cards.map((card) => (
          <div className="col-12 col-sm-6" key={card.title}>
            <div
              className="border rounded h-100 p-3"
              style={{
                background: "#fff",
                transition: ".2s",
              }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <small className="text-secondary">{card.title}</small>

                  <h4
                    className="fw-bold mb-1"
                    style={{
                      color: "#212529",
                      fontSize: "1rem",
                      lineHeight: 1.2,
                    }}
                  >
                    {card.value}
                  </h4>
                </div>

                <div
                  className={`bg-${card.color} bg-opacity-10 rounded-circle d-flex justify-content-center align-items-center`}
                  style={{
                    width: 50,
                    height: 50,
                  }}
                >
                  <card.icon className={`text-${card.color}`} size={22} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <hr className="my-4" />

      <div className="row text-center">
        <div className="col-4">
          <h4 className="fw-bold text-success">{analytics.totalCustomers}</h4>
          <small className="text-secondary">Customers</small>
        </div>

        <div className="col-4">
          <h4 className="fw-bold text-primary">{analytics.totalProducts}</h4>
          <small className="text-secondary">Products</small>
        </div>

        <div className="col-4">
          <h4 className="fw-bold text-danger">
            {analytics.outOfStockProducts}
          </h4>
          <small className="text-secondary">Out of Stock</small>
        </div>
      </div>
    </div>
  );
}

export default QuickAnalytics;
