import { useState, useEffect } from "react";
import api from "../services/api";
import CategoryFilter from "../components/CategoryFilter";
import IngredientFilter from "../components/IngredientFilter";
import Navbar from "../components/Navbar";
import RecipeCard from "../components/RecipeCard";
import RecipeGrid from "../components/RecipeGrid";
import SearchBar from "../components/SearchBar";
import Favorites from "./Favorites";
import { useNavigate } from "react-router-dom";



function Home() {
    const navigate = useNavigate();

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");



  const fetchRecipes = async () => {
    try {
      setLoading(true);

      const response = await api.get("search.php?s=");

      setRecipes(response.data.meals || []);

      setLoading(false);
    } catch (error) {
      setError("Failed to fetch recipes");
      setLoading(false);
    }
  };




  useEffect(() => {
    fetchRecipes();
  }, []);





  return (


    <div>
  <Navbar />

  <div className="bg-gradient-to-r from-orange-400 to-red-500 min-h-[calc(100vh-70px)] flex items-center justify-center text-white shadow-lg">
    <div className="max-w-7xl mx-auto px-6">
      
      <h1 className="text-4xl md:text-5xl font-bold leading-tight">
        Discover Delicious Recipes 🍽️
      </h1>

      <p className="mt-4 text-lg text-white/90">
        Search, explore and cook amazing meals from around the world.
      </p>

<button
  onClick={() => navigate("/RecipeGrid")}
  className="text-white font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
>
  Explore Recipes
</button>

    </div>
  </div>
</div>
  );
}

export default Home;