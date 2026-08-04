import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const AnalyticsChart = ({ stats }) => {

  const data = [
    {
      name: "Users",
      value: stats.users,
    },
    {
      name: "Products",
      value: stats.products,
    },
    {
      name: "Orders",
      value: stats.orders,
    },
    {
      name: "Views",
      value: stats.views,
    },
    {
      name: "Wishlist",
      value: stats.wishlist,
    },
    {
      name: "Cart",
      value: stats.cart,
    },
    {
      name: "Purchase",
      value: stats.purchase,
    },
  ];

  return (

    <div className="bg-white rounded-xl shadow-md p-6 mt-10">

      <h2 className="text-2xl font-bold mb-6">
        User Activity Analytics
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="value"
            fill="#2563eb"
            radius={[8,8,0,0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

};

export default AnalyticsChart;