import Favorites from "../pages/Favorites";
import {Heart} from "lucide-react";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="sticky top-0 z-50 bg-blue-600 shadow-md">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 h-[70px] flex items-center">
        
        {/* Left - Logo */}
        <div className="flex items-center gap-2 text-white flex-1">
          <span className="text-2xl">🍳</span>
          <span className="text-xl">
            Recipe<span className="text-yellow-300">Hub</span>
          </span>
        </div>

  

        {/* Right - Favorites */}
       <div className="flex-1 flex justify-end text-white pr-2">
  {/* <Favorites /> */}
      <button
      onClick={() => navigate("/favorites")}
      className="flex items-center gap-2 rounded-full px-5 py-2 text-white hover:bg-orange-600"
    >
      <Heart size={20} />
      Favorites
    </button>

    
</div>

      </div>
    </nav>
  );
};

export default Navbar;