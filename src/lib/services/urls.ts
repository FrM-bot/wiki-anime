import type { MainContent } from '$lib/types'

const BASE_URL = 'https://api.jikan.moe/v4'

export const URLs = {
  anime: {
    season: {
      now: ({ page = 1 }: { page?: number }) => `${BASE_URL}/seasons/now?page=${page}`,
      upcoming: ({ page = 1 }: { page?: number }) => `${BASE_URL}/seasons/upcoming?page=${page}`,
      getSeason: ({ year, season, page = 1 }: { year: number; season: string; page: number }) =>
        `${BASE_URL}/seasons/${year}/${season}?page=${page}`,
      getSeasons: `${BASE_URL}/seasons`
    }
  },
  manga: {
    all: '/api/my_list/manga/get/all',
    getByStatus: (status: string) => `/api/my_list/manga/get/${status}`,
    post: '/api/my_list/manga/add',
    put: (id: string) => `/api/my_list/manga/${id}/edit`,
    remove: (id: string) => `/api/my_list/manga/${id}/remove`
  },
  getTop: ({ type, page = 1 }: { type: MainContent; page: number }) =>
    `${BASE_URL}/top/${type}?page=${page}`,
  getDetails: ({ type, id }: { type: MainContent; id: number }) => `${BASE_URL}/${type}/${id}/full`,
  character: {
    getAll: ({ type, id }: { type: MainContent; id: number }) =>
      `${BASE_URL}/${type}/${id}/characters`,
    details: ({ id }: { id: number }) => `${BASE_URL}/characters/${id}/full`,
    getPictures: ({ id }: { id: number }) => `${BASE_URL}/characters/${id}/pictures`
  },
  people: {
    details: ({ id }: { id: number }) => `${BASE_URL}/people/${id}/full`
  },
  filter: ({ type }: { type: MainContent }) => `${BASE_URL}/${type}`,
  studio: {
    details: (id: number) => `${BASE_URL}/producers/${id}/full`
  },
  random: ({ type }: { type: MainContent }) => `${BASE_URL}/random/${type}`
}
