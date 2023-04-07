import { AnimeList } from 'pages/api/my_list/anime/get/[status]'

export const TYPE_DISPATCH_ANIMES = {
  ADD_ANIME_TO_MY_LIST: 'ADD_ANIME_TO_MY_LIST',
  REMOVE_ANIME_FROM_MY_LIST: 'REMOVE_ANIME_FROM_MY_LIST',
  SET_INITIAL_STATE: 'SET_INITIAL_STATE'
} as const

export type DistatchAnime = keyof typeof TYPE_DISPATCH_ANIMES

export interface AnimeState {
  plan_to_watch: AnimeList[],
  on_hold: AnimeList[],
  watching: AnimeList[],
  completed: AnimeList[],
  dropped: AnimeList[]
  all: AnimeList[]
}

export function animeReducer (
  state: AnimeState,
  action: {
    type: DistatchAnime
    animes: AnimeState
  }
) {
  if (action.type === TYPE_DISPATCH_ANIMES.ADD_ANIME_TO_MY_LIST) {
    // console.log(action.type === 'ADD_ANIME_TO_MY_LIST')
    return {
      ...action.animes
    }
  }
  if (action.type === TYPE_DISPATCH_ANIMES.SET_INITIAL_STATE) {
    return {
      ...action.animes
    }
  }
  if (action.type === TYPE_DISPATCH_ANIMES.REMOVE_ANIME_FROM_MY_LIST) {
    return {
      ...action.animes
    }
  }
  throw Error(`Unknown action: ${action.type}`)
}

export const initialAnimeState = {
  plan_to_watch: [],
  on_hold: [],
  watching: [],
  completed: [],
  dropped: [],
  all: []
} as unknown as AnimeState
