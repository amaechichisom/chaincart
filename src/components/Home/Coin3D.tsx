import { useState, useEffect, useRef } from 'react';
import * as IMG from './../../assets';

const Coin3D = () => {
  const [rotation, setRotation] = useState({ x: 15, y: 0 });
  const animationRef = useRef<number | null>(null);
  const speed = 0.5;

  useEffect(() => {
    const animate = () => {
      setRotation(prev => ({
        x: prev.x,
        y: (prev.y + speed) % 360
      }));
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [speed]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative perspective-1000 w-64 h-64 mb-8">
        <div 
          className="w-full h-full relative preserve-3d"
          style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
        >
          {/* Front of coin (heads) */}
          <div className="absolute w-full h-full rounded-full bg-black/40 flex items-center justify-center shadow-lg backface-hidden">
            <div className="w-56 h-56 rounded-full bg-black/50 flex items-center justify-center border-4 border-black/60">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-black/80 to-black flex items-center justify-center">
                <div className="text-4xl font-bold text-black/80">
                    <img src={IMG.XionModel} alt="Logo" className=" h-[150px] w-[150px]" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Back of coin (tails) */}
          <div 
            className="absolute w-full h-full rounded-full bg-black/40 flex items-center justify-center shadow-lg backface-hidden"
            style={{ transform: 'rotateY(180deg)' }}
          >
            <div className="w-56 h-56 rounded-full bg-black/50 flex items-center justify-center border-4 border-black/60">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-black/80 to-black flex items-center justify-center">
                <div className="text-3xl font-bold text-black/80">
                    <img src={IMG.XionLogo} alt="Logo" className=" h-[150px] w-[150px]" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Edge of coin */}
          <div className="absolute w-full h-full">
            <div className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-black/60 opacity-50"></div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Coin3D;