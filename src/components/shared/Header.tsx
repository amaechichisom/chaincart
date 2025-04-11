import { useState, MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import SwitchButton from "./SwitchButton";
import Notification from "./Notification";
// import { InputField } from "./InputField";
import CategorySelector from "./CategorySelector";
import { headerMenu } from "@/CONSTANT/data";
import { Link, useNavigate } from "react-router-dom";
// import { WalletConnect } from "../Wallet/WalletConnect";
import Logo from "./Logo";
import SearchBar from "../search/SearchBar";
// import XionWallet from "../Wallet/XionWallet";
import AppButton from "./AppButton";
import { RootState, useAppSelector } from "@/store";
import useAuth from "../auth/hook/useAuth";
import AvatarMenu from "./Avatar";

interface IMobileMenu {
  isOpen: boolean;
  closeMobile: () => void;
  handleOutsideClick: (e: MouseEvent<HTMLDivElement>) => void;
}

const MobileMenu: React.FC<IMobileMenu> = ({ isOpen, closeMobile, handleOutsideClick }) =>{
  const navigate = useNavigate()
  const {isAuthenticated} = useAppSelector((state:RootState)=>state.auth)
  const {handleLogout} = useAuth()
  return(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 bg-transparent bg-opacity-50 flex justify-end md:hidden z-10"
          onClick={handleOutsideClick}
        >
          <div
            className="w-64 h-full bg-gray-900 shadow-lg flex flex-col items-center justify-center gap-6 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={closeMobile}  className="absolute top-5 right-5 text-white">
              <X className="w-6 h-6" />
            </button>
            
            <SearchBar/>
            <nav>
              <ul className="flex flex-col gap-4 text-lg">
                {headerMenu.map((item,index) => (
                  <Link to={item.href}  key={index}  onClick={closeMobile}  className="!text-white hover:!underline cursor-pointer text-sm">{item.name}</Link>
                ))}
              </ul>
            </nav>
            <Notification />
            <SwitchButton />
            {/* <WalletConnect/> */}
            {/* <XionWallet/> */}
            {
              isAuthenticated
              ?
              <AppButton label="Log Out" onClick={handleLogout} size={"lg"}/>:
            <AppButton label="Get Start" onClick={()=>navigate('/auth')} size={"lg"}/>
            }
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
};

interface ITopHeader {
  isOpen?: boolean;
  closeMobile?: () => void;
}

const TopHeader: React.FC<ITopHeader> = ({ isOpen, closeMobile }) => {
  const navigate = useNavigate()
  const {isAuthenticated} = useAppSelector((state:RootState)=>state.auth)
  // const {handleLogout} = useAuth()
  return(
  <section className="p-3 flex items-center justify-between gap-2 lg:container lg:mx-auto">
    {/* <h2 className="text-lg font-bold text-warp-100 px-2">warppay</h2> */}
    <Logo/>
    <div className="block md:hidden">
      {/* <AppButton label="Connect" variant="default" /> */}
      <div className="flex items-center gap-4">
        {/* <WalletConnect/> */}
        {/* <XionWallet/> */}
        
        {
              isAuthenticated
              ?
              <AvatarMenu/>:
            <AppButton label="Get Start" onClick={()=>navigate('/auth')} size={"lg"}/>
            }
        <button onClick= {closeMobile} className="text-white">
          {isOpen ? <X className="text-warp-100 w-6 h-6" /> : <Menu className="text-warp-100 w-6 h-6" />}
        </button>
      </div>
    </div>
    <div className="hidden md:flex flex-1 justify-between items-center gap-6">
      <SearchBar/>
      <Notification />
      <SwitchButton />
      {/* <AppButton label="Connect Wallet" variant="default" /> */}
      {/* <WalletConnect/> */}
      {/* <XionWallet/> */}
      {
              isAuthenticated
              ?
              <AvatarMenu/>:
              <AppButton label="Get Start" onClick={()=>navigate('/auth')} size={"lg"}/>
            }
    </div>
  </section>
);
}

const BottomHeader: React.FC = () => (
  <section className="p-3 flex items-center border-t border-gray-700 gap-6 container mx-auto">
    <CategorySelector />
    <nav className="hidden md:flex flex-1">
      <ul className="flex gap-6 justify-end w-full">
        {headerMenu.map((item,index) => (
          <Link to={item.href}  key={index}   className="!text-input hover:!underline cursor-pointer text-sm ">{item.name}</Link>
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
    <header className=" text-white">
      <TopHeader isOpen={isOpen} closeMobile={closeMobile} />
      <MobileMenu isOpen={isOpen} closeMobile={closeMobile} handleOutsideClick={handleOutsideClick} />
      <BottomHeader />
    </header>
  );
};

export default Header;
