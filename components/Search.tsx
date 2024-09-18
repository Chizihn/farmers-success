import { SearchIcon } from "lucide-react";

const Search = () => {
  return (
    <form className="w-full md:w-[50rem] flex gap-3 relative my-4 md:my-0">
      <input
        type="text"
        className="w-full border-2 border-gray-300 p-2 md:p-3 rounded-3xl"
        placeholder="Search..."
      />
      <button className="absolute top-0 right-0 flex items-center gap-2 py-2 px-4 md:py-3 md:px-6 bg-green-600 rounded-3xl">
        <SearchIcon className="text-white" size={20} />
        <p className="text-white text-sm md:text-lg">Search</p>
      </button>
    </form>
  );
};

export default Search;
