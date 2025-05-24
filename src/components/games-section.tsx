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

// Sample game data
const games: GameCardProps[] = [
  {
    title: "The Legend of Zelda: Breath of the Wild",
    imageUrl: "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000000025/7137262b5a64d921e193653f8aa0b722925abc5680380ca0e18a5cfd91697f58",
    rating: 5.0,
    completed: true,
    wouldPlayAgain: true,
    played: true
  },
  {
    title: "Elden Ring",
    imageUrl: "https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/phvVT0qZfcRms5qDAk0SI3CM.png",
    rating: 4.5,
    completed: false,
    wouldPlayAgain: true,
    played: true
  },
  {
    title: "Hollow Knight",
    imageUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/367520/capsule_616x353.jpg",
    rating: 4.8,
    completed: true,
    wouldPlayAgain: true,
    played: true
  },
  {
    title: "Cyberpunk 2077",
    imageUrl: "https://image.api.playstation.com/vulcan/ap/rnd/202111/3013/cJdbb8LujmJgwLxxTh8QsWrD.png",
    rating: 3.5,
    completed: false,
    wouldPlayAgain: false,
    played: true
  },
  {
    title: "Starfield",
    imageUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/1716740/capsule_616x353.jpg",
    rating: 0.0, // Not rated yet
    completed: false,
    wouldPlayAgain: false,
    played: false
  },
  {
    title: "Final Fantasy VII Rebirth",
    imageUrl: "https://image.api.playstation.com/vulcan/ap/rnd/202306/1219/60eca3ac155247e21850c7d075d01ebf0f1c23c4df4c1cbc.jpg",
    rating: 0.0, // Not rated yet
    completed: false,
    wouldPlayAgain: false,
    played: false
  },
];

export function GamesSection() {
  // State to track the current view mode (grid or table)
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Separate games by category
  // const playedGames = games.filter(game => game.category === "played");
  // const wantToPlayGames = games.filter(game => game.category === "want-to-play");

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

      {/* Games I've played */}
      <section className="space-y-6">
        <h3 className="text-xl font-semibold">Jogos que já joguei</h3>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
