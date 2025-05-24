'use client'

import { useState } from "react";
import { SeriesCard, SeriesCardProps } from "@/components/series-card";
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

// Sample series data
const series: SeriesCardProps[] = [
  {
    title: "Breaking Bad",
    description: 'Um professor de química do ensino médio diagnosticado com câncer de pulmão inoperável se volta para a fabricação e venda de metanfetamina para garantir o futuro financeiro de sua família.',
    imageUrl: "https://m.media-amazon.com/images/M/MV5BYmQ4YWMxYjUtNjZmYi00MDQ1LWFjMjMtNjA5ZDdiYjdiODU5XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_.jpg",
    rating: 5.0,
    watched: true,
    wouldWatchAgain: true,
    startYear: 2008,
    endYear: 2013,
    seasons: 5,
    creator: "Vince Gilligan"
  },
  {
    title: "Game of Thrones",
    description: 'Nove famílias nobres lutam pelo controle das terras míticas de Westeros, enquanto um antigo inimigo retorna depois de estar adormecido por milhares de anos.',
    imageUrl: "https://m.media-amazon.com/images/M/MV5BYTRiNDQwYzAtMzVlZS00NTI5LWJjYjUtMzkwNTUzMWMxZTllXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_.jpg",
    rating: 4.7,
    watched: true,
    wouldWatchAgain: true,
    startYear: 2011,
    endYear: 2019,
    seasons: 8,
    creator: "David Benioff, D.B. Weiss"
  },
  {
    title: "Stranger Things",
    description: 'Quando um garoto desaparece, uma pequena cidade descobre um mistério envolvendo experimentos secretos, forças sobrenaturais aterrorizantes e uma garotinha estranha.',
    imageUrl: "https://m.media-amazon.com/images/M/MV5BMDZkYmVhNjMtNWU4MC00MDQxLWE3MjYtZGMzZWI1ZjhlOWJmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
    rating: 4.5,
    watched: true,
    wouldWatchAgain: true,
    startYear: 2016,
    seasons: 4,
    creator: "The Duffer Brothers"
  },
  {
    title: "The Last of Us",
    description: 'Após uma pandemia global, um contrabandista durão é contratado para escoltar uma menina de 14 anos que pode ser a cura para a doença.',
    imageUrl: "https://m.media-amazon.com/images/M/MV5BZGUzYTI3M2EtZmM0Yy00NGUyLWI4ODEtN2Q3ZGJlYzhhZjU3XkEyXkFqcGdeQXVyNTM0OTY1OQ@@._V1_.jpg",
    rating: 4.8,
    watched: true,
    wouldWatchAgain: true,
    startYear: 2023,
    seasons: 1,
    creator: "Craig Mazin, Neil Druckmann"
  },
];

export function SeriesSection() {
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

      {/* Series section */}
      <section>
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[500]">
            {series.map((show) => (
              <SeriesCard key={show.title} {...show} />
            ))}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Anos</TableHead>
                <TableHead>Temporadas</TableHead>
                <TableHead>Criador</TableHead>
                <TableHead>Avaliação</TableHead>
                <TableHead>Assistido</TableHead>
                <TableHead>Assistiria novamente</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {series.map((show) => (
                <TableRow key={show.title}>
                  <TableCell className="font-medium">{show.title}</TableCell>
                  <TableCell>{formatYearRange(show.startYear, show.endYear)}</TableCell>
                  <TableCell>{show.seasons}</TableCell>
                  <TableCell>{show.creator}</TableCell>
                  <TableCell>{renderRating(show.rating)}</TableCell>
                  <TableCell>{show.watched ? "Sim" : "Não"}</TableCell>
                  <TableCell>{show.wouldWatchAgain ? "Sim" : "Não"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </section>
    </div>
  );
}
