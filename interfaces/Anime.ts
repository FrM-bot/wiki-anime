import { IAiredPublished, IImage, IGeneres } from './Global'

export interface IAnime {
  aired: IAiredPublished
  airing: boolean
  approved: boolean
  background?: string
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
  year: number
}
export interface ICarrousel {
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
