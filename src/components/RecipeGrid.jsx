import { useEffect, useState } from "react";
import api from "../services/api";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";

function RecipeGrid() {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [ingredient, setIngredient] = useState("");

  // Fetch all recipes
  const fetchAllRecipes = async () => {
    const res = await api.get("search.php?s=");
    setRecipes(res.data.meals || []);
  };

  // Search recipes
  const handleSearch = async (text) => {
    setSearch(text);
    setCategory("");
    setIngredient("");

    const res = await api.get(`search.php?s=${text}`);
    setRecipes(res.data.meals || []);
  };

  // Category filter
  const handleCategory = async (cat) => {
    setCategory(cat);
    setSearch("");
    setIngredient("");

    if (!cat) {
      fetchAllRecipes();
      return;
    }

    const res = await api.get(`filter.php?c=${cat}`);
    setRecipes(res.data.meals || []);
  };

  // Ingredient filter
  const handleIngredient = async (ing) => {
    setIngredient(ing);
    setSearch("");
    setCategory("");

    if (!ing) {
      fetchAllRecipes();
      return;
    }

    const res = await api.get(`filter.php?i=${ing}`);
    setRecipes(res.data.meals || []);
  };

  // Categories
  const fetchCategories = async () => {
    const res = await api.get("categories.php");
    setCategories(res.data.categories || []);
  };

  // Ingredients
  const fetchIngredients = async () => {
    const res = await api.get("list.php?i=list");
    setIngredients(res.data.meals || []);
  };

  useEffect(() => {
    fetchAllRecipes();
    fetchCategories();
    fetchIngredients();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
<div className="max-w-8xl mx-auto p-10">        
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-gray-800">
            🍽️ Discover Delicious Recipes
          </h1>

          <p className="text-gray-500 text-lg mt-3">
            Explore thousands of recipes from around the world.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-10 flex flex-wrap gap-4 justify-between items-center">
          {/* Category */}
          <select
            value={category}
            onChange={(e) => handleCategory(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-400 outline-none"
          >
            <option value="">All Categories</option>

            {categories.map((cat) => (
              <option key={cat.idCategory} value={cat.strCategory}>
                {cat.strCategory}
              </option>
            ))}
          </select>

          {/* Ingredient */}
          <select
            value={ingredient}
            onChange={(e) => handleIngredient(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-400 outline-none"
          >
            <option value="">All Ingredients</option>

            {ingredients.map((ing, index) => (
              <option key={index} value={ing.strIngredient}>
                {ing.strIngredient}
              </option>
            ))}
          </select>

          {/* Search */}
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {recipes?.map((recipe) => (
            <div
              key={recipe.idMeal}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  className="w-full h-56 object-cover"
                />

                {/* Heart Icon */}
                <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md cursor-pointer hover:scale-110 transition">
                  ❤️
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h2 className="text-2xl font-bold text-gray-800 truncate">
                  {recipe.strMeal}
                </h2>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {recipe.strCategory && (
                    <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium">
                      {recipe.strCategory}
                    </span>
                  )}

                  {recipe.strArea && (
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                      {recipe.strArea}
                    </span>
                  )}
                </div>

                {/* Rating & Time */}
                <div className="flex justify-between mt-5 text-sm text-gray-500">
                  <span>⭐ 4.8</span>
                  <span>⏱ 30 mins</span>
                </div>

                {/* Button */}
                <button
                  onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
                  className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition duration-300"
                >
                  View Recipe
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {recipes.length === 0 && (
          <div className="text-center mt-20">
            <h2 className="text-3xl font-bold text-gray-600">
              No Recipes Found 😔
            </h2>

            <p className="text-gray-500 mt-3">
              Try searching with another keyword or filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeGrid;