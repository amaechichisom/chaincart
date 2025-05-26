import EditProfilePicture from "./EditProfilePicture";
import EditSection from "./EditSection";


export default function SellerDashbaord() {

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
      <div className="flex flex-col md:flex-row gap-6">
        <EditProfilePicture />
        <EditSection/>
      </div>
    </div>
  );
}
