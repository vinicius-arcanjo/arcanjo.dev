'use client'

import { useState } from "react";
import { MovieCard, MovieCardProps } from "@/components/movie-card";
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

// Sample movie data
const movies: MovieCardProps[] = [
  {
    title: "The Shawshank Redemption",
    description: 'Dois homens presos se unem ao longo de vários anos, encontrando consolo e eventual redenção através de atos de decência comum.',
    imageUrl: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
    rating: 5.0,
    watched: true,
    wouldWatchAgain: true,
    releaseYear: 1994,
    director: "Frank Darabont"
  },
  {
    title: "The Godfather",
    description: 'O patriarca idoso de uma dinastia do crime organizado transfere o controle de seu império clandestino para seu filho relutante.',
    imageUrl: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    rating: 4.8,
    watched: true,
    wouldWatchAgain: true,
    releaseYear: 1972,
    director: "Francis Ford Coppola"
  },
  {
    title: "Pulp Fiction",
    description: 'As vidas de dois assassinos da máfia, um boxeador, um gângster e sua esposa, e um par de bandidos se entrelaçam em quatro histórias de violência e redenção.',
    imageUrl: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    rating: 4.7,
    watched: true,
    wouldWatchAgain: true,
    releaseYear: 1994,
    director: "Quentin Tarantino"
  },
  {
    title: "Oppenheimer",
    description: 'A história do físico americano J. Robert Oppenheimer e seu papel no desenvolvimento da bomba atômica.',
    imageUrl: "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg",
    rating: 4.5,
    watched: true,
    wouldWatchAgain: true,
    releaseYear: 2023,
    director: "Christopher Nolan"
  },
];

export function MoviesSection() {
  // State to track the current view mode (grid or table)
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Function to render stars for table view
  const renderRating = (rating: number) => {
    return `${rating.toFixed(1)}/5.0`;
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

      {/* Movies section */}
      <section>
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[500]">
            {movies.map((movie) => (
              <MovieCard key={movie.title} {...movie} />
            ))}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Ano</TableHead>
                <TableHead>Diretor</TableHead>
                <TableHead>Avaliação</TableHead>
                <TableHead>Assistido</TableHead>
                <TableHead>Assistiria novamente</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {movies.map((movie) => (
                <TableRow key={movie.title}>
                  <TableCell className="font-medium">{movie.title}</TableCell>
                  <TableCell>{movie.releaseYear}</TableCell>
                  <TableCell>{movie.director}</TableCell>
                  <TableCell>{renderRating(movie.rating)}</TableCell>
                  <TableCell>{movie.watched ? "Sim" : "Não"}</TableCell>
                  <TableCell>{movie.wouldWatchAgain ? "Sim" : "Não"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </section>
    </div>
  );
}
