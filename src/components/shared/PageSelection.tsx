import { BuyProperty, SellProperty } from "@/assets"
import { Link } from "react-router-dom"

function PageSelection() {
  return (
    <div className="container mx-auto flex flex-col gap-6 py-10">
      <h2 className="text-4xl font-semibold text-center">
        Discover the world of real estate
        <br />
        With Chaincart, you can
      </h2>

      <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 w-full">
        {/* Buy Card */}
        <div className="flex flex-1 flex-col justify-between items-center p-6 rounded-2xl bg-white shadow-md border border-neutral-200 gap-4 text-center max-w-md w-full min-h-[420px]">
          <img src={BuyProperty} alt="buy property" className="object-cover h-40" />
          <div>
            <h3 className="font-semibold text-xl mb-2">Buy a property</h3>
            <p className="text-neutral-500">
              Discover your dream property with an unmatched browsing experience, detailed photos, and exclusive listings you won’t find anywhere else.
            </p>
          </div>
          <Link to="/" className="text-white bg-primary text-sm rounded-md py-2 px-4 mt-2">Browse properties</Link>
        </div>

        {/* Sell Card */}
        <div className="flex flex-1 flex-col justify-between items-center p-6 rounded-2xl bg-white shadow-md border border-neutral-200 gap-4 text-center max-w-md w-full min-h-[420px]">
          <img src={SellProperty} alt="sell property" className="object-cover h-40 -ml-8" />
          <div>
            <h3 className="font-semibold text-xl mb-2">Sell a property</h3>
            <p className="text-neutral-500">
              With expert support and smart selling tools, we make it easy to attract the right buyers and sell off properties with confidence.
            </p>
          </div>
          <Link to="/" className="text-white bg-primary text-sm rounded-md py-2 px-4 mt-2">Sell a property</Link>
        </div>
      </div>
    </div>
  )
}

export default PageSelection