import { useState } from "react";
import { apartmentData } from "@/CONSTANT/data";
import GridProperty from "./GridProperty";

const ITEMS_PER_PAGE = 4;

function GridDisplay({ activeTab }: { activeTab: string }) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(apartmentData.length / ITEMS_PER_PAGE);
  const paginatedData = apartmentData.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="w-full p-8 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl bg-[#F3F8FF] flex flex-col gap-4 max-h-[40rem] h-auto overflow-y-auto">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {paginatedData.map((item, idx) => (
          <GridProperty key={idx} {...item} />
        ))}
      </div>
      {/* Pagination */}
      <div className="flex mt-4">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setPage(idx + 1)}
            className={`w-8 h-8 flex items-center justify-center rounded border border-gray-300 text-sm font-semibold
              ${page === idx + 1 ? "bg-primary text-white border-primary" : "bg-white text-gray-700"}`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default GridDisplay;