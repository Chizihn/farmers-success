import { X } from "lucide-react";
import Filter from "./Filter";

interface MobileFilterProps {
  showFilter: boolean;
  handleOpenFilter: () => void;
}

const MobileFilter: React.FC<MobileFilterProps> = ({
  showFilter,
  handleOpenFilter,
}) => {
  return (
    <aside
      className={`fixed top-0 right-0 w-64 bg-white h-full z-50 transform ${
        showFilter ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out lg:hidden`}
    >
      <div className="flex justify-end p-4 border-b">
        <button onClick={handleOpenFilter}>
          <X className="text-gray-500" size={40} />
        </button>
      </div>
      <Filter />
    </aside>
  );
};

export default MobileFilter;
