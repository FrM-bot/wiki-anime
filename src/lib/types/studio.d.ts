export type ResponseStudio = {
  data: Studio
}

export type Studio = {
  mal_id: number
  url: string
  titles: Title[]
  images: Images
  favorites: number
  count: number
  established: string
  about: string
  external: External[]
}

export type External = {
  name: string
  url: string
}

export type Images = {
  jpg: Jpg
}

export type Jpg = {
  image_url: string
}

export type Title = {
  type: string
  title: string
}
