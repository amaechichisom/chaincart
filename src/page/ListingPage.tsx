import AppButton from "@/components/shared/AppButton";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PauseList,
  SoldListing,
  ActiveList,
  BoughtList,
  UnderReviewList,
} from "./../assets";
import { ListingCard } from "../components/Seller/ListingCard";
import { apartmentData } from "@/CONSTANT/data";

export type IiActive = "Active" | "Paused" | "Under Review" | "Sold" | "Bought";

export default function ListingPage() {
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

type IListing = {
  title: string;
  btnText: string;
  href?: string;
  icons: React.ReactNode;
};

export const ListHead = ({ btnText, title, href, icons }: IListing) => {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col  md:flex-row justify-between items-center  space-y-6">
      <p className="text-lg font-semibold">{title}</p>
      <AppButton
        label={btnText}
        onClick={() => navigate(href!)}
        leftIcon={icons}
      />
    </section>
  );
};

type ListingCardGroupProps = {
  status: IiActive;
};

const emptyStateMap: Record<
  IiActive,
  {
    image: string;
    text: string;
    buttonLabel: string;
    buttonHref: string;
  }
> = {
  Active: {
    image: ActiveList,
    text: "You have no active listings yet.",
    buttonLabel: "Create Listing",
    buttonHref: "/listing/PostAds",
  },
  Paused: {
    image: PauseList,
    text: "You haven’t paused any listings yet.",
    buttonLabel: "Go to Listings",
    buttonHref: "/listing",
  },
  "Under Review": {
    image: UnderReviewList,
    text: "You have no listings under review.",
    buttonLabel: "Submit for Review",
    buttonHref: "/listing/PostAds",
  },
  Sold: {
    image: SoldListing,
    text: "No items have been sold yet.",
    buttonLabel: "View Items",
    buttonHref: "/listing",
  },
  Bought: {
    image: BoughtList,
    text: "You haven’t bought anything yet.",
    buttonLabel: "Browse Items",
    buttonHref: "/marketplace",
  },
};

const ListingCardGroup = ({ status }: ListingCardGroupProps) => {
  const navigate = useNavigate();

  if (apartmentData.length === 0) {
    const { image, text, buttonLabel, buttonHref } = emptyStateMap[status];
    return (
      <div className="flex flex-col items-center justify-center text-center py-12 space-y-4">
        <img
          src={image}
          alt={`${status} empty`}
          className="w-48 h-48 object-contain"
        />
        <p className="text-gray-600 text-lg">{text}</p>
        <AppButton label={buttonLabel} onClick={() => navigate(buttonHref)} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
      {apartmentData.map((item, index) => (
        <ListingCard
        id={index}
          key={index}
          status={status}
          title={`${item.title}-${status}`}
          price={`$${item.price}`}
          image={item.src}
        />
      ))}
    </div>
  );
};
