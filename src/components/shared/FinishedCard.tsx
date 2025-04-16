import { Card, CardContent } from "@/components/ui/card";
import { RootState, useAppSelector } from "@/store";
import AppButton from "./AppButton";
// import { WalletConnect } from "../Wallet/WalletConnect";

interface FinishedCardProps {
  image: string;
  discount?: number;
  title: string;
  description: string;
  date: string;
  category: string;
  btnLabel?: string;
}

const FinishedCard: React.FC<FinishedCardProps> = ({
  image,
  discount,
  title,
  description,
  date,
  category,
  btnLabel = "Shop Now",
}) => {
    const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);
  return (
    <Card className="border border-gray-200 shadow-md rounded-lg overflow-hidden">
      
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        {discount && (
          <span className="absolute top-2 left-2  text-white text-xs px-2 py-1 rounded-full">
            {discount}% OFF
          </span>
        )}
      </div>

      <CardContent className="p-4">
        <p className="text-gray-500 text-xs uppercase">{category}</p>
        <h3 className="text-lg font-semibold truncate">{title}</h3>
        <p className="text-gray-600 text-sm truncate">{description}</p>
        <p className="text-gray-400 text-xs mt-2">{date}</p>

          {    isAuthenticated && (
              <AppButton
                label={btnLabel}
                onClick={()=>{}}
                className="bg-primary text-white w-full mt-3"
              />
            ) 
            // : (
              // <WalletConnect buttonProps={{ className: "w-full mt-3", }} />
            // )
          }
        {/* <Button variant="default" className="mt-3 w-full">
          {btnLabel}
        </Button> */}
      </CardContent>
    </Card>
  );
};

export default FinishedCard;
