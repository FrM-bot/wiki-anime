import fs from 'node:fs/promises'

interface IGenre {
  mal_id: number
  name: string
  url: string
  count: number
}

export const getGenresFile = async (path: string): Promise<
  { mangaGenresFileJSON: IGenre[]; animeGenresFileJSON: IGenre[] } & {
    error: any
  }
> => {
  try {
    const mangaGenresFile = await fs.readFile(path + '/mangaGenres.json', {
      encoding: 'utf-8'
    })
    const animeGenresFile = await fs.readFile(path + '/animeGenres.json', {
      encoding: 'utf-8'
    })

    const mangaGenresFileJSON = JSON.parse(mangaGenresFile)
    const animeGenresFileJSON = JSON.parse(animeGenresFile)

    return {
      mangaGenresFileJSON,
      animeGenresFileJSON,
      error: false
    }
  } catch (error: any) {
    console.error(error)
    return {
      mangaGenresFileJSON: [],
      animeGenresFileJSON: [],
      error: error?.message
    }
  }
}

export const writeFile = async (data: any, path: string) => {
  try {
    await fs.writeFile(path, JSON.stringify(data), 'utf8')
  } catch (error) {
    console.error(error)
  }
}

export const getGenres = async (): Promise<{
  mangaGenres: IGenre[]
  animeGenres: IGenre[]
}> => {
  try {
    const [responseMangaGenres, responseAnimeGenres] = await Promise.all([
      fetch('https://api.jikan.moe/v4/genres/manga'),
      fetch('https://api.jikan.moe/v4/genres/anime')
    ])
    const mangaGenres = await responseMangaGenres.json()
    const animeGenres = await responseAnimeGenres.json()
    return {
      mangaGenres: mangaGenres?.data,
      animeGenres: animeGenres?.data
    }
  } catch (error) {
    console.error(error)
    return {
      mangaGenres: [],
      animeGenres: []
    }
  }
}
