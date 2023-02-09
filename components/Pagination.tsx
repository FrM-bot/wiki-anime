import { useRef, useEffect } from 'react'
import Button from './Button'
import Card from './Card'
import { useRouter } from 'next/router'
import ArrowIcon from '../icons/ArrowIcon'

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

  return (
    <div className='w-full grid place-content-center'>
      <Card className='my-4 w-fit'>
        <div className='flex gap-4 justify-center items-center'>

          <Button props={{ disabled: currentPage === 1, onClick: () => handlerPrevPage(), 'aria-label': 'arrow' }}>
            <ArrowIcon props={{ style: { transform: 'rotate(180deg)' } }} />
          </Button>

          <div className='flex gap-2'>
            <input ref={refInput} onKeyDown={(e) => e.code === 'Enter' && handlerGo()} className='bg-primary [-webkit-appearance: none] h-full text-center p-2 focus:outline-none appearance-none w-16' placeholder='page' type="number" min='1' max={lastPage} defaultValue={currentPage} />
            <Button props={{ onClick: () => handlerGo() }}>Go</Button>
          </div>
          <span>of</span>
          <span>{lastPage}</span>

          <Button props={{ disabled: currentPage === lastPage, onClick: () => handlerNextPage() }}>
            <ArrowIcon props={{ 'aria-label': 'arrow' }} />
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default Pagination
