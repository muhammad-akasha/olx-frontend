// components/LocationDropdown.js
"use client";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa"; // Single arrow icon
import { IoLocationOutline } from "react-icons/io5";

const LocationDropdown = () => {
  const [locations] = useState([
    "Pakistan",
    "Azad Kashmir, Pakistan",
    "Balochistan, Pakistan",
    "Islamabad Capital Territory, Pakistan",
    "Khyber Pakhtunkhwa, Pakistan",
    "Northern Areas, Pakistan",
    "Punjab, Pakistan",
    "Sindh, Pakistan",
  ]); // Dropdown options
  const [selectedLocation, setSelectedLocation] = useState("Pakistan"); // Default selection
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown toggle state

  const handleSelection = (location) => {
    setSelectedLocation(location);
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  return (
    <div className="relative inline-block text-left w-40 md:w-50 lg:w-80">
      {/* Selected option with arrow */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center justify-between w-full p-3 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none"
      >
        <div className="flex gap-2 items-center font-semibold">
          <IoLocationOutline fontSize={22} />
          {selectedLocation}
        </div>
        <FaChevronDown
          className={`ml-2 text-gray-500 transform transition-transform ${
            isDropdownOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Dropdown options */}
      {isDropdownOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {locations.map((location, index) => (
            <li
              key={index}
              className={`px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 cursor-pointer ${
                selectedLocation === location
                  ? "bg-indigo-200 font-semibold"
                  : ""
              }`}
              onClick={() => handleSelection(location)}
            >
              {location}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationDropdown;
