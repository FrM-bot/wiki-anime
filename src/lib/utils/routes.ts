import type { MainContent } from "$lib/types";
import type { QuerySearchAnime } from "$lib/types/anime";
import type { QuerySearchManga } from "$lib/types/manga";
import { fromObjectQueriesToUrl } from "./url";

export const LocalRotes = {
  anime: {
    top: '/anime/top',
    details: (id: number) => `/anime/${id}`,
    index: '/anime',
    season: {
      to: ({ season, year, page = 1 }: { season: string; year: number; page?: number }) =>
        `/anime/${season}/${year}?page=${page}`,
      now: ({ page = 1 } = {}) => `/anime/season/now?page=${page}`,
      upcoming: ({ page = 1 } = {}) => `/anime/season/upcoming?page=${page}`
    }
  },
  manga: {
    top: '/manga/top',
    details: (id: number) => `/manga/${id}`,
    index: '/manga'
  },
  character: {
    details: (id: number) => `/character/${id}`
  },
  people: {
    details: ({ id }: { id: number }) => `/people/${id}`
  },
  search: ({ type, queries }: { type: MainContent, queries?: QuerySearchAnime | QuerySearchManga }) => {
    let url = `${globalThis?.location?.origin}/${type}/filter`
    if (queries) {
      url = fromObjectQueriesToUrl({ baseUrl: url, queries: queries as { [k: string]: string } })?.toString() ?? url
    }
    return url
  },
  studio: {
    details: (id: number) => `/studio/${id}`
  },
  home: '/'
}
