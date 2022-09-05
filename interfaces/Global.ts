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
  type?: 'manga' | 'novel' | 'lightnovel' | 'oneshot' | 'doujin' | 'manhwa' | 'manhua'

  filter?: 'publishing' | 'upcoming' | 'bypopularity' | 'favorite'
  page?: number
  limit?: number
}
