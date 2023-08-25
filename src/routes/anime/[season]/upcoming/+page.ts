import { URLs } from '$lib/services/urls.js'
import type { Anime } from '$lib/types/anime'
import { error } from '@sveltejs/kit'
import type { PageLoadEvent } from './$types'

export const load = async ({ fetch, url }: PageLoadEvent) => {
  const { page: pageString = 1 } = Object.fromEntries(new URLSearchParams(url.search))
  const page = Number(pageString)
  const responseCharacterDetails = await fetch(URLs.anime.season.upcoming({ page }))
  if (!responseCharacterDetails.ok) {
    throw error(404, 'Error')
  }

  const characterDetails = await responseCharacterDetails.json()
  
  console.log({characterDetails})

  return {
    animes: characterDetails?.data as Anime[],
    pagination: characterDetails?.pagination
  }
}
