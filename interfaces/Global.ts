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

export interface IManga {
  chapters: number
  volumes: number
  status: string
  published: IAiredPublished
}

export interface IAnimeManga extends IManga {
  approved: boolean
  background: string
  demographics: []
  duration: string
  episodes: number
  explicit_genres: []
  favorites: number
  genres: IGeneres[]
  images: IImage
  mal_id: number
  members: number
  popularity: number
  rank: number
  rating: string
  score: number
  scored_by: number
  season: string
  source: string
  status: string
  synopsis: string
  title: string
  title_english: string
  title_japanese: string
  title_synonyms: string
  type: string
  url: string
  aired: {
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
}

export interface IResponse {
  data: IAnimeManga[]
  pagination: IPagination
}
