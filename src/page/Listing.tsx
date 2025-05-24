import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GridIcon, ListIcon, PlusIcon } from "@/assets";
import GridDisplay from "@/components/Seller/Listing/GridDisplay";
import ListDisplay from "@/components/Seller/Listing/ListDisplay";

function Listing() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [activeTab, setActiveTab] = useState<"active" | "expired" | "unpublished">("active");
  const navigate = useNavigate();

  return (
    <section className="container mx-auto p-4">
      <div className="flex items-center justify-between p-4 container mx-auto">
        <h2 className="text-input text-2xl font-bold">Your Listings</h2>
        <div className="flex items-center gap-4">
          <img
            src={GridIcon}
            alt="grid icon"
            className={`w-8 h-8 cursor-pointer ${view === "grid" ? "opacity-100" : "opacity-50 "}`}
            onClick={() => setView("grid")}
          />
          <img
            src={PlusIcon}
            alt="plus icon"
            className="w-8 h-8 cursor-pointer"
            onClick={() => navigate("/create-property")}
          />
          <img
            src={ListIcon}
            alt="list icon"
            className={`w-8 h-8 cursor-pointer ${view === "list" ? "opacity-100" : "opacity-50 "}`}
            onClick={() => setView("list")}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center">
          <p
            className={`text-input p-4  cursor-pointer ${activeTab === "active" ? "font-bold bg-light-blue" : "bg-white"}`}
            onClick={() => setActiveTab("active")}
          >
            Active <span className="p-1 px-2 bg-black text-white rounded">4</span>
          </p>
          <p
            className={`text-input p-4  cursor-pointer ${activeTab === "expired" ? "font-bold bg-light-blue" : "bg-white"}`}
            onClick={() => setActiveTab("expired")}
          >
            Expired <span className="p-1 px-2 bg-black text-white rounded">4</span>
          </p>
          <p
            className={`text-input p-4  cursor-pointer ${activeTab === "unpublished" ? "font-bold bg-light-blue" : "bg-white"}`}
            onClick={() => setActiveTab("unpublished")}
          >
            Unpublished <span className="p-1 px-2 bg-red-600 text-white rounded">4</span>
          </p>
        </div>
        {view === "grid" ? <GridDisplay activeTab={activeTab} /> : <ListDisplay activeTab={activeTab} />}
      </div>
    </section>
  );
}

export default Listing;