// To parse this data:
//
//   import { Convert, PeopleDetails } from "./file";
//
//   const peopleDetails = Convert.toPeopleDetails(json);

export type PeopleDetails = {
  data: People
}

export type People = {
  mal_id: number
  url: string
  website_url: string
  images: Images
  name: string
  given_name: string
  family_name: string
  alternate_names: string[]
  birthday: string
  favorites: number
  about: string
  anime: AnimeElement[]
  manga: Manga[]
  voices: Voice[]
}

export type AnimeElement = {
  position: string
  anime: MangaClass
}

export type MangaClass = {
  mal_id: number
  url: string
  images: { [key: string]: AnimeImage }
  title: string
}

export type AnimeImage = {
  image_url: string
  small_image_url: string
  large_image_url: string
}

export type Images = {
  jpg: Jpg
}

export type Jpg = {
  image_url: string
}

export type Manga = {
  position: string
  manga: MangaClass
}

export type Voice = {
  role: string
  anime: MangaClass
  character: Character
}

export type Character = {
  mal_id: number
  url: string
  images: { [key: string]: CharacterImage }
  name: string
}

export type CharacterImage = {
  image_url: string
  small_image_url: string
}

// Converts JSON strings to/from your types
export class Convert {
  public static toPeopleDetails(json: string): PeopleDetails {
    return JSON.parse(json)
  }

  public static peopleDetailsToJson(value: PeopleDetails): string {
    return JSON.stringify(value)
  }
}
