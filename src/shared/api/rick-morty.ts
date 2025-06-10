import type {
  Character,
  CharacterFilters,
  CharactersResponse,
  Episode,
} from "../types/character";

const BASE_URL = "https://rickandmortyapi.com/api";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = "Not found") {
    super(message, 404, "NOT_FOUND");
    this.name = "NotFoundError";
  }
}

export const api = {
  getCharacters: async (
    filters: CharacterFilters = {}
  ): Promise<CharactersResponse> => {
    const params = new URLSearchParams();

    if (filters.name) params.append("name", filters.name);
    if (filters.status) params.append("status", filters.status);
    if (filters.gender) params.append("gender", filters.gender);
    if (filters.page) params.append("page", filters.page.toString());

    const response = await fetch(`${BASE_URL}/character?${params}`);

    if (!response.ok) {
      if (response.status === 404) {
        return {
          info: {
            count: 0,
            pages: 0,
            next: null,
            prev: null,
          },
          results: [],
        };
      }

      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.error || "Failed to fetch characters",
        response.status
      );
    }

    if (!response.ok) {
      if (response.status !== 404) {
        throw new Error("Failed to fetch characters");
      }
    }

    return response.json();
  },

  getCharacter: async (id: string): Promise<Character> => {
    const response = await fetch(`${BASE_URL}/character/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch character");
    }

    return response.json();
  },

  getEpisodes: async (episodeUrls: string[]): Promise<Episode[]> => {
    if (episodeUrls.length === 0) return [];

    const episodeIds = episodeUrls.map((url) => url.split("/").pop()).join(",");
    const response = await fetch(`${BASE_URL}/episode/${episodeIds}`);

    if (!response.ok) {
      throw new Error("Failed to fetch episodes");
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [data];
  },
};
