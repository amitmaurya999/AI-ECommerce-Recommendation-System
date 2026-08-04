import { Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  const handleWishlist = () => {
    if (isInWishlist(product.id)) {
      const wishlistItem = wishlistItems.find(
        (item) => item.product.id === product.id
      );

      if (wishlistItem) {
        removeFromWishlist(wishlistItem.id);
        toast.success("Removed from Wishlist");
      }
    } else {
      addToWishlist(product);
      toast.success("Added to Wishlist");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col group">

     
      <div className="relative overflow-hidden">

        <Link to={`/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            onError={(e) => {
              e.target.src =
                "https://placehold.co/600x600?text=No+Image";
            }}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        
        <button
          onClick={handleWishlist}
          className="absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:bg-red-50 transition"
        >
          <Heart
            size={22}
            color="red"
            fill={isInWishlist(product.id) ? "red" : "none"}
          />
        </button>

      </div>

      
      <div className="flex flex-col flex-1 p-5">

        <Link to={`/products/${product.id}`}>
          <h2 className="text-xl font-bold hover:text-blue-600 transition line-clamp-1">
            {product.name}
          </h2>
        </Link>

        <p className="text-gray-500 mt-2">
          {product.category}
        </p>

        <div className="flex items-center mt-3">

          <Star
            size={18}
            fill="#facc15"
            color="#facc15"
          />

          <span className="ml-2 font-medium">
            {product.rating}
          </span>

        </div>

        <h3 className="text-2xl font-bold text-blue-600 mt-4">
          ₹{product.price.toLocaleString()}
        </h3>

        <div className="mt-auto pt-6">

          <Link to={`/products/${product.id}`}>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition">
              View Details
            </button>
          </Link>

        </div>

      </div>

    </div>
  );
};

export default ProductCard;