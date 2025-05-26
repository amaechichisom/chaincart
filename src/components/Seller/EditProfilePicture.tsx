import { ProfilePic } from '@/assets';
import { Pencil } from 'lucide-react';

function EditProfilePicture() {
  return (
    <div className='w-full md:w-1/3 p-6 flex justify-center items-start'>
        <div className="relative w-32 h-32 lg:w-40 lg:h-40 p-4 rounded-full border border-neutral-200">
            <img
                src={ProfilePic}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
            />
            <button className="absolute bottom-0 right-2 p-1 bg-white rounded-full border shadow">
                <Pencil className="w-4 h-4 text-gray-700" />
            </button>
        </div>
    </div>
  );
}

export default EditProfilePicture