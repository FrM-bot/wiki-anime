export interface IProducer {
  mal_id: number
  url: string
  titles: {
    type: string,
    title: string
    }[]
  images: {
    jpg: {
      image_url: string
    }
  }
  favorites: number
  count: number
  established: string
  about: string
  external:
    {
      name: string
      url: string
    }[]
}
