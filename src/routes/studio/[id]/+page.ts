import { URLs } from '$lib/services/urls.js'
import { error } from '@sveltejs/kit'
import type { PageLoadEvent } from './$types'
import type { ResponseStudio } from '$lib/types/studio'

export const load = async ({ params, fetch }: PageLoadEvent) => {
  const id = Number(params.id)
  const responseStudioDetails = await fetch(URLs.studio.details(id))
  if (!responseStudioDetails.ok) {
    throw error(404, 'Error')
  }

  const studioDetails: ResponseStudio = await responseStudioDetails.json()
  console.log(studioDetails)
  return {
    studio: studioDetails?.data
  }
}
