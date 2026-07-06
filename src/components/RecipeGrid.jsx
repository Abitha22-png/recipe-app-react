import { useEffect, useState } from "react";
import api from "../services/api";
import SearchBar from "./SearchBar";
import RecipeDetails from "../pages/RecipeDetails";
import { useNavigate } from "react-router-dom";


function RecipeGrid() {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [ingredient, setIngredient] = useState("");

  // ---------------- FETCH ALL RECIPES (DEFAULT)
  const fetchAllRecipes = async () => {
    const res = await api.get("search.php?s=");
    setRecipes(res.data.meals || []);
  };

  // ---------------- SEARCH
  const handleSearch = async (text) => {
    setSearch(text);
    setCategory("");
    setIngredient("");

    const res = await api.get(`search.php?s=${text}`);
    setRecipes(res.data.meals || []);
  };

  // ---------------- CATEGORY FILTER
  const handleCategory = async (cat) => {
    setCategory(cat);
    setSearch("");
    setIngredient("");

    const res = await api.get(`filter.php?c=${cat}`);
    setRecipes(res.data.meals || []);
  };

  // ---------------- INGREDIENT FILTER
  const handleIngredient = async (ing) => {
    setIngredient(ing);
    setSearch("");
    setCategory("");

    const res = await api.get(`filter.php?i=${ing}`);
    setRecipes(res.data.meals || []);
  };

  // ---------------- FETCH CATEGORIES
  const fetchCategories = async () => {
    const res = await api.get("categories.php");
    setCategories(res.data.categories || []);
  };

  // ---------------- FETCH INGREDIENTS
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
    <div className="min-h-screen bg-gray-100">

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* TITLE */}
        <h1 className="text-4xl font-bold text-center text-orange-500 mb-6">
          Explore Recipes 🍽️
        </h1>

        {/* SEARCH + FILTERS */}
        <div className="flex flex-wrap justify-between gap-4 mb-8">

          {/* CATEGORY */}
          <select
            className="p-2 rounded border"
            value={category}
            onChange={(e) => handleCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.idCategory} value={cat.strCategory}>
                {cat.strCategory}
              </option>
            ))}
          </select>

          {/* INGREDIENT */}
          <select
            className="p-2 rounded border"
            value={ingredient}
            onChange={(e) => handleIngredient(e.target.value)}
          >
            <option value="">All Ingredients</option>
            {ingredients.map((ing, index) => (
              <option key={index} value={ing.strIngredient}>
                {ing.strIngredient}
              </option>
            ))}
          </select>

          {/* SEARCH */}
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {recipes?.map((recipe) => (
            <div
              key={recipe.idMeal}
              className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden"
            >
              <img
                src={recipe.strMealThumb}
                className="h-48 w-full object-cover"
              />

              <div className="p-5">
          <h2 className="text-xl font-bold text-gray-800">
            {recipe.strMeal}
          </h2>

          <div className="mt-3 space-y-2 text-gray-600">
            <p>
              <span className="font-semibold">Category:</span>{" "}
              {recipe.strCategory}
            </p>

            <p>
              <span className="font-semibold">Cuisine:</span>{" "}
              {recipe.strArea}
            </p>
          </div>
{/* 
         <button
      onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
      className="mt-5 w-full bg-orange-500 text-white py-2 rounded-lg">
  View Recipe
</button> */}

<button
  onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
  className="mt-5 w-full bg-orange-500 text-white py-2 rounded-lg"
>
  View Recipe
</button>

        </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default RecipeGrid;