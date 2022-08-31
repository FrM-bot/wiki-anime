export const URL_SEASON_NOW = (page?: number) => `https://api.jikan.moe/v4/seasons/now?page=${page || 1}`

export const URL_TOP_ANIME_MANGA = ({ page, type }: { page: number, type: string }) => `https://api.jikan.moe/v4/top/${type}?page=${page || 1}`

export const URL_DETAILS = ({ type, id }: { type: string, id: number }) => `https://api.jikan.moe/v4/${type}/${id}/full`

export const URL_SEARCH = ({ type, name, page }: { type: string, name: string, page: number }) => `https://api.jikan.moe/v4/${type}?q=${name}&order_by=score&sort=asc&page=${page || 1}`
