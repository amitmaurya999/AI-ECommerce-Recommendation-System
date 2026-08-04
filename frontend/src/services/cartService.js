import api from "./api";

export const addToCart = async (cartData) => {
  const response = await api.post("/cart", cartData);
  return response.data;
};

export const getCart = async (userId) => {
  const response = await api.get(`/cart/${userId}`);
  return response.data;
};

export const removeFromCart = async (cartId) => {
  const response = await api.delete(`/cart/${cartId}`);
  return response.data;
};