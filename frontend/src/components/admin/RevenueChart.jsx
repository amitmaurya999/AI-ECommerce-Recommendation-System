import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const RevenueChart = () => {

  const data = [
    { month: "Jan", revenue: 120000 },
    { month: "Feb", revenue: 180000 },
    { month: "Mar", revenue: 260000 },
    { month: "Apr", revenue: 350000 },
    { month: "May", revenue: 470000 },
    { month: "Jun", revenue: 600000 },
    { month: "Jul", revenue: 720000 },
    { month: "Aug", revenue: 850000 },
    { month: "Sep", revenue: 1000986 },
  ];

  return (

    <div className="bg-white rounded-xl shadow-md p-6 mt-10">

      <h2 className="text-2xl font-bold mb-6">
        Revenue Growth
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#2563eb"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  );

};

export default RevenueChart;