export type CharactersResponse = {
  data: Character[]
}

export type Character = {
  character: CharacterData
  role: string
  voice_actors: VoiceActor[]
}

type CharacterData = {
  mal_id: number
  url: string
  images: {
    webp: Image
    jpg: Image
  }
  name: string
}

export type Image = {
  image_url: string
  small_image_url: string
}

type VoiceActor = {
  person: Person
  language: string
}

type Person = {
  mal_id: number
  url: string
  images: Images
  name: string
}

type Images = {
  jpg: Jpg
}

type Jpg = {
  image_url: string
}

// To parse this data:
//
//   import { Convert, CharacterDetails } from "./file";
//
//   const characterDetails = Convert.toCharacterDetails(json);

export type CharacterDetailsResponse = {
  data: CharacterDetails
}

type CharacterDetails = {
  mal_id: number
  url: string
  images: { [key: string]: DataImage }
  name: string
  name_kanji: string
  nicknames: string[]
  favorites: number
  about: string
  anime: AnimeElement[]
  manga: Manga[]
  voices: Voice[]
}

type AnimeElement = {
  role: string
  anime: MangaClass
}

type MangaClass = {
  mal_id: number
  url: string
  images: { [key: string]: AnimeImage }
  title: string
}

type AnimeImage = {
  image_url: string
  small_image_url: string
  large_image_url: string
}

type DataImage = {
  image_url: string
  small_image_url: string
}

type Manga = {
  role: string
  manga: MangaClass
}

type Voice = {
  language: string
  person: Person
}

type Person = {
  mal_id: number
  url: string
  images: Images
  name: string
}

type Images = {
  jpg: Jpg
}

type Jpg = {
  image_url: string
}
