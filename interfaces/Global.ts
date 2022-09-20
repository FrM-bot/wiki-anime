import { IAnime } from './Anime'
import { IManga } from './Manga'

// import { IAnime } from "./Anime"
export interface IImage {
  jpg: {
    image_url: string
    large_image_url: string
    small_image_url: string
  }
  webp: {
    image_url: string
    large_image_url: string
    small_image_url: string
  }
}

export interface IGeneres {
  mal_id: number
  type: string
  name: string
  url: string
}

export interface IAiredPublished {
  from: string
  to: string
  prop: {
    from: {
      day: number
      month: number
      year: number
    }
    to: {
      day: number
      month: number
      year: number
    }
    string: string
  }
}

export interface IPagination {
  current_page: number
  has_next_page: boolean
  last_visible_page: number
  items: {
    count: number
    per_page: number
    total: number
  }
}

export type IAnimeManga = IAnime & IManga

export interface IResponse {
  data: IAnimeManga[]
  pagination: IPagination
}

type TypeFilter = 'upcoming' | 'bypopularity' | 'favorite'
export type TypeFilterAnime = 'airing' | TypeFilter
export type TypeFilterManga = 'publishing' | TypeFilter

export interface ITopAnimeQuery {
  type?: 'tv' | 'movie' | 'ova' | 'special' | 'ona' | 'music'

  filter?: TypeFilterAnime

  page?: number
  limit?: number
}

export interface ITopMangaQuery {
  type?:
    | 'manga'
    | 'novel'
    | 'lightnovel'
    | 'oneshot'
    | 'doujin'
    | 'manhwa'
    | 'manhua'

  filter?: TypeFilterManga
  page?: number
  limit?: number
}
export type TQueryAnimeType = 'tv' | 'movie' | 'ova' | 'special' | 'ona' | 'music'

export interface IQuerySearchAnime {
  page?: number
  limit?: number
  q?: string
  type?: TQueryAnimeType | string
  score?: number
  min_score?: number
  max_score?: number
  status?: 'airing' | 'complete' | 'upcoming'
  rating?: 'g' | 'pg' | 'pg13' | 'r17' | 'r' | 'rx'
  sfw?: boolean
  genres?: string
  genres_exclude?: string
  order_by?:
  | 'mal_id'
  | 'title'
  | 'type'
  | 'rating'
  | 'start_date'
  | 'end_date'
  | 'episodes'
  | 'score'
  | 'scored_by'
  | 'rank'
  | 'popularity'
  | 'members'
  | 'favorites'
  sort?: 'desc' | 'asc'
  letter?: string
  producers?: string
  start_date?: string
  end_date?: string
}

export type TQueryMangaType = 'manga' | 'novel' | 'lightnovel' | 'oneshot' | 'doujin' | 'manhwa' | 'manhua'
export interface IQuerySearchManga {
  page?: number
  limit?: number
  q?: string
  type?: TQueryMangaType | string
  score?: number
  min_score?: number
  max_score?: number
  status?: 'airing' | 'complete' | 'upcoming'
  rating?: 'g' | 'pg' | 'pg13' | 'r17' | 'r' | 'rx'
  sfw?: boolean
  genres?: string
  genres_exclude?: string
  order_by?:
    | 'mal_id'
    | 'title'
    | 'type'
    | 'rating'
    | 'start_date'
    | 'end_date'
    | 'episodes'
    | 'score'
    | 'scored_by'
    | 'rank'
    | 'popularity'
    | 'members'
    | 'favorites'
  sort?: 'desc' | 'asc'
  letter?: string
  producers?: string
  start_date?: string
  end_date?: string
}
