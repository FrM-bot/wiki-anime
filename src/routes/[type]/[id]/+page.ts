import type { Anime } from '$lib/types/anime'
import type { Manga } from '$lib/types/manga'
import type { MainContent } from '$lib/types'
import type { PageLoadEvent } from '../$types'
import { error } from '@sveltejs/kit'
import { URLs } from '$lib/services/urls'
import { checkMainType } from '$lib/utils/checkTypes'

export const load = async ({ params, fetch }: PageLoadEvent) => {
  const { id: stringId } = params as unknown as { id: string }
  const id = Number(stringId)
  const type = checkMainType(params.type)
  const response = await fetch(URLs.getDetails({ id, type }))
  const data: { data: Anime | Manga } = await response.json()
  if (!response.ok) {
    throw error(404, 'Error')
  }
  return data.data
}
