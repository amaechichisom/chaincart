import { useState, MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

import CategorySelector from "./CategorySelector";
import { headerMenu } from "@/CONSTANT/data";
import Logo from "./Logo";
import SearchBar from "../search/SearchBar";
import XionWallet from "../Wallet/XionWallet";

interface IMobileMenu {
  isOpen: boolean;
  closeMobile: () => void;
  handleOutsideClick: (e: MouseEvent<HTMLDivElement>) => void;
}

const MobileMenu: React.FC<IMobileMenu> = ({ isOpen, closeMobile, handleOutsideClick }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 bg-transparent bg-opacity-50 flex justify-end lg:hidden z-10"
          onClick={handleOutsideClick}
        >
          <div
            className="w-64 h-full bg-gray-900 shadow-lg flex flex-col items-start justify-start pt-12 px-4 gap-6  overflow-y-scroll"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={closeMobile} className="absolute top-5 right-5 text-white">
              <X className="w-6 h-6" />
            </button>
            <SearchBar />
            <nav>
              <ul className="flex flex-col gap-4 text-lg ">
                {headerMenu.map((item, index) => (
                  <Link 
                    to={item.href} 
                    key={index} 
                    onClick={closeMobile} 
                    className="!text-white hover:!underline cursor-pointer text-sm"
                  >
                    {item.name}
                  </Link>
                ))}
              </ul>
            </nav>
            <p className="font-medium text-white">Become a seller</p>
            <XionWallet />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface ITopHeader {
  isOpen: boolean;
  closeMobile: () => void;
}

const TopHeader: React.FC<ITopHeader> = ({ isOpen, closeMobile }) => {
  return (
    <section className="p-3 px-4 flex items-center justify-between gap-2 lg:container lg:mx-auto">
      <div className="flex items-center gap-2">
        <Logo size="small" />
        <h3 className="font-manrope text-xl text-warp-100 font-bold">ChainCart</h3>
      </div>
      <div className="block lg:hidden">
        <div className="flex items-center gap-4">
          {/* <XionWallet /> */}
          <button onClick={closeMobile} className="text-white">
            {isOpen ? (
              <X className="text-warp-100 w-6 h-6" />
            ) : (
              <Menu className="text-warp-100 w-6 h-6" />
            )}
          </button>
        </div>
      </div>
      <div className="hidden lg:flex flex-1 justify-between items-center gap-6">
        <div className="ml-6">
          <SearchBar />
        </div>
        <div className="md:flex items-center gap-6 hidden">
          <p className="font-medium text-input">Become a seller</p>
          <XionWallet />
        </div>
      </div>
    </section>
  );
};

const BottomHeader: React.FC = () => (
  <section className="p-3 px-4 flex items-center border-t border-gray-700 gap-6 container mx-auto">
    <div className="block lg:hidden">
      <CategorySelector />
    </div>
    <nav className="hidden lg:flex mt-2">
      <ul className="flex gap-6 justify-end w-full">
        {headerMenu.map((item, index) => (
          <Link 
            to={item.href} 
            key={index} 
            className="!text-neutral-600 font-medium hover:!underline cursor-pointer text-sm bg-neutral-100 rounded-3xl py-2 px-4"
          >
            {item.name}
          </Link>
        ))}
      </ul>
    </nav>
  </section>
);

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMobile = () => setIsOpen((prev) => !prev);
  
  const handleOutsideClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <header className="text-white">
      <div className="shadow-lg shadow-[#1018281A] bg-white">
        <TopHeader isOpen={isOpen} closeMobile={closeMobile} />
        <MobileMenu isOpen={isOpen} closeMobile={closeMobile} handleOutsideClick={handleOutsideClick} />
      </div>
      <BottomHeader />
    </header>
  );
};

export default Header;