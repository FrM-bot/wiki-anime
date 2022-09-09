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

export interface ITopAnimeQuery {
  type?: 'tv' | 'movie' | 'ova' | 'special' | 'ona' | 'music'

  filter?: 'airing' | 'upcoming' | 'bypopularity' | 'favorite'

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

  filter?: 'publishing' | 'upcoming' | 'bypopularity' | 'favorite'
  page?: number
  limit?: number
}

export interface IQuerySearchAnime {
  page?: number
  limit?: number
  q?: string
  type?: 'tv' | 'movie' | 'ova' | 'special' | 'ona' | 'music' | string
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

export interface IQuerySearchManga {
  page?: number
  limit?: number
  q?: string
  type?: 'manga' | 'novel' | 'lightnovel' | 'oneshot' | 'doujin' | 'manhwa' | 'manhua' | string
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
