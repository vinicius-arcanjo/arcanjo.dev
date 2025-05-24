import Image from 'next/image';
import { Star, StarHalf } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

export interface GameCardProps {
  title: string;
  imageUrl: string;
  rating: number; // 0.0 to 5.0
  completed: boolean;
  wouldPlayAgain: boolean;
  category: 'played' | 'want-to-play';
}

export function GameCard({
  title,
  imageUrl,
  rating,
  completed,
  wouldPlayAgain,
  category
}: GameCardProps) {
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
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <CardHeader>
        <h3 className="font-semibold text-lg">{title}</h3>
        <div className="flex items-center space-x-1">
          {renderStars()}
          <span className="ml-2 text-sm text-muted-foreground">{rating.toFixed(1)}</span>
        </div>
      </CardHeader>

      <CardContent className="flex-grow">
        <div className="space-y-2">
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
        </div>
      </CardContent>

      <CardFooter>
        <span className={`text-xs px-2 py-1 rounded-full ${
          category === 'played' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
        }`}>
          {category === 'played' ? 'Já joguei' : 'Quero jogar'}
        </span>
      </CardFooter>
    </Card>
  );
}
