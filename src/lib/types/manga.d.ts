import { type FilterUpcoming, type Relation } from './index'
import type { Pagination } from './pagination'
export type FilterManga = 'publishing' | FilterUpcoming
export interface TopMangaQuery {
  type?: 'manga' | 'novel' | 'lightnovel' | 'oneshot' | 'doujin' | 'manhwa' | 'manhua'
  filter?: FilterManga
  page?: number
  limit?: number
}

export interface ResponseManga {
  data: Manga[]
  pagination: Pagination
}

export interface Manga {
  mal_id: number
  url: string
  images: { [key: string]: Image }
  approved: boolean
  titles: Title[]
  title: string
  title_english: string
  title_japanese: string
  type: string
  chapters: number
  volumes: number
  status: string
  publishing: boolean
  published: Published
  score: number
  scored_by: number
  rank: number
  popularity: number
  members: number
  favorites: number
  synopsis: string
  background: string
  authors: Author[]
  serializations: Author[]
  genres: Author[]
  explicit_genres: Author[]
  themes: Author[]
  demographics: Author[]
  relations: Relation[]
}

export interface Author {
  mal_id: number
  type: string
  name: string
  url: string
}

export interface Image {
  image_url: string
  small_image_url: string
  large_image_url: string
}

export interface Published {
  from: string
  to: string
  prop: Prop
  string: string
}

export interface Prop {
  from: From
  to: From
  string: string
}

export interface From {
  day: number
  month: number
  year: number
}

export interface Title {
  type: string
  title: string
}

export type QueryManga =
  | 'manga'
  | 'novel'
  | 'lightnovel'
  | 'oneshot'
  | 'doujin'
  | 'manhwa'
  | 'manhua'
export type QuerySearchManga = {
  page?: number
  limit?: number
  q?: string
  type?: QueryMangaType | string
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
