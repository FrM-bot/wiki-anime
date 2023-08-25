export const ssr = true

import { getTop } from '$lib/services'
import type { Anime } from '$lib/types/anime'
import { MainContentData, type Pagination } from '$lib/types'
import type { Manga } from '$lib/types/manga'

export const load = async () => {
  try {
    const topAnime: { data: Anime[]; pagination: Pagination } = await getTop({
      type: MainContentData.Anime,
      query: { limit: 10 }
    })
    const topManga: { data: Manga[]; pagination: Pagination } = await getTop({
      type: MainContentData.Manga,
      query: { limit: 10 }
    })
    return {
      topAnime: topAnime.data,
      topManga: topManga.data
    }
  } catch (error) {
    console.error(error)
    return {
        topAnime: [],
        topManga: []
      }
  }
}
