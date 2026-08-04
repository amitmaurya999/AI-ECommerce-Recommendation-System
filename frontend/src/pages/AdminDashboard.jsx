import { useEffect, useState } from "react";
import api from "../services/api";
import RevenueChart from "../components/admin/RevenueChart";
import CategoryPieChart from "../components/admin/CategoryPieChart";
import RecentOrders from "../components/admin/RecentOrders";
import TopProducts from "../components/admin/TopProducts";

import {
  ShoppingBag,
  Users,
  PackageCheck,
  IndianRupee,
  Eye,
  Heart,
  ShoppingCart,
  BadgeCheck,
} from "lucide-react";

import AnalyticsChart from "../components/admin/AnalyticsChart";

const AdminDashboard = () => {

  const [stats, setStats] = useState({
    products: 0,
    users: 0,
    orders: 0,
    revenue: 0,
    views: 0,
    cart: 0,
    wishlist: 0,
    purchase: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {

    try {

      const res = await api.get("/admin/dashboard");

      setStats(res.data);

    } catch (err) {

      console.error(err);

    }

  };

  const cards = [

    {
      title: "Products",
      value: stats.products,
      icon: <ShoppingBag size={32} />,
      color: "bg-blue-100 text-blue-600",
    },

    {
      title: "Users",
      value: stats.users,
      icon: <Users size={32} />,
      color: "bg-green-100 text-green-600",
    },

    {
      title: "Orders",
      value: stats.orders,
      icon: <PackageCheck size={32} />,
      color: "bg-yellow-100 text-yellow-600",
    },

    {
      title: "Revenue",
      value: `₹${stats.revenue.toLocaleString("en-IN")}`,
      icon: <IndianRupee size={32} />,
      color: "bg-red-100 text-red-600",
    },

    {
      title: "Views",
      value: stats.views,
      icon: <Eye size={32} />,
      color: "bg-cyan-100 text-cyan-600",
    },

    {
      title: "Wishlist",
      value: stats.wishlist,
      icon: <Heart size={32} />,
      color: "bg-pink-100 text-pink-600",
    },

    {
      title: "Cart",
      value: stats.cart,
      icon: <ShoppingCart size={32} />,
      color: "bg-orange-100 text-orange-600",
    },

    {
      title: "Purchases",
      value: stats.purchase,
      icon: <BadgeCheck size={32} />,
      color: "bg-purple-100 text-purple-600",
    },

  ];

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <div className="mb-10">

        <h1 className="text-4xl font-bold">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          AI Powered E-Commerce Analytics
        </p>

      </div>
      

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {cards.map((card, index) => (

          <div
            key={index}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-6"
          >

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">
                  {card.title}
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {card.value}
                </h2>

              </div>

              <div
                className={`${card.color} p-4 rounded-full`}
              >
                {card.icon}
              </div>

            </div>

          </div>

        ))}

      </div >


      <div className="mt-10 space-y-10">

        <AnalyticsChart stats={stats} />

        <RevenueChart />

        <CategoryPieChart />

        <RecentOrders />

        <TopProducts />

      </div>

    </div>

  );

};

export default AdminDashboard;