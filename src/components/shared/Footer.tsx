import { Link } from "react-router-dom";
import SocialIcons from "./SocialIcons";
import { ChainCart } from "@/assets";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-50 text-center py-6 px-6 text-sm mt-8">

      <div className="container mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-between gap-4 py-12 border-b border-neutral-200">
        
        <div className="flex flex-col items-center lg:items-start mb-6">
          <h1 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
            <span className=""><img src={ChainCart} alt="logo" className="w-6 h-6" /></span>
            ChainCart
          </h1>

          <div className="flex justify-start items-center gap-4 text-sm mt-4">
            <Link to="/" className="text-neutral-500 hover:underline">
              Terms and Conditions
            </Link>
            <Link to="/" className="text-neutral-500 hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center lg:items-start">
          <p className="text-sm text-neutral-500 mb-8">
            Get the latest updates about Chaincart’s new offers and property listings.
          </p>
          <form className="flex justify-center items-center gap-2 flex-wrap">
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-2 rounded-md border border-gray-300 text-black"
            />
            <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition duration-300">
              Subscribe
              <Mail className="w-4 h-4 ml-2 inline-block" />
            </button> 
          </form>
        </div>
        
      </div>

      <div className="container mx-auto flex flex-col md:flex-row gap-4 justify-between items-center text-neutral-500 text-sm font-light py-8">
        <SocialIcons />

        <div className="flex justify-center items-center md:gap-6 text-sm flex-wrap">
          <p className="text-sm">Copyright © 2025 © All rights reserved ChainCart</p>
          <Link to='/' className="text-neutral-500 text-sm font-light hover:underline">Privacy Policy</Link>
        </div>
      </div>
        

      
      
    </footer>
  );
}
