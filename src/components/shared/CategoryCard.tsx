
import { CategoryCardProps } from "@/@types/types";
import { Card, CardContent } from "@/components/ui/card";


const CategoryCard: React.FC<CategoryCardProps> = ({ image, title, count }) => {
  return (
    <Card className="flex items-center p-4 space-x-4 bg-border/40  border border-border shadow-sm">
      <img src={image} alt={title} width={60} height={60} className="w-16 h-16 object-contain" />
      <CardContent className="p-0">
        <h3 className="text-lg font-semibold text-input truncate">{title}</h3>
        <p className="text-input-secondary">{count} Items</p>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
