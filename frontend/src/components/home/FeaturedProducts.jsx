import { useEffect, useState } from "react";
import ProductCard from "../products/ProductCard";
import api from "../../services/api";

const FeaturedProducts = () => {

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    try {

      const response = await api.get("/products");

      
      setProducts(response.data.slice(0, 4));
      console.log("Featured API Products:", response.data.slice(0, 4));

    } catch (error) {

      console.error("Failed to load featured products", error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (
      <section className="py-20 bg-slate-100">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-12 text-red-600">
            FEATURED PRODUCTS FROM API
          </h2>

          <div className="text-center text-xl">
            Loading Products...
          </div>

        </div>

      </section>
    );

  }

  return (

    <section className="py-20 bg-slate-100">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-12">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {products.map((product) => (

            <ProductCard
              key={product.id}
              product={product}
            />

          ))}

        </div>

      </div>

    </section>

  );

};

export default FeaturedProducts;