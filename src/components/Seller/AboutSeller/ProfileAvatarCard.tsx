import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Copy } from "@/assets";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { toast } from "sonner";
import { maskAddress } from "@/utils/maskAddress";

export const ProfileAvatarCard = ({ user, profile }: any) => {
  const addressMasked = maskAddress(user?.walletAddress || "");

  return (
    <div className="flex flex-col items-center text-center w-full md:w-1/3">
      <Avatar className="w-24 h-24 lg:w-32 lg:h-32">
        <AvatarImage src={profile?.avatar} alt="User Avatar" />
        <AvatarFallback>{profile?.name?.charAt(0)?.toUpperCase() || "U"}</AvatarFallback>
      </Avatar>

      <h2 className="text-2xl font-bold mt-4 text-black truncate">
        {profile?.name || "Anonymous User"}
      </h2>
      <p className="text-lg mt-2 text-gray-700">KYC Status: {user.kycStatus}</p>
      <div className="flex items-center gap-2 mt-2 text-black">
        <span className="text-sm">{addressMasked}</span>
        <img
          src={Copy}
          alt="copy"
          className="w-4 h-4 cursor-pointer hover:opacity-70"
          onClick={() => {
            if (user?.walletAddress) {
              copyToClipboard(user.walletAddress);
              toast.success(`Address copied: ${addressMasked}`);
            }
          }}
        />
      </div>
    </div>
  );
};
