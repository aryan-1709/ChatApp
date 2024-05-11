import React, { useState } from "react";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left z-20 ">
      <div className="w-[50px] flex justify-center">
        <button
          type="button"
          className="   flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-slate-300 text-sm font-medium text-gray-700 hover:bg-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 "
          onClick={toggleDropdown}
        >
          <div className="flex justify-between text-sm text-neutral-400 max-md:flex-wrap">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/786bf8f8989cb8ba64bc360d39b989b83e32694c5d3cd729357395843a10b94e?apiKey=0387e70fd0ca4fd697a1441ac9e964d1&"
              alt="Not found"
              className="shrink-0 my-auto w-5 aspect-square v"
            />
            <div className="flex flex-col grow shrink-0 justify-center basis-0 w-fit"></div>
          </div>
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-slate-300 ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Option 1
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Option 2
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Option 3
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
