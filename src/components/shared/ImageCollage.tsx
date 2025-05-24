import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import * as IMG from "./../../assets";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const collageImages = [
  IMG.propertOne,
  IMG.ProprtyTwo,
  IMG.PropertyFour,
  IMG.PropertyFour,
  IMG.PropertyFour,
];

export default function ImageCollage() {
  return (
    <div className="grid grid-cols-3 gap-2 h-[300px] md:h-[400px] relative">
      <div className="col-span-2 h-full">
        <img
          src={collageImages[0]}
          alt="Main"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-2 h-full">
        {collageImages.slice(1, 5).map((img, index) => (
          <div key={index} className="relative w-full h-full">
            <img
              src={img}
              alt={`Small ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
            {index === 3 && (
              <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="secondary"
                      className="text-white text-xs gap-1 bg-white/10 hover:bg-white/20"
                    >
                      <Eye className="w-4 h-4" />
                      See all photos
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>All Photos</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                      {collageImages.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt={`Photo ${i + 1}`}
                          className="w-full h-40 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
