import { PauseList, SoldListing, ActiveList, BoughtList, UnderReviewList } from "@/assets";
import { IiActive } from "@/page/ListingPage";

export const emptyStateMap: Record<
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
