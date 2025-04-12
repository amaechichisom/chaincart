import Coin3D from "./Coin3D"

function Sponsor() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 container mx-auto'>
        <div className="flex flex-col items-center justify-center text-center md:text-left">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-slate-800 leading-tight">
            Proudly made with <br />
            <span className="text-[64px] sm:text-[96px] md:text-[120px] lg:text-[150px] font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-black/70 to-black/90">
                XION
            </span>
        </h1>

        </div>
        <Coin3D/>
    </div>
  )
}

export default Sponsor