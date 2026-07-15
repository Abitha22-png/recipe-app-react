import { useState, useEffect } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import RecipeGrid from "../components/RecipeGrid";

function Home() {
  return (
    <div>
      <Navbar />
      <RecipeGrid />
    </div>
  );
}

export default Home;