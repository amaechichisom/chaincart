// import { Clipboard } from "lucide-react";
// import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import { Card } from "../ui/card";
import { RootState, useAppSelector } from "@/store";
import { maskAddress } from "@/utils/maskAddress";
// import { useGetXionBalanceQuery } from "@/api/xionService";
// import {  useState } from "react";
import { toast } from "sonner";
import { Copy, ProfilePic } from "@/assets";
import { copyToClipboard } from "@/utils/CopyToClipBoard";
// import useMeta from "@/hooks/useMeta";

const ProfileSection = ({image}: {image?: string}) => {
  // const { getMetaBalance } = useMeta();
  // const [balance, setBalance] = useState<string | undefined>("0.00");
  const { user } = useAppSelector((state: RootState) => state.auth);
  const address = user?.walletAddress;
  const addressMasked = maskAddress(
    address || "0x0000000000000000000000000000000000000000"
  );
  
  
  // const { data } = useGetXionBalanceQuery(address, { skip: !address });
  // const balance = data?.data?.balance || "0.00";   



  return (
    <div className="w-full md:w-1/3 p-6 rounded-2xl bg-[#F3F8FF] flex justify-center items-center ">
      <div className="flex flex-col items-center text-center">
        <Avatar className="w-24 h-24 lg:w-32 lg:h-32">
          <AvatarImage src={image || ProfilePic} alt="User Avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>

        <h2 className="text-2xl lg:text-3xl font-bold mt-4 text-black truncate">
          John Doe
        </h2>

        <div className="flex items-center gap-2 mt-2 text-black dark:text-gray-400">
          <span className="text-sm">{addressMasked}</span>
          <img src={Copy} alt="copy" 
          className="w-4 h-4 cursor-pointer text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition" 
          onClick={() => {
              copyToClipboard(address);
              toast.success(`Address copied to clipboard: ${addressMasked}`, {
                duration: 2000,
                style: {
                  background: "#008ECC",
                  color: "#fff",
                },
              });
            }}
          />
          {/* <Clipboard
            size={18}
            className="cursor-pointer text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition"
            onClick={() => {
              copyToClipboard();
              toast.success(`Address copied to clipboard: ${addressMasked}`, {
                duration: 2000,
                style: {
                  background: "#008ECC",
                  color: "#fff",
                },
              });
            }}
          /> */}
        </div>

        {/* <div className="mt-6 flex gap-4">
          <Button variant="outline" className="w-36">
            View Profile
          </Button>
          <Button className="w-36">Edit Profile</Button>
        </div> */}

      </div>
    </div>
  );
};

export default ProfileSection;
