"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Star, StarHalf } from 'lucide-react';


export interface GameCardProps {
  title: string;
  description: string;
  imageUrl: string;
  rating: number; // 0.0 to 5.0
  completed: boolean;
  wouldPlayAgain: boolean;
  played: boolean;
}

export function GameCard({
  title,
  description,
  imageUrl,
  rating,
  completed,
  wouldPlayAgain,
  played,
}: GameCardProps) {
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
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
        {/* Título */}
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          {title}
        </CardItem>

        {/* Descrição */}
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {description}
        </CardItem>

        {/* Imagem */}
        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src={imageUrl}
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt={`Image of ${title}`}
          />
        </CardItem>

        {/* Informações extras (Rating e status do jogo) */}
        <div className="mt-4 flex flex-col gap-2">
          <CardItem
            translateZ="40"
            className="text-neutral-600 dark:text-neutral-300 text-sm"
          >
            <div className="flex items-center space-x-1">
              {renderStars()}
              <span className="ml-2 text-sm text-muted-foreground">{rating.toFixed(1)}</span>
            </div>
          </CardItem>


          <CardItem
            translateZ="40"
            className={`text-sm ${
              completed
                ? "text-green-500 dark:text-green-400"
                : "text-red-500 dark:text-red-400"
            }`}
          >
            {completed ? "Jogo Completo" : "Não Completo"}
          </CardItem>
          <CardItem
            translateZ="40"
            className="text-sm text-neutral-600 dark:text-neutral-300"
          >
            {wouldPlayAgain ? "Jogaria Novamente 😊" : "Não Jogaria Novamente 😐"}
          </CardItem>
          <CardItem
            translateZ="40"
            className="text-sm text-neutral-600 dark:text-neutral-300"
          >
            {played ? "Já Jogou!" : "Ainda não jogou!"}
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
