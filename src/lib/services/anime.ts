import { URLs } from './urls'

export const getSeasonNow = async ({ page }: { page?: number }) => {
  try {
    const response = await fetch(URLs.anime.season.now(page))
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
