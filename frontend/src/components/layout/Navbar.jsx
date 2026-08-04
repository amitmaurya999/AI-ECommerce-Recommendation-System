import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import {
  Heart,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react";

const Navbar = () => {

  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const [searchParams] = useSearchParams();

  const [searchText, setSearchText] = useState(
    searchParams.get("search") || ""
  );

  // Keep search box synced with URL
  useEffect(() => {
    setSearchText(searchParams.get("search") || "");
  }, [searchParams]);

  const handleSearch = (value) => {
  setSearchText(value);

  if (value.trim()) {
    navigate(`/products?search=${encodeURIComponent(value)}`);
  } else {
    navigate("/products");
  }
};

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-between h-20">


          <NavLink
            to="/"
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              S
            </div>

            <div>
              <h1 className="text-xl font-bold text-blue-600">
                ShopSmart
              </h1>

              <p className="text-xs text-gray-500">
                AI Recommendations
              </p>
            </div>

          </NavLink>


          <ul className="hidden lg:flex items-center gap-8 font-medium">

            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600"
                    : "hover:text-blue-600"
                }
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600"
                    : "hover:text-blue-600"
                }
              >
                Products
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/recommendations"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600"
                    : "hover:text-blue-600"
                }
              >
                   AI Recommendations
              </NavLink>
            </li>
          </ul>

          <div className="hidden md:flex items-center border rounded-lg overflow-hidden">

  <div className="relative">

    <input
      type="text"
      placeholder="Search products..."
      value={searchText}
      onChange={(e) => handleSearch(e.target.value)}
      className="px-4 py-2 pr-10 w-72 outline-none"
    />

    {searchText && (
      <button
        onClick={() => handleSearch("")}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500"
      >
        <X size={18} />
      </button>
    )}

  </div>

  <button
    onClick={() => handleSearch(searchText)}
    className="bg-blue-600 text-white px-4 py-2"
  >
    <Search size={20} />
  </button>

</div>


  <div className="flex items-center gap-5">

  <NavLink
  to="/wishlist"
  className={({ isActive }) =>
    isActive
      ? "text-red-500"
      : "hover:text-red-500"
  }
>
  <div className="relative">

    <Heart />

    {wishlistCount > 0 && (
  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
    {wishlistCount}
  </span>
)}

  </div>
</NavLink>

            <Link
              to="/cart"
              className="hover:text-blue-600 relative"
              >
              <ShoppingCart />

              <span
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
              >
               {cartCount}
              </span>
           </Link>

           <NavLink to="/profile">
             <User />
           </NavLink>

            <NavLink
               to="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
             Login
           </NavLink>

          </div>

        </div>

      </div>

    </nav>
  );
};

export default Navbar;