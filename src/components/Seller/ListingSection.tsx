

import ListingItem from './ListingItem'

function ListingSection() {
  return (
    <div className="w-full md:w-2/3 p-8 rounded-2xl bg-[#F3F8FF] flex flex-col gap-4 max-h-[22rem] h-auto overflow-y-auto">
      <h3 className='text-2xl font-bold mb-3'>Live Listings</h3>
      <div className='flex flex-col gap-6'>
        <ListingItem/>
        <ListingItem/>
        <ListingItem/>
        <ListingItem/>
      </div>
    </div>
  )
}

export default ListingSection