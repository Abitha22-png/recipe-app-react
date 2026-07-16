import { useEffect, useState } from "react";
import { getFavorites, removeFavorite } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const deleteFavorite = (id) => {
    removeFavorite(id);
    setFavorites(getFavorites()); 
  };

  if (favorites.length === 0) {
    return (
      <div className="text-center mt-10 text-2xl">
        No Favorite Recipes ❤️
      </div>
    );
  }

  return (

  <div className="p-10">

    <button
      onClick={() => navigate("/")}
      className="mb-6 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg"
    >
      ← Back to Recipes
    </button>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {favorites.map((recipe) => (
        <div
          key={recipe.idMeal}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="h-56 w-full object-cover"
          />

          <div className="p-4">
            <h2 className="font-bold text-xl">{recipe.strMeal}</h2>

            <button
              onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
              className="mt-4 w-full bg-orange-500 text-white py-2 rounded"
            >
              View Recipe
            </button>

            <button
              onClick={() => deleteFavorite(recipe.idMeal)}
              className="mt-2 w-full bg-red-500 text-white py-2 rounded"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
}

export default FavoritesPage;