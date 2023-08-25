import { URLs } from '$lib/services/urls.js'
import type { Anime, ResponseAnime } from '$lib/types/anime'
import { error } from '@sveltejs/kit'
import type { PageLoadEvent } from './$types'
import type { Pagination } from '$lib/types/pagination'
import { MainContentData } from '$lib/types'
import { checkMainType } from '$lib/utils/checkTypes'
import type { ResponseManga } from '$lib/types/manga'

export const load = async ({ params, fetch, url }: PageLoadEvent) => {
  const { page: pageString = 1 } = Object.fromEntries(new URLSearchParams(url.search))
  const page = Number(pageString)
  console.log(params)
  const type = checkMainType(params.type)
  const responseTop = await fetch(URLs.getTop({ type, page }))
  if (!responseTop.ok) {
    throw error(404, 'Error')
  }

  const topData: ResponseAnime | ResponseManga = await responseTop.json()

  console.log({ topData })

  return {
    data: topData.data,
    pagination: topData.pagination as Pagination
  }
}
