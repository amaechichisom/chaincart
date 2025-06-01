import { cn } from "@/lib/utils";

interface TabSelectorProps {
  activeTab: "profile" | "kyc";
  setActiveTab: (tab: "profile" | "kyc") => void;
}

export const TabSelector = ({ activeTab, setActiveTab }: TabSelectorProps) => (
  <div className="flex gap-4 border-b">
    {["profile", "kyc"].map((tab) => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab as "profile" | "kyc")}
        className={cn(
          "pb-2 border-b-2 font-semibold border-0 focus:outline-none",
          activeTab === tab
            ? "border-blue-500 text-blue-600"
            : "border-transparent text-gray-500"
        )}
      >
        {tab === "profile" ? "Profile" : "KYC"}
      </button>
    ))}
  </div>
);
