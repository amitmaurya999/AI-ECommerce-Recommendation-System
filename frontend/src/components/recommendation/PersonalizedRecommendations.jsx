import { useEffect, useState } from "react";
import api from "../../services/api";
import RecommendationCard from "./RecommendationCard";

const PersonalizedRecommendations = () => {

  const [products, setProducts] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {

    const fetchRecommendations = async () => {

      if (!user) return;

      try {

        const response = await api.get(
          `/personalized/${user.id}`
        );

        setProducts(response.data);

      } catch (error) {

        console.error(error);

      }

    };

    fetchRecommendations();

  }, []);

  if (products.length === 0) return null;

  return (

    <section className="py-20 bg-gray-50">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center">

          🎯 Recommended For You

        </h2>

        <p className="text-center text-gray-500 mt-4 mb-12">

          Personalized recommendations based on your activity

        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {products.map((product) => (

            <RecommendationCard
              key={product.id}
              product={product}
            />

          ))}

        </div>

      </div>

    </section>

  );

};

export default PersonalizedRecommendations;