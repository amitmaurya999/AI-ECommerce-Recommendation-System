import { useEffect, useState } from "react";
import RecommendationCard from "./RecommendationCard";
import api from "../../services/api";

const RecommendationList = () => {
  const [topRated, setTopRated] = useState([]);
  const [trending, setTrending] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const topRatedResponse = await api.get(
          "/recommendations/top-rated"
        );

        const trendingResponse = await api.get(
          "/recommendations/trending"
        );

        setTopRated(topRatedResponse.data);
        setTrending(trendingResponse.data);
      } catch (err) {
        console.error("Failed to load recommendations:", err);
        setError("Unable to load AI Recommendations");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-blue-600">
          🤖 Loading AI Recommendations...
        </h2>

        <p className="text-gray-500 mt-3">
          Please wait while we fetch the best products.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-red-600">
          {error}
        </h2>
      </div>
    );
  }
  if (
    topRated.length === 0 &&
    trending.length === 0
  ) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold">
          No Recommendations Available
        </h2>

        <p className="text-gray-500 mt-3">
          Try adding more products to the database.
        </p>
      </div>
    );
  }

  return (
    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center">
          ⭐ Top Rated Products
        </h2>

        <p className="text-center text-gray-500 mt-4 mb-12">
          Highest-rated products selected for you
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">

          {topRated.map((product) => (

            <RecommendationCard
              key={product.id}
              product={product}
            />

          ))}

        </div>

        <h2 className="text-4xl font-bold text-center">
          🔥 Trending Products
        </h2>

        <p className="text-center text-gray-500 mt-4 mb-12">
          Most popular products right now
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {trending.map((product) => (

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

export default RecommendationList;