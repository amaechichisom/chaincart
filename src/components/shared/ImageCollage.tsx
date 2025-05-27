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
import { useState } from "react";

const defaultImages = [
  IMG.propertOne,
  IMG.ProprtyTwo,
  IMG.PropertyFour,
  IMG.PropertyFour,
  IMG.PropertyFour,
];

interface ImageCollageProps {
  collageImages?: string[];
}

export default function ImageCollage({ collageImages }: ImageCollageProps) {
  const imagesToShow =
    collageImages && collageImages.length > 0 ? collageImages : defaultImages;
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? imagesToShow.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === imagesToShow.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="grid grid-cols-5 gap-2 my-5 w-full">
      <div className="col-span-3">
        <img
          src={imagesToShow[0]}
          alt="Main"
          className="w-full h-[300px] object-cover rounded-lg"
        />
      </div>

      <div className="grid grid-cols-2  gap-2 h-full w-full col-span-2">
        {imagesToShow.slice(1, 5).map((img, index) => (
         <div key={index} className="relative w-full h-[147px]"> 
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
                    <div className="mt-4 relative flex flex-col items-center">
                      <img
                        src={imagesToShow[currentIndex]}
                        alt={`Photo ${currentIndex + 1}`}
                        className="w-full max-h-[400px] object-cover rounded-lg"
                      />
                      <div className="flex justify-between w-full mt-4">
                        <Button onClick={prevImage} variant="outline" className="w-20">
                          Prev
                        </Button>
                        <Button onClick={nextImage} variant="outline" className="w-20">
                          Next
                        </Button>
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground">
                        {currentIndex + 1} / {imagesToShow.length}
                      </div>
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
