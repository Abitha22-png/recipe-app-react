import SearchBar from "./SearchBar";
import Favorites from "../pages/Favorites";

const Navbar = () => {
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

        {/* Middle - Search (optional) */}
        <div className="flex-1 flex justify-center">
          {/* <SearchBar /> */}
        </div>

        {/* Right - Favorites */}
       <div className="flex-1 flex justify-end text-white pr-2">
  <Favorites />
</div>

      </div>
    </nav>
  );
};

export default Navbar;