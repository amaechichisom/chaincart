import { useState } from "react";
import {
  Bell,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import Logo from "./Logo";
import { ProfilePic } from "@/assets";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="container mx-auto bg-white px-2 py-4 flex items-center justify-between relative">
      {/* Left: Logo + Name */}
      <div className="flex items-center space-x-2">
        <Logo size="small"/>
        <span className="text-xl font-semibold text-gray-800">ChainCart</span>
      </div>

      {/* Center: Nav (Hidden on mobile) */}
      <nav className="hidden md:flex space-x-6">
        <a href="/seller" className="text-gray-700 hover:text-black border-b-2 !border-white hover:!border-[#008ECC] font-medium pb-1">Profile</a>
        <a href="/seller/listing" className="text-gray-700 hover:text-black border-b-2 !border-white hover:!border-[#008ECC] font-medium pb-1">Listing</a>
      </nav>

      {/* Right: Notification + Avatar */}
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 hover:text-black rounded-4xl border border-neutral-800 hover:!border-black p-2">
          <Bell className="w-4 h-4" />
        </button>

        {/* Avatar Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-200 focus:outline-none"
          >
            <img
              src={ProfilePic}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md py-2 z-10">
              <button
                className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Hamburger Button (Mobile) */}
        <button
          className="md:hidden text-gray-700 hover:text-black"
          onClick={() => setMenuOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Slide-In Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-20 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <span className="text-lg font-semibold">Menu</span>
          <button onClick={() => setMenuOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex flex-col p-4 space-y-4">
          <a href="/seller" className="text-gray-700 hover:text-black hover:border-2 hover:border-primary font-medium pb-1">Profile</a>
          <a href="/seller/listing" className="text-gray-700 hover:text-black hover:border-2 hover:border-primary font-medium pb-1">Listing</a>
          <button className="flex items-center text-gray-700 hover:text-black font-medium">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </nav>
      </div>

      {/* Background overlay for mobile menu */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-30 z-10"
        />
      )}
    </header>
  );
};

export default Header;
