import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";
import { trackActivity } from "../services/activityService";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  // Load Cart
  const fetchCart = async () => {
    if (!user) return;

    try {
      const response = await api.get(`/cart/${user.id}`);
      setCartItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  
  const addToCart = async (product, quantity = 1) => {
    if (!user) {
      toast.error("Please login first");
      return;
    }

    try {
      await api.post("/cart", {
        user_id: user.id,
        product_id: product.id,
        quantity,
      });
      await trackActivity(
        user.id,
        product.id,
       "CART"
      );

      toast.success("Added To Cart");

      fetchCart();

    } catch (error) {
      console.error(error);
      toast.error("Unable to add product");
    }
  };

  
  const removeFromCart = async (cartId) => {
    try {
      await api.delete(`/cart/${cartId}`);

      setCartItems((prev) =>
        prev.filter((item) => item.id !== cartId)
      );

      toast.success("Removed");

    } catch (error) {
      console.error(error);
    }
  };

  const increaseQuantity = async (cartId) => {
  try {
    await api.put(`/cart/increase/${cartId}`);
    fetchCart();
  } catch (error) {
    console.error(error);
    toast.error("Unable to increase quantity");
  }
};

const decreaseQuantity = async (cartId) => {
  try {
    await api.put(`/cart/decrease/${cartId}`);
    fetchCart();
  } catch (error) {
    console.error(error);
    toast.error("Unable to decrease quantity");
  }
};

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        fetchCart,
        totalPrice,
        cartCount,
}}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);