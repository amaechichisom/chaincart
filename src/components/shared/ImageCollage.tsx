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
    <div className="my-4 sm:my-5 w-full px-4 sm:px-0">
      <div className="block md:hidden">
        <div className="relative">
          <img
            src={imagesToShow[0]}
            alt="Main"
            className="w-full h-[200px] sm:h-[250px] object-cover rounded-lg"
          />
          <div className="absolute bottom-2 right-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  variant="secondary"
                  className="text-white text-xs gap-1 bg-black/50 hover:bg-black/70 backdrop-blur-sm"
                >
                  <Eye className="w-3 h-3" />
                  {imagesToShow.length} photos
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[95vw] max-h-[90vh] p-2 sm:p-4">
                <DialogHeader className="pb-2">
                  <DialogTitle className="text-sm sm:text-base">All Photos</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center space-y-3">
                  <img
                    src={imagesToShow[currentIndex]}
                    alt={`Photo ${currentIndex + 1}`}
                    className="w-full max-h-[60vh] object-cover rounded-lg"
                  />
                  <div className="flex justify-between items-center w-full">
                    <Button 
                      onClick={prevImage} 
                      variant="outline" 
                      size="sm"
                      className="px-4"
                    >
                      Prev
                    </Button>
                    <div className="text-xs sm:text-sm text-muted-foreground">
                      {currentIndex + 1} / {imagesToShow.length}
                    </div>
                    <Button 
                      onClick={nextImage} 
                      variant="outline" 
                      size="sm"
                      className="px-4"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Desktop Layout - Grid layout */}
      <div className="hidden md:grid grid-cols-4 lg:grid-cols-5 gap-2 w-full">
        <div className="col-span-2 lg:col-span-3">
          <img
            src={imagesToShow[0]}
            alt="Main"
            className="w-full h-[250px] lg:h-[300px] object-cover rounded-lg"
          />
        </div>

        <div className="grid grid-cols-2 gap-2 h-full w-full col-span-2">
          {imagesToShow.slice(1, 5).map((img, index) => (
            <div key={index} className="relative w-full h-[122px] lg:h-[147px]">
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
                        size="sm"
                        className="text-white text-xs gap-1 bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                      >
                        <Eye className="w-4 h-4" />
                        <span className="hidden lg:inline">See all photos</span>
                        <span className="lg:hidden">All photos</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
                      <DialogHeader>
                        <DialogTitle>All Photos</DialogTitle>
                      </DialogHeader>
                      <div className="mt-4 relative flex flex-col items-center space-y-4">
                        <img
                          src={imagesToShow[currentIndex]}
                          alt={`Photo ${currentIndex + 1}`}
                          className="w-full max-h-[60vh] object-cover rounded-lg"
                        />
                        <div className="flex justify-between items-center w-full">
                          <Button 
                            onClick={prevImage} 
                            variant="outline" 
                            className="w-20"
                          >
                            Prev
                          </Button>
                          <div className="text-sm text-muted-foreground">
                            {currentIndex + 1} / {imagesToShow.length}
                          </div>
                          <Button 
                            onClick={nextImage} 
                            variant="outline" 
                            className="w-20"
                          >
                            Next
                          </Button>
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
    </div>
  );
}