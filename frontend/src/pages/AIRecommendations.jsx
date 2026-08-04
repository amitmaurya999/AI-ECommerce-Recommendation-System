import { useEffect, useState } from "react";
import api from "../services/api";

import RecommendationCard from "../components/recommendation/RecommendationCard";

const AIRecommendations = () => {
  const [personalized, setPersonalized] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [trending, setTrending] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const requests = [
        api.get("/recommendations/top-rated"),
        api.get("/recommendations/trending"),
      ];

      if (user) {
        requests.unshift(
          api.get(`/personalized/${user.id}`)
        );
      }

      const responses = await Promise.all(requests);

      if (user) {
        setPersonalized(responses[0].data);
        setTopRated(responses[1].data);
        setTrending(responses[2].data);
      } else {
        setTopRated(responses[0].data);
        setTrending(responses[1].data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-24">
        <h1 className="text-3xl font-bold text-blue-600">
          🤖 Loading AI Recommendations...
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pt-24 pb-16 px-6">

      <div className="text-center mb-14">

        <h1 className="text-5xl font-bold text-blue-600">
          🤖 AI Product Recommendations
        </h1>

        <p className="mt-5 text-gray-600 max-w-3xl mx-auto">
          Our Machine Learning recommendation engine analyzes your
          interests, browsing behavior and purchase history to suggest
          products you are most likely to love.
        </p>

      </div>


      <div className="grid md:grid-cols-3 gap-6 mb-16">

        <div className="bg-blue-100 rounded-xl p-6 shadow">

          <h2 className="text-2xl font-bold">
            🎯 Personalized Picks
          </h2>

          <p className="mt-3 text-gray-700">
            Products selected based on your activities,
            wishlist and purchases.
          </p>

        </div>

        <div className="bg-green-100 rounded-xl p-6 shadow">

          <h2 className="text-2xl font-bold">
            📊 AI Accuracy
          </h2>

          <h1 className="text-5xl font-bold text-green-600 mt-5">
            94%
          </h1>

          <p className="mt-2 text-gray-700">
            Recommendation Confidence
          </p>

        </div>

        <div className="bg-yellow-100 rounded-xl p-6 shadow">

          <h2 className="text-2xl font-bold">
            ⚡ Smart Engine
          </h2>

          <p className="mt-3 text-gray-700">
            Powered by Machine Learning &
            Collaborative Filtering.
          </p>

        </div>

      </div>

      {personalized.length > 0 && (
        <section className="mb-20">

          <h2 className="text-3xl font-bold mb-8">
            ❤️ Personalized For You
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            {personalized.map((product) => (
              <RecommendationCard
                key={product.id}
                product={product}
              />
            ))}

          </div>

        </section>
      )}

      <section className="mb-20">

        <h2 className="text-3xl font-bold mb-8">
          ⭐ Top Rated Products
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {topRated.map((product) => (
            <RecommendationCard
              key={product.id}
              product={product}
            />
          ))}

        </div>

      </section>


      <section>

        <h2 className="text-3xl font-bold mb-8">
          🔥 Trending Products
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {trending.map((product) => (
            <RecommendationCard
              key={product.id}
              product={product}
            />
          ))}

        </div>

      </section>

    </div>
  );
};

export default AIRecommendations;