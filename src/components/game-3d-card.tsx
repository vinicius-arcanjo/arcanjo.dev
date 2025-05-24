"use client";

import { Star, StarHalf } from 'lucide-react';
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card';
import Image from 'next/image';

export interface Game3DCardProps {
  title: string;
  imageUrl: string;
  rating: number; // 0.0 to 5.0
  completed: boolean;
  wouldPlayAgain: boolean;
  played: boolean;
}

export function Game3DCard({
  title,
  imageUrl,
  rating,
  completed,
  wouldPlayAgain,
  played
}: Game3DCardProps) {
  // Generate stars based on rating
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }

    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }

    // Add empty stars to reach 5
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-star-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  return (
    <CardContainer className="w-full">
      <CardBody className="bg-card relative border border-border rounded-xl p-4 h-full w-full flex flex-col">
        <CardItem translateZ="50" className="relative h-48 w-full">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </CardItem>

        <CardItem translateZ="60" className="mt-4">
          <h3 className="font-semibold text-lg">{title}</h3>
          <div className="flex items-center space-x-1 mt-1">
            {renderStars()}
            <span className="ml-2 text-sm text-muted-foreground">{rating.toFixed(1)}</span>
          </div>
        </CardItem>

        <CardItem translateZ="80" className="mt-4 space-y-2 flex-grow">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={`completed-${title}`}
              checked={completed}
              readOnly
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor={`completed-${title}`} className="text-sm">Zerado</label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={`replay-${title}`}
              checked={wouldPlayAgain}
              readOnly
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor={`replay-${title}`} className="text-sm">Jogaria novamente</label>
          </div>
        </CardItem>

        <CardItem translateZ="100" className="mt-4">
          <span className={`text-xs px-2 py-1 rounded-full ${
            played ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
          }`}>
            {played ? 'Já joguei' : 'Quero jogar'}
          </span>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
