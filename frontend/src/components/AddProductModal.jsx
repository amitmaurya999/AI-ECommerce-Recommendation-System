import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

const AddProductModal = ({ onClose, onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    rating: "",
    image: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveProduct = async (e) => {
    e.preventDefault();

    try {
      await api.post("/products", {
        ...form,
        price: Number(form.price),
        rating: Number(form.rating),
      });

      toast.success("Product Added Successfully");

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to Add Product");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl w-full max-w-lg p-6">

        <h2 className="text-2xl font-bold mb-5">
          Add New Product
        </h2>

        <form onSubmit={saveProduct} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Product Name"
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="number"
            step="0.1"
            name="rating"
            placeholder="Rating"
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            rows={4}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save Product
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default AddProductModal;