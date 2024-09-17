import { SearchIcon } from "lucide-react";

const Search = () => {
  return (
    <form>
      <div className="w-[50rem] flex gap-3 relative">
        <input
          type="text"
          name=""
          id=""
          className="w-full border-2 border-gray-300 p-3 relative rounded-3xl"
        />
        <button className="absolute top-0 right-0 flex items-center gap-2 py-3 px-6 bg-green-600 rounded-3xl text-center ">
          {" "}
          <SearchIcon className="text-white" size={20} />
          <p className="text-white text-lg"> Search</p>
        </button>
      </div>
    </form>
  );
};

export default Search;
