const ProductFilter = ({
  selectedCategory,
  setSelectedCategory,
}) => {

  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Books",
    "Sports",
    "Home",
    "Shoes",
  ];

  return (
    <select
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {categories.map((category) => (
        <option
          key={category}
          value={category}
        >
          {category}
        </option>
      ))}
    </select>
  );
};

export default ProductFilter;