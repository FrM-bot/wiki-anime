import { MangaList } from 'pages/api/my_list/manga/get/[status]'

export const TYPE_DISPATCH_MANGAS = {
  ADD_MANGA_TO_MY_LIST: 'ADD_MANGA_TO_MY_LIST',
  REMOVE_MANGA_FROM_MY_LIST: 'REMOVE_MANGA_FROM_MY_LIST',
  SET_INITIAL_STATE: 'SET_INITIAL_STATE'
} as const

export type DistatchManga = keyof typeof TYPE_DISPATCH_MANGAS

export interface MangaState {
  plan_to_read: MangaList[],
  on_hold: MangaList[],
  reading: MangaList[],
  completed: MangaList[],
  dropped: MangaList[]
  all: MangaList[]
}

export function mangaReducer (
  state: MangaState,
  action: {
    type: DistatchManga
    mangas: MangaState
  }
) {
  if (action.type === TYPE_DISPATCH_MANGAS.ADD_MANGA_TO_MY_LIST) {
    // console.log(action.type === 'ADD_ANIME_TO_MY_LIST')
    return {
      ...action.mangas
    }
  }
  if (action.type === TYPE_DISPATCH_MANGAS.SET_INITIAL_STATE) {
    return {
      ...action.mangas
    }
  }
  if (action.type === TYPE_DISPATCH_MANGAS.REMOVE_MANGA_FROM_MY_LIST) {
    return {
      ...action.mangas
    }
  }
  throw Error(`Unknown action: ${action.type}`)
}

export const initialMangaState = {
  plan_to_read: [],
  on_hold: [],
  reading: [],
  completed: [],
  dropped: [],
  all: []
} as unknown as MangaState
