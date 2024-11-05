import { X } from "lucide-react";
import { FarmFilter, ProductFilter } from "./Filter";

// Define a type for the filter kind
type FilterType = "farm" | "product";

interface MobileFilterProps {
  showFilter: boolean;
  handleOpenFilter: () => void;
  filterType: FilterType; // Specify whether it's 'farm' or 'product'
  onChange: () => void; // Generic handler for filter changes
}

const MobileFilter: React.FC<MobileFilterProps> = ({
  showFilter,
  handleOpenFilter,
  filterType,
  onChange,
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
      {/* Conditionally render ProductFilter or FarmFilter based on filterType */}
      {filterType === "product" ? (
        <ProductFilter onFilterChange={onChange} />
      ) : (
        <FarmFilter onFilterChange={onChange} />
      )}
    </aside>
  );
};

export default MobileFilter;
