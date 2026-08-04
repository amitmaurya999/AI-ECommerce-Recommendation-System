import { Trash2, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

const Wishlist = () => {
  const {
    wishlistItems,
    removeFromWishlist,
  } = useWishlist();

  const { addToCart } = useCart();

  return (
    <div className="max-w-7xl mx-auto pt-24 pb-10">

      <h1 className="text-4xl font-bold mb-8">
        My Wishlist
      </h1>

      {wishlistItems.length === 0 ? (

        <div className="text-center py-20">

          <h2 className="text-2xl font-semibold">
            Your wishlist is empty
          </h2>

          <p className="text-gray-500 mt-3">
            Save your favourite products here.
          </p>

          <Link
            to="/products"
            className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Browse Products
          </Link>

        </div>

      ) : (

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {wishlistItems.map((item) => (

            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >

              <img
                src={item.image}
                alt={item.name}
                className="w-full h-60 object-cover"
              />

              <div className="p-5">

                <h2 className="text-xl font-bold">
                  {item.name}
                </h2>

                <p className="text-gray-500 mt-1">
                  {item.category}
                </p>

                <h3 className="text-blue-600 font-bold text-2xl mt-3">
                  ₹{item.price.toLocaleString()}
                </h3>

                <div className="flex gap-3 mt-6">

                  <button
                    onClick={() => addToCart(item)}
                    className="flex-1 flex justify-center items-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                  >
                    <ShoppingCart size={18} />
                    Add to Cart
                  </button>

                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default Wishlist;