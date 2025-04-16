import { Clipboard } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card } from "../ui/card";
import { RootState, useAppSelector } from "@/store";
import { maskAddress } from "@/utils/maskAddress";
import { useGetXionBalanceQuery } from "@/api/xionService";
import {  useState } from "react";
// import useMeta from "@/hooks/useMeta";

const ProfileSection = () => {
  // const { getMetaBalance } = useMeta();
  // const [balance, setBalance] = useState<string | undefined>("0.00");
  const { user } = useAppSelector((state: RootState) => state.auth);
  const address = user?.walletAddress;
  const addressMasked = maskAddress(
    address || "0x0000000000000000000000000000000000000000"
  );
  
  
  const { data } = useGetXionBalanceQuery(address, { skip: !address });
  const balance = data?.data?.balance || "0.00";
  // useEffect(() => {
  //   if (address) {
  //     getMetaBalance(address!)
  //     .then((bal) => {
  //       console.log(bal)
  //       setBalance(bal)
  //     });
  //     console.log({ balance });
  //   }
  // }, [address, getMetaBalance, balance]);

  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(
        address || "0x0000000000000000000000000000000000000000"
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Card className="w-full md:w-1/3 p-6 shadow-lg rounded-2xl bg-white dark:bg-gray-900">
      <div className="flex flex-col items-center text-center">
        <Avatar className="w-24 h-24 border-4 border-primary">
          <AvatarImage src="/avatar.jpg" alt="User Avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>

        <h2 className="text-xl font-semibold mt-4 text-gray-800 dark:text-white">
          John Doe
        </h2>

        <div className="flex items-center gap-2 mt-2 text-gray-600 dark:text-gray-400">
          <span className="text-sm">{addressMasked}</span>
          <Clipboard
            size={18}
            className="cursor-pointer text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition"
            onClick={copyToClipboard}
          />
        </div>

        <div className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-200">
          <span className="text-gray-500 dark:text-gray-400">Balance:</span>
          <span className="ml-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-lg text-lg">
            {balance} XION
          </span>
        </div>

        <div className="mt-6 flex gap-4">
          <Button variant="outline" className="w-36">
            View Profile
          </Button>
          <Button className="w-36">Edit Profile</Button>
        </div>

        {copied && (
          <div className="mt-2 text-sm text-green-500 font-medium">
            Copied to clipboard!
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProfileSection;
