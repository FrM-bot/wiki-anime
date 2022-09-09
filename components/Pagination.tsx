import { useRef, useEffect } from 'react'
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
  useEffect(() => {
    if (!refInput.current) return
    refInput.current.value = currentPage?.toString()
  }, [currentPage])

  const handlerGo = () => {
    if (!refInput.current) return
    const page = Number(refInput.current.value) || 1
    if (page <= lastPage && page >= 1) {
      const { type, ...rest } = router.query
      router.push({
        pathname: window?.location?.pathname,
        query: {
          ...rest,
          page
        }
      })
    }
  }
  const handlerNextPage = () => {
    if (currentPage <= lastPage) {
      const { type, ...rest } = router.query
      router.push({
        pathname: window?.location?.pathname,
        query: {
          ...rest,
          page: currentPage + 1
        }
      })
    }
  }
  const handlerPrevPage = () => {
    if (currentPage > 1) {
      const { type, ...rest } = router.query
      router.push({
        pathname: window?.location?.pathname,
        query: {
          ...rest,
          page: currentPage - 1
        }
      })
    }
  }
  console.log(router, globalThis?.window?.location, globalThis?.window?.location?.pathname.concat(globalThis?.window?.location?.search))
  return (
    <Card className='my-4'>
      <div className='flex gap-4 justify-center items-center'>

        <Button props={{ disabled: currentPage === 1, onClick: () => handlerPrevPage() }}>
          <span>Prev</span>
        </Button>

        <div className='flex gap-2'>
          <input ref={refInput} onKeyDown={(e) => e.code === 'Enter' && handlerGo()} className='bg-primary [-webkit-appearance: none] h-full text-center p-2 focus:outline-none appearance-none' placeholder='page' type="number" min='1' max={lastPage} defaultValue={currentPage} />
          <Button props={{ onClick: () => handlerGo() }}>Go</Button>
        </div>
        <span>of</span>
        <span>{lastPage}</span>

        <Button props={{ disabled: currentPage === lastPage, onClick: () => handlerNextPage() }}>
          <span>Next</span>
        </Button>
      </div>
    </Card>
  )
}

export default Pagination
