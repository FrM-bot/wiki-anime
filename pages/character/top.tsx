// import RenderCards from 'components/RenderCards'
import Card from 'components/Card'
import Loader from 'components/Loader'
import LoadingComponent from 'components/LoadingComponent'
import { ICharacter } from 'interfaces/Character'
import { IPagination } from 'interfaces/Global'
import Layout from 'Layouts/Layout'
import { useRouter } from 'next/router'
import React, { lazy, Suspense } from 'react'
import { URL_CHARACTERS_TOP } from 'services/endpoints'
import { useFetch } from 'utils/useFetch'
interface IResponse {
  data: {
    data: ICharacter[]
    pagination: IPagination
  }
  isLoading: boolean
  isError: any
}

const RenderCards = lazy(() => import('components/RenderCards'))

const TopCharacter = () => {
  const router = useRouter()
  const { data, isLoading, isError }: IResponse = useFetch(URL_CHARACTERS_TOP({ querys: { page: Number(router.query.page) || 1 } }))

  return (
    <Layout title='Top characters'>
      <>
        <Card>
          <h1>Top characters</h1>
        </Card>
        <Suspense fallback={<Loader />}>
          <LoadingComponent isLoading={isLoading} isError={isError}>
            <RenderCards data={data?.data} pagination={data?.pagination} type='character' />
          </LoadingComponent>
        </Suspense>
      </>
    </Layout>
  )
}

export default TopCharacter
