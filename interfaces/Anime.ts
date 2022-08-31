import { IAnimeManga, IIMage } from './Global'

interface IGeneres {
  mal_id: number,
  type: string,
  name: string,
  url: string
}

export interface IAnime {
  aired: { from: Date, to: Date, string: string }
  airing: boolean
  approved: boolean
  background?: string
  // broadcast: { day: 'Thursdays', time: '23:30', timezone: 'Asia/Tokyo', string: 'Thursdays at 23:30 (JST)' }
  demographics: []
  duration: string
  episodes: number
  explicit_genres: []
  favorites: number
  genres: IGeneres[]
  images: IIMage
  // licensors: []
  mal_id: number
  members: number
  popularity: number
  // producers: (10)[{… }, {… }, {… }, {… }, {… }, {… }, {… }, {… }, {… }, {… }]
  rank: number
  rating: string
  score: number
  scored_by: number
  season: string
  source: string
  status: string
  // studios: [{… }]
  synopsis: string
  // themes: [{… }]
  title: string
  title_english: string
  title_japanese: string
  title_synonyms: string
  // titles: (5)[{… }, {… }, {… }, {… }, {… }]
  // trailer: { youtube_id: 'LxpTh8GKAL4', url: 'https://www.youtube.com/watch?v=LxpTh8GKAL4',
  // embed_url: 'https://www.youtube.com/embed/LxpTh8GKAL4?enablejsapi=1&wmode=opaque&autoplay=1',
  // images: {… }
  // }
  type: string
  url: string
  year: number
}
export interface IAnimeCarrousel {
    images: {
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
    mal_id: number
    title: string
    score: number
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

export interface IResponse {
    data: IAnimeManga[]
    pagination: IPagination
  }
