import env from "@/env";
import { ProductsContext } from "@/ProductsContext";
import React, { useContext, useEffect, useState } from "react";

const ProductSidebarFilter = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 1000]); // Min-Max Price Range
  const { products, setProducts, loadingProduct } = useContext(ProductsContext);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(env.baseUrl + "/categories");
        const result = await response.json();
        setCategories(result.data); // Ensure this is an array of category objects with id & title
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Handle category checkbox changes
  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId) // Remove if already selected
        : [...prev, categoryId] // Add if not selected
    );


  };

  // Handle price range change
  const handlePriceRangeChangemin = (event) => {
    setSelectedPriceRange([parseFloat(event.target.value)]);
  };

  const handlePriceRangeChange = (event) => {
    setSelectedPriceRange([2, parseFloat(event.target.value)]); // Min price is fixed at 2, update max price
  };

  // Fetch filtered products when selected categories or price range changes
  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        const response = await fetch(env.baseUrl + "/products/filter", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            categories: selectedCategories, // Send category IDs
            min_price: selectedPriceRange[0],
            max_price: selectedPriceRange[1],
          }),
        });

        const result = await response.json();
        setProducts(result.data.data); // Update product list
      } catch (error) {
        console.error("Error fetching filtered products:", error);
      }
    };

    fetchFilteredProducts();
  }, [selectedCategories, selectedPriceRange]);

  return (
    <div className="w-64 bg-gray-100 p-4">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Category</h3>
        {categories.length > 0
          ? categories.map((category) => (
              <label key={category.id} className="flex items-center mb-1">
                <input
                  type="checkbox"
                  onChange={() => handleCategoryChange(category.id)} // Use ID instead of title
                  checked={selectedCategories.includes(category.id)}
                  className="form-checkbox"
                />
                <span className="ml-2">{category.title}</span>
              </label>
            ))
          : "Loading categories..."}
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Price</h3>
        <div className="row-price">
          <div>
                <input
                type="number"
                value={selectedPriceRange[0]}
                onChange={(e) =>
                  setSelectedPriceRange([parseFloat(e.target.value) || 0, selectedPriceRange[1]])
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
              <div className="text-sm mt-1">Min: ${selectedPriceRange[0]}</div>
          </div>
          <div>
              <input
              type="number"
              value={selectedPriceRange[1]}
              onChange={(e) =>
                setSelectedPriceRange([selectedPriceRange[0], parseFloat(e.target.value) || 1000])
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            <div className="text-sm mt-1">Max: ${selectedPriceRange[1]}</div>
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Rating</h3>
        {[4, 3, 2].map((stars) => (
          <label key={stars} className="flex items-center mb-1">
            <input type="checkbox" className="form-checkbox" />
            <span className="ml-2">{stars} Stars & Up</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ProductSidebarFilter;
