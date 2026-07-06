import { useState, useEffect } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import RecipeGrid from "../components/RecipeGrid";

function Home() {
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
      <RecipeGrid />
    </div>
  );
}

export default Home;