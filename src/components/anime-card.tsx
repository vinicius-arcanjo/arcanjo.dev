"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Star, StarHalf } from 'lucide-react';
import Image from 'next/image';

export interface AnimeCardProps {
  title: string;
  japaneseTitle?: string; // Optional Japanese title
  description: string;
  imageUrl: string;
  rating: number; // 0.0 to 5.0
  watched: boolean;
  wouldWatchAgain: boolean;
  startYear: number;
  endYear?: number; // Optional for ongoing anime
  episodes: number;
  studio: string;
  genre: string;
}

export function AnimeCard({
  title,
  japaneseTitle,
  description,
  imageUrl,
  rating,
  watched,
  wouldWatchAgain,
  startYear,
  endYear,
  episodes,
  studio,
  genre,
}: AnimeCardProps) {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }

    // Add half-star if needed
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

  // Format years (e.g., "2010-2019" or "2020-Present")
  const yearRange = endYear ? `${startYear}-${endYear}` : `${startYear}-Presente`;

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

        {/* Título Japonês (se disponível) */}
        {japaneseTitle && (
          <CardItem
            translateZ="40"
            className="text-sm italic text-neutral-500 dark:text-neutral-400"
          >
            {japaneseTitle}
          </CardItem>
        )}

        {/* Anos, Episódios, Estúdio e Gênero */}
        <CardItem
          translateZ="40"
          className="text-sm text-neutral-500 dark:text-neutral-300"
        >
          {yearRange} • {episodes} {episodes === 1 ? 'episódio' : 'episódios'} • {studio}
        </CardItem>

        <CardItem
          translateZ="40"
          className="text-sm text-neutral-500 dark:text-neutral-300"
        >
          Gênero: {genre}
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
          <Image
            src={imageUrl}
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt={`Image of ${title}`}
          />
        </CardItem>

        {/* Informações extras (Rating e status do anime) */}
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

          {/* Tags de status do anime */}
          <CardItem translateZ="40">
            <div className="flex flex-wrap gap-2 flex-col items-start">
              {watched && (
                <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-2 py-0.5 rounded-full">
                  Assistido
                </span>
              )}
              {!watched && (
                <span className="text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 px-2 py-0.5 rounded-full">
                  Não Assistido
                </span>
              )}
              {wouldWatchAgain && (
                <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2 py-0.5 rounded-full">
                  Assistiria Novamente
                </span>
              )}
              {!wouldWatchAgain && watched && (
                <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 px-2 py-0.5 rounded-full">
                  Não Assistiria Novamente
                </span>
              )}
              {!endYear && (
                <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 px-2 py-0.5 rounded-full">
                  Em Andamento
                </span>
              )}
            </div>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
