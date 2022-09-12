import { createContext, ReactElement } from 'react'
import { useFetch } from 'utils/useFetch'

export const GenresContext = createContext({
  genresAnime: [{
    mal_id: 0,
    name: '',
    url: '',
    count: 0
  }],
  genresManga: [{
    mal_id: 6,
    name: 'Mythology',
    url: '',
    count: 0
  }]
})

const GenresProvider = ({ children }: { children: ReactElement }) => {
  const { data: genresManga } = useFetch('https://api.jikan.moe/v4/genres/manga')
  const { data: genresAnime } = useFetch('https://api.jikan.moe/v4/genres/anime')
  //   console.log({genresManga}, {genresAnime})

  return (
        <GenresContext.Provider value={{ genresAnime: genresAnime?.data, genresManga: genresManga?.data }}>
            {children}
        </GenresContext.Provider>
  )
}

export default GenresProvider
