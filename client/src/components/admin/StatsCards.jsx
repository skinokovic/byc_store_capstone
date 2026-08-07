import {
  DollarSign,
  ShoppingBag,
  Users,
  Package,
  Truck,
  CheckCircle,
} from "lucide-react";

import { useSelector } from "react-redux";

const currency = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

function StatsCards() {
  const {
    revenue,
    totalOrders,
    totalCustomers,
    totalProducts,
    pendingOrders,
    deliveredOrders,
  } = useSelector((state) => state.dashboard);

  const cards = [
    {
      title: "Revenue",
      value: currency.format(revenue),
      subtitle: "Paid orders only",
      icon: DollarSign,
      color: "#198754",
      bg: "#eaf8f1",
    },
    {
      title: "Orders",
      value: totalOrders,
      subtitle: "Total orders",
      icon: ShoppingBag,
      color: "#dc3545",
      bg: "#fdebec",
    },
    {
      title: "Customers",
      value: totalCustomers,
      subtitle: "Registered users",
      icon: Users,
      color: "#0d6efd",
      bg: "#edf4ff",
    },
    {
      title: "Products",
      value: totalProducts,
      subtitle: "Products in store",
      icon: Package,
      color: "#fd7e14",
      bg: "#fff3e8",
    },
    {
      title: "Pending",
      value: pendingOrders,
      subtitle: "Awaiting processing",
      icon: Truck,
      color: "#ffc107",
      bg: "#fff9e5",
    },
    {
      title: "Delivered",
      value: deliveredOrders,
      subtitle: "Completed deliveries",
      icon: CheckCircle,
      color: "#20c997",
      bg: "#e8faf5",
    },
  ];

  return (
    <div className="row g-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="col-xl-2 col-lg-4 col-md-6 col-sm-6 col-12"
          >
            <div className="dashboard-stat-card">
              <div className="dashboard-stat-top">
                <div
                  className="dashboard-stat-icon p-2"
                  style={{
                    background: card.bg,
                    color: card.color,
                  }}
                >
                  <Icon size={24} />
                </div>
              </div>

              <h4 className="dashboard-stat-value">{card.value}</h4>

              <h6 className="dashboard-stat-title">{card.title}</h6>

              <small className="dashboard-stat-subtitle">{card.subtitle}</small>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default StatsCards;
