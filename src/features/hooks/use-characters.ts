import { useQuery } from "@tanstack/react-query";
import { api } from "../../shared/api/rick-morty";
import type { CharacterFilters } from "../../shared/types/character";

export function useCharacters(filters: CharacterFilters) {
  return useQuery({
    queryKey: ["characters", filters],
    queryFn: () => api.getCharacters(filters),
    staleTime: 1000 * 60 * 5,
  });
}

export function useCharacter(id: string) {
  return useQuery({
    queryKey: ["character", id],
    queryFn: () => api.getCharacter(id),
    enabled: !!id,
  });
}
