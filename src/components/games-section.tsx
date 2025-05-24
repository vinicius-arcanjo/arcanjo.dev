import { GameCard, GameCardProps } from "@/components/game-card";

// Sample game data
const games: GameCardProps[] = [
  {
    title: "The Legend of Zelda: Breath of the Wild",
    imageUrl: "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000000025/7137262b5a64d921e193653f8aa0b722925abc5680380ca0e18a5cfd91697f58",
    rating: 5.0,
    completed: true,
    wouldPlayAgain: true,
    category: "played",
  },
  {
    title: "Elden Ring",
    imageUrl: "https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/phvVT0qZfcRms5qDAk0SI3CM.png",
    rating: 4.5,
    completed: false,
    wouldPlayAgain: true,
    category: "played",
  },
  {
    title: "Hollow Knight",
    imageUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/367520/capsule_616x353.jpg",
    rating: 4.8,
    completed: true,
    wouldPlayAgain: true,
    category: "played",
  },
  {
    title: "Cyberpunk 2077",
    imageUrl: "https://image.api.playstation.com/vulcan/ap/rnd/202111/3013/cJdbb8LujmJgwLxxTh8QsWrD.png",
    rating: 3.5,
    completed: false,
    wouldPlayAgain: false,
    category: "played",
  },
  {
    title: "Starfield",
    imageUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/1716740/capsule_616x353.jpg",
    rating: 0.0, // Not rated yet
    completed: false,
    wouldPlayAgain: false,
    category: "want-to-play",
  },
  {
    title: "Final Fantasy VII Rebirth",
    imageUrl: "https://image.api.playstation.com/vulcan/ap/rnd/202306/1219/60eca3ac155247e21850c7d075d01ebf0f1c23c4df4c1cbc.jpg",
    rating: 0.0, // Not rated yet
    completed: false,
    wouldPlayAgain: false,
    category: "want-to-play",
  },
];

export function GamesSection() {
  // Separate games by category
  const playedGames = games.filter(game => game.category === "played");
  const wantToPlayGames = games.filter(game => game.category === "want-to-play");

  return (
    <div className="space-y-12">
      {/* Games I've played */}
      <section className="space-y-6">
        <h3 className="text-xl font-semibold">Jogos que já joguei</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {playedGames.map((game) => (
            <GameCard key={game.title} {...game} />
          ))}
        </div>
      </section>

      {/* Games I want to play */}
      <section className="space-y-6">
        <h3 className="text-xl font-semibold">Jogos que quero jogar</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wantToPlayGames.map((game) => (
            <GameCard key={game.title} {...game} />
          ))}
        </div>
      </section>
    </div>
  );
}
