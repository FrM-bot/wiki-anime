import { TQueryAnimeType, TQueryMangaType } from 'interfaces/Global'
import { types, TypesSearch } from 'utils/types'

const subTypesAnime: TQueryAnimeType[] = ['tv', 'movie', 'ova', 'special', 'ona', 'music']
const subTypesManga: TQueryMangaType[] = ['manga', 'novel', 'lightnovel', 'oneshot', 'doujin', 'manhwa', 'manhua']
// const orderBy = ['members', 'favorites', 'score', 'rank', 'popularity', 'title']

export const validateTypeAnimeManga = (str: string | string[] | undefined): 'anime' | 'manga' => {
  if (typeof str === 'string') {
    if (str === 'anime') {
      return str
    }
    if (str === 'manga') {
      return str
    }
  }
  return 'anime'
}

export const validateTypeSearch = (str: string | string[] | undefined | TypesSearch): TypesSearch => {
  if (typeof str === 'string') {
    for (const type of types) {
      if (str === type) return str
    }
  }
  return 'anime'
}

// 'tv' | 'movie' | 'ova' | 'special' | 'ona' | 'music'
export const validateTypeManga = (str: any): TQueryMangaType => {
  if (subTypesManga.includes(str)) {
    return str
  }
  return 'manga'
}

export const validateTypeAnime = (str: any): TQueryAnimeType => {
  if (subTypesAnime.includes(str)) {
    return str
  }
  return 'tv'
}

// type TypesTT = 'upcoming' | 'bypopularity' | 'favorite' | 'airing' | 'publishing'

// const TP: TypesTT[] = [
//   'favorite',
//   'publishing',
//   'upcoming',
//   'bypopularity',
//   'airing'
// ]

// export const ValidateFilterTopAnimeManga = (str: string | string[] | undefined): 'upcoming' | 'bypopularity' | 'favorite' | 'airing' | 'publishing' => {
//   if (!TP.includes(str)) {
//     return str
//   }
//   return TP[0]
// }
