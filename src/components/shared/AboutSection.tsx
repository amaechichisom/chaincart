import { Link } from "react-router-dom"

function AboutSection() {
  return (
    <div className="w-full md:w-2/3 p-8 rounded-2xl flex flex-col gap-4 max-h-[22rem] h-auto overflow-y-auto">
        <h3 className='text-2xl font-bold mb-3'>About Viral Properties</h3>
        <div>
            <Link to="/seller/edit-profile" className="border-2 border-neutral-500 text-neutral-600 py-1 px-2 rounded-md font-medium w-auto">Edit Profile</Link>
        </div>
        <p className="text-neutral-500 mt-8">
            Viral Properties is a forward-thinking real estate development company based in Lagos, Nigeria, specializing in building and selling high-quality residential and commercial properties. With a strong commitment to innovation, trust, and value, Viral Properties is transforming Nigeria’s real estate landscape — one development at a time.
        </p>
    </div>
  )
}

export default AboutSection