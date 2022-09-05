import { ITopAnimeQuery, ITopMangaQuery } from 'interfaces/Global'

export const URL_SEASON_NOW = (page?: number) => `https://api.jikan.moe/v4/seasons/now?page=${page || 1}`

export const URL_SEASON_UPCOMING = (page?: number) => `https://api.jikan.moe/v4/seasons/upcoming?page=${page || 1}`

export const URL_TOP_ANIME_MANGA = ({ type, querys }: { type: 'anime' | 'manga', querys?: ITopAnimeQuery & ITopMangaQuery }) => {
  let baseURL = `https://api.jikan.moe/v4/top/${type}`
  if (querys) {
    Object?.entries(querys)?.forEach(([key, value], index) => {
      baseURL = index === 0 ? (baseURL.concat(`?${key}=${value}`)) : (baseURL.concat(`&${key}=${value}`))
    })
  }
  return baseURL
}

export const URL_DETAILS = ({ type, id }: { type: string, id: number }) => `https://api.jikan.moe/v4/${type}/${id}/full`

export const URL_SEARCH = ({ type, querys }: { type: 'anime' | 'manga', querys: any}) => {
  console.log(querys)
  let baseURL = `https://api.jikan.moe/v4/${type}`
  Object.entries(querys)?.forEach(([key, value], index) => {
    baseURL = index === 0 ? (baseURL.concat(`?${key}=${value}`)) : (baseURL.concat(`&${key}=${value}`))
  })
  return baseURL
}
export const URL_CHARACTER = (id: number) => `https://api.jikan.moe/v4/characters/${id}/full`

export const URL_CHARACTER_PICTURES = (id: number) => `https://api.jikan.moe/v4/characters/${id}/pictures`

export const URL_CHARACTERS = (type: string, id: number) => `https://api.jikan.moe/v4/${type}/${id}/characters`
