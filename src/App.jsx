import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import RecipeDetails from "./pages/RecipeDetails";
import Favorites from "./pages/Favorites";
import { BrowserRouter } from "react-router-dom";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css';
import Navbar from "./components/Navbar";
import RecipeGrid from "./components/RecipeGrid";


function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipe/:id" element={<RecipeDetails/>} />
      <Route path="/favorites" element={<Favorites/>} />
      <Route path="/RecipeGrid" element={<RecipeGrid />} />
    </Routes>
  )
}

export default App
