import AboutSeller from "./AboutSeller";

export default function SellerDashbaord() {
  
  console.log('we are here')
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="!text-2xl md:text-2xl font-bold text-center md:text-left mb-6">Your Profile</h1>
      <AboutSeller/>
    </div>
  );
}
