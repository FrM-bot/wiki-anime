export const URL_SEASON_NOW = (page?: number) => `https://api.jikan.moe/v4/seasons/now?page=${page || 1}`

export const URL_TOP_ANIME_MANGA = ({ page, type, filterType, ...querys }: { page: number, type: 'anime' | 'manga', filterType?: string | null}) => {
//   console.log(`https://api.jikan.moe/v4/top/${type}?page=${page || 1}${filterType && `&type=${filterType}`}`, querys)
//   let baseURL = `https://api.jikan.moe/v4/top/${type}`
//   Object.entries(querys)?.forEach(([key, value], index) => {
//     baseURL = index === 0 ? (baseURL.concat(`?${key}=${value}`)) : (baseURL.concat(`&${key}=${value}`))
//   })
//   console.log({baseURL})
  return `https://api.jikan.moe/v4/top/${type}?page=${page || 1}${filterType ? `&type=${filterType}` : ''}`
}

export const URL_DETAILS = ({ type, id }: { type: string, id: number }) => `https://api.jikan.moe/v4/${type}/${id}/full`

export const URL_SEARCH = ({ type, querys }: { type: 'anime' | 'manga', querys: any }) => {
  console.log(querys)
  let baseURL = `https://api.jikan.moe/v4/${type}`
  Object.entries(querys)?.forEach(([key, value], index) => {
    baseURL = index === 0 ? (baseURL.concat(`?${key}=${value}`)) : (baseURL.concat(`&${key}=${value}`))
  })
  console.log({ baseURL })
  return baseURL
}
export const URL_CHARACTER = (id: number) => `https://api.jikan.moe/v4/characters/${id}/full`
