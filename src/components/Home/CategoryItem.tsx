import { SaleIcon } from '@/assets'

function CategoryItem({ src, title}: {src?: string, title?: string}) {
  return (
    <div className='flex flex-col items-center justify-center gap-2 p-[3px] pb-3 max-w-40 max-h-48 mx-auto lg:mx-0'>
      <div className="relative">
          <img src={src ?? SaleIcon} 
          alt="Property" 
          className="w-full object-cover"/>
      </div>

      <p className='font-semibold text-sm text-neutral-500 px-2 truncate'>{title || "Not set"}</p>
    </div>


  )
}

export default CategoryItem