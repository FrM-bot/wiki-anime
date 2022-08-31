import { ReactElement, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from 'Layouts/Layout'
import { InputSearch } from 'components/inputSearch'
import { types } from 'utils/types'

interface IProps {
  children: ReactElement
}

const LayoutSearch = ({ children }: IProps) => {
  const router = useRouter()
  const { InputSearchComponent, inputValue, selectedValue } = InputSearch()
  useEffect(() => {
    types.includes(selectedValue) && inputValue && router.push({
      pathname: `/${selectedValue}/s/${inputValue}`
    })
  }, [inputValue, selectedValue])
  return (
    <Layout>
        <>
        <div className='mx-auto w-4/6 sm:w-full my-2'>
            <InputSearchComponent valueSearched={typeof router.query.name === 'string' ? router.query.name : ''} />
        </div>
            {router.query.name && <div><p>Results for: <span>{router.query.name}</span></p></div>}
            {children}
        </>
    </Layout>
  )
}

export default LayoutSearch
