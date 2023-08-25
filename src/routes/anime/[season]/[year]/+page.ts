import { URLs } from '$lib/services/urls.js'
import type { ResponseAnime } from '$lib/types/anime'
import { error } from '@sveltejs/kit'
import type { PageLoadEvent } from './$types'
import { getData } from '$lib/services'
import type { Season } from '$lib/types/season'

export const load = async ({ params, fetch, url }: PageLoadEvent) => {
  const { page: pageString = 1 } = Object.fromEntries(new URLSearchParams(url.search))
  const page = Number(pageString)
  const { season, year: yearString } = params
  const year = Number(yearString)
  const responseCharacterDetails = await fetch(URLs.anime.season.getSeason({ page, season, year }))
  const { data: seasons } = await getData<{
    data: Season[]
    pagination: { last_visible_page: number; has_next_page: boolean }
  }>({ url: URLs.anime.season.getSeasons })
  if (!responseCharacterDetails.ok) {
    throw error(404, 'Error')
  }

  const characterDetails: ResponseAnime = await responseCharacterDetails.json()

  return {
    animes: characterDetails?.data,
    season,
    year,
    pagination: characterDetails?.pagination,
    seasons
  }
}
