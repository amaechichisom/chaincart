// import AppTabs from "../shared/AppTabs";
import ProfileSection from "../shared/ProfileSection";
import ListingSection from "./ListingSection";
// import AdCard from "./AdCard";
// import LiveAdsSection from "./LiveAdsSection";
// import PostAdForm from "./PostAdForm";

export default function SellerDashbaord() {
  
  // const tabsData = [
  //     { label: "Active Ads", value: "LiveAds", content: <LiveAdsSection /> },
  //     { label: "Post Ads", value: "PostAdForm", content: <PostAdForm /> },
    
  //   ];
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="!text-2xl md:text-2xl font-bold text-center md:text-left mb-6">Your Profile</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <ProfileSection />
        {/* <AppTabs tabs={tabsData} defaultValue={tabsData[0]?.value} /> */}
        <ListingSection/>
      </div>
    </div>
  );
}
