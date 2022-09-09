import Card from 'components/Card'
import RenderCards from 'components/RenderCards'
// import { isStringParam } from 'components/Search.page'
import { IQuerySearchAnime, IQuerySearchManga } from 'interfaces/Global'
import Layout from 'Layouts/Layout'
import { useRouter } from 'next/router'
// import React, { useEffect, useState } from 'react'
import { URL_SEARCH_ANIME, URL_SEARCH_MANGA } from 'services/endpoints'
// import { SERACH } from 'services/SEARCH'
import { useFetch } from 'utils/useFetch'
import { validateTypeAnimeManga } from './[id]'

const searchTypesURL = {
  anime: ({ querys }: { querys: IQuerySearchAnime }) => URL_SEARCH_ANIME({ querys: { ...querys } }),
  manga: ({ querys }: { querys: IQuerySearchManga }) => URL_SEARCH_MANGA({ querys: { ...querys } })
}
// 'tv' | 'movie' | 'ova' | 'special' | 'ona' | 'music'
export const validateTypeManga = (str: string | string[] | undefined): 'manga' | 'novel' | 'lightnovel' | 'oneshot' | 'doujin' | 'manhwa' | 'manhua' => {
  if (typeof str === 'string') {
    if (str === 'manga') {
      return str
    }
    if (str === 'novel') {
      return str
    }
    if (str === 'lightnovel') {
      return str
    }
    if (str === 'oneshot') {
      return str
    }
    if (str === 'doujin') {
      return str
    }
    if (str === 'manhwa') {
      return str
    }
    if (str === 'manhua') {
      return str
    }
  }
  return 'manga'
}

export const validateTypeAnime = (str: string | string[] | undefined): 'tv' | 'movie' | 'ova' | 'special' | 'ona' | 'music' => {
  if (typeof str === 'string') {
    if (str === 'tv') {
      return str
    }
    if (str === 'movie') {
      return str
    }
    if (str === 'ova') {
      return str
    }
    if (str === 'special') {
      return str
    }
    if (str === 'ona') {
      return str
    }
    if (str === 'music') {
      return str
    }
  }
  return 'tv'
}

const Filter = () => {
  const router = useRouter()
  // const [data, setData] = useState()
  const { type, subType, ...rest } = router.query
  const { data } = useFetch(searchTypesURL[validateTypeAnimeManga(type)]({ querys: { type: type === 'anime' ? validateTypeAnime(subType) : validateTypeManga(subType), ...rest } }))
  // useEffect(() => {
  //   console.log({ rest })
  //   SERACH({ type, querys: { ...rest } }).then(setData)
  // }, [])

  console.log(data, router)
  return (
    <Layout>
      <>
        <Card>
          <h1>Filter</h1>
        </Card>
        <RenderCards sizeCard='small' data={data?.data} pagination={data?.pagination} />
      </>
    </Layout>
  )
}

export default Filter
