import { getData, getTop } from '$lib/services'
import type { Anime } from '$lib/types/anime'
import { MainContentData, type Pagination } from '$lib/types'
import type { Manga } from '$lib/types/manga'
import { LocalRotes } from '$lib/utils/routes.js'
import { getSeasonNow } from '$lib/services/anime.js'
import { URLs } from '$lib/services/urls.js'
import type { PageLoadEvent } from './$types'

export const csr = false

const PAGE = 1

export const load = async ({ url, data, route }: PageLoadEvent) => {
  try {
    if (url.pathname === LocalRotes.anime.index) {
      console.log({ url, data, route })
      const topAnime: { data: Anime[]; pagination: Pagination } = await getTop({
        type: MainContentData.Anime,
        query: { limit: 10 }
      })
      const nowSeasonAnime: { data: Anime[]; pagination: Pagination } = await getSeasonNow({
        page: PAGE
      })
      const upcomingSeasonAnime: { data: Anime[]; pagination: Pagination } = await getData({
        url: URLs.anime.season.upcoming({ page: 1 })
      })
      return {
        topAnime: topAnime.data,
        nowSeasonAnime: nowSeasonAnime.data,
        upcomingSeasonAnime: upcomingSeasonAnime.data
      }
    }
    if (url.pathname === LocalRotes.manga.index) {
      const topManga: { data: Manga[]; pagination: Pagination } = await getTop({
        type: MainContentData.Manga,
        query: { limit: 10 }
      })
      console.log({ topManga })
      return {
        topManga: topManga.data
      }
    }
  } catch (error) {
    console.error(error)
  }
}
