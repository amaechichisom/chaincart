
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { ProfilePic } from "@/assets";

const ProfileSection = ({image}: {image?: string}) => {

  return (
    <div className="w-full md:w-1/3 p-6 flex justify-center items-center ">
      <div className="flex flex-col items-center text-center">
        <div className="rounded-full border border-neutral-500 p-4">
            <Avatar className="w-24 h-24 lg:w-32 lg:h-32">
                <AvatarImage src={image || ProfilePic} alt="User Avatar" />
                <AvatarFallback>JD</AvatarFallback>
            </Avatar>
        </div>

        <h2 className="text-2xl lg:text-3xl font-bold mt-4 text-black truncate">
          Viral Properties
        </h2>

        <div className="flex items-center gap-2 mt-2 text-black dark:text-gray-400">
          <span className="text-sm">Real Estate Developer</span>
        </div>

      </div>
    </div>
  );
};

export default ProfileSection;
