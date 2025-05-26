import { useState, useRef, useEffect } from 'react';
import {
  MoreVertical,
  Eye,
  Pencil,
  Pause,
  Trash2
} from 'lucide-react';
import { ApartmentOne } from '@/assets';
import { formatWithCommas } from '@/utils/convert';
import Modal from '@/components/shared/Modals/Modal';

interface ListCardProps {
  src?: string;
  title?: string;
  price?: number;
  discountPrice?: number;
}

export default function ListCard({ src, title, price, discountPrice }: ListCardProps) {
  const [openPause, setOpenPause] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleMenuItemClick = (action: string) => {
    console.log(`Action: ${action}`);
    setIsDropdownOpen(false);
    // Implement your logic here
    if (action === 'pause') {
      setOpenPause(true);
    } else if (action === 'delete') {
      setOpenDelete(true);
    }
  };

  return (
    <>
    <div className="flex flex-col items-start justify-center gap-2 bg-white shadow-md rounded-lg p-1 pb-3 w-full max-w-xs sm:max-w-[200px] md:max-w-56 max-h-64 h-auto mx-auto lg:mx-0">
      <div className="relative w-full h-32 sm:h-36 md:h-40">
        <img
          src={src ?? ApartmentOne}
          alt={title ? `Property image for ${title}` : "Property image"}
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />

        <div className="absolute top-2 right-2 z-10" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="p-2 rounded-full bg-neutral-600/60 hover:bg-neutral-600/80 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Property options"
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
          >
            <MoreVertical className="h-4 w-4 text-white" />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-12 right-0 w-32 bg-white rounded-md shadow-lg border border-gray-200 z-50 py-1">
              <button
                onClick={() => handleMenuItemClick('see-details')}
                className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
              >
                <Eye className="w-4 h-4 mr-2" /> See Details
              </button>
              <button
                onClick={() => handleMenuItemClick('edit')}
                className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
              >
                <Pencil className="w-4 h-4 mr-2" /> Edit
              </button>
              <button
                onClick={() => handleMenuItemClick('pause')}
                className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
              >
                <Pause className="w-4 h-4 mr-2" /> Pause
              </button>
              <button
                onClick={() => handleMenuItemClick('delete')}
                className="flex items-center w-full px-3 py-2 text-sm text-red-500 hover:bg-gray-100 focus:outline-none"
              >
                <Trash2 className="w-4 h-4 mr-2" /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <p className="font-semibold text-xs sm:text-sm text-neutral-900 px-2 truncate w-full">
        {title || 'Not set'}
      </p>
      <div className="flex items-center justify-between w-full px-2">
        <p className="font-semibold text-xs sm:text-sm text-neutral-500">
          ${formatWithCommas(price || 0)}
        </p>
        {discountPrice && (
          <p className="font-light text-xs text-neutral-500 line-through">
            ${formatWithCommas(discountPrice)}
          </p>
        )}
      </div>
    </div>

    {/* Modals */}

    <Modal
        open={openPause}
        onOpenChange={setOpenPause}
        title="Pause Listing"
        description=""
        confirmLabel="Pause"
        cancelLabel="Cancel"
        onConfirm={() => console.log('Deleted')}
      >
      </Modal>

    <Modal
        open={openDelete}
        onOpenChange={setOpenDelete}
        title="Delete Listing"
        description="Are you sure you want to remove this listing? You can pause it instead"
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={() => console.log('Deleted')}
        variant="destructive"
      >
      </Modal>
    </>
  );
}
