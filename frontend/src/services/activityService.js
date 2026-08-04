import api from "./api";

export const trackActivity = async (
  userId,
  productId,
  action
) => {
  try {
    await api.post("/activity", {
      user_id: userId,
      product_id: productId,
      action,
    });
  } catch (error) {
    console.error("Activity Error:", error);
  }
};