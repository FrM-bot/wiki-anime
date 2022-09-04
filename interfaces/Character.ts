export interface ICharacter {
  mal_id: number
  url: string
  images: {
    jpg: {
      image_url: string
      small_image_url: string
    }
    webp: {
      image_url: string
      small_image_url: string
    }
  }
  name: string
  name_kanji: string
  nicknames: string[]
  favorites: number
  about: string
  anime:
    {
      role: string
      anime: {
        mal_id: number
        url: string
        images: {
          jpg: {
            image_url: string
            small_image_url: string
            large_image_url: string
          }
          webp: {
            image_url: string
            small_image_url: string
            large_image_url: string
          }
        }
        title: string
      }
    }[]

  manga:
    {
      role: string
      manga: {
        mal_id: number
        url: string
        images: {
          jpg: {
            image_url: string
            small_image_url: string
            large_image_url: string
          }
          webp: {
            image_url: string
            small_image_url: string
            large_image_url: string
          }
        }
        title: string
      }
    }[]

  voices:
    {
      language: string
      person: {
        mal_id: number
        url: string
        images: {
          jpg: {
            image_url: string
          }
        }
        name: string
      }
    }[]

}
