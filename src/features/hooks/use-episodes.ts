import { useQuery } from "@tanstack/react-query";
import { api } from "../../shared/api/rick-morty";

export function useEpisodes(episodeUrls: string[]) {
  return useQuery({
    queryKey: ["episodes", episodeUrls],
    queryFn: () => api.getEpisodes(episodeUrls),
    enabled: episodeUrls.length > 0,
    staleTime: 1000 * 60 * 10, // 10 minutt
  });
}
