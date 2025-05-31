import Category from "@/components/Category";
// import { useLocation } from "react-router-dom";
export default function CategoryPage() {
// const location = useLocation();
// const params = new URLSearchParams(location.search);
// const search = params.get("search");
//   const type = params.get("type");
//   const local = params.get("location");

  return (
    <div className="p-4 container mx-auto space-y-4">
      {/* <h1 className="text-xl font-semibold">Category: {search}</h1> */}
      <Category/>
    </div>
  )
}

