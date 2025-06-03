import SearchInput from '@/components/shared/small/SearchInput';
import Selector from '@/components/shared/small/Selector';
import { ListIcon } from '@/assets/icon';

const FiltersSection = ({
  selectedType,
  setSelectedType,
  selectedPrice,
  setSelectedPrice,
  selectedLocation,
  setSelectedLocation,
}) => {
  return (
    <div className="mt-4 flex flex-wrap gap-4">
      {/* Search Input - Larger */}
      <div className="w-full flex-grow md:w-auto md:flex-grow-[2]">
        <SearchInput placeholder="properties" cn="!w-full" />
      </div>

      {/* Selectors */}
      <div className="min-w-[150px] flex-grow md:w-auto">
        <Selector
          cn="!w-full"
          lists={['All', 'Active', 'Inactive']}
          selectedOption={selectedType}
          setSelectedOption={setSelectedType}
        />
      </div>
      <div className="min-w-[150px] flex-grow md:w-auto">
        <Selector
          cn="!w-full"
          lists={['All', 'Active', 'Inactive']}
          selectedOption={selectedPrice}
          setSelectedOption={setSelectedPrice}
        />
      </div>
      <div className="min-w-[150px] flex-grow md:w-auto">
        <Selector
          cn="!w-full"
          lists={['All', 'Active', 'Inactive']}
          selectedOption={selectedLocation}
          setSelectedOption={setSelectedLocation}
        />
      </div>

      {/* Clear Filter Button */}
      <div className="w-[122px]">
        <button className="bg-primary flex cursor-pointer place-items-center items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-[#01367f]">
          <ListIcon className="text-base" />
          <div className="text-sm">Clear Filter</div>
        </button>
      </div>
    </div>
  );
};

export default FiltersSection;
