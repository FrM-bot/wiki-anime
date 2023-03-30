import { useAuth } from 'Layouts/LayoutProfile'
import { ISODateString } from 'next-auth'
import { AnimeList } from 'pages/api/my_list/anime/[status]'
import { GET_ANIME_LIST } from 'pages/profile/[type]/[status]'
import { createContext, ReactElement, useEffect, useReducer, Reducer } from 'react'
import { animeReducer, initialAnimeState, TYPE_DISPATCH_ANIMES, AnimeState, DistatchAnime } from 'reducers/Anime.reducer'

interface UserData {
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
  expires: ISODateString
  accessToken?: string | null
}

export interface Session { data: UserData, status?: '' }

export const AnimeContext = createContext({ animes: initialAnimeState, dispatchAnimes: ({ type, animes }: { type: DistatchAnime, animes: AnimeState }) => { } })

function AnimeProvider ({ children }: { children: ReactElement }) {
  const [animesState, dispatchAnimes] = useReducer<Reducer<AnimeState, { type: DistatchAnime; animes: AnimeState }>>(animeReducer, initialAnimeState)
  const { data } = useAuth({})
  useEffect(() => {
    GET_ANIME_LIST({ status: 'all', token: data?.accessToken }).then(response => {
      const animes = {
        ...initialAnimeState
      } as AnimeState
      response.data.forEach((anime: AnimeList) => {
        animes[anime.status] = animes[anime.status].concat(anime as any) as any
        animes.all = animes.all.concat(anime)
      })
      console.log({ animes })
      dispatchAnimes({ type: TYPE_DISPATCH_ANIMES.SET_INITIAL_STATE, animes })
    }).catch(console.error)
  }, [data?.accessToken])

  return (
    <AnimeContext.Provider value={{ animes: animesState, dispatchAnimes }}>{children}</AnimeContext.Provider>
  )
}

export default AnimeProvider
