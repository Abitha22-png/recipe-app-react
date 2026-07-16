const FAVORITES_KEY = "favoriteRecipes";

// Get favorites
export const getFavorites = () => {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
};

// Add favorite
export const addFavorite = (recipe) => {
  const favorites = getFavorites();

  const exists = favorites.find((item) => item.idMeal === recipe.idMeal);

  if (!exists) {
    favorites.push(recipe);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
};

// Remove favorite
export const removeFavorite = (id) => {
  const favorites = getFavorites().filter(
    (item) => item.idMeal !== id
  );

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

// Check favorite
export const isFavorite = (id) => {
  return getFavorites().some((item) => item.idMeal === id);
};