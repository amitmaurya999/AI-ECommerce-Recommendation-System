import { useEffect, useState } from "react";
import api from "../../services/api";

const RecentOrders = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/admin/orders");
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (

    <div className="bg-white rounded-xl shadow-md p-6 mt-10">

      <h2 className="text-2xl font-bold mb-6">
        Recent Orders
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">Order ID</th>

              <th className="p-4 text-left">User ID</th>

              <th className="p-4 text-left">Product ID</th>

              <th className="p-4 text-left">Quantity</th>

              <th className="p-4 text-left">Amount</th>

              <th className="p-4 text-left">Status</th>

            </tr>

          </thead>

          <tbody>

            {orders.slice(0,10).map((order) => (

              <tr
                key={order.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4">
                  #{order.id}
                </td>

                <td className="p-4">
                  {order.user_id}
                </td>

                <td className="p-4">
                  {order.product_id}
                </td>

                <td className="p-4">
                  {order.quantity}
                </td>

                <td className="p-4 font-semibold text-blue-600">
                  ₹{order.total_price.toLocaleString("en-IN")}
                </td>

                <td className="p-4">

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

                    {order.status}

                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default RecentOrders;