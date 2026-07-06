import {Heart} from "lucide-react";

function Favorites(){
    return (
     <button className="flex items-center gap-2 rounded-full px-5 py-2 text-white transition hover:bg-orange-600">
  <Heart size={20} />
  Favorites
</button>
    );
}

export default Favorites;