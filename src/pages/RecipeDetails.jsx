import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await api.get(`lookup.php?i=${id}`);
      setRecipe(res.data.meals[0]);
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img
        src={recipe.strMealThumb}
        className="w-full rounded-xl mb-6"
      />

      <h1 className="text-3xl font-bold mb-2">
        {recipe.strMeal}
      </h1>

      <p className="text-gray-600 mb-4">
        {recipe.strCategory} • {recipe.strArea}
      </p>

      <h2 className="text-xl font-semibold mt-6">Instructions</h2>
      <p className="mt-2 leading-relaxed">
        {recipe.strInstructions}
      </p>

      {recipe.strYoutube && (
        <a
          href={recipe.strYoutube}
          target="_blank"
          className="text-blue-500 underline mt-4 block"
        >
          Watch Video
        </a>
      )}
    </div>
  );
}

export default RecipeDetails;