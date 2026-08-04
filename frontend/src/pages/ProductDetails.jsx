import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";

import ProductCard from "../components/products/ProductCard";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

import api from "../services/api";
import toast from "react-hot-toast";
import { trackActivity } from "../services/activityService";

const ProductDetails = () => {
  const { id } = useParams();

  const { addToCart } = useCart();

  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  const [quantity, setQuantity] = useState(1);

  const [product, setProduct] = useState(null);

  const [recommendations, setRecommendations] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchProduct = async () => {

      try {

        const productResponse = await api.get(
          `/products/${id}`
        );

        setProduct(productResponse.data);
        const user = JSON.parse(localStorage.getItem("user"));

        if (user) {
          trackActivity(
            user.id,
            productResponse.data.id,
            "VIEW"
          );
        }

        const recommendationResponse = await api.get(
          `/ml-recommendations/${id}`
        );

        setRecommendations(
          recommendationResponse.data
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

    fetchProduct();

  }, [id]);

  if (loading) {

    return (

      <div className="text-center py-24">

        <h1 className="text-3xl font-bold">

          Loading Product...

        </h1>

      </div>

    );

  }

  if (!product) {

    return (

      <div className="text-center py-24">

        <h1 className="text-4xl font-bold text-red-600">

          Product Not Found

        </h1>

      </div>

    );

  }

  return (

    <div className="max-w-7xl mx-auto px-6 pt-24 pb-10">

      <div className="grid md:grid-cols-2 gap-12">

        <div>

          <img
            src={product.image?.trim()}
            alt={product.name}
            className="w-full rounded-xl shadow-lg"
          />

        </div>

        <div>

          <h1 className="text-4xl font-bold">

            {product.name}

          </h1>

          <p className="text-gray-500 mt-3 text-lg">

            {product.category}

          </p>

          <div className="flex items-center gap-2 mt-4">

            <Star
              fill="gold"
              color="gold"
              size={22}
            />

            <span className="font-semibold">

              {product.rating}

            </span>

          </div>

          <h2 className="text-4xl font-bold text-blue-600 mt-6">

            ₹{product.price.toLocaleString()}

          </h2>

          <p className="text-gray-600 mt-6 leading-8">

            {product.description}

          </p>

          <div className="flex items-center gap-5 mt-8">

            <span className="font-semibold">

              Quantity

            </span>

            <button
              onClick={() =>
                setQuantity(
                  quantity > 1
                    ? quantity - 1
                    : 1
                )
              }
              className="bg-gray-200 w-10 h-10 rounded-lg text-xl"
            >
              -
            </button>

            <span className="text-xl font-bold">

              {quantity}

            </span>

            <button
              onClick={() =>
                setQuantity(quantity + 1)
              }
              className="bg-gray-200 w-10 h-10 rounded-lg text-xl"
            >
              +
            </button>

          </div>

          <div className="flex flex-wrap gap-4 mt-10">

            <button
              onClick={() => {
                addToCart(product, quantity);
                toast.success("Added to Cart");
              }}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
            >
              <ShoppingCart size={20} />

              Add to Cart

            </button>

            <button
              onClick={() => {

                if (isInWishlist(product.id)) {

                  removeFromWishlist(product.id);

                  toast.success(
                    "Removed from Wishlist"
                  );

                } else {

                  addToWishlist(product);

                  toast.success(
                    "Added to Wishlist"
                  );

                }

              }}
              className="flex items-center gap-2 border px-6 py-3 rounded-lg hover:bg-red-100"
            >

              <Heart
                fill={
                  isInWishlist(product.id)
                    ? "red"
                    : "none"
                }
                color="red"
              />

              {isInWishlist(product.id)
                ? "Remove"
                : "Wishlist"}

            </button>

          </div>

        </div>

      </div>

      <div className="mt-24">

        <h2 className="text-3xl font-bold mb-8">

          🤖 AI Similar Products

        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {recommendations.length > 0 ? (

            recommendations.map((item) => (

              <ProductCard
                key={item.id}
                product={item}
              />

            ))

          ) : (

            <div className="col-span-full text-center text-gray-500">

              No AI recommendations available.

            </div>

          )}

        </div>

      </div>

    </div>

  );

};

export default ProductDetails;