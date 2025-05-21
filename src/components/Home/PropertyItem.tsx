import { ApartmentOne } from '@/assets'

function PropertyItem({ src, title, price, discountPrice, discountPercentage}: {src?: string, title?: string, price?: number, discountPrice?: number, discountPercentage?: number}) {
  return (
    <div className='flex flex-col items-start justify-center gap-2 bg-white shadow-md rounded-lg p-[3px] pb-3 max-w-56 max-h-64 mx-auto lg:mx-0'>
      <div className="relative">
          <img src={src ?? ApartmentOne} 
          alt="Property" 
          className="w-full object-cover rounded-lg shadow-lg "/>
          {discountPercentage && <p className='absolute top-2 right-2 bg-[#E0F3FE] text-primary text-xs px-2 py-1 rounded-2xl font-semibold'>{discountPercentage}% OFF</p>}
      </div>

      <p className='font-semibold text-sm text-neutral-900 px-2 truncate'>{title || "Not set"}</p>
      <div className='flex items-center justify-between w-full px-2'>
        <p className='font-semibold text-sm text-neutral-500'>${price || "Not set"}</p>
        {discountPrice && <p className='font-light text-xs text-neutral-500 line-through'>${discountPrice || "Not set"}</p>}
      </div>
    </div>


  )
}

export default PropertyItem