import type { TopAnimeQuery } from '../types/anime'
import type { TopMangaQuery } from '../types/manga'
import type { MainContent } from '../types'
import { URLs } from './urls'

export async function getData<T> ({ url }: { url: string }): Promise<T> {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw Error('Request failed')
    }
    const data = await response.json()
    return data
  } catch (error: unknown) {
    console.log(error)
    throw new Error('Fetch error')
  }
}

export const getTop = async ({
  type,
  query
}: {
  type: MainContent
  query: TopAnimeQuery | TopMangaQuery
}) => {
  try {
    const response = await fetch(URLs.getTop({ type, query }))
    const data = await response.json()
    return data
  } catch (error: unknown) {
    console.log(error)
  }
}

export const getDetails = async ({ type, id }: { type: MainContent; id: number }) => {
  try {
    const response = await fetch(URLs.getDetails({ type, id }))
    if (!response.ok) {
      throw Error('Request failed')
    }
    const data = await response.json()
    return data
  } catch (error: unknown) {
    console.log(error)
  }
}
