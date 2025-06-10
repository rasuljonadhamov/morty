import { createFileRoute, useRouter } from "@tanstack/react-router";
import { format } from "date-fns";
import { ArrowLeft, MapPin, Calendar, Tv } from "lucide-react";
import { AlertCircle } from "lucide-react";
import { useCharacter } from "../../features/hooks/use-characters";
import { useEpisodes } from "../../features/hooks/use-episodes";
import { LoadingSpinner } from "../../shared/components/loading-spinner";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { CharacterStatusBadge } from "../../shared/components/character-status-badge";
import { FavoriteButton } from "../../shared/components/favorite-button";
import { Badge } from "../../components/ui/badge";

export const Route = createFileRoute("/character/$characterId")({
  component: CharacterDetail,
});

function CharacterDetail() {
  const { characterId } = Route.useParams();
  const router = useRouter();

  const { data: character, isLoading, error } = useCharacter(characterId);
  const { data: episodes } = useEpisodes(character?.episode || []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-2">
          <LoadingSpinner />
          <span>Loading character...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load character. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (!character) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => router.history.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <Avatar className="h-32 w-32">
                <AvatarImage src={character.image} alt={character.name} />
                <AvatarFallback className="text-2xl">
                  {character.name[0]}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-2">
                <h1 className="text-2xl font-bold">{character.name}</h1>
                <CharacterStatusBadge
                  status={character.status}
                  className="flex justify-center items-center rounded-3xl p-0.5"
                />
              </div>

              <FavoriteButton
                character={character}
                variant="outline"
                size="default"
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Character Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">
                  Species
                </div>
                <Badge variant="secondary">{character.species}</Badge>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">
                  Gender
                </div>
                <div>{character.gender}</div>
              </div>

              {character.type && (
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">
                    Type
                  </div>
                  <div>{character.type}</div>
                </div>
              )}

              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Created
                </div>
                <div>{format(new Date(character.created), "PPP")}</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                Origin
              </div>
              <div>{character.origin.name}</div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                Current Location
              </div>
              <div>{character.location.name}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {episodes && episodes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tv className="h-5 w-5" />
              Episodes ({episodes.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {episodes.map((episode) => (
                <div
                  key={episode.id}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card"
                >
                  <div>
                    <div className="font-medium">{episode.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {episode.episode}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {episode.air_date}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
