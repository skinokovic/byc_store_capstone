import Order from "../models/orderModel.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

export const getDashboard = async (req, res) => {
  try {
    // =====================================
    // Orders
    // =====================================

    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    // =====================================
    // Products
    // =====================================

    const products = await Product.find();

    // =====================================
    // Users
    // =====================================

    const customers = await User.find({ role: "user" }).sort({ createdAt: -1 });

    // =====================================
    // Revenue
    // =====================================

    const totalRevenue = orders
      .filter((order) => order.paymentStatus === "paid")
      .reduce((sum, order) => sum + order.total, 0);

    // =====================================
    // Orders
    // =====================================

    const totalOrders = orders.length;

    const pendingOrders = orders.filter(
      (order) => order.status === "pending",
    ).length;

    const processingOrders = orders.filter(
      (order) => order.status === "processing",
    ).length;

    const transitOrders = orders.filter(
      (order) => order.status === "in transit",
    ).length;

    const deliveredOrders = orders.filter(
      (order) => order.status === "delivered",
    ).length;

    const cancelledOrders = orders.filter(
      (order) => order.status === "cancelled",
    ).length;

    // =====================================
    // Products
    // =====================================

    const totalProducts = products.length;

    const lowStockProducts = products
      .filter((product) => product.stock <= 10)
      .sort((a, b) => a.stock - b.stock)
      .slice(0, 6);

    // =====================================
    // Customers
    // =====================================

    const totalCustomers = customers.length;

    const recentCustomers = customers.slice(0, 6);

    // =====================================
    // Recent Orders
    // =====================================

    const recentOrders = orders.slice(0, 8);

    // =====================================
    // Monthly Revenue
    // =====================================

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const revenueMap = {};

    monthNames.forEach((month) => {
      revenueMap[month] = 0;
    });

    orders.forEach((order) => {
      if (order.paymentStatus !== "paid") return;

      const month = monthNames[new Date(order.createdAt).getMonth()];

      revenueMap[month] += order.total;
    });

    const revenueChart = monthNames.map((month) => ({
      month,
      revenue: revenueMap[month],
    }));

    // =====================================
    // Top Products
    // =====================================

    const productMap = {};

    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (!productMap[item.product.toString()]) {
          productMap[item.product.toString()] = {
            name: item.name,

            image: item.image,

            price: item.price,

            sold: 0,

            revenue: 0,
          };
        }

        productMap[item.product.toString()].sold += item.quantity;

        productMap[item.product.toString()].revenue +=
          item.quantity * item.price;
      });
    });

    const topProducts = Object.values(productMap)
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 7);

    // =====================================

    res.json({
      revenue: totalRevenue,

      totalOrders,

      pendingOrders,

      processingOrders,

      transitOrders,

      deliveredOrders,

      cancelledOrders,

      totalProducts,

      totalCustomers,

      revenueChart,

      topProducts,

      recentOrders,

      recentCustomers,

      lowStockProducts,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
