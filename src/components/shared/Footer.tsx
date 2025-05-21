import { Link } from "react-router-dom";
import SocialIcons from "./SocialIcons";

export default function Footer() {
  return (
    <footer className="bg-neutral-50 text-center py-6">
      <div className="container mx-auto flex justify-between items-center text-neutral-500 text-sm font-light">
        <SocialIcons />

        <div className="flex justify-center items-center gap-4 text-sm">
          <p className="text-sm">Copyright © 2025 © All rights reserved ChainCart</p>
          <Link to='/' className="text-neutral-500 text-sm font-light">Privacy Policy</Link>
        </div>
      </div>
        

      
      
    </footer>
  );
}
