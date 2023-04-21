import { useAuth } from 'Layouts/LayoutProfile'
import { ISODateString } from 'next-auth'
import { AnimeList } from 'pages/api/my_list/anime/get/[status]'
import { MangaList } from 'pages/api/my_list/manga/get/[status]'
import { GET_ANIME_LIST, GET_MANGA_LIST } from 'pages/profile/[type]/[status]'
import { createContext, ReactElement, useEffect, useReducer, Reducer } from 'react'
import { animeReducer, initialAnimeState, TYPE_DISPATCH_ANIMES, AnimeState, DistatchAnime } from 'reducers/Anime.reducer'
import { mangaReducer, initialMangaState, TYPE_DISPATCH_MANGAS, MangaState, DistatchManga } from 'reducers/Manga.reducer'

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

export const MainDataContext = createContext({
  animes: initialAnimeState,
  dispatchAnimes: ({ type, animes }: { type: DistatchAnime, animes: AnimeState }) => { },
  mangas: initialMangaState,
  dispatchMangas: ({ type, mangas }: { type: DistatchManga, mangas: MangaState }) => { }
})

function MainDataProvider ({ children }: { children: ReactElement }) {
  const [animesState, dispatchAnimes] = useReducer<Reducer<AnimeState, { type: DistatchAnime; animes: AnimeState }>>(animeReducer, initialAnimeState)
  const [mangasState, dispatchMangas] = useReducer<Reducer<MangaState, { type: DistatchManga; mangas: MangaState }>>(mangaReducer, initialMangaState)
  const { data } = useAuth({})
  useEffect(() => {
    GET_ANIME_LIST({ status: 'all', token: data?.accessToken }).then((response) => {
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
    GET_MANGA_LIST({ status: 'all', token: data?.accessToken }).then((response) => {
      const mangas = {
        ...initialMangaState
      } as MangaState
      response.data.forEach((manga: MangaList) => {
        mangas[manga.status] = mangas[manga.status].concat(manga as any) as any
        mangas.all = mangas.all.concat(manga)
      })
      console.log({ mangas })
      dispatchMangas({ type: TYPE_DISPATCH_MANGAS.SET_INITIAL_STATE, mangas })
    }).catch(console.error)
  }, [data?.accessToken])

  return (
    <MainDataContext.Provider value={{ animes: animesState, mangas: mangasState, dispatchAnimes, dispatchMangas }}>{children}</MainDataContext.Provider>
  )
}

export default MainDataProvider
