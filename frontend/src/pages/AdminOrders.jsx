import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

const AdminOrders = () => {
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
      toast.error("Unable to load orders");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/admin/orders/${id}`, {
        status,
      });

      toast.success("Order Updated");

      fetchOrders();
    } catch (err) {
      console.error(err);
      toast.error("Update Failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        Admin Orders
      </h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Product</th>
              <th className="p-4">Quantity</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>

          </thead>

          <tbody>

            {orders.map((order) => (

              <tr
                key={order.id}
                className="border-b text-center"
              >

                <td className="p-4">
                  #{order.id}
                </td>

                <td className="p-4">
                  {order.product?.name}
                </td>

                <td className="p-4">
                  {order.quantity}
                </td>

                <td className="p-4">
                  ₹{order.total_price}
                </td>

                <td className="p-4">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    {order.status}
                  </span>
                </td>

                <td className="p-4">

                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(order.id, e.target.value)
                    }
                    className="border rounded px-3 py-2"
                  >

                    <option>Placed</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>

                  </select>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default AdminOrders;