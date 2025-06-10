import { Heart } from "lucide-react";
import type { Character } from "../types/character";
import { useFavoritesStore } from "../stores/favorites";
import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";

interface FavoriteButtonProps {
  character: Character;
  variant?: "default" | "ghost" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export function FavoriteButton({
  character,
  variant = "ghost",
  size = "icon",
  className,
}: FavoriteButtonProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
  const favorite = isFavorite(character.id);

  const handleToggleFavorite = () => {
    if (favorite) {
      removeFavorite(character.id);
    } else {
      addFavorite(character);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleToggleFavorite}
      className={cn(
        "transition-colors",
        favorite && "text-red-500 hover:text-red-600",
        className
      )}
    >
      <Heart className={cn("h-4 w-4", favorite && "fill-current")} />
    </Button>
  );
}
