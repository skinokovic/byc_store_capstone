import { useMemo } from "react";
import { useSelector } from "react-redux";
import "./QuickAnalytics.css";
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
    <div className="admin-card h-100 quick-analytics-card">
      {/* =========================
          HEADER
      ========================== */}
      <div className="mb-4">
        <h5 className="fw-bold mb-1">Quick Analytics</h5>

        <small className="text-secondary">Business overview at a glance</small>
      </div>

      {/* =========================
          ANALYTIC CARDS
      ========================== */}
      <div className="row g-3">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div className="col-12 col-sm-6" key={card.title}>
              <div className="quick-analytics-item">
                {/* Text */}
                <div className="quick-analytics-content">
                  <small className="text-secondary">{card.title}</small>

                  <h4 className="quick-analytics-value">{card.value}</h4>
                </div>

                {/* Icon */}
                <div
                  className={`quick-analytics-icon bg-${card.color} bg-opacity-10`}
                >
                  <Icon className={`text-${card.color}`} size={21} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* =========================
          ADDITIONAL STATISTICS
      ========================== */}
      <hr className="my-4" />

      <div className="quick-analytics-bottom">
        <div className="quick-bottom-stat">
          <h4 className="fw-bold text-success mb-0">
            {analytics.totalCustomers}
          </h4>

          <small className="text-secondary">Customers</small>
        </div>

        <div className="quick-bottom-stat">
          <h4 className="fw-bold text-primary mb-0">
            {analytics.totalProducts}
          </h4>

          <small className="text-secondary">Products</small>
        </div>

        <div className="quick-bottom-stat">
          <h4 className="fw-bold text-danger mb-0">
            {analytics.outOfStockProducts}
          </h4>

          <small className="text-secondary">Out of Stock</small>
        </div>
      </div>
    </div>
  );
}

export default QuickAnalytics;
