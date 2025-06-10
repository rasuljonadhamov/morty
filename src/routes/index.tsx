import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AlertCircle } from "lucide-react";
import type { CharacterFilters } from "../shared/types/character";
import { useCharacters } from "../features/hooks/use-characters";
import { LoadingSpinner } from "../shared/components/loading-spinner";
import { Alert, AlertDescription } from "../components/ui/alert";
import { CharacterFiltersComponent } from "../features/components/character-filters";
import { CharacterTable } from "../features/components/character-table";
import { CharacterPagination } from "../features/components/character-pagination";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [filters, setFilters] = useState<CharacterFilters>({ page: 1 });

  const { data, isLoading, error } = useCharacters(filters);

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-2">
          <LoadingSpinner />
          <span>Loading characters...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load characters. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold">
          Rick & Morty Characters
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Explore the multiverse of Rick and Morty characters
        </p>
      </div>

      <CharacterFiltersComponent
        filters={filters}
        onFiltersChange={setFilters}
      />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Found {data.info.count} characters
          </div>
        </div>

        <CharacterTable characters={data.results} />

        {data.info.pages > 1 && (
          <CharacterPagination
            currentPage={filters.page || 1}
            totalPages={data.info.pages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}
