import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

const EditProductModal = ({ product, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    name: product.name,
    category: product.category,
    price: product.price,
    rating: product.rating,
    image: product.image,
    description: product.description,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/admin/products/${product.id}`, {
        ...form,
        price: Number(form.price),
        rating: Number(form.rating),
      });

      toast.success("Product Updated");

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Update Failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-5">Edit Product</h2>

        <form onSubmit={updateProduct} className="space-y-4">

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="number"
            step="0.1"
            name="rating"
            value={form.rating}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="border px-4 py-2 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Update
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditProductModal;