import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { headerMenu } from "@/CONSTANT/data";


const CategorySelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="relative flex flex-col items-start gap-2">
      <div className="flex items-center gap-2 border rounded-lg p-2">

        <Button
          className="flex items-center gap-2 text-white"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          All Categories
          <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-4 h-4" />
          </motion.span>
        </Button>
        {selectedCategory && (
        <div className="text-sm text-gray-400 mt-1">
          <span className="text-warp-100 font-medium bg-gray-200 p-2 rounded-lg">{selectedCategory}</span>
        </div>
      )}
      </div>

      

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className={cn(
              "absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50 border border-gray-200",
              isOpen && "overflow-hidden"
            )}
          >
            <ul className="py-2" onMouseLeave={() => setIsOpen(false)}>
              {headerMenu.map((category, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors text-warp-100"
                  onClick={() => {
                    setSelectedCategory(category.name);
                    setIsOpen(false);
                  }}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategorySelector;
