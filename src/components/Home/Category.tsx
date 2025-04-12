import { categoryCardData } from "@/CONSTANT/data";
import CategoryCard from "../shared/CategoryCard";
import { motion } from "framer-motion";

export default function Category() {
  return (
    <section className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-center py-7 pt-2">
        {
            categoryCardData.map((data,index)=>(
                <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <CategoryCard {...data}  key={index}/>
        </motion.div>
            ))
        }
    </section>
  )
}
