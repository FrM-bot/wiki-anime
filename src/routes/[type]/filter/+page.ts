import { URLs } from '$lib/services/urls.js'
import type { QuerySearchAnime, ResponseAnime } from '$lib/types/anime'
import { error } from '@sveltejs/kit'
import type { PageLoadEvent } from './$types'
import type { Pagination } from '$lib/types/pagination'
import { checkMainType } from '$lib/utils/checkTypes'
import type { QuerySearchManga, ResponseManga } from '$lib/types/manga'

export const load = async ({ params, fetch, url }: PageLoadEvent) => {
  const { type: stringType } = params
  const type = checkMainType(stringType)
  const responseTop = await fetch(
    URLs.filter({
      type
    }).concat(url.search) ?? ''
  )
  if (!responseTop.ok) {
    throw error(404, 'Error')
  }
  const topData: ResponseAnime | ResponseManga = await responseTop.json()

  return {
    data: topData?.data,
    pagination: topData?.pagination as Pagination
  }
}
