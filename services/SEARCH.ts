import { URL_SEARCH_ANIME, URL_SEARCH_MANGA } from './endpoints'
import { IQuerySearchAnime, IQuerySearchManga, IResponse } from 'interfaces/Global'

// type AllSearchTypes = 'tv' | 'movie' | 'ova' | 'special' | 'ona' | 'music' | 'manga' | 'novel' | 'lightnovel' | 'oneshot' | 'doujin' | 'manhwa' | 'manhua'

const searchTypesURL = {
  anime: ({ querys }: { querys: IQuerySearchAnime }) => URL_SEARCH_ANIME({ querys: { order_by: 'score', sort: 'desc', ...querys } }),
  manga: ({ querys }: { querys: IQuerySearchManga }) => URL_SEARCH_MANGA({ querys: { order_by: 'score', sort: 'desc', ...querys } })
}

export const SERACH = async ({ type, querys }: { type: 'anime' | 'manga', querys: any }): Promise<IResponse | undefined> => {
  try {
    const response = await fetch(searchTypesURL[type]({ querys }))
    const responseJSON = await response.json()
    return responseJSON
  } catch (error: Error | any) {
    console.log(error)
  }
}
