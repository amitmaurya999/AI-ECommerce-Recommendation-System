import { useEffect, useState } from "react";
import api from "../../services/api";

const TopProducts = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {

    try {

      const res = await api.get("/admin/top-products");

      setProducts(res.data);

    } catch (err) {

      console.error(err);

    }

  };

  return (

    <div className="bg-white rounded-xl shadow-md p-6 mt-10">

      <h2 className="text-2xl font-bold mb-6">

        🏆 Top Selling Products

      </h2>

      <div className="space-y-5">

        {products.map((product) => (

          <div
            key={product.id}
            className="flex items-center justify-between border-b pb-4"
          >

            <div className="flex items-center gap-4">

              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 rounded-lg object-cover"
              />

              <div>

                <h3 className="font-bold">
                  {product.name}
                </h3>

                <p className="text-gray-500">

                  Sold {product.quantity} Items

                </p>

              </div>

            </div>

            <span className="text-blue-600 font-bold">

              {product.sales} Orders

            </span>

          </div>

        ))}

      </div>

    </div>

  );

};

export default TopProducts;