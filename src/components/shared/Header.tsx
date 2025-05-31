import { useState, MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import CategorySelector from "./CategorySelector";
import { headerMenu, profileHeaderMenu } from "@/CONSTANT/data";
import Logo from "./Logo";
import SearchBar from "../search/SearchBar";
import XionWallet from "../Wallet/XionWallet";
import AppButton from "./AppButton";

interface IMobileMenu {
  isOpen: boolean;
  closeMobile: () => void;
  handleOutsideClick: (e: MouseEvent<HTMLDivElement>) => void;
}

const MobileMenu: React.FC<IMobileMenu> = ({ isOpen, closeMobile, handleOutsideClick }) => {
  const location = useLocation();
  const isSeller = location.pathname.includes("seller") || location.search.includes("seller");  
  const menu = !isSeller ? headerMenu  : profileHeaderMenu;
    const authRoute = location.pathname.includes('auth')
  const navigate = useNavigate()
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
            {!isSeller && (<SearchBar />)}
            { !authRoute && (
            <nav>
              <ul className="flex flex-col gap-4 text-lg ">
                {menu.map((item, index) => (
                  <Link 
                    to={item.href} 
                    key={index} 
                    onClick={() =>{
                      closeMobile();
                      window.scrollTo(0, 0);
                    }} 
                    className={`!text-white hover:!underline cursor-pointer text-sm py-2 px-4 rounded-2xl ${item.href === location.pathname ? "bg-[#B9E8FE]" : ""}`}
                  >
                    {item.name}
                  </Link>
                ))}
              </ul>
            </nav>

            ) }
            {
              !isSeller && (

                <AppButton label="Become a seller" onClick={()=>navigate('/auth')}/>
              )
            }
            {/* <p className="font-medium text-white">
              <Link to={'/auth'}>Become a seller</Link>
            </p> */}
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
    const navigate = useNavigate()

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
          {/* <p className="font-medium text-input">
                          <Link to={'/auth'}>Become a seller</Link>
          </p> */}
                      <AppButton label="Become a seller" onClick={()=>navigate('/auth')}/>
          <XionWallet />
        </div>
      </div>
    </section>
  );
};

const BottomHeader: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const search = params.get("search");
  const authRoute = location.pathname.includes('auth')
  const isSeller = location.pathname.includes("seller") || location.search.includes("seller");  
  const menu = !isSeller ? headerMenu  : profileHeaderMenu;
  return (
  <section className="p-3 px-4 flex items-center border-t border-gray-700 gap-6 container mx-auto">
    
    <div className="block lg:hidden">
      <CategorySelector />
    </div>
    {!authRoute && (
      
    <nav className={`hidden lg:flex mt-2 w-full mx-auto`}>
      <ul className={`flex gap-6 w-full ${isSeller ? "justify-center" : "justify-end"}`}>
        {menu.map((item, index) => (
          <li key={index}>
            <Link
              to={item.href}
              className={`!text-neutral-600 font-medium hover:!bg-[#B9E8FE] cursor-pointer text-sm rounded-3xl py-2 px-4 
                ${item.href === `/category?search=${search}` ? "bg-[#B9E8FE]" : "bg-neutral-100"}`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
    )}
  </section>
)};

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