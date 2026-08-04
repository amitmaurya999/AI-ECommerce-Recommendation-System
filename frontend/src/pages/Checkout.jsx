import { useCart } from "../context/CartContext";
import { placeOrder } from "../services/orderApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { trackActivity } from "../services/activityService";

const Checkout = () => {

  const navigate = useNavigate();

  const {
    cartItems,
    totalPrice,
    removeFromCart,
  } = useCart();

  const user = JSON.parse(localStorage.getItem("user"));

  const shippingCharge = 20;

  const grandTotal = totalPrice + shippingCharge;

  const handlePlaceOrder = async () => {

    try {

      for (const item of cartItems) {

        await placeOrder({
          user_id: user.id,
          product_id: item.product.id,
          quantity: item.quantity,
          total_price: item.product.price * item.quantity,
        });

        // Save Purchase Activity
        await trackActivity(
          user.id,
          item.product.id,
          "PURCHASE"
        );

        await removeFromCart(item.id);

      }

      toast.success("Order Placed Successfully");

      navigate("/orders");

    } catch (error) {

      console.error(error);

      toast.error("Unable to place order");

    }

  };

  return (

    <div className="max-w-7xl mx-auto pt-24 pb-10 px-6">

      <h1 className="text-4xl font-bold mb-8">
        Checkout
      </h1>

      <div className="grid md:grid-cols-3 gap-8">

        <div className="md:col-span-2 bg-white shadow-lg rounded-xl p-6">

          <h2 className="text-2xl font-semibold mb-5">
            Shipping Address
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="Full Name"
              className="border rounded-lg p-3"
            />

            <input
              type="text"
              placeholder="Phone Number"
              className="border rounded-lg p-3"
            />

            <input
              type="email"
              placeholder="Email"
              className="border rounded-lg p-3 md:col-span-2"
            />

            <textarea
              rows="3"
              placeholder="Full Address"
              className="border rounded-lg p-3 md:col-span-2"
            />

            <input
              type="text"
              placeholder="City"
              className="border rounded-lg p-3"
            />

            <input
              type="text"
              placeholder="State"
              className="border rounded-lg p-3"
            />

            <input
              type="text"
              placeholder="Pincode"
              className="border rounded-lg p-3"
            />

          </div>

        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 h-fit">

          <h2 className="text-2xl font-semibold mb-5">
            Order Summary
          </h2>

          <div className="space-y-3">

            <div className="flex justify-between">
              <span>Items</span>
              <span>{cartItems.length}</span>
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

            <div className="flex justify-between font-bold text-xl">

              <span>Total</span>

              <span className="text-blue-600">
                ₹{grandTotal.toLocaleString("en-IN")}
              </span>

            </div>

          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Place Order
          </button>

        </div>

      </div>

    </div>

  );

};

export default Checkout;