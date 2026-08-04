import api from "./api";

export const getOrders = async (userId) => {
  const response = await api.get(`/orders/${userId}`);
  return response.data;
};

export const placeOrder = async (orderData) => {
  const response = await api.post("/orders", orderData);
  return response.data;
};