import {
  IQuerySearchAnime,
  IQuerySearchManga,
  ITopAnimeQuery,
  ITopMangaQuery
} from 'interfaces/Global'
export const URLs = {
  anime: {
    all: '/api/my_list/anime/get/all',
    getByStatus: (status: string) => `/api/my_list/anime/get/${status}`,
    post: '/api/my_list/anime/add',
    remove: (id: string) => `/api/my_list/anime/${id}/remove`
  },
  manga: {
    all: '/api/my_list/manga/get/all',
    getByStatus: (status: string) => `/api/my_list/manga/get/${status}`,
    post: '/api/my_list/manga/add',
    remove: (id: string) => `/api/my_list/manga/${id}/remove`
  }
}
export const URL_SEASON_NOW = (page?: number) =>
  `https://api.jikan.moe/v4/seasons/now?page=${page || 1}`

export const URL_SEASON_UPCOMING = (page?: number) =>
  `https://api.jikan.moe/v4/seasons/upcoming?page=${page || 1}`

export const URL_TOP_ANIME_MANGA = ({
  type,
  querys
}: {
  type: 'anime' | 'manga'
  querys?: ITopAnimeQuery | ITopMangaQuery
}) => {
  let baseURL = `https://api.jikan.moe/v4/top/${type}`
  if (querys) {
    Object?.entries(querys)?.forEach(([key, value], index) => {
      baseURL =
        index === 0
          ? baseURL.concat(`?${key}=${value}`)
          : baseURL.concat(`&${key}=${value}`)
    })
  }
  return baseURL
}

export const URL_DETAILS = ({
  type,
  id
}: {
  type: 'anime' | 'manga'
  id: number
}) => `https://api.jikan.moe/v4/${type}/${id}/full`

export const URL_SEARCH_ANIME = ({ querys }: { querys: IQuerySearchAnime }) => {
  let baseURL = 'https://api.jikan.moe/v4/anime'
  Object.entries(querys)?.forEach(([key, value], index) => {
    baseURL =
      index === 0
        ? baseURL.concat(`?${key}=${value}`)
        : baseURL.concat(`&${key}=${value}`)
  })
  return baseURL
}

export const URL_SEARCH_MANGA = ({ querys }: { querys: IQuerySearchManga }) => {
  let baseURL = 'https://api.jikan.moe/v4/manga'
  Object.entries(querys)?.forEach(([key, value], index) => {
    baseURL =
      index === 0
        ? baseURL.concat(`?${key}=${value}`)
        : baseURL.concat(`&${key}=${value}`)
  })
  return baseURL
}

export const URL_SEARCH_CHARACTERS = ({
  querys
}: {
  querys: {
    page?: number
    limit?: number
    q?: string
    order_by?: 'mal_id' | 'name' | 'favorites'
    sort?: 'desc' | 'asc'
    letter?: string
  }
}) => {
  let baseURL = 'https://api.jikan.moe/v4/characters'
  Object.entries(querys)?.forEach(([key, value], index) => {
    if (value) {
      baseURL =
        index === 0
          ? baseURL.concat(`?${key}=${value}`)
          : baseURL.concat(`&${key}=${value}`)
    }
  })
  return baseURL
}

// https://api.jikan.moe/v4/characters

export const URL_CHARACTERS_TOP = ({
  querys
}: {
  querys: { page?: number; limit?: number }
}) => {
  let baseURL = 'https://api.jikan.moe/v4/top/characters'
  if (querys) {
    Object.entries(querys)?.forEach(([key, value], index) => {
      baseURL =
        index === 0
          ? baseURL.concat(`?${key}=${value}`)
          : baseURL.concat(`&${key}=${value}`)
    })
  }
  return baseURL
}
export const URL_CHARACTER = (id: number) =>
  `https://api.jikan.moe/v4/characters/${id}/full`

export const URL_CHARACTER_PICTURES = (id: number) =>
  `https://api.jikan.moe/v4/characters/${id}/pictures`

export const URL_CHARACTERS = (type: string, id: number) =>
  `https://api.jikan.moe/v4/${type}/${id}/characters`
