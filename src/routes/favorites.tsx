import { createFileRoute } from "@tanstack/react-router";
import { Trash2, Heart } from "lucide-react";
import { CharacterTable } from "../features/components/character-table";
import { Button } from "../components/ui/button";
import { useFavoritesStore } from "../shared/stores/favorites";

export const Route = createFileRoute("/favorites")({
  component: Favorites,
});

function Favorites() {
  const { favorites, clearFavorites } = useFavoritesStore();

  if (favorites.length === 0) {
    return (
      <div className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
          <Heart className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">No favorites yet</h2>
          <p className="text-muted-foreground">
            Start adding characters to your favorites to see them here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Favorites</h1>
          <p className="text-muted-foreground">
            {favorites.length} character{favorites.length !== 1 ? "s" : ""} in
            your favorites
          </p>
        </div>

        <Button
          variant="outline"
          onClick={clearFavorites}
          className="flex items-center gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Clear All
        </Button>
      </div>

      <CharacterTable characters={favorites} />
    </div>
  );
}
