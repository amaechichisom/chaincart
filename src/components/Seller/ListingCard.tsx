// ListingCard.tsx
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { IiActive } from "../../page/ListingPage";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import AppButton from "@/components/shared/AppButton";
import { useDeleteProductMutation } from "@/api/prodService";
import { IApiResponse } from "@/@types/types";

export type ListingCardProps = {
  status: IiActive;
  title: string;
  price: string;
  image: string;
  id: number | string;
};

const ListingCard = ({ status, title, price, image, id }: ListingCardProps) => {
  const isActive = status === "Active";
  const isPaused = status === "Paused";
  const navigate = useNavigate();
  const [deleteProduct, { isLoading: loadDelete }] = useDeleteProductMutation();

  const [modalType, setModalType] = useState<"view" | "pause" | "delete" | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const openModal = (type: "view" | "pause" | "delete") => {
    setModalType(type);
    setIsDropdownOpen(false);
  };

  const closeModal = () => {
    setModalType(null);
  };

  const handleConfirm = async (productId?: string) => {
    if (modalType === "pause") {
      console.log("Paused");
    } else if (modalType === "delete") {
      if (!productId) return;
      try {
        const result: IApiResponse = await deleteProduct({ productId }).unwrap();
        console.log(result);
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
    closeModal();
  };

  return (
    <div className="relative bg-white rounded-xl shadow hover:shadow-md transition w-full">
      <Link to={`/seller/listing/${id}`}>
        <img src={image} alt={title} className="rounded-t-xl w-full h-48 object-cover" />
        <div className="p-4">
          <p className="text-sm text-gray-500">{title}</p>
          <p className="font-semibold text-lg">{price}</p>
        </div>
      </Link>

      <div className="absolute top-2 right-2 z-10">
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <button type="button">
              <MoreVertical className="w-5 h-5" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => openModal("view")}>👁 See details</DropdownMenuItem>
            {isActive && (
              <>
                <DropdownMenuItem>✏️ Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={() => openModal("pause")}>⏸ Pause</DropdownMenuItem>
                <DropdownMenuItem className="text-red-500" onClick={() => openModal("delete")}>🗑 Delete</DropdownMenuItem>
              </>
            )}
            {isPaused && <DropdownMenuItem>▶️ Continue</DropdownMenuItem>}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Dialog open={modalType !== null} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent>
          {modalType === "view" && (
            <>
              <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
              </DialogHeader>
              <img src={image} alt={title} className="w-full rounded-md mb-4" />
              <p className="text-gray-700 font-medium">Price: {price}</p>
              <p className="text-sm text-gray-500 mt-2">Status: {status}</p>
              <AppButton label="See Full Details" onClick={() => navigate(`/seller/listing/${id}`)} />
            </>
          )}

          {modalType === "pause" && (
            <>
              <DialogHeader>
                <DialogTitle>Pause Listing</DialogTitle>
              </DialogHeader>
              <p>Are you sure you want to pause this listing?</p>
              <DialogFooter>
                <Button variant="outline" onClick={closeModal}>No</Button>
                <Button onClick={() => handleConfirm()}>Yes</Button>
              </DialogFooter>
            </>
          )}

          {modalType === "delete" && (
            <>
              <DialogHeader>
                <DialogTitle>Delete Listing</DialogTitle>
              </DialogHeader>
              <p>Are you sure you want to delete this listing?</p>
              <DialogFooter>
                <Button variant="outline" onClick={closeModal}>No</Button>
                <Button className="bg-red-500 hover:bg-red-600" onClick={() => handleConfirm(String(id))} disabled={loadDelete}>
                  Yes, Delete
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ListingCard;