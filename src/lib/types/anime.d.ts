import { type FilterUpcoming, type Relation } from './index'
import type { Pagination } from './pagination'

export type FilterAnime = 'airing' | FilterUpcoming

export interface TopAnimeQuery {
  type?: 'tv' | 'movie' | 'ova' | 'special' | 'ona' | 'music'
  filter?: FilterAnime
  page?: number
  limit?: number
}

// To parse this data:
//
//   import { Convert, Anime } from "./file";
//
//   const anime = Convert.toAnime(json);

export interface ResponseAnime {
  data: Anime[]
  pagination: Pagination
}

export interface Anime {
  mal_id: number
  url: string
  images: { [key: string]: Image }
  trailer: Trailer
  approved: boolean
  titles: Title[]
  title: string
  title_english: string
  title_japanese: string
  title_synonyms: string[]
  type: string
  source: string
  episodes: number
  status: string
  airing: boolean
  aired: Aired
  duration: string
  rating: string
  score: number
  scored_by: number
  rank: number
  popularity: number
  members: number
  favorites: number
  synopsis: string
  background: string
  season: string
  year: number
  broadcast: Broadcast
  producers: Demographic[]
  licensors: Demographic[]
  studios: Demographic[]
  genres: Demographic[]
  explicit_genres: Demographic[]
  themes: Demographic[]
  demographics: Demographic[]
  external: external[]
  relations: Relation[]
}

export interface external {
  name: string
  url: string
}

export interface Aired {
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

export interface Broadcast {
  day: string
  time: string
  timezone: string
  string: string
}

export interface Demographic {
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

export interface Title {
  type: string
  title: string
}

export interface Trailer {
  youtube_id: string
  url: string
  embed_url: string
}

export interface Pagination {
  last_visible_page: number
  has_next_page: boolean
  items: Items
}

export interface Items {
  count: number
  total: number
  per_page: number
}

export type QueryAnime = 'tv' | 'movie' | 'ova' | 'special' | 'ona' | 'music'

export type QuerySearchAnime = {
  page?: number
  limit?: number
  q?: string
  type?: QueryAnimeType | string
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
