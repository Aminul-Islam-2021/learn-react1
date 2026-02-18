import React from "react";

const MenuButton = () => {
  return (
    <>
      <button
        //onClick={() => setMobileFiltersOpen(true)}
        className="lg:hidden p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </>
  );
};

export default MenuButton;
