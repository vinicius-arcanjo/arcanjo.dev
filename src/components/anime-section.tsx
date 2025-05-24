'use client'

import { useState } from "react";
import { AnimeCard, AnimeCardProps } from "@/components/anime-card";
import { LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Sample anime data
const animes: AnimeCardProps[] = [
  {
    title: "Attack on Titan",
    japaneseTitle: "進撃の巨人 (Shingeki no Kyojin)",
    description: 'Em um mundo onde a humanidade vive dentro de cidades cercadas por enormes muralhas devido ao aparecimento de Titãs, gigantes humanoides que devoram humanos aparentemente sem motivo.',
    imageUrl: "https://m.media-amazon.com/images/M/MV5BNzc5MTczNDQtNDFjNi00ZDU5LWFkNzItOTE1NzQzMzdhNzMxXkEyXkFqcGdeQXVyNTgyNTA4MjM@._V1_.jpg",
    rating: 4.9,
    watched: true,
    wouldWatchAgain: true,
    startYear: 2013,
    endYear: 2023,
    episodes: 87,
    studio: "Wit Studio, MAPPA",
    genre: "Ação, Drama, Fantasia"
  },
  {
    title: "Fullmetal Alchemist: Brotherhood",
    japaneseTitle: "鋼の錬金術師 (Hagane no Renkinjutsushi)",
    description: 'Dois irmãos alquimistas buscam a Pedra Filosofal para restaurar seus corpos após uma tentativa fracassada de ressuscitar sua mãe falecida.',
    imageUrl: "https://m.media-amazon.com/images/M/MV5BZmEzN2YzOTItMDI5MS00MGU4LWI1NWQtOTg5ZThhNGQwYTEzXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg",
    rating: 5.0,
    watched: true,
    wouldWatchAgain: true,
    startYear: 2009,
    endYear: 2010,
    episodes: 64,
    studio: "Bones",
    genre: "Ação, Aventura, Fantasia"
  },
  {
    title: "Demon Slayer",
    japaneseTitle: "鬼滅の刃 (Kimetsu no Yaiba)",
    description: 'Um jovem se torna um caçador de demônios após sua família ser massacrada e sua irmã ser transformada em um demônio.',
    imageUrl: "https://m.media-amazon.com/images/M/MV5BZjZjNzI5MDctY2Y4YS00NmM4LTljMmItZTFkOTExNGI3ODRhXkEyXkFqcGdeQXVyNjc3MjQzNTI@._V1_.jpg",
    rating: 4.7,
    watched: true,
    wouldWatchAgain: true,
    startYear: 2019,
    episodes: 44,
    studio: "ufotable",
    genre: "Ação, Fantasia, Aventura"
  },
  {
    title: "One Piece",
    japaneseTitle: "ワンピース (Wan Pīsu)",
    description: 'Segue as aventuras de Monkey D. Luffy e sua tripulação de piratas, os Piratas do Chapéu de Palha, em busca do tesouro supremo conhecido como "One Piece".',
    imageUrl: "https://m.media-amazon.com/images/M/MV5BODcwNWE3OTMtMDc3MS00NDFjLWE1OTAtNDU3NjgxODMxY2UyXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg",
    rating: 4.8,
    watched: true,
    wouldWatchAgain: true,
    startYear: 1999,
    episodes: 1000,
    studio: "Toei Animation",
    genre: "Ação, Aventura, Comédia"
  },
];

export function AnimeSection() {
  // State to track the current view mode (grid or table)
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Function to render stars for table view
  const renderRating = (rating: number) => {
    return `${rating.toFixed(1)}/5.0`;
  };

  // Function to format year range
  const formatYearRange = (startYear: number, endYear?: number) => {
    return endYear ? `${startYear}-${endYear}` : `${startYear}-Presente`;
  };

  return (
    <div className="space-y-12">
      {/* View toggle */}
      <div className="flex justify-end space-x-2">
        <Button
          variant={viewMode === "grid" ? "default" : "outline"}
          size="sm"
          onClick={() => setViewMode("grid")}
        >
          <LayoutGrid className="h-4 w-4 mr-1" />
          Grid
        </Button>
        <Button
          variant={viewMode === "table" ? "default" : "outline"}
          size="sm"
          onClick={() => setViewMode("table")}
        >
          <List className="h-4 w-4 mr-1" />
          Tabela
        </Button>
      </div>

      {/* Anime section */}
      <section>
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[500]">
            {animes.map((anime) => (
              <AnimeCard key={anime.title} {...anime} />
            ))}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Título Japonês</TableHead>
                <TableHead>Anos</TableHead>
                <TableHead>Episódios</TableHead>
                <TableHead>Estúdio</TableHead>
                <TableHead>Gênero</TableHead>
                <TableHead>Avaliação</TableHead>
                <TableHead>Assistido</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {animes.map((anime) => (
                <TableRow key={anime.title}>
                  <TableCell className="font-medium">{anime.title}</TableCell>
                  <TableCell>{anime.japaneseTitle || "-"}</TableCell>
                  <TableCell>{formatYearRange(anime.startYear, anime.endYear)}</TableCell>
                  <TableCell>{anime.episodes}</TableCell>
                  <TableCell>{anime.studio}</TableCell>
                  <TableCell>{anime.genre}</TableCell>
                  <TableCell>{renderRating(anime.rating)}</TableCell>
                  <TableCell>{anime.watched ? "Sim" : "Não"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </section>
    </div>
  );
}
