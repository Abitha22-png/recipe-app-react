import { useEffect, useState } from "react";
import api from "../services/api";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import {addFavorite,removeFavorite,isFavorite} from "../utils/localStorage";

function RecipeGrid() {

  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [ingredient, setIngredient] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(false);

  const navigate = useNavigate();


  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await api.get("categories.php");
      setCategories(res.data.categories || []);
    } catch {
      setError("Failed to load categories");
    }
  };


  // Fetch ingredients
  const fetchIngredients = async () => {
    try {
      const res = await api.get("list.php?i=list");
      setIngredients(res.data.meals || []);
    } catch {
      setError("Failed to load ingredients");
    }
  };

  const toggleFavorite = (recipe) => {
  if (isFavorite(recipe.idMeal)) {
    removeFavorite(recipe.idMeal);
  } else {
    addFavorite(recipe);
  }

  setRefresh(!refresh);
};



  // Main filter function
  const applyFilters = async () => {

    try {

      setLoading(true);


      let result = [];


      // 1. Search by name
      if (search) {

        const res = await api.get(
          `search.php?s=${search}`
        );

        result = res.data.meals || [];

      }

      else {

        const res = await api.get(
          "search.php?s="
        );

        result = res.data.meals || [];

      }



      // 2. Category filter

      if (category) {

        result = result.filter(
          (meal) =>
            meal.strCategory === category
        );

      }



      // 3. Ingredient filter

      if (ingredient) {

        const ingredientRes = await api.get(
          `filter.php?i=${ingredient}`
        );


        const ingredientMeals =
          ingredientRes.data.meals || [];


        result = result.filter((meal) =>

          ingredientMeals.some(
            (item) =>
              item.idMeal === meal.idMeal
          )

        );

      }



      setRecipes(result);

      setLoading(false);


    }

    catch (error) {

      setError("Failed to load recipes");
      setLoading(false);

    }

  };



  // Search change
  const handleSearch = (text) => {

    setSearch(text);

  };



  // Category change
  const handleCategory = (cat) => {

    setCategory(cat);

  };



  // Ingredient change
  const handleIngredient = (ing) => {

    setIngredient(ing);

  };



  useEffect(() => {

    fetchCategories();
    fetchIngredients();

  }, []);



  // Run whenever filters change

  useEffect(() => {

    applyFilters();

  }, [search, category, ingredient]);




  if (error) {

    return (

      <div className="text-center mt-20 text-red-500 text-xl">

        {error}

      </div>

    );

  }




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




        {/* Search + Filters */}


        <div className="bg-white rounded-2xl shadow-lg p-6 mb-10 flex flex-wrap gap-4 justify-between items-center">



          {/* Category */}

          <select

            value={category}

            onChange={(e) => handleCategory(e.target.value)}

            className="border rounded-xl px-4 py-3"

          >

            <option value="">

              All Categories

            </option>


            {
              categories.map((cat) => (

                <option

                  key={cat.idCategory}

                  value={cat.strCategory}

                >

                  {cat.strCategory}

                </option>

              ))
            }


          </select>






          {/* Ingredient */}


          <select

            value={ingredient}

            onChange={(e) => handleIngredient(e.target.value)}

            className="border rounded-xl px-4 py-3"

          >

            <option value="">

              All Ingredients

            </option>


            {
              ingredients.slice(0, 100).map((ing, index) => (

                <option

                  key={index}

                  value={ing.strIngredient}

                >

                  {ing.strIngredient}

                </option>


              ))
            }


          </select>





          {/* Search */}

          <SearchBar onSearch={handleSearch} />



        </div>





        {
          loading ?


            (

              <div className="text-center text-xl">

                Loading recipes...

              </div>


            )


            :


            (

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">


                {

                  recipes.map((recipe) => (


                    <div

                      key={recipe.idMeal}

                      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition"

                    >



                      <img

                        src={recipe.strMealThumb}

                        alt={recipe.strMeal}

                        className="w-full h-56 object-cover"

                      />




                      <div className="p-5">


                        <h2 className="text-2xl font-bold truncate">

                          {recipe.strMeal}

                        </h2>




                        {
                          recipe.strCategory &&

                          <span className="inline-block mt-3 bg-orange-100 text-orange-600 px-3 py-1 rounded-full">

                            {recipe.strCategory}

                          </span>

                        }

                        <button
  onClick={() => toggleFavorite(recipe)}
  className={`mt-3 w-full py-2 rounded-xl ${
    isFavorite(recipe.idMeal)
      ? "bg-red-500 text-white"
      : "bg-gray-200"
  }`}
>
  {isFavorite(recipe.idMeal)
    ? "❤️ Remove Favorite"
    : "🤍 Add Favorite"}
</button>




                        <button

                          onClick={() =>
                            navigate(`/recipe/${recipe.idMeal}`)
                          }

                          className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl"

                        >

                          View Recipe

                        </button>



                      </div>



                    </div>


                  ))

                }


              </div>

            )

        }





        {
          recipes.length === 0 && !loading &&

          (

            <div className="text-center mt-20">


              <h2 className="text-3xl font-bold text-gray-600">

                No Recipes Found 😔

              </h2>


              <p className="text-gray-500 mt-3">

                Try another search or filter.

              </p>


            </div>

          )

        }



      </div>


    </div>

  );

}


export default RecipeGrid;