import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart = () => {

  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
  } = useCart();

  const shippingCharge = 20;

  const grandTotal = totalPrice + shippingCharge;

  return (

    <div className="max-w-7xl mx-auto pt-24 pb-10 px-6">

      <h1 className="text-4xl font-bold mb-8">
        Shopping Cart
      </h1>

      {cartItems.length === 0 ? (

        <div className="text-center py-20">

          <h2 className="text-3xl font-bold">
            Your Cart is Empty
          </h2>

          <p className="text-gray-500 mt-3">
            Looks like you haven't added anything yet.
          </p>

          <Link
            to="/products"
            className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Continue Shopping
          </Link>

        </div>

      ) : (

        <div className="grid lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 space-y-6">

            {cartItems.map((item) => (

              <div
                key={item.id}
                className="flex items-center gap-6 border rounded-xl p-5 shadow-sm bg-white"
              >

                <img
                  src={item.product.image?.trim()}
                  alt={item.product.name}
                  className="w-28 h-28 object-cover rounded-lg"
                />

                <div className="flex-1">

                  <h2 className="text-xl font-bold">
                    {item.product.name}
                  </h2>

                  <p className="text-gray-500">
                    {item.product.category}
                  </p>

                  <h3 className="text-blue-600 font-bold text-xl mt-2">
                    ₹{item.product.price.toLocaleString("en-IN")}
                  </h3>

                  <div className="flex items-center gap-3 mt-4">

                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="bg-gray-200 hover:bg-gray-300 w-9 h-9 rounded-lg text-lg"
                    >
                      -
                    </button>

                    <span className="font-bold text-lg">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="bg-gray-200 hover:bg-gray-300 w-9 h-9 rounded-lg text-lg"
                    >
                      +
                    </button>

                  </div>

                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={22} />
                </button>

              </div>

            ))}

          </div>


          <div className="bg-white rounded-xl shadow-lg p-6 h-fit">

            <h2 className="text-2xl font-bold mb-6">
              Order Summary
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between">
                <span>Total Items</span>

                <span>
                  {cartItems.reduce(
                    (total, item) => total + item.quantity,
                    0
                  )}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Subtotal</span>

                <span>
                  ₹{totalPrice.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>

                <span>
                  ₹{shippingCharge}
                </span>
              </div>

              <hr />

              <div className="flex justify-between text-2xl font-bold">

                <span>Total</span>

                <span className="text-blue-600">
                  ₹{grandTotal.toLocaleString("en-IN")}
                </span>

              </div>

            </div>

            <Link
              to="/checkout"
              className="block w-full mt-8 text-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Proceed to Checkout
            </Link>

          </div>

        </div>

      )}

    </div>

  );

};

export default Cart;