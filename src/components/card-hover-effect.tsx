'use client'
import { useRef, useState, useEffect } from 'react';

interface HoverCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

export function HoverCard({ title, description, imageUrl }: HoverCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (cardRef.current) {
      setDimensions({
        width: cardRef.current.offsetWidth,
        height: cardRef.current.offsetHeight,
      });
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMouseX(e.clientX - rect.left - rect.width / 2);
    setMouseY(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    setMouseX(0);
    setMouseY(0);
  };

  const rotateX = (mouseY / dimensions.height) * -30;
  const rotateY = (mouseX / dimensions.width) * 30;

  const translateX = (mouseX / dimensions.width) * -40;
  const translateY = (mouseY / dimensions.height) * -40;

  return (
    <div
      ref={cardRef}
      className="[perspective:800px] [transform-style:preserve-3d] cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="relative w-[240px] h-[320px] bg-zinc-800 rounded-xl overflow-hidden shadow-[inset_0_0_0_5px_#333,inset_0_0_0_6px_rgba(255,255,255,0.5)] transition-transform duration-[1000ms] ease-[cubic-bezier(0.445,0.05,0.55,0.95)]"
        style={{ transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg)` }}
      >
        <div
          className="absolute top-[-20px] left-[-20px] w-full h-full bg-cover bg-center bg-no-repeat opacity-50 pointer-events-none transition duration-[1000ms] ease-[cubic-bezier(0.445,0.05,0.55,0.95)]"
          style={{
            transform: `translateX(${translateX}px) translateY(${translateY}px)`,
            backgroundImage: `url(${imageUrl})`,
          }}
        />
        <div className="absolute bottom-0 text-white px-5 py-4 transform translate-y-[40%] transition duration-700 delay-500 ease-[cubic-bezier(0.215,0.61,0.355,1)]">
          <h1 className="font-serif text-3xl font-bold drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">{title}</h1>
          <p className="mt-2 opacity-0 transition duration-700 delay-500 ease-[cubic-bezier(0.215,0.61,0.355,1)] drop-shadow-md">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
