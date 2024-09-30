import { SearchIcon } from "lucide-react";

const Search = () => {
  return (
    <form className="w-full md:w-[50rem] flex gap-3 relative my-4 md:my-0">
      <input
        type="text"
        className="w-full border-2 border-gray-300 p-2  rounded-3xl"
        placeholder="Search..."
      />
      <button className="absolute top-0 right-0 flex items-center gap-1 py-3 md:py-2 px-4 md:px-6 bg-green-600 rounded-3xl transition-colors duration-150 hover:bg-green-700">
        <SearchIcon className="text-white" size={20} />
        <p className="text-white text-sm md:text-lg">Search</p>
      </button>
    </form>
  );
};

export default Search;
