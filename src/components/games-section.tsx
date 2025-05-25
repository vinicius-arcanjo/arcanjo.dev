'use client'

import { useState } from "react";
import { GameCard, GameCardProps } from "@/components/game-card";
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

// This will be populated with data from Notion
interface GamesSectionProps {
  games: GameCardProps[];
}

export function GamesSection({ games }: GamesSectionProps) {
  // State to track the current view mode (grid or table)
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Function to render stars for the table view
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

      {/* Games I've played */}
      <section>
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[500]">
            {games.map((game) => (
              <GameCard key={game.title} {...game} />
            ))}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Avaliação</TableHead>
                <TableHead>Zerado</TableHead>
                <TableHead>Já Joguei</TableHead>
                <TableHead>Jogaria novamente</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {games.map((game) => (
                <TableRow key={game.title}>
                  <TableCell className="font-medium">{game.title}</TableCell>
                  <TableCell>{renderRating(game.rating)}</TableCell>
                  <TableCell>{game.completed ? "Sim" : "Não"}</TableCell>
                  <TableCell>{game.played ? "Sim" : "Não"}</TableCell>
                  <TableCell>{game.wouldPlayAgain ? "Sim" : "Não"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </section>
    </div>
  );
}
