import { useRef } from 'react'
import { Button } from './Button'
import Card from './Card'
import { useRouter } from 'next/router'

interface IProps {
  currentPage: number
  lastPage: number
}

const Pagination = ({ currentPage, lastPage }: IProps) => {
  const refInput = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const handlerGo = () => {
    if (!refInput.current) return
    const page = Number(refInput.current.value) || 1
    console.log(page, lastPage)
    if (page <= lastPage && page >= 1) {
      router.push({
        pathname: window?.location?.pathname,
        query: {
          page
        }
      })
      // setPage(numberPage)
      // navigate(`/dogs?page=${numberPage}`)
    }
  }
  const handlerNextPage = () => {
    if (currentPage <= lastPage) {
      router.push({
        pathname: window?.location?.pathname,
        query: {
          page: currentPage + 1
        }
      })
      // setPage((prevPage: number) => prevPage + 1)
      // navigate(`/dogs?page=${page + 1}`)
    }
  }
  const handlerPrevPage = () => {
    if (currentPage > 1) {
      router.push({
        pathname: window?.location?.pathname,
        query: {
          page: currentPage - 1
        }
      })
      // setPage((prevPage: number) => prevPage - 1)
      // navigate(`/dogs?page=${page - 1}`)
    }
  }
  // console.log(router, window.location.pathname)
  return (
    <Card className='my-4'>
      <div className='flex gap-4 justify-center items-center'>

        <Button props={{ disabled: currentPage === 1 }} onClick={handlerPrevPage}>
            <span>Previus</span>
        </Button>

        <div className='flex gap-2'>
            <input ref={refInput} className='bg-primary [-webkit-appearance: none] h-full text-center p-2 focus:outline-none appearance-none' placeholder='page' type="number" min='1' max={lastPage} defaultValue={currentPage} />
            <Button onClick={handlerGo}>Go</Button>
        </div>
        <span>of</span>
        <span>{lastPage}</span>

        <Button props={{ disabled: currentPage === lastPage }} onClick={handlerNextPage}>
            <span>Next</span>
        </Button>
      </div>
    </Card>
  )
}

export default Pagination