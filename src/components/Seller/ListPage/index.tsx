import { useState } from "react";
import { Plus } from "lucide-react";
import { ListHead } from "./ListHead";
import { ListingCardGroup } from "./ListingCardGroup";
import { IiActive } from "@/page/ListingPage";

export default function ListPage() {
  const [activeTab, setActiveTab] = useState<IiActive>("Active");

  const tabs: IiActive[] = [
    "Active",
    "Paused",
    "Under Review",
    "Sold",
    "Bought",
  ];

  return (
    <section className="container mx-auto px-4 py-6">
      <ListHead
        btnText="Add New Listing"
        icons={<Plus />}
        title="Your Listings"
        href="/seller/listing/PostAds"
      />

      <div className="flex gap-4 border-b pb-2 mt-4 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`transition-all text-sm py-2 px-4 rounded-2xl focus:outline-none ${
              activeTab === tab ? "bg-[#B9E8FE] text-white" : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <ListingCardGroup status={activeTab} />
      </div>
    </section>
  );
}
