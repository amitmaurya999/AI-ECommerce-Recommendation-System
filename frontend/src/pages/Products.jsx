import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import ProductGrid from "../components/products/ProductGrid";
import ProductFilter from "../components/products/ProductFilter";
import ProductSort from "../components/products/ProductSort";

import api from "../services/api";

const Products = () => {

  const [products, setProducts] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [sortBy, setSortBy] = useState("default");

  const [searchParams] = useSearchParams();

  const searchTerm = searchParams.get("search") || "";

  
  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const response = await api.get("/products");

        setProducts(response.data);

      } catch (error) {

        console.error("Error fetching products:", error);

      }

    };

    fetchProducts();

  }, []);

  const filteredProducts = products
    .filter((product) => {

      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      return matchesSearch && matchesCategory;

    })
    .sort((a, b) => {

      switch (sortBy) {

        case "priceLow":
          return a.price - b.price;

        case "priceHigh":
          return b.price - a.price;

        case "rating":
          return b.rating - a.rating;

        case "name":
          return a.name.localeCompare(b.name);

        default:
          return 0;

      }

    });

  return (
    <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">

      <h1 className="text-4xl font-bold mb-8">
        All Products
      </h1>

      <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-8">

        <div className="flex gap-4">

          <ProductFilter
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <ProductSort
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

        </div>

      </div>

      <div className="mt-10">

        <ProductGrid
          products={filteredProducts}
        />

      </div>

    </div>
  );
};

export default Products;