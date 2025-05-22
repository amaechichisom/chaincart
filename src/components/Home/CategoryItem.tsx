import { SaleIcon } from '@/assets'

function CategoryItem({ src, title }: { src?: string, title?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-2 pb-3 w-full max-w-[160px] min-w-[100px] mx-auto lg:mx-0">
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28">
        <img
          src={src ?? SaleIcon}
          alt="Property"
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
      <p className="font-semibold text-xs sm:text-sm text-neutral-500 px-2 truncate text-center">
        {title || "Not set"}
      </p>
    </div>
  )
}

export default CategoryItem