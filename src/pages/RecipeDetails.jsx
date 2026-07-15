import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await api.get(`lookup.php?i=${id}`);
      setRecipe(res.data.meals[0]);
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

    const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({
        ingredient,
        measure,
      });
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">

    <button
  onClick={() => navigate("/")}
  className="mb-6 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg"
>
  ← Back to Recipes
</button>

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

        {/* Ingredients */}
      <h2 className="text-2xl font-semibold mb-3">
        Ingredients
      </h2>

      <ul className="list-disc list-inside space-y-2 mb-8">
        {ingredients.map((item, index) => (
          <li key={index}>
            <span className="font-medium">
              {item.measure}
            </span>{" "}
            {item.ingredient}
          </li>
        ))}
      </ul>

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