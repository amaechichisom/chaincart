
import AdminProfileSection from "../shared/AdminProfileSection";
import AboutSection from "../shared/AboutSection";
// import ProfileSection from "../shared/ProfileSection";
// import ListingSection from "./ListingSection";

export default function SellerDashbaord() {

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
      <div className="flex flex-col md:flex-row gap-6">
        <AdminProfileSection />
        <AboutSection/>
      </div>
    </div>
  );
}
