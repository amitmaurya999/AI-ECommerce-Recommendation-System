import { useEffect, useState } from "react";
import { PackageCheck } from "lucide-react";
import { getOrders } from "../services/orderApi";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await getOrders(user.id);
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <PackageCheck size={80} className="text-gray-400 mb-4" />

        <h1 className="text-3xl font-bold text-gray-700">
          No Orders Yet
        </h1>

        <p className="text-gray-500 mt-2">
          Place your first order to see it here.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pt-24 pb-10">

      <h1 className="text-4xl font-bold mb-8">
        My Orders
      </h1>

      <div className="space-y-6">

        {orders.map((order) => (

          <div
            key={order.id}
            className="bg-white rounded-xl shadow-md p-5 flex flex-col md:flex-row gap-6 hover:shadow-lg transition"
          >

            <img
              src={order.product.image}
              alt={order.product.name}
              className="w-40 h-40 rounded-lg object-cover"
              onError={(e) => {
                e.target.src =
                  "https://placehold.co/300x300?text=No+Image";
              }}
            />

            <div className="flex-1">

              <h2 className="text-2xl font-bold">
                {order.product.name}
              </h2>

              <p className="text-gray-500 mt-1">
                {order.product.category}
              </p>

              <div className="mt-4 space-y-2">

                <p>
                  <span className="font-semibold">
                    Quantity :
                  </span>{" "}
                  {order.quantity}
                </p>

                <p>
                  <span className="font-semibold">
                    Price :
                  </span>{" "}
                  ${order.product.price}
                </p>

                <p>
                  <span className="font-semibold">
                    Total :
                  </span>{" "}
                  ${order.total_price}
                </p>

              </div>

            </div>

            <div className="flex flex-col justify-between items-end">

              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold
                  ${
                    order.status === "Placed"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "Shipped"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}
              >
                {order.status}
              </span>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Orders;